# Wordle Archive Navigation

A Chrome extension that adds previous and next day controls to the New York Times Wordle archive.

This is an unofficial extension and is not affiliated with The New York Times.

## Local installation

1. Open `chrome://extensions` in Chrome.
2. Enable **Developer mode**.
3. Select **Load unpacked**.
4. Choose this directory.

The extension runs only on New York Times Wordle pages. It does not collect, store, or transmit user data.

## Package

Upload `dist/wordle-archive-navigation-1.0.0.zip` to the Chrome Web Store Developer Dashboard. The ZIP contains the manifest, content script, stylesheet, and extension icons.

Store listing artwork and paste-ready submission text are in `store-assets/` and `STORE_LISTING.md`. The canonical logo source is `store-assets/logo-source.svg`. These files are not included in the extension ZIP.

## Privacy

Wordle Archive Navigation reads the current Wordle page address locally to calculate adjacent dates. It does not collect, store, or transmit user data. See `PRIVACY.md` for the full privacy policy.
