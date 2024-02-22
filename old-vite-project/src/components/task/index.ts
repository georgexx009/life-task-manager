import './styles.css'

export class Task extends HTMLElement {
  static get observedAttributes() {
    return ['name']
  }

  constructor() {
    super()
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="task">
        <span>task name</span>
      </div>  
    `
  }
}

customElements.define('todo-task', Task)