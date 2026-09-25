# Removes old JavaScript source files that have been replaced by TypeScript equivalents.
# Run from the repo root: .\cleanup.ps1

$ErrorActionPreference = "Stop"

$backendRoot = Join-Path $PSScriptRoot "backend"
$adminRoot   = Join-Path $PSScriptRoot "admin"

# ── Backend: all .js files that have .ts counterparts ────────────────────────
$backendFiles = @(
  "server.js"
  "src\app.js"
  "src\config\prisma.js"
  "src\config\supabase.js"
  "src\config\database.js"
  "src\middleware\auth.js"
  "src\middleware\errorHandler.js"
  "src\middleware\upload.js"
  "src\controllers\authController.js"
  "src\controllers\blogController.js"
  "src\controllers\testimonialsController.js"
  "src\controllers\contactController.js"
  "src\controllers\newsletterController.js"
  "src\controllers\integrationsController.js"
  "src\controllers\featuresController.js"
  "src\controllers\useCasesController.js"
  "src\controllers\healthCheckController.js"
  "src\controllers\analyticsController.js"
  "src\controllers\usersController.js"
  "src\routes\auth.js"
  "src\routes\blog.js"
  "src\routes\testimonials.js"
  "src\routes\contact.js"
  "src\routes\newsletter.js"
  "src\routes\integrations.js"
  "src\routes\features.js"
  "src\routes\useCases.js"
  "src\routes\healthCheck.js"
  "src\routes\analytics.js"
  "src\routes\users.js"
  "src\routes\upload.js"
  "src\utils\email.js"
  "src\utils\seeder.js"
)

# Mongoose model files (replaced entirely by Prisma schema — no .ts equivalent needed)
$backendModels = Get-ChildItem -Path (Join-Path $backendRoot "src\models") -Filter "*.js" -ErrorAction SilentlyContinue

Write-Host "`n=== Backend JS files ===" -ForegroundColor Cyan
foreach ($rel in $backendFiles) {
  $full = Join-Path $backendRoot $rel
  if (Test-Path $full) {
    Remove-Item $full -Force
    Write-Host "  deleted  $rel" -ForegroundColor Green
  } else {
    Write-Host "  missing  $rel" -ForegroundColor Yellow
  }
}

if ($backendModels) {
  Write-Host "`n=== Backend Mongoose models ===" -ForegroundColor Cyan
  foreach ($f in $backendModels) {
    Remove-Item $f.FullName -Force
    Write-Host "  deleted  src\models\$($f.Name)" -ForegroundColor Green
  }
  # Remove empty models dir
  $modelsDir = Join-Path $backendRoot "src\models"
  if ((Get-ChildItem $modelsDir -ErrorAction SilentlyContinue | Measure-Object).Count -eq 0) {
    Remove-Item $modelsDir -Force
    Write-Host "  removed  src\models\" -ForegroundColor Green
  }
}

# ── Admin: .jsx files replaced by .tsx, plus api.js and vite.config.js ───────
$adminFiles = @(
  "vite.config.js"
  "src\services\api.js"
  "src\main.jsx"
  "src\App.jsx"
  "src\contexts\AuthContext.jsx"
  "src\components\ProtectedRoute.jsx"
  "src\components\Sidebar.jsx"
  "src\components\Header.jsx"
  "src\components\Layout.jsx"
  "src\components\StatCard.jsx"
  "src\components\Modal.jsx"
  "src\components\DataTable.jsx"
  "src\components\ConfirmDialog.jsx"
  "src\pages\Login.jsx"
  "src\pages\Dashboard.jsx"
  "src\pages\Analytics.jsx"
  "src\pages\blog\BlogList.jsx"
  "src\pages\blog\BlogEditor.jsx"
  "src\pages\testimonials\TestimonialList.jsx"
  "src\pages\integrations\IntegrationList.jsx"
  "src\pages\features\FeatureList.jsx"
  "src\pages\usecases\UseCaseList.jsx"
  "src\pages\contacts\ContactList.jsx"
  "src\pages\newsletter\NewsletterList.jsx"
  "src\pages\healthcheck\HealthCheckList.jsx"
  "src\pages\users\UserList.jsx"
)

Write-Host "`n=== Admin JS/JSX files ===" -ForegroundColor Cyan
foreach ($rel in $adminFiles) {
  $full = Join-Path $adminRoot $rel
  if (Test-Path $full) {
    Remove-Item $full -Force
    Write-Host "  deleted  $rel" -ForegroundColor Green
  } else {
    Write-Host "  missing  $rel" -ForegroundColor Yellow
  }
}

Write-Host "`nCleanup complete." -ForegroundColor Cyan
