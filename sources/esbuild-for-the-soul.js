export default class ESBuildForTheSoul extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
  
        // write element functionality in here
  
        this.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'

        // Create (nested) span elements
        const wrapper = document.createElement('span');
        wrapper.setAttribute('class','wrapper');
        const icon = wrapper.appendChild(document.createElement('span'));
        icon.setAttribute('class','icon');
        icon.setAttribute('tabindex', 0);
        // Insert icon from defined attribute or default icon
        const img = icon.appendChild(document.createElement('img'));
        img.src = this.hasAttribute('img') ? this.getAttribute('img') : 'img/default.png';

        const info = wrapper.appendChild(document.createElement('span'));
        info.setAttribute('class','info');
        // Take attribute content and put it inside the info span
        info.textContent = this.getAttribute('data-text');

        // Create some CSS to apply to the shadow dom
        const style = document.createElement('style');
        style.textContent = '.wrapper {' +
        // CSS truncated for brevity

        // attach the created elements to the shadow DOM
        this.shadowRoot.append(style,wrapper);
    }
  }

customElements.define('esbuild-for-the-soul', ESBuildForTheSoul);