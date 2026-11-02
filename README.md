# Advanced Python Programming — Interactive RPG Portfolio

A playable top-down pixel-art portfolio world built with React, Vite and a lightweight Canvas renderer. No backend or database is required.

## Run locally
Requires Node.js 18+.
```bash
npm install
npm run dev
```
Open the Vite URL (usually http://localhost:5173).

## Build
```bash
npm run build
npm run preview
```

## Controls
- WASD / Arrow keys: move
- ENTER: explore a nearby building
- M: open/close the world map
- ESC: close a dialogue or map

## Edit activity content
All activities are in `src/data/activities.js`. Each activity has a `pages` array. Add or remove page objects freely; the dialogue navigation automatically adapts to the number of pages.

Each page has `eyebrow`, `heading`, `body`, and `visual`. Visual placeholder types include `photo`, `gallery`, `story`, `classroom`, `blueprint`, `diagram`, `quiz`, `book`, `document`, `audio`, `slides`, `video`, and `question`.

## Add your actual images and videos later
Put media in `public/images/` or `public/videos/`, then update `VisualPlaceholder` in `src/App.jsx` to render the selected local file. Keep media paths in the activity data so content remains separate from game logic.

The current descriptions and visual blocks are sample placeholders, not claims about completed coursework. The sound toggle is currently a UI toggle only; ambient audio can be added later.

## Structure
```text
advanced-python-rpg-portfolio/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── styles.css
    ├── data/activities.js
    └── game/GameCanvas.jsx
```

## Recent gameplay updates
- Buildings, paths, ponds and decorations are drawn in fixed world coordinates and move only as the camera scrolls; the player sprite is camera-relative.
- Building collision uses fixed world-space bounding rectangles. The ENTER prompt is triggered by proximity to the building entrance.
- The world map uses the same world coordinates as the game. The red YOU marker is updated from the live player position.
- Press **P** or use the PAUSE button to pause. Resume or exit to the landing screen.
- The landing screen includes **VIEW PORTFOLIO SUMMARY**, a regular text-and-image portfolio view with a selectable activity index.

## Character selection and terrain
- Choose between Ranger (male), Nova (female), and Moss (crocodile) from the landing page or the in-game SPRITE button.
- The character picker shows each sprite's name, description, and ability.
- Moss can cross the pond; the human characters cannot.
- Trees now have world-space collision, and each activity building has a distinct silhouette and palette.
- The overall interface and world palette have been refreshed with brighter, more saturated colours.

## V4 visual refresh and day/night mode
- Expanded the landing scene with distant mountains, layered hills, extra trees, a path, fence sections, lamps, rocks, flowers, bushes, clouds and foreground grass.
- Refreshed the daytime palette with stronger cyan, emerald, lime, coral and golden-yellow contrast.
- Added a Day/Night toggle at the top-right of the landing screen.
- The selected theme carries into the playable world, map, dialogue, pause and character selection screens, and portfolio summary.
- Night mode uses a moonlit blue landscape and dark indigo interface palette while retaining readable contrast.

## Populated coursework portfolio (V5)
The original RPG interface and game flow are retained. The activity data now contains 11 entries: the ten coursework activities plus the LogScope project write-up as the final lab location.

### Included supplied media
- Activity 01: `public/portfolio/activity-01/image-00.jpeg` — Stars activity photograph.
- Activity 02: `public/portfolio/activity-02/image-00.png` — Storyboard image.
- Activity 03: `public/portfolio/activity-03/image-00.jpeg`, `image-01.jpeg`, `image-02.jpeg` — LinguaConnect / frontend design photographs.
- Activity 05: `public/portfolio/activity-05/image-00.jpeg`, `image-01.jpeg` — Class quiz screenshots.
- Activity 06: `public/portfolio/activity-06/image-00.png` — Medium blog screenshot.
- Activity 07: `public/portfolio/activity-07/document-00.pdf` — Business thesis submission and transcript; `recording-01.mp3` — supplied audio recording.
- Activity 08: `public/portfolio/activity-08/document-00.pdf` — LogScope presentation.
- Activity 10: `public/portfolio/activity-10/document-00.pdf` — OOP / LeetCode assessment submission.
- Activity 11: `public/portfolio/activity-11/logscope-project-writeup.pdf` — Final LogScope project write-up.

PDF first-page previews are generated in the corresponding activity folders. Document preview cards and links open the full PDFs in a new tab. External links are provided for the Figma prototype, Medium article and Google Drive demonstration / thesis recording. The demonstration video is linked externally because no video file was included in the supplied activity archive.

The final LogScope write-up is placed at map location 11 in its own software-laboratory building sprite (`loglab`). Its collision bounds, interaction prompt, map pin, dialogue pages and summary entry are driven by the same activity data as the other locations.

Correction: Activity 04 is **Sleep & Circadian Rhythm Solution (Circadia)**, not tactile neuropathy. No Circadia image or architecture diagram was supplied, so its pages are text-only. Pages without supplied images, PDFs, audio or links now render as text without generated placeholder artwork. The unrelated tactile-neuropathy diagram was removed from Activity 04.
