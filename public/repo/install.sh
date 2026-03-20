#!/bin/bash

# XyPriss CLI Native Installer (Unix/Linux/macOS)
# Version: 1.0.0

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ACTION=$1
if [ -z "$ACTION" ]; then
    ACTION="install"
fi

INSTALL_DIR="/usr/local/bin"
BINS=("xfpm" "xyp" "xypcli")
# BRIDGE_URL="https://dll.nehonix.com/repo/n/xypriss/xfpm/scripts/bridge.js"
BRIDGE_URL="https://xypriss.nehonix.com/repo/bridge.js"

log() { echo -e "${CYAN}[*] $1${NC}"; }
success() { echo -e "${GREEN}[+] $1${NC}"; }
error() { echo -e "${RED}[-] Error: $1${NC}"; }
warn() { echo -e "${YELLOW}[!] Warning: $1${NC}"; }

check_node() {
    if ! command -v node >/dev/null 2>&1; then
        error "Node.js is required. Please install Node.js and try again."
        exit 1
    fi
}

uninstall() {
    log "Initiating uninstallation sequence..."
    for bin in "${BINS[@]}"; do
        if [ -f "$INSTALL_DIR/$bin" ]; then
            log "Removing: $bin"
            sudo rm -f "$INSTALL_DIR/$bin"
        fi
    done
    success "XyPriss CLI has been successfully removed."
}

install() {
    check_node
    
    # Check if existing
    EXISTING=()
    for bin in "${BINS[@]}"; do
        if [ -f "$INSTALL_DIR/$bin" ]; then
            EXISTING+=("$bin")
        fi
    done

    if [ ${#EXISTING[@]} -gt 0 ]; then
        warn "Existing XyPriss components found: ${EXISTING[*]}"
        
        # Check if stdin is a TTY to allow user input during piped installs
        if [ -t 0 ]; then
            read -p "    Do you want to update/overwrite them? (y/N): " choice < /dev/tty || choice="n"
        else
            # Fallback if tty is not available but we are in a script context
            warn "Non-interactive environment detected. Proceeding with clean update..."
            choice="y"
        fi

        case "$choice" in 
            y|Y ) 
                log "Removing existing binaries..."
                for bin in "${BINS[@]}"; do
                    if [ -f "$INSTALL_DIR/$bin" ]; then
                        sudo rm -f "$INSTALL_DIR/$bin"
                    fi
                done
                ;;
            * ) log "Installation cancelled."; exit 0;;
        esac
    fi

    log "Configuring system for XyPriss core..."
    TMP_DIR=$(mktemp -d)
    cd "$TMP_DIR"
    
    log "Downloading XFPM bridge logic..."
    curl -sL "$BRIDGE_URL" -o bridge.js
    
    log "Executing neural download sequence..."
    node bridge.js
    
    if [ -f "xfpm" ]; then
        log "Installing core engine to $INSTALL_DIR (requires sudo)..."
        sudo mv xfpm "$INSTALL_DIR/xfpm"
        sudo chmod +x "$INSTALL_DIR/xfpm"
        
        log "Creating system aliases: xyp, xypcli"
        sudo ln -sf "$INSTALL_DIR/xfpm" "$INSTALL_DIR/xyp"
        sudo ln -sf "$INSTALL_DIR/xfpm" "$INSTALL_DIR/xypcli"
        
        success "XyPriss CLI Installation Complete!"
        echo -e "${CYAN}Available commands: xfpm, xyp, xypcli${NC}"
    else
        error "Failed to generate binary. Sequence aborted."
        exit 1
    fi
    
    rm -rf "$TMP_DIR"
}

if [ "$ACTION" == "uninstall" ]; then
    uninstall
else
    install
fi
