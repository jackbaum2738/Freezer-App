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
- **"Who added it" attribution** — a required name prompt on first open (can't be dismissed without entering a name), stored per-device like the theme preference. Shown as "Added by" in the item detail popup only (not on list rows, not filterable/searchable). Editable anytime via a "Your name" field in Settings; changing it relabels items previously logged under the old name.
- **Weight field** — a number + unit dropdown (g/kg/ml/l/oz/lb) on the add-item and item detail screens, learned per barcode like name/category, with a best-effort default from OpenFoodFacts on a new barcode. The unit dropdown also offers "Small container"/"Large container" for homemade items with no real measurement, which hides the number field.
- **Multiple freezers** — a "Freezers" page in Settings to add/rename/remove freezers (unique names, always at least one). Ships with just one by default and nothing changes until a second is added; once it is, a Freezer field (tappable pill + picker sheet) appears on the add-item screen and always shows in the item detail popup (fixed pill with one freezer, pill + picker with more). Deleting a freezer clears its items' Freezer field to "not set" unless it's the second-to-last, in which case they move to the one remaining freezer.
- **Filter the inventory list by category and freezer** — pills above the list (Category always, Freezer only once a second one exists) open the same picker-sheet pattern as elsewhere, with an "All" option; both combine with each other and with the search box. The existing "Browse by category" tile view is separate and unaffected.
- **Historical log** — a 🕘 button opens a separate view of every unit that's left the freezer (scan-to-remove, "Remove from Freezr", or a quantity step-down), with a snapshot of its name/category/weight/freezer, when/who removed it, and how long it was frozen. Same search + filter pills as the main list. Each row has a re-add-to-freezer button (restocks the full quantity in one tap) and a remove-from-history button (soft-delete with Undo). Undoing the original removal un-logs it too.
- **Freezr households (multi-household support)** — separate households now use the app with entirely separate data, via a join code. A mandatory first-run screen (before the name prompt) offers "Join a Freezr" (enter a code) or "Create a Freezr" (generates one, seeds default categories/one freezer, shows the code). The code is a memorable two-word pair (e.g. `FROSTY-OTTER`), stored per-device like the theme/name. Each Freezr lives in its own Firestore document (`freezrs/{code}`) instead of the old single shared `freezer/inventory` doc. Settings has a new "Freezr" block showing the code plus a Share button (OS share sheet, or copies a WhatsApp-friendly invite message with the code + install link).
- **Install gate** — opening Freezr in a regular browser tab (not installed to the home screen) now shows a full-screen, unskippable install-instructions screen instead of the app itself — approximates what a real app-store app would feel like, since a browser tab was never really usable anyway (no offline support, easy to lose track of). Platform-specific: numbered Share → Add to Home Screen steps on iOS (no install API exists there), Chrome's ⋮ menu steps on Android (or a one-tap native Install button when `beforeinstallprompt` is available), and a simple "open this on your phone" message on desktop. Detected via `display-mode: standalone` / `navigator.standalone`, so already-installed users never see it.
- **Freezr switcher** — every Freezr ever joined or created on a device is now saved locally, and a "Switch" button in Settings opens a list to jump between them without re-entering a code (e.g. a uni student swapping between their uni freezer and home freezer on weekends). The active one is checkmarked; others have a remove button that forgets them from just that device (soft-delete with Undo — the Freezr and its data aren't touched). Creating a Freezr now asks for a name first, shown everywhere the code is (Settings, the switcher, the code-reveal screen) so multiple Freezrs are easy to tell apart. Adding another Freezr from the switcher reuses the same onboarding screens as first-run, just with a close button since it's optional.
- **Manual entry now takes a name, not a barcode** — the Add screen's manual-entry field used to expect a typed-in barcode number, which nobody realistically has memorised. It now takes the item's name directly and opens the same "Confirm item" modal used for scans, saving the item with a blank barcode (and skipping the per-barcode "remember for next time" list, since there's no barcode to key it on). The equivalent field was removed from Remove mode entirely — removing an item without a barcode is done by finding it in the list and using the remove button there.

## Known issues (parked for later investigation)
- **Safari Share button JS error** — tapping the native Share icon on iPhone triggers a generic, detail-free "Script error." banner. Traced as far as possible without real browser devtools — doesn't affect any real functionality. Worth a proper look if we ever get access to real Safari devtools.

## Bigger features
- **Shopping list tab** — a third bottom tab (alongside Freezr and Settings) for a shopping list. When removing an item from the freezer, offer the option to add it to the shopping list.
- **Receipt scanning (mass import)** — scan a shopping receipt, extract the list of product names from it, then choose which ones to add to the freezer in one go.
- **Package as a real app (Play Store / App Store)** — wrap the existing web app natively via Trusted Web Activity (Android, lightweight) and/or Capacitor (iOS, needs Apple Developer account + review). Would likely also fix the camera focus/torch quirks we've hit, since native camera APIs are far more capable than what a browser can do. Not urgent — the current PWA architecture carries over directly whenever this gets tackled, so no need to prepare for it now.
- **First-time onboarding tour** — a short walkthrough shown the first time someone installs/opens the app, explaining how it works. The join/create-a-Freezr step and the name prompt already run first (see "Freezr households" above) — this would be a further explanatory tour of the app's features layered on top of those.

## Ideas from Claude
- ~~Use-by / expiry tracking~~ — **not wanted for now** (frozen food doesn't really need this tracked); may reconsider in future.
- **User roles / permissions** — a general system for locking things like categories or freezer management to a specific administrator user (currently open to anyone).
- **Custom labels for unlabeled homemade items** — generate a printable barcode/label for freezer bags with no barcode of their own (e.g. homemade soup, batch-cooked meals).
- **"What's about to go off" / low-stock nudge** — a lightweight notification or highlighted section for items that have been frozen a long time. Low priority — not next up.

---
*Add to this list any time — just tell Claude "add X to the idea list" and ask it to update this file.*
