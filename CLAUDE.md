# Freezr — Project Memory (CLAUDE.md)

Freezr is a household shared freezer inventory app. Scan a barcode to add/remove items, synced in real time across everyone in the household. Built entirely as a single-page static web app (PWA) — no backend server of its own.

## Architecture

- **`index.html`** — the entire app. Vanilla JS (no framework, no build step), inline CSS, one big IIFE. Deliberately kept as a single file for simplicity — this is a small household tool, not a large codebase.
- **Storage/sync:** Firebase Firestore (`freezer/inventory` document), using the Firebase v10.7.1 **compat** SDK loaded via `<script>` tags from `www.gstatic.com` (not npm — no build step exists). Real-time sync via `onSnapshot`. No user auth — Firestore security rules are intentionally open (`allow read, write: if true`, scoped to the `freezer` collection only) since this is a private household tool with no login system.
- **Barcode scanning:** QuaggaJS (`quagga.min.js` from cdnjs) for live camera scanning, plus a photo-based fallback (`Quagga.decodeSingle` on a photo taken via the native camera app through a file input with `capture="environment"`) — the photo path exists specifically because live browser camera focus/torch control is unreliable across devices (especially iOS Safari), and the native camera app doesn't have that problem.
- **PWA setup:** `manifest.json`, `service-worker.js`, and icon files (`icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `favicon.png`) make it installable to the home screen on both Android and iOS.
- **Hosting:** GitHub Pages, static files only, no CI/build pipeline. Deploys are just committing files to the repo root.

## Important design decisions (don't "fix" these — they're deliberate)

- **`service-worker.js` is intentionally a no-op** — it registers a `fetch` listener but never calls `respondWith()`. This exists purely to satisfy Android's install criteria. It does NOT cache anything, on purpose: aggressive caching previously caused stale-version bugs, and since the app is useless offline anyway (needs live Firestore), there's no upside to caching.
- **Data model:** `state.items` is a flat array of individual unit records (`{id, barcode, name, dateAdded, opened}`), NOT pre-grouped by quantity. The UI groups same barcode+name into one row with a "×N" badge at render time (`groupItems()`), but removal/quantity operations always work FIFO against the oldest individual unit. This was a deliberate choice to keep removal logic simple and consistent.
- **The item detail popup uses staged edits.** Name, quantity, and opened/sealed status are all held in local variables (`pendingQty`, `pendingOpened`, the name input's value) and only committed to `state.items` when Save is tapped. Close/✕ discards everything. This was a bug fix — quantity used to apply live immediately while name didn't, which was confusing and got explicitly fixed.
- **Opened/sealed status applies to the *oldest* unit in a group**, not per-unit, since the UI only exposes one toggle per grouped row. Documented simplification, not a bug.
- **Versioning scheme (semantic, restarted from 1.0.0):** `x.0.0` = major (genuinely new features/pages), `1.x.0` = minor (batches of smaller additions), `1.0.x` = patch (tiny fixes/tweaks). The version number is hardcoded in the footer of `index.html` and must be bumped by hand with every change. Full history lives in `CHANGELOG.txt` — update both together, every time.
- **Icons must be full-bleed square PNGs with square corners in the source file** — never round the corners yourself. iOS/Android apply their own mask on top, so a pre-rounded icon causes double-rounding/white-sliver artifacts. Learned this the hard way.
- **Firebase web API keys are not secret** — they're meant to be public in client-side code. Security comes from Firestore rules, not from hiding the key. The GitHub repo is public and that's fine.

## Known issues (unresolved, don't re-litigate without new info)

- **Safari Share-button JS error:** tapping the native iOS Share icon sometimes triggers a generic, detail-free "Script error." in the page's error banner. Extensively debugged (ruled out the async Firestore render path, ruled out the service worker) — it's very likely an opaque/masked error from something Safari itself does internally (e.g. generating the share preview), not app code. Doesn't affect any real functionality. Worth revisiting only with real Safari devtools access (e.g. via a Mac), not by guessing blind again.
- **Camera focus on some Android devices** can be unreliable through the browser (this is *why* the photo-scan fallback exists). Native camera APIs (if this ever becomes a Capacitor-wrapped native app) would likely fix this properly.

## Possible future direction: native app packaging

If this ever needs to go on the Play Store / App Store, the current architecture carries over directly — no rewrite needed:
- **Android:** Trusted Web Activity (Google's official PWA→Play Store path), lightweight.
- **iOS:** Capacitor wrapper + Apple Developer account + App Store review. Would also likely fix the camera focus/torch limitations above via native camera APIs.
This isn't being actively pursued — just documented so it's not forgotten as an option.

## Working conventions

- Keep everything in as few files as practical. Don't introduce a build step/bundler/framework without a strong reason — this is meant to stay simple enough for a non-developer to redeploy by hand if needed.
- Bump the version number + `CHANGELOG.txt` with every change, however small.
- See `freezr-app-ideas.md` in this repo for the full backlog of planned/considered features (organized into Done / Known issues / Organisation / Bigger features / Ideas). Check it before assuming something hasn't been discussed.
