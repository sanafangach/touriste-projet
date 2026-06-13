<?php

namespace App\Services;

use App\Models\ApprendreMission;
use App\Models\ApprendreProgress;
use App\Models\LearningCertificate;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CertificateService
{
    /**
     * The only tracks a certificate can ever be issued for, with their official
     * titles and visual themes. This is the single whitelist used to validate
     * track names everywhere in the certificate feature.
     */
    public const TRACKS = [
        'darija' => [
            'title' => 'Basic Darija for Travelers',
            'label' => 'Darija',
            'code'  => 'DRJ',
            'theme' => [
                'primary'   => '#d97706', // gold / orange
                'secondary' => '#f59e0b',
                'accent'    => '#b45309',
                'soft'      => '#fef3c7',
            ],
        ],
        'tifinagh' => [
            'title' => 'Tifinagh Fundamentals',
            'label' => 'Tifinagh',
            'code'  => 'TFN',
            'theme' => [
                'primary'   => '#0369a1', // blue
                'secondary' => '#0ea5e9',
                'accent'    => '#075985',
                'soft'      => '#e0f2fe',
            ],
        ],
        'culture' => [
            'title' => 'Moroccan Culture Essentials',
            'label' => 'Moroccan Culture',
            'code'  => 'CLT',
            'theme' => [
                'primary'   => '#15803d', // green
                'secondary' => '#22c55e',
                'accent'    => '#166534',
                'soft'      => '#dcfce7',
            ],
        ],
    ];

    public static function isValidTrack(string $track): bool
    {
        return array_key_exists($track, self::TRACKS);
    }

    /**
     * Is the track fully completed by the user, computed entirely from the
     * database? A track is complete when the number of distinct missions the
     * user has completed for it equals the total number of distinct missions
     * that exist for it (and at least one mission exists). No mission counts
     * are ever hardcoded.
     *
     * Missions are identified by their logical key (track + mission_number),
     * not by row id: the seed data contains duplicate rows for each mission, so
     * counting raw rows would make every track impossible to finish. Counting
     * distinct mission numbers is robust whether or not duplicates are ever
     * cleaned up.
     */
    public function isTrackCompleted(int $userId, string $track): bool
    {
        $total = ApprendreMission::where('track', $track)
            ->distinct()
            ->count('mission_number');

        if ($total === 0) {
            return false;
        }

        $completed = ApprendreProgress::where('apprendre_progress.user_id', $userId)
            ->where('apprendre_progress.completed', true)
            ->join('apprendre_missions', 'apprendre_missions.id', '=', 'apprendre_progress.mission_id')
            ->where('apprendre_missions.track', $track)
            ->distinct()
            ->count('apprendre_missions.mission_number');

        return $completed >= $total;
    }

    /**
     * Issue a certificate for a completed track if one does not already exist.
     * Idempotent and safe against duplicates: the unique(user_id, track)
     * constraint is the final guard, and a row-level lock prevents two
     * concurrent requests from both generating.
     *
     * Returns the certificate (existing or newly created), or null if the
     * track is not completed / not valid.
     */
    public function issueIfEligible(User $user, string $track): ?LearningCertificate
    {
        if (!self::isValidTrack($track)) {
            return null;
        }

        // Fast path: already issued — never regenerate.
        $existing = LearningCertificate::where('user_id', $user->id)
            ->where('track', $track)
            ->first();

        if ($existing) {
            return $existing;
        }

        if (!$this->isTrackCompleted($user->id, $track)) {
            return null;
        }

        // Create the record inside a transaction so a concurrent request cannot
        // slip a duplicate past the existence check above.
        $certificate = DB::transaction(function () use ($user, $track) {
            $locked = LearningCertificate::where('user_id', $user->id)
                ->where('track', $track)
                ->lockForUpdate()
                ->first();

            if ($locked) {
                return $locked;
            }

            return LearningCertificate::create([
                'user_id'            => $user->id,
                'track'              => $track,
                'certificate_title'  => self::TRACKS[$track]['title'],
                'certificate_number' => $this->generateCertificateNumber($track),
                'issued_at'          => now(),
                'pdf_path'           => null,
            ]);
        });

        // Generate the PDF only if it isn't already present on disk.
        $this->ensurePdf($certificate, $user);

        return $certificate->refresh();
    }

    /**
     * Generate and store the PDF for a certificate unless it already exists.
     * Returns the storage-relative path.
     */
    public function ensurePdf(LearningCertificate $certificate, ?User $user = null): string
    {
        $path = "certificates/{$certificate->user_id}/{$certificate->track}.pdf";

        if ($certificate->pdf_path && Storage::disk('public')->exists($certificate->pdf_path)) {
            return $certificate->pdf_path;
        }

        if (Storage::disk('public')->exists($path)) {
            if ($certificate->pdf_path !== $path) {
                $certificate->update(['pdf_path' => $path]);
            }
            return $path;
        }

        $user = $user ?: $certificate->user;
        $theme = self::TRACKS[$certificate->track]['theme'];
        $logoPath = public_path('certificate-assets/logo.png');
        $logoData = is_file($logoPath)
            ? 'data:image/png;base64,' . base64_encode(file_get_contents($logoPath))
            : null;

        $pdf = Pdf::loadView('certificates.template', [
            'fullName'   => $user->name ?? 'AMUDUX Learner',
            'title'      => $certificate->certificate_title,
            'trackLabel' => self::TRACKS[$certificate->track]['label'],
            'number'     => $certificate->certificate_number,
            'issuedAt'   => $certificate->issued_at,
            'theme'      => $theme,
            'logoData'   => $logoData,
        ])->setPaper('a4', 'landscape');

        Storage::disk('public')->put($path, $pdf->output());

        $certificate->update(['pdf_path' => $path]);

        return $path;
    }

    /**
     * Build a unique certificate number, e.g. AMUDUX-DRJ-2026-8F3A1C.
     */
    private function generateCertificateNumber(string $track): string
    {
        $code = self::TRACKS[$track]['code'];
        $year = now()->format('Y');

        do {
            $suffix = strtoupper(Str::random(6));
            $number = "AMUDUX-{$code}-{$year}-{$suffix}";
        } while (LearningCertificate::where('certificate_number', $number)->exists());

        return $number;
    }
}
