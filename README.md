# Fullscreen Anything

A modernized Chrome extension that maximizes images, videos, and games in your browser window.

## Description

**Fullscreen Anything** allows any content on your screen to fill the browser window with a single click.

### Features

- Fullscreen images
- Fullscreen videos
- Fullscreen games
- Advertisements are hidden
- Multi-monitor compatible
- Keyboard shortcut: Ctrl+Space

### How to Use

1. Click the **Fullscreen Anything** button (or press Ctrl+Space) to maximize content in your browser
2. Click again to undo and continue browsing

### Benefits

- Content fills the browser window (not the entire screen), allowing you to quickly switch between tabs
- Ideal for multitasking
- Special support for YouTube, video platforms, and social networks
- Compatible with playlists and HTML5 video

---

## Update Information

This is a modernized version of the original **Fullscreen Anything** extension, which was removed from the Chrome Web Store.

### Changes Made (Manifest V3)

- Updated to Manifest V3 (required by Chrome)
- Replaced background.scripts with service_worker
- Updated from browser_action to action
- Manifest V3 compatible permission configuration

## Credits

**Original Author:** Arno van den Brink (Bozozo)  
**Original Publisher:** Chrome Web Store (removed January 9, 2014)  
**Original URL:** https://chromewebstore.google.com/detail/fullscreen-anything/olcfgpmjldkkjdclidhcbonieibfhhdh

This project is a modernization of the original extension to keep it compatible with current Chrome versions.

## Permission Model

### Required Permissions

- activeTab: Access to the current tab only after a user gesture (toolbar click).
- scripting: Programmatic injection of the content script and CSS into the active tab on user gesture.

### Justifications

- ActiveTab: Used strictly after the user clicks the extension’s button. On click, the service worker targets the current tab and triggers the injected content script to toggle a fullscreen-like view of the visible element (image, video, game). Access is limited to that single tab and session, is not persisted, and no page data is collected, stored, or transmitted. The extension does not alter network requests or read credentials; it only applies local CSS/DOM changes in direct response to explicit user action.

- Scripting: Required to programmatically inject a small content script and CSS into the active tab strictly after a user gesture (toolbar click). This avoids broad host permissions and limits scope to the current tab. The injected code performs layout-only operations: it expands the selected element to fill the browser window and hides surrounding UI for a fullscreen-like effect. No remote code is loaded, no eval() is used, and no personal data is read, collected, or sent; the code runs locally and makes no external network requests.

## License

Please consult with the original author for license details.

## Installation

1. Clone this repository
2. Go to chrome://extensions/
3. Enable "Developer mode" (top right corner)
4. Click "Load unpacked"
5. Select this extension folder

## Development

- manifest.json - Extension configuration
- js/background.js - Service Worker (background controller)
- js/content.js - Content script
- css/style.css - Styles
- img/ - Extension icons

---

**Note:** This is an update of the original extension to be compatible with modern Chrome (Manifest V3).
