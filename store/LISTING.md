# Chrome Web Store submission kit

Everything to paste into the [Developer Dashboard](https://chrome.google.com/webstore/devconsole).

## 0. One-time account setup
- Sign in with your Google account. **2-Step Verification must be on.**
- Pay the one-time $5 registration fee.
- Trader declaration: **Non-trader** (hobby project, no money involved).

## 1. Build the upload zip
```bash
rm -f dist/mampf-enhancer.zip && mkdir -p dist && zip dist/mampf-enhancer.zip manifest.json defaults.js content.js popup.html popup.js icon.png
```
Dashboard → **New item** → upload `dist/mampf-enhancer.zip`.

## 2. Store listing tab
| Field | Value |
|---|---|
| Title / summary | Taken from `manifest.json` (name + description) |
| Category | Education |
| Language | English |
| Store icon | `store/icon.svg` → already in the zip as `icon.png` (128×128) |
| Screenshot | `store/screenshot-1280x800.png` |
| Small promo tile | `store/promo-440x280.png` (optional, but listings without one rank lower) |

**Description:**
```
Unofficial helper for MaMpf, the lecture platform of Heidelberg University's math department.

Change the playback speed of MaMpf lecture videos with your scroll wheel, like the speed controller in Enhancer for YouTube:

• Hover the speed selector in the bottom right of the video player and scroll up or down to change the speed in 0.1x steps.
• Hold Alt while scrolling for fine 0.01x steps.
• Click the extension icon to change both step sizes and the fine-step key (Alt, Ctrl or Shift).

Speeds range from 0.1x to 4x. Every video starts at the normal 1x.

This extension is not affiliated with MaMpf or Heidelberg University. It collects no data and only runs on MaMpf video pages.
```

## 3. Privacy tab
**Single purpose:**
```
Lets users change the playback speed of lecture videos on MaMpf (mampf.mathi.uni-heidelberg.de) by scrolling over the video player's speed selector.
```

**Permission justification, `storage`:**
```
Saves the step sizes and fine-step key the user picks in the popup, so the content script on MaMpf video pages can use them.
```

**Host permission justification** (the content script's `https://mampf.mathi.uni-heidelberg.de/media/*` match):
```
The content script runs only on MaMpf video pages. It listens for scroll events over the player's speed selector and sets the video's playback speed. It does not read page content and sends nothing anywhere.
```

**Remote code:** No, I am not using remote code.

**Data usage:** leave every data-type box **unchecked**. Tick all three certifications. The extension really doesn't collect, sell, or transfer anything.

**Privacy policy URL:** only needed if the dashboard insists. Push `store/PRIVACY.md` to a public GitHub repo and link to it there.

## 4. Distribution tab
- Visibility: **Unlisted** (only people with the link can install it)
- Regions: All regions

## 5. Test instructions tab (important)
Reviewers can't log in to MaMpf with a Heidelberg account, so tell them that up front. Otherwise they may reject it as "functionality not testable":
```
MaMpf requires a Heidelberg University login, so the feature can only be tested on a logged-in MaMpf video page (https://mampf.mathi.uni-heidelberg.de/media/<id>/play). There, hover the speed selector at the bottom right of the video player and scroll: the speed changes in 0.1x steps, or 0.01x while Alt is held. The popup (toolbar icon) changes the step sizes and fine-step key. The screenshot shows the extension working.
```
If they still reject it, attach a short screen recording of you scrolling the speed selector.

## 6. Submit
Click **Submit for review**. Usually takes from a few hours to a few days. After approval, the dashboard shows the install link to share.

## Updates
Bump `version` in `manifest.json` → rebuild the zip (step 1) → Package tab → **Upload new package** → submit. Installed copies update automatically.
