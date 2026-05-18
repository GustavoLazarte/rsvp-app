const AUTH_KEY = 'mj_admin';

const ADMINS = [
  { email: 'admin@moniyjose.com', password: 'moni2026' },
];

export function login(email, password) {
  const match = ADMINS.find(a => a.email === email && a.password === password);
  if (match) {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ email, role: 'admin' }));
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY));
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return !!getUser();
}

export function isAdmin() {
  const user = getUser();
  return user?.role === 'admin';
}

export function requireAdmin() {
  return isAdmin();
}
