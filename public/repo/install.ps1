<#
.SYNOPSIS
    XyPriss CLI Native Installer (Windows)
    Version: 1.0.0
#>

param (
    [Parameter(Mandatory=$false)]
    [ValidateSet("install", "uninstall")]
    [string]$Action = "install"
)

$ErrorActionPreference = "Stop"

# Colors
$Green = "Green"
$Blue = "Cyan"
$Yellow = "Yellow"
$Red = "Red"

function Write-Log($msg) { Write-Host "[*] $msg" -ForegroundColor $Blue }
function Write-Success($msg) { Write-Host "[+] $msg" -ForegroundColor $Green }
function Write-ErrorMsg($msg) { Write-Host "[-] Error: $msg" -ForegroundColor $Red }

$UserHome = if ($env:USERPROFILE) { $env:USERPROFILE } else { $HOME }
$InstallRootDir = Join-Path $UserHome ".xypriss"
$BinDir = Join-Path $InstallRootDir "bin"
# $BridgeUrl = "https://dll.nehonix.com/repo/n/xypriss/xfpm/scripts/bridge.js"
$BridgeUrl = "https://xypriss.nehonix.com/repo/bridge.js"
$Bins = @("xfpm.exe", "xyp.exe", "xypcli.exe")

function Check-Node {
    try {
        node -v | Out-Null
    } catch {
        Write-ErrorMsg "Node.js is required. Please install Node.js and try again."
        exit 1
    }
}

function Add-To-Path($PathToAdd) {
    $UserPath = [Environment]::GetEnvironmentVariable("Path", "User")
    if ($UserPath -notlike "*$PathToAdd*") {
        Write-Log "Adding XyPriss to USER PATH..."
        [Environment]::SetEnvironmentVariable("Path", "$UserPath;$PathToAdd", "User")
        $env:Path += ";$PathToAdd"
    }
}

function Uninstall {
    Write-Log "Initiating uninstallation sequence..."
    if (Test-Path $InstallRootDir) {
        Write-Log "Removing XyPriss system files..."
        Remove-Item -Recurse -Force $InstallRootDir
    }
    Write-Success "XyPriss CLI has been successfully removed."
}

function Install {
    Check-Node
    
    # Check existing
    $Existing = @()
    foreach ($bin in $Bins) {
        if (Test-Path (Join-Path $BinDir $bin)) { $Existing += $bin }
    }

    if ($Existing.Count -gt 0) {
        Write-Host "[!] Warning: Existing XyPriss components found: $($Existing -join ', ')" -ForegroundColor Yellow
        
        $Confirm = $null
        if ($Host.UI.RawUI -ne $null) {
            $Confirm = Read-Host "    Do you want to update/overwrite them? (y/N)"
        } else {
            Write-Log "Non-interactive environment detected. Proceeding with clean update..."
            $Confirm = "y"
        }

        if ($Confirm -ne "y" -and $Confirm -ne "Y") {
            Write-Log "Installation cancelled."
            exit 0
        }

        # Explicit cleanup as requested
        Write-Log "Cleaning up old components..."
        foreach ($bin in $Bins) {
            $binPath = Join-Path $BinDir $bin
            if (Test-Path $binPath) { Remove-Item -Force $binPath }
        }
    }

    if (-not (Test-Path $BinDir)) {
        New-Item -ItemType Directory -Force -Path $BinDir | Out-Null
    }
    
    $TmpName = "xyp-install-$([Guid]::NewGuid().ToString().Substring(0,8))"
    $TmpDir = Join-Path ([System.IO.Path]::GetTempPath()) $TmpName
    
    if (-not (Test-Path $TmpDir)) {
        New-Item -ItemType Directory -Path $TmpDir -Force | Out-Null
    }
    
    if (-not (Test-Path $TmpDir)) {
        Write-ErrorMsg "Failed to create temporary directory: $TmpDir"
        exit 1
    }

    Set-Location -LiteralPath "$TmpDir"
    
    Write-Log "Fetching XFPM bridge logic..."
    Invoke-WebRequest -Uri $BridgeUrl -OutFile "bridge.js"
    
    Write-Log "Executing neural download sequence..."
    node bridge.js
    
    if (Test-Path "xfpm.exe") {
        Write-Log "Installing core engine to $BinDir..."
        Move-Item -Force "xfpm.exe" (Join-Path $BinDir "xfpm.exe")
        
        Write-Log "Creating system aliases: xyp, xypcli"
        Copy-Item -Force (Join-Path $BinDir "xfpm.exe") (Join-Path $BinDir "xyp.exe")
        Copy-Item -Force (Join-Path $BinDir "xfpm.exe") (Join-Path $BinDir "xypcli.exe")
        
        Add-To-Path $BinDir
        
        Write-Success "XyPriss CLI Installation Complete!"
        Write-Host "`nNB: You may need to restart your terminal to use 'xyp' command.`n" -ForegroundColor $Yellow
    } else {
        Write-ErrorMsg "Failed to generate binary. Sequence aborted."
        exit 1
    }
    
    Set-Location $UserHome
    Remove-Item -Recurse -Force "$TmpDir" -ErrorAction SilentlyContinue
}

if ($Action -eq "uninstall") {
    Uninstall
} else {
    Install
}
