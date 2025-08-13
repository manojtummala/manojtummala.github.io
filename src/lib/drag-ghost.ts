export function setCardDragGhost(e: React.DragEvent) {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
    <defs>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.3"/>
      </filter>
    </defs>
    <!-- File icon -->
    <rect x="8" y="4" width="32" height="40" rx="2" fill="#3b82f6" stroke="#1e40af" stroke-width="1" filter="url(#shadow)"/>
    <!-- Folded corner -->
    <polygon points="32,4 40,4 40,12" fill="#1e40af" />
    <!-- File lines -->
    <line x1="12" y1="16" x2="28" y2="16" stroke="white" stroke-width="2" stroke-linecap="round"/>
    <line x1="12" y1="22" x2="28" y2="22" stroke="white" stroke-width="2" stroke-linecap="round"/>
    <line x1="12" y1="28" x2="24" y2="28" stroke="white" stroke-width="2" stroke-linecap="round"/>
    <!-- File extension dot -->
    <circle cx="36" cy="32" r="2" fill="white"/>
  </svg>`;
  const img = new Image();
  img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  img.style.position = "fixed";
  img.style.top = "-200px";
  img.style.left = "-200px";
  document.body.appendChild(img);

  e.dataTransfer.effectAllowed = "copy";
  if (!e.dataTransfer.getData("text/plain")) {
    e.dataTransfer.setData("text/plain", "card");
  }

  e.dataTransfer.setDragImage(img, 24, 24);
  setTimeout(() => document.body.removeChild(img), 0);
}