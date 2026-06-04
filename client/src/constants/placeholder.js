const SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="s" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e2e8f0"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </linearGradient>
  </defs>
  <rect fill="url(#s)" width="400" height="300"/>
  <circle cx="310" cy="80" r="28" fill="#e2e8f0"/>
  <path d="M0 210l60-80 60 50 80-90 60 60 70-70 70 60V300H0z" fill="#cbd5e1"/>
  <path d="M0 250l50-60 60 40 80-70 60 50 70-60 80 50V300H0z" fill="#94a3b8"/>
  <path d="M0 280Q100 272 200 280T400 280V300H0z" fill="#94a3b8" opacity=".3"/>
</svg>`;

export const PLACEHOLDER_IMAGE = "data:image/svg+xml," + encodeURIComponent(SVG);

export function handleImageError(event) {
  event.target.src = PLACEHOLDER_IMAGE;
}
