/**
 * game-page.js — Game Page Logic
 * ────────────────────────────────
 * Handles both local games (src) and external embed games (embedSrc).
 * Shows a "Coming Soon" screen if embedSrc is null.
 */

const params = new URLSearchParams(window.location.search);
const gameId = params.get("id");
const game   = GAMES.find((g) => g.id === gameId);

if (!game) {
  window.location.href = "../index.html";
} else {
  document.title = `GRIDPLAY — ${game.title}`;
  document.getElementById("gameTitle").textContent       = game.title;
  document.getElementById("gameDescription").textContent = game.description;

  const tag = document.getElementById("gameCategory");
  tag.textContent = game.category;

  const frame = document.getElementById("gameFrame");

  if (game.src) {
    // Local built-in game
    frame.src = game.src;

  } else if (game.embedSrc) {
    // External embed game
    frame.src = game.embedSrc;
    // Allow everything external games might need
    frame.setAttribute("allow", "fullscreen; autoplay; gamepad");

  } else {
    // No URL yet — show coming soon overlay instead of blank iframe
    frame.style.display = "none";
    const wrapper = document.querySelector(".game-wrapper");
    const soon = document.createElement("div");
    soon.className = "coming-soon";
    soon.innerHTML = `
      <div class="coming-soon-inner">
        <span class="coming-soon-icon">🎮</span>
        <h2>Coming Soon</h2>
        <p>This game slot is waiting for a URL.<br/>
           Open <code>js/games.js</code> and paste an embed URL into <code>embedSrc</code>.</p>
        <a href="../index.html" class="back-home">← Back to games</a>
      </div>
    `;
    wrapper.appendChild(soon);
  }
}

/* ── THEME TOGGLE ── */
const html        = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const savedTheme  = localStorage.getItem("gp-theme") || "dark";
html.setAttribute("data-theme", savedTheme);
themeToggle.addEventListener("click", () => {
  const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("gp-theme", next);
});

/* ── HAMBURGER MENU ── */
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