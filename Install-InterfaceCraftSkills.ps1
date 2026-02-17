# Install Interface Craft skills (Windows / PowerShell)
# Replaces: curl -sL https://interfacecraft.dev/api/install-skills | bash

$ErrorActionPreference = 'Stop'
$url = 'https://interfacecraft.dev/api/install-skills'
$skillsDir = Join-Path (Join-Path (Join-Path $env:USERPROFILE '.cursor') 'skills') 'interface-craft'

Write-Host 'Downloading install script...' -ForegroundColor Cyan
$scriptContent = Invoke-WebRequest -Uri $url -UseBasicParsing | Select-Object -ExpandProperty Content

# Extract base64 variables: VAR="base64data"
$pattern = '(?m)^(SKILL_md|storyboard_animation_md|dialkit_md|design_critique_md)="([A-Za-z0-9+/=]+)"'
$matches = [regex]::Matches($scriptContent, $pattern)

$fileMap = @{
  'SKILL_md'                 = 'SKILL.md'
  'storyboard_animation_md'   = 'storyboard-animation.md'
  'dialkit_md'               = 'dialkit.md'
  'design_critique_md'       = 'design-critique.md'
}

if (-not (Test-Path $skillsDir)) {
  New-Item -ItemType Directory -Path $skillsDir -Force | Out-Null
}

foreach ($m in $matches) {
  $varName = $m.Groups[1].Value
  $b64 = $m.Groups[2].Value
  $fileName = $fileMap[$varName]
  if (-not $fileName) { continue }
  $outPath = Join-Path $skillsDir $fileName
  try {
    $decoded = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($b64))
    Set-Content -Path $outPath -Value $decoded -Encoding UTF8 -NoNewline
    Write-Host "  Installed: $fileName" -ForegroundColor Green
  } catch {
    Write-Warning "  Skip $fileName : $_"
  }
}

Write-Host "Done. Skills installed to: $skillsDir" -ForegroundColor Green
