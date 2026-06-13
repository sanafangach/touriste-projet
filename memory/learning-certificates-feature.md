---
name: learning-certificates-feature
description: AMUDUX Apprendre learning-certificate feature — where it lives and how completion/PDF work
metadata:
  type: project
---

The Apprendre **learning certificate** feature (added 2026-06-10) issues one PDF certificate per user per fully-completed track (darija / tifinagh / culture).

**Key pieces:**
- Migration `learning_certificates` — unique(`user_id`,`track`) + unique `certificate_number`; no FK (MyISAM `users`, see [[db-environment-quirks]]).
- `app/Services/CertificateService.php` — single source of truth: `TRACKS` whitelist (titles, codes, themes), `isTrackCompleted()` (uses `COUNT(DISTINCT mission_number)` because of duplicate seed rows), `issueIfEligible()` (idempotent, never regenerates), `ensurePdf()` (dompdf → `storage/app/public/certificates/{user_id}/{track}.pdf`).
- `CertificateController` — `GET /api/apprendre/certificates` (lazily issues + lists) and `GET /api/apprendre/certificates/{track}/download` (auth-scoped stream; 404 if not owner's). Both inside the `auth:sanctum` + `apprendre` route group.
- PDF template: `resources/views/certificates/template.blade.php` (A4 landscape, dompdf-safe absolute layout). Logo at `backend/public/certificate-assets/logo.png`.
- Frontend: `frontend/src/components/learn/common/MyCertificates.jsx` rendered as a section in `ApprendreHub.jsx`; styles in `apprendre.css` (`.apprendre-certificate-*`). Download streams a blob through the authed `api` instance.

**How to apply:** generation has TWO triggers — (1) **automatic at completion**: `ApprendreController::storeProgress()` calls `issueIfEligible()` after saving each mission (added 2026-06-10 to fix "certificates not generating"; wrapped in try/catch so it can never break progress saving), and (2) **lazy on GET /certificates** (and self-heals on download) as a safety net. Both use the same idempotent service, so no duplicates. PDF lib is `barryvdh/laravel-dompdf`. Requires `php artisan storage:link`.
