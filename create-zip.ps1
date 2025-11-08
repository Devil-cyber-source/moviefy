# Moviefy Project - Create Zip File
# This script creates a zip file excluding node_modules and other unnecessary files

Write-Host "🎬 Creating Moviefy Project Zip File..." -ForegroundColor Cyan
Write-Host ""

# Define what to exclude
$excludePatterns = @(
    'node_modules',
    'dist',
    '.git',
    '.vscode',
    '*.log',
    '.DS_Store',
    'Thumbs.db'
)

# Get current directory name for zip file
$projectName = Split-Path -Leaf (Get-Location)
$zipFileName = "$projectName-moviefy.zip"

# Remove old zip if exists
if (Test-Path $zipFileName) {
    Remove-Item $zipFileName -Force
    Write-Host "🗑️  Removed old zip file" -ForegroundColor Yellow
}

Write-Host "📦 Collecting files..." -ForegroundColor Green

# Get all files excluding patterns
$allFiles = Get-ChildItem -Path . -Recurse -File | Where-Object {
    $file = $_
    $shouldInclude = $true
    
    foreach ($pattern in $excludePatterns) {
        if ($file.FullName -like "*\$pattern\*" -or $file.Name -like $pattern) {
            $shouldInclude = $false
            break
        }
    }
    
    $shouldInclude
}

Write-Host "📊 Found $($allFiles.Count) files to include" -ForegroundColor Green
Write-Host ""
Write-Host "🔨 Creating zip file: $zipFileName" -ForegroundColor Cyan

# Create temporary directory structure
$tempDir = Join-Path $env:TEMP "moviefy-temp"
if (Test-Path $tempDir) {
    Remove-Item $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

# Copy files maintaining structure
foreach ($file in $allFiles) {
    $relativePath = $file.FullName.Substring((Get-Location).Path.Length + 1)
    $destPath = Join-Path $tempDir $relativePath
    $destDir = Split-Path $destPath -Parent
    
    if (-not (Test-Path $destDir)) {
        New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    }
    
    Copy-Item $file.FullName -Destination $destPath -Force
}

# Create zip
Compress-Archive -Path "$tempDir\*" -DestinationPath $zipFileName -Force

# Cleanup
Remove-Item $tempDir -Recurse -Force

# Get zip file size
$zipSize = (Get-Item $zipFileName).Length / 1MB

Write-Host ""
Write-Host "✅ Success! Zip file created:" -ForegroundColor Green
Write-Host "   📁 File: $zipFileName" -ForegroundColor White
Write-Host "   📊 Size: $([math]::Round($zipSize, 2)) MB" -ForegroundColor White
Write-Host ""
Write-Host "🎉 Your Moviefy project is ready to share!" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 To use in VS Code:" -ForegroundColor Yellow
Write-Host "   1. Extract the zip file" -ForegroundColor White
Write-Host "   2. Open folder in VS Code" -ForegroundColor White
Write-Host "   3. Run: npm install" -ForegroundColor White
Write-Host "   4. Run: npm run dev" -ForegroundColor White
Write-Host ""

# Open folder containing zip
Start-Process explorer.exe -ArgumentList "/select,`"$((Get-Location).Path)\$zipFileName`""
