import { API_URL } from "../config/api";

// دالة fetch عامة تدعم Authorization تلقائي
export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });

    const data = await res.json().catch(() => null); // لو JSON مش رجع
    if (!res.ok) {
      const err = new Error(data?.message || `Request failed (${res.status})`);
      err.status = res.status;
      err.data = data;
      console.error("API Response Error:", { status: res.status, data });
      throw err;
    }
    return data;
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
};

// دالة fetch بدون Authorization لو حبيت
export const fetchPublic = async (endpoint, options = {}) => {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    const data = await res.json().catch(() => null);
      if (!res.ok) {
        const err = new Error(data?.message || `Request failed (${res.status})`);
        err.status = res.status;
        err.data = data;
        console.error("Public API Response Error:", { status: res.status, data });
        throw err;
    }
    return data;
  } catch (err) {
    console.error("Public API Error:", err);
    throw err;
  }
};
