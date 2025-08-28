#!/bin/bash

# RGXMods YouTube Ad Skipper Installer

# Define the installation directory
INSTALL_DIR="$HOME/.local/share/rgxmods-youtube-ad-skipper"

# Create the installation directory
echo "Creating installation directory at $INSTALL_DIR..."
mkdir -p "$INSTALL_DIR"

# Copy the extension files
echo "Copying extension files..."
cp -r manifest.json background.js content.js icons "$INSTALL_DIR/"

# Provide instructions
echo ""
echo "---------------------------------------------------"
echo "RGXMods YouTube Ad Skipper has been installed to:"
echo "$INSTALL_DIR"
echo "---------------------------------------------------"
echo ""
echo "To complete the installation, please follow these steps:"
echo "1. Open Microsoft Edge and navigate to: edge://extensions"
echo "2. Enable 'Developer mode' in the bottom-left corner."
echo "3. Click 'Load unpacked'."
echo "4. Select the installation directory: $INSTALL_DIR"
echo ""

# Open Edge to the extensions page
if command -v xdg-open >/dev/null 2>&1; then
    echo "Opening edge://extensions for you..."
    xdg-open "edge://extensions" >/dev/null 2>&1
fi

echo "Installation helper script finished."
