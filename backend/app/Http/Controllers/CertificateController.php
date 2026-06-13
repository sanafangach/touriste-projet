<?php

namespace App\Http\Controllers;

use App\Models\LearningCertificate;
use App\Services\CertificateService;
use Illuminate\Support\Facades\Storage;

class CertificateController extends Controller
{
    public function __construct(private CertificateService $certificates)
    {
    }

    /**
     * List the authenticated user's certificates.
     *
     * Certificates are issued lazily here: any track the user has fully
     * completed (computed from the database) but does not yet have a
     * certificate for is generated now. Already-issued certificates are never
     * regenerated, so refreshing the page never creates a duplicate.
     */
    public function index()
    {
        $user = auth()->user();

        // Evaluate every valid track for eligibility. A failure to generate one
        // certificate must not break listing the others.
        foreach (array_keys(CertificateService::TRACKS) as $track) {
            try {
                $this->certificates->issueIfEligible($user, $track);
            } catch (\Throwable $e) {
                report($e);
            }
        }

        $certificates = LearningCertificate::where('user_id', $user->id)
            ->orderBy('issued_at')
            ->get()
            ->map(function (LearningCertificate $c) {
                return [
                    'track'              => $c->track,
                    'title'              => $c->certificate_title,
                    'certificate_number' => $c->certificate_number,
                    'issued_at'          => $c->issued_at,
                    'download_url'       => url("/api/apprendre/certificates/{$c->track}/download"),
                ];
            });

        return response()->json($certificates);
    }

    /**
     * Stream the authenticated user's certificate PDF for a given track.
     *
     * - 404 if the track is invalid or the user has no certificate for it.
     * - The query is always scoped to the authenticated user, so a user can
     *   only ever download their own certificate.
     */
    public function download(string $track)
    {
        if (!CertificateService::isValidTrack($track)) {
            return response()->json(['message' => 'Invalid track'], 404);
        }

        $user = auth()->user();

        $certificate = LearningCertificate::where('user_id', $user->id)
            ->where('track', $track)
            ->first();

        if (!$certificate) {
            return response()->json(['message' => 'Certificate not found'], 404);
        }

        // Make sure the PDF exists (regenerated only if missing on disk).
        $path = $this->certificates->ensurePdf($certificate, $user);

        if (!Storage::disk('public')->exists($path)) {
            return response()->json(['message' => 'Certificate file unavailable'], 404);
        }

        $filename = 'AMUDUX-' . $certificate->certificate_number . '.pdf';

        return response()->streamDownload(function () use ($path) {
            echo Storage::disk('public')->get($path);
        }, $filename, [
            'Content-Type' => 'application/pdf',
        ]);
    }
}
