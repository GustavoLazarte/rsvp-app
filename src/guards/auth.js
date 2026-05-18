import { isAuthenticated, isAdmin } from '../services/auth.js';
import { navigate } from '../services/router.js';

// Middleware de ruta: redirige si no hay sesión (dashboard) o si ya hay sesión (login)
export function guardAuth(view) {
  if (view === 'dashboard' && !isAdmin()) {
    navigate('/login');
    return false;
  }
  if (view === 'login' && isAuthenticated()) {
    navigate('/dashboard');
    return false;
  }
  return true;
}
