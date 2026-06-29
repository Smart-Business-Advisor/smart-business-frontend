// Convert API error objects into friendly English messages for toasts
export function friendlyAuthMessage(err) {
  if (!err) return "An unexpected error occurred. Please try again.";

  // 1. Network / fetch failure
  if (err instanceof TypeError && err.message === 'Failed to fetch') {
    return 'Network error. Please check your internet connection and try again.';
  }

  const status = err.status || (err?.data?.status) || null;
  const data = err.data || err?.data || null;

  // 2. Authentication Errors (Wrong Email/Password in Login)
 
  if (status === 401 || status === 403) {
    return 'Incorrect email or password. Please try again.';
  }

  // 3. Validation / Business Logic Errors (e.g., Login/Register forms)
  if (status === 400) {
    
    if (typeof data === 'string' && data.toLowerCase().includes('invalid login')) {
        return 'Incorrect email or password.';
    }

    if (data && data.errors) {
      const msgs = [];
      for (const key of Object.keys(data.errors)) {
        const v = data.errors[key];
        if (Array.isArray(v)) msgs.push(...v);
        else msgs.push(String(v));
      }

      const joinedMessage = msgs.join(' ').toLowerCase();

     
      if (joinedMessage.includes('invalid login') || joinedMessage.includes('credentials')) {
        return 'Incorrect email or password.';
      }
      if (joinedMessage.includes('duplicate') || joinedMessage.includes('already taken')) {
        return 'This email is already registered. Please log in instead.';
      }
      if (joinedMessage.includes('password')) {
        return 'Password is too weak. It must be at least 8 characters and include numbers and symbols.';
      }

      
      return msgs.length ? msgs.join(' ') : 'Invalid input. Please check the form fields and try again.';
    }
  }

  // 4. Server Errors
  if (status >= 500) {
    return 'We are experiencing technical issues. Please try again later.';
  }

  // 5. Fallback Messages
  if (data && typeof data === 'object' && data.message) {
    return String(data.message);
  }

  if (err.message) return String(err.message);

  return 'An unexpected error occurred. Please try again.';
}

export default friendlyAuthMessage;