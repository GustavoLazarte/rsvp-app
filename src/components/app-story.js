import { T } from '../config/i18n.js';
import { C } from '../config/colors.js';

class AppStory extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const lang = this.getAttribute('lang') || 'es';
    const tr = T[lang];
    this.innerHTML = `
      <section id="story" style="background: ${C.white}">
        <div class="inner">
          <span class="eyebrow reveal">${tr.story_label}</span>
          <h2 class="h2 reveal rd1">${tr.story_title.replace(/\n/g, '<br/>')}</h2>
          <div class="rule reveal rd2"></div>
          <p class="story-body reveal rd2">${tr.story_body}</p>
          <blockquote class="story-quote reveal rd3">${tr.story_quote}</blockquote>
        </div>
      </section>
    `;
  }

  static get observedAttributes() { return ['lang']; }
  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'lang' && oldVal !== newVal && newVal) this.render();
  }
}

customElements.define('app-story', AppStory);
