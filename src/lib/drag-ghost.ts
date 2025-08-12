// src/lib/drag-ghost.ts
export function setCardDragGhost(e: React.DragEvent) {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="160">
    <defs>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="8" flood-opacity="0.25"/>
      </filter>
    </defs>
    <rect x="8" y="8" rx="12" ry="12" width="104" height="144" fill="#fff" stroke="#000" stroke-opacity=".12" filter="url(#shadow)"/>
    <!-- folded corner -->
    <polygon points="96,8 112,8 112,24" fill="#eee" />
    <line x1="24" y1="48" x2="96" y2="48" stroke="#999" stroke-opacity=".4" stroke-width="4" />
    <line x1="24" y1="68" x2="92" y2="68" stroke="#999" stroke-opacity=".35" stroke-width="4" />
    <line x1="24" y1="88" x2="86" y2="88" stroke="#999" stroke-opacity=".3" stroke-width="4" />
  </svg>`;
  const img = new Image();
  img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  img.style.position = "fixed";
  img.style.top = "-200px";
  img.style.left = "-200px";
  document.body.appendChild(img);

  // Be generous with dataTransfer for cross-browser
  e.dataTransfer.effectAllowed = "copy";
  // Keep existing custom types; caller will set them, but we can include a text/plain fallback here too if needed.
  if (!e.dataTransfer.getData("text/plain")) {
    e.dataTransfer.setData("text/plain", "card");
  }

  e.dataTransfer.setDragImage(img, 60, 80);
  setTimeout(() => document.body.removeChild(img), 0);
}