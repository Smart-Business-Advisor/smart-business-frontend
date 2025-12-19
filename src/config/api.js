// Use relative `/api` in development so Vite proxy can forward requests and avoid CORS.
// In production this will stay the full external API URL.
export const API_URL = import.meta.env.DEV
	? "/api"
	: "https://identitytemplateapi.runasp.net/api";
