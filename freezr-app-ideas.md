# Freezr — Idea Backlog

Running list of possible improvements. Nothing here is built yet unless marked ✅ — just parked for whenever you're ready to tackle a batch.

## ✅ Done
- **Quantity instead of duplicate rows** — same barcode+name now groups into one row with a "×N" badge.
- **Stock quantity toggle** — +/− stepper in the item detail popup to bump quantity without rescanning.
- **Undo after removing/deleting** — "Undo" button on the removal toast.
- **Edit an item's name** — now via the full item detail popup (tap any row, or the ✎ icon).
- **Flash/torch toggle** — 🔦 button on the camera view when the device supports it.
- **Frozen duration** — friendly "X years, Y months" duration shown in the item detail popup, based on the oldest unit.
- **Item detail popup** — tap any item for name edit, quantity, add date, duration, and full removal in one place.
- **Sync status indicator** — pill in the header showing Connecting / Synced / Sync failed.
- **Export/backup button** — ⬇️ button downloads inventory as a JSON file.
- **Batch scan mode** — toggle to scan a stack of barcodes uninterrupted, then name/confirm them all in one review screen.
- **Opened / sealed toggle** — staged toggle in the item detail popup, shown as a badge on the list (applies to the oldest unit in a group).
- **Categories or shelf tags** — every item has a category, shown on the list and searchable.
- **AI-generated category tags** — category is auto-suggested from the product name via keyword matching, editable before saving (and learned per barcode, same as the item name).
- **Editable category list** — a Categories page (Settings tab) to rename, add, or delete categories at any time, drag-to-reorder them, and duplicate names are blocked. Currently open to anyone; not yet locked to an administrator.
- **Category colours** — each category has a colour chosen from a 24-swatch preset palette (so it's always re-selectable later), shown as a coloured pill on list rows and category tiles, and as tappable chips when picking a category. New categories default to grey.
- **Settings page** — bottom tab navigation (Freezr / Settings), with Categories and Appearance living there. Built to make room for more settings later.
- **Dark/light mode** — appearance setting (Settings tab) for Dark, Light, or Match device. Defaults to dark, stored per-device.
- **Browse by category** — a tile view (▦ button) showing item counts per category, tap through to a filtered list, with a Back button.
- **Tidier item rows** — removed the barcode number and the small ✕ delete button from list rows (barcode still shown in the item detail popup; delete still available there too).

## Known issues (parked for later investigation)
- **Safari Share button JS error** — tapping the native Share icon on iPhone triggers a generic, detail-free "Script error." banner. Traced as far as possible without real browser devtools — doesn't affect any real functionality. Worth a proper look if we ever get access to real Safari devtools.

## Organisation
- **Weight column** — e.g. distinguishing 500g vs 250g mince. Auto-fill from barcode/product lookup where available, otherwise manually entered.
- **"Who added it" attribution** — ask each household member's name once per device, tag it on items so you know who put what in.

## Bigger features
- **Historical log** — a record of items that used to be in the freezer but were removed (separate from the live inventory view), so you can look back at what's been used.
- **Shopping list tab** — a third bottom tab (alongside Freezr and Settings) for a shopping list. When removing an item from the freezer, offer the option to add it to the shopping list.
- **Multiple freezers** — manage more than one freezer (e.g. garage chest freezer + kitchen freezer) via a settings page where you can add/delete/name freezers, and items get assigned to one. In future, this could be locked to a specific administrator user, same as categories above.
- **Receipt scanning (mass import)** — scan a shopping receipt, extract the list of product names from it, then choose which ones to add to the freezer in one go.
- **Package as a real app (Play Store / App Store)** — wrap the existing web app natively via Trusted Web Activity (Android, lightweight) and/or Capacitor (iOS, needs Apple Developer account + review). Would likely also fix the camera focus/torch quirks we've hit, since native camera APIs are far more capable than what a browser can do. Not urgent — the current PWA architecture carries over directly whenever this gets tackled, so no need to prepare for it now.

## Ideas from Claude
- ~~Use-by / expiry tracking~~ — **not wanted for now** (frozen food doesn't really need this tracked); may reconsider in future.
- **User roles / permissions** — a general system underpinning the "locked to an administrator" idea mentioned above for both freezers and categories.
- **Custom labels for unlabeled homemade items** — generate a printable barcode/label for freezer bags with no barcode of their own (e.g. homemade soup, batch-cooked meals).
- **"What's about to go off" / low-stock nudge** — a lightweight notification or highlighted section for items that have been frozen a long time.

---
*Add to this list any time — just tell Claude "add X to the idea list" and ask it to update this file.*
