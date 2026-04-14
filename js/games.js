/**
 * games.js — Central Game Registry
 * ─────────────────────────────────
 * To add a built-in game:  set `src` to a local HTML file path
 * To add an embed game:    set `embedSrc` to a full iframe URL, leave `src` null
 * To fill a blank slot:    find a working embed URL and paste it into `embedSrc`
 *
 * Finding embed URLs:
 *   - Search "[game name] unblocked iframe embed site:html5games.com"
 *   - Try iframegames.com, silvergames.com, html5games.com
 *   - Some games (Poki, Subway Surfers official) block iframes — use mirror sites
 */

const GAMES = [

  // ═══════════════════════════════════════════════
  // POPULAR — games embedded from external URLs
  // ═══════════════════════════════════════════════

  {
    id:          "subway-surfers",
    title:       "Subway Surfers",
    category:    "arcade",
    section:     "popular",
    description: "Run as fast as you can! Dodge trains, collect coins, and avoid the inspector. Swipe or use arrow keys to move.",
    src:         "subwaysurfers/index.html",
    embedSrc:    null,
    thumbColor:  "#ffcc00",
    thumbIcon:   "🏃",
  },
  {
    id:          "popular-2",
    title:       "Slope",
    category:    "arcade",
    section:     "popular",
    description: "Guide a ball down a steep 3D slope. Dodge obstacles and survive as long as you can. Use arrow keys or A/D to steer.",
    src:         "https://y8.com/embed/slope",
    embedSrc:    null,
    thumbColor:  "#4dffb5",
    thumbIcon:   "🔵",
  },
  {
    id:          "popular-3",
    title:       "Moto X3M",
    category:    "action",
    section:     "popular",
    description: "Race your motorbike through insane obstacle tracks. Flip in the air to shave time. Use arrow keys to accelerate and lean.", 
    description: "TO PLAY GAME, PLEASE CLICK ON 'FULLSCREEN'",
    src:         "motox3m/index.html",
    embedSrc:    null,
    thumbColor:  "#ff4d4d",
    thumbIcon:   "🏍️",
  },
  {
    id:          "popular-4",
    title:       "Temple Run",
    category:    "arcade",
    section:     "popular",
    description: "Run from the temple guardians! Swipe to turn, jump, and slide. Collect coins and unlock power-ups as you go.",
    src:         "templerun/index.html",
    embedSrc:    null,
    thumbColor:  "#ff9900",
    thumbIcon:   "🏃",
  },

  // ═══════════════════════════════════════════════
  // CLASSICS — built-in games (no external URL needed)
  // ═══════════════════════════════════════════════

  {
    id:          "snake",
    title:       "Snake",
    category:    "arcade",
    section:     "classics",
    description: "Use the arrow keys (or WASD) to steer the snake. Eat the red food to grow longer. Don't hit the walls or yourself. How long can you survive?",
    src:         "snake/index.html",
    embedSrc:    null,
    thumbColor:  "#b5ff4d",
    thumbIcon:   "🐍",
  },
  {
    id:          "memory",
    title:       "Memory Match",
    category:    "puzzle",
    section:     "classics",
    description: "Click cards to flip them over. Find all matching pairs in as few moves as possible. All 8 pairs must be matched to win.",
    src:         "memory/index.html",
    embedSrc:    null,
    thumbColor:  "#4db8ff",
    thumbIcon:   "🃏",
  },
  {
    id:          "breakout",
    title:       "Breakout",
    category:    "action",
    section:     "classics",
    description: "Move the paddle left and right with the arrow keys or your mouse. Break all the bricks to win. Don't let the ball fall off the bottom!",
    src:         "breakout/index.html",
    embedSrc:    null,
    thumbColor:  "#ff6b4d",
    thumbIcon:   "🧱",
  },
];