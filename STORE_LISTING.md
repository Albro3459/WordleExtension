# Chrome Web Store listing

## Name

Wordle Archive Navigation

## Summary

Adds previous and next day controls to the New York Times Wordle archive.

## Detailed description

Wordle Archive Navigation adds simple previous and next buttons beside the Wordle board, making it easy to move through archived puzzles one day at a time.

The extension handles month, year, and leap-day changes automatically. Navigation stops at the first Wordle and the current day. The controls follow Wordle's light and dark themes and include accessible labels and keyboard focus styles.

Wordle Archive Navigation runs only on New York Times Wordle pages. It has no analytics, ads, accounts, or remote services. It does not collect, store, or transmit user data.

This is an unofficial extension and is not affiliated with The New York Times.

## Suggested category

Games

## Single purpose

Add previous and next day navigation controls to New York Times Wordle archive pages.

## Permissions justification

The extension declares no optional Chrome API permissions. Its only site access is limited to New York Times Wordle pages. This access lets the content script read the current puzzle date, locate the game board, add navigation controls, and keep those controls aligned with the board.

## Remote code

No. All JavaScript and CSS are included in the extension package.

## Data handling

Disclose **Web history** because the current Wordle page address is processed locally to determine the puzzle date. The address is used only for the extension's visible navigation feature. It is not retained, transmitted, sold, or shared.

Certify each required Limited Use statement in the dashboard.

## Test instructions

No account or setup is required. Open a dated Wordle page such as `https://www.nytimes.com/games/wordle/2022-06-18`. Use the circular arrow buttons on either side of the board to move to the previous or next puzzle. On the current day's puzzle, the next button is disabled. On the June 19, 2021 puzzle, the previous button is disabled.

## Listing assets

- Store icon: `store-assets/icon-128.png`
- Screenshot: `store-assets/screenshot-1280x800.png`
- Small promo tile: `store-assets/small-promo-440x280.png`
