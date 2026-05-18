import { login } from '../services/auth.js';
import { navigate } from '../services/router.js';

class AppLogin extends HTMLElement {
  connectedCallback() {
    this.render();
    this.initEvents();
  }

  render() {
    this.innerHTML = `
      <div class="login-page">
        <div class="login-card">
          <div class="login-mono">M&J</div>
          <h1 class="login-title">Admin</h1>
          <form id="login-form">
            <div class="fg">
              <label class="fl">Email</label>
              <input class="fi" name="email" type="email" placeholder="admin@moniyjose.com" autocomplete="email" />
            </div>
            <div class="fg">
              <label class="fl">Contraseña</label>
              <input class="fi" name="password" type="password" placeholder="••••••••" autocomplete="current-password" />
            </div>
            <p id="login-error" class="login-error" style="display:none">Credenciales inválidas</p>
            <button class="btn-f" type="submit" style="width:100%;justify-content:center">Ingresar</button>
          </form>
          <a href="#/inv/default" class="login-back">← Volver al inicio</a>
        </div>
      </div>
    `;
  }

  initEvents() {
    const form = this.querySelector('#login-form');
    const error = this.querySelector('#login-error');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.elements['email'].value.trim();
      const password = form.elements['password'].value;

      if (login(email, password)) {
        navigate('/dashboard');
      } else {
        error.style.display = 'block';
      }
    });
  }
}

customElements.define('app-login', AppLogin);
