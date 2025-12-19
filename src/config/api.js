// Use /api for both dev and production.
// In dev: Vite proxy redirects /api/* to external API.
// In prod (Vercel): vercel.json rewrites /api/* to external API.
export const API_URL = "/api";
