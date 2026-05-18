const routes = [];
let currentPath = null;

// Convierte un patrón como "/inv/:id" contra el path real extrayendo params
function matchRoute(routePath, currentPath) {
  const rParts = routePath.split('/');
  const cParts = currentPath.split('/');
  if (rParts.length !== cParts.length) return null;
  const params = {};
  for (let i = 0; i < rParts.length; i++) {
    if (rParts[i].startsWith(':')) {
      params[rParts[i].slice(1)] = decodeURIComponent(cParts[i]);
    } else if (rParts[i] !== cParts[i]) {
      return null;
    }
  }
  return params;
}

// Resuelve el hash actual contra rutas registradas; cae en '*' si no hay match
function resolve() {
  const path = window.location.hash.slice(1) || '/';
  if (path === currentPath) return;
  currentPath = path;

  for (const route of routes) {
    const params = matchRoute(route.path, path);
    if (params) {
      route.action(params);
      return;
    }
  }

  const fallback = routes.find(r => r.path === '*');
  if (fallback) fallback.action({});
}

export function registerRoute(path, action) {
  routes.push({ path, action });
}

export function navigate(path) {
  window.location.hash = `#${path}`;
}

export function getCurrentPath() {
  return window.location.hash.slice(1) || '/';
}

export function startRouter() {
  window.addEventListener('hashchange', resolve);
  resolve();
}
