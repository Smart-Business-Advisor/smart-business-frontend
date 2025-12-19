// Convert API error objects into friendly English messages for toasts
export function friendlyAuthMessage(err) {
  if (!err) return "An unexpected error occurred. Please try again.";

  // Network / fetch failure
  if (err instanceof TypeError && err.message === 'Failed to fetch') {
    return 'Network error. Please check your connection and try again.';
  }

  // If we attached status/data on the error (from utils/api.js)
  const status = err.status || (err?.data?.status) || null;
  const data = err.data || err?.data || null;

  if (status === 400 && data && data.errors) {
    // collect validation messages
    const msgs = [];
    for (const key of Object.keys(data.errors)) {
      const v = data.errors[key];
      if (Array.isArray(v)) msgs.push(...v);
      else msgs.push(String(v));
    }
    return msgs.length ? msgs.join(' ') : 'Invalid input. Please check the form fields.';
  }

  if (status === 401 || status === 403) {
    return 'Invalid credentials or not authorized. Please check your email and password.';
  }

  if (status >= 500) {
    return 'Server error. Please try again later.';
  }

  // If the API returned a message string
  if (data && typeof data === 'object' && data.message) {
    return String(data.message);
  }

  // Fallback to error.message
  if (err.message) return String(err.message);

  return 'An unexpected error occurred. Please try again.';
}

export default friendlyAuthMessage;
