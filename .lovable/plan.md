
## File System Reveal Screen — Plan

### What's Changing

After the correct password (3025) is entered, instead of showing a single image, the user will see a dark escape-room themed **file system / explorer interface** with 4 files:

- **17**
- **19**
- **23**
- **29**

Clicking any file opens that file's specific image in a full-screen lightbox view. Each file needs its own uploaded image (4 total). The user will need to upload the 4 images — one for each file — in the next step.

---

### Plan

**Phase 1 — Image Placeholders**

- Add 4 placeholder image slots in `src/assets/`:
  - `file-17.jpg`
  - `file-19.jpg`
  - `file-23.jpg`
  - `file-29.jpg`
- These will be replaced once the user uploads the actual images.

**Phase 2 — File System UI (replaces the reveal screen)**

Update `src/pages/Index.tsx` to:

1. Replace the single `showReveal` state with a two-step state:
   - `showFileSystem` — shows the 4-file explorer grid
   - `openFile` — stores which file (17/19/23/29) is currently open (`null` = none open)

2. Build the **File System Screen** — a dark panel styled like a vintage terminal/file explorer:
   - Header bar: `[CLASSIFIED FILES]` with a close/lock icon
   - 4 file icons arranged in a 2x2 grid
   - Each file shows a folder/document icon and its number name (17, 19, 23, 29)
   - Hover effect with amber glow (matching the existing escape room theme)
   - Clicking a file opens its image in a lightbox

3. Build the **Lightbox/Image Viewer**:
   - Full-screen dark overlay
   - Centered image display
   - File name label at top (e.g. `FILE_17`)
   - "← Back to files" button to return to the file system
   - Click outside image also closes

4. Keep the "tap to lock again" functionality — clicking the close button on the file system returns to the locked state.

**Phase 3 — Styling**

Add new CSS classes to `src/index.css`:

- `.file-system-screen` — full-screen dark terminal container
- `.file-explorer-panel` — styled panel with amber border/glow
- `.file-grid` — 2x2 grid layout
- `.file-item` — individual file icon button with hover animations
- `.file-icon` — large icon (folder or document emoji styled with amber glow)
- `.file-name` — styled filename text
- `.lightbox-overlay` — full-screen dimmed background
- `.lightbox-image` — centered image with border/glow

---

### State Flow

```text
Password entered → [Unlock animation]
        ↓
File System Screen (4 files visible)
        ↓ (click a file)
Lightbox (image for that file shown)
        ↓ (click Back or outside)
File System Screen
        ↓ (click Lock icon / close)
Lock Screen (reset)
```

---

### User Action Required

After approving this plan, please upload the 4 images in the next message — one for each file. Label them clearly (e.g. "image for file 17", "image for file 19", etc.) so I can assign each one correctly. They can be JPG, PNG, or WEBP.

---

### Files to Modify

| File | Change |
|---|---|
| `src/pages/Index.tsx` | Replace single reveal with file system + lightbox UI |
| `src/index.css` | Add file system, file item, and lightbox styles |
| `src/assets/` | Add 4 image files (after upload) |
