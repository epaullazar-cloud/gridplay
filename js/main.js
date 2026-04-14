/**
 * main.js — Homepage Logic
 * ─────────────────────────
 * Responsibilities:
 *   1. Render game cards from the GAMES registry
 *   2. Handle category filter buttons
 *   3. Handle light/dark theme toggle
 *   4. Draw placeholder thumbnails on <canvas>
 */

/* ── 1. THEME TOGGLE ── */
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

// Persist theme preference in localStorage
const savedTheme = localStorage.getItem("gp-theme") || "dark";
html.setAttribute("data-theme", savedTheme);

themeToggle.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("gp-theme", next);
});


/* ── 2. DRAW PLACEHOLDER THUMBNAIL ──
   Uses a <canvas> element so the site
   has zero external image dependencies.
   Each game gets its own accent colour + emoji.
*/
function drawThumbnail(canvas, game) {
  const ctx = canvas.getContext("2d");
  const W = canvas.width  = canvas.offsetWidth  || 400;
  const H = canvas.height = canvas.offsetHeight || 225;

  // Dark background
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, W, H);

  // Subtle grid pattern
  ctx.strokeStyle = "rgba(255,255,255,0.04)";
  ctx.lineWidth = 1;
  const step = 24;
  for (let x = 0; x < W; x += step) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += step) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  // Accent colour circle
  ctx.fillStyle = game.thumbColor + "22"; // 13% opacity
  ctx.beginPath();
  ctx.arc(W / 2, H / 2, H * 0.45, 0, Math.PI * 2);
  ctx.fill();

  // Emoji icon centred
  ctx.font = `${H * 0.35}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(game.thumbIcon, W / 2, H / 2);

  // Game title at bottom
  ctx.font = "bold 13px 'Space Mono', monospace";
  ctx.fillStyle = game.thumbColor;
  ctx.fillText(game.title.toUpperCase(), W / 2, H - 18);
}


/* ── 3. CREATE A GAME CARD DOM ELEMENT ── */
function createCard(game) {
  const card = document.createElement("article");
  // Add "coming-soon-card" class if no URL is available yet
  const isComingSoon = !game.src && !game.embedSrc;
  card.className = "game-card" + (isComingSoon ? " coming-soon-card" : "");
  card.setAttribute("data-category", game.category);

  card.innerHTML = `
    <div class="card-thumb">
      <canvas></canvas>
      <div class="card-overlay">
        <span class="play-btn">▶ PLAY</span>
      </div>
    </div>
    <div class="card-body">
      <p class="card-category">${game.category}</p>
      <h2 class="card-title">${game.title}</h2>
      <p class="card-desc">${game.description.split(".")[0]}.</p>
    </div>
  `;

  // Clicking anywhere on the card navigates to the game page
  // We pass the game id as a URL query param so game-page.js can look it up
  card.addEventListener("click", () => {
    window.location.href = `games/game-template.html?id=${game.id}`;
  });

  return card;
}


/* ── 4. RENDER CARDS GROUPED BY SECTION ──
   Games with a `section` field get their own
   labelled group above the main grid.
   Games without a section go into the default grid.
*/
const gameGrid = document.getElementById("gameGrid");

// Collect unique section names (in order they appear)
const sections = [...new Set(GAMES.map(g => g.section).filter(Boolean))];

// Render each named section
sections.forEach(sectionName => {
  const sectionGames = GAMES.filter(g => g.section === sectionName);

  // Section heading
  const heading = document.createElement("div");
  heading.className = "section-heading";
  heading.setAttribute("data-section", sectionName);
  heading.innerHTML = `<h2>${sectionName}</h2>`;
  gameGrid.appendChild(heading);

  // Section card row
  const row = document.createElement("div");
  row.className = "section-row";
  row.setAttribute("data-section", sectionName);
  gameGrid.appendChild(row);

  sectionGames.forEach(game => {
    const card = createCard(game);
    row.appendChild(card);
    const canvas = card.querySelector("canvas");
    requestAnimationFrame(() => drawThumbnail(canvas, game));
  });
});

// Render any games WITHOUT a section into the default grid
const unsectioned = GAMES.filter(g => !g.section);
if (unsectioned.length) {
  const heading = document.createElement("div");
  heading.className = "section-heading";
  heading.innerHTML = `<h2>All Games</h2>`;
  gameGrid.appendChild(heading);

  const row = document.createElement("div");
  row.className = "section-row";
  gameGrid.appendChild(row);

  unsectioned.forEach(game => {
    const card = createCard(game);
    row.appendChild(card);
    const canvas = card.querySelector("canvas");
    requestAnimationFrame(() => drawThumbnail(canvas, game));
  });
}


/* ── 5. CATEGORY FILTER ── */
const filterBtns = document.querySelectorAll(".cat-btn");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");
    const cards  = document.querySelectorAll(".game-card");

    cards.forEach((card) => {
      const match = filter === "all" || card.getAttribute("data-category") === filter;
      card.style.display = match ? "" : "none";
    });

    // Hide section headings/rows that have no visible cards
    document.querySelectorAll(".section-row").forEach(row => {
      const visible = [...row.querySelectorAll(".game-card")]
        .some(c => c.style.display !== "none");
      row.style.display = visible ? "" : "none";
      // also hide the sibling heading
      const heading = row.previousElementSibling;
      if (heading && heading.classList.contains("section-heading")) {
        heading.style.display = visible ? "" : "none";
      }
    });
  });
});


/* ── 6. HAMBURGER MENU (mobile) ── */
const hamburger = document.getElementById("hamburger");
const navLinks  = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  const open = navLinks.style.display === "flex";
  navLinks.style.display = open ? "" : "flex";
  navLinks.style.flexDirection = "column";
  navLinks.style.position = "absolute";
  navLinks.style.top = "64px";
  navLinks.style.left = "0";
  navLinks.style.right = "0";
  navLinks.style.background = "var(--bg)";
  navLinks.style.padding = "1rem 2rem";
  navLinks.style.borderBottom = "1px solid var(--border)";
});