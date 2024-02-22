(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(e){if(e.ep)return;e.ep=!0;const n=o(e);fetch(e.href,n)}})();const f="p,h2{margin:0}.card{color:#000;background-color:#fff;padding:12px;margin:8px}button{padding:10px 20px;background-color:#007bff;color:#fff;font-size:16px;border:none;border-radius:8px;cursor:pointer;transition:background-color .3s ease}button:hover{background-color:#0056b3}button:disabled{background-color:#ccc;color:#666;cursor:not-allowed}";class h extends HTMLElement{static get observedAttributes(){return["title","description"]}constructor(){super()}connectedCallback(){this.innerHTML=`
      <div class="card">
        <h2></h2>
        <p></p>
        <div>
          <button>update</button>
          <button>delete</button>
        </div>
      </div> 
    `;const t=this.querySelector("h2"),o=this.querySelector("p"),i=Array.from(this.querySelectorAll("button")),e=i.find(c=>c.textContent==="update"),n=i.find(c=>c.textContent==="delete");t.textContent=this.getAttribute("title")||"title",o.textContent=this.getAttribute("description")||"description",e.addEventListener("click",()=>{this.update(t.textContent,o.textContent)}),n.addEventListener("click",()=>{const c=this.getAttribute("id"),d=document.querySelector(`#${c}`);d==null||d.remove()});const s=document.createElement("style");s.textContent=f,this.appendChild(s)}update(t,o){const i=document.createElement("modal-form-recipe");i.setAttribute("title",t),i.setAttribute("description",o);const e=this.getAttribute("id");i.setAttribute("id",e),document.querySelector(".container").appendChild(i)}attributeChangedCallback(t,o,i){var e,n;switch(t){case"title":const s=(e=this.shadowRoot)==null?void 0:e.querySelector("h2");s&&(s.textContent=i);break;case"description":const c=(n=this.shadowRoot)==null?void 0:n.querySelector("p");c&&(c.textContent=i);break}}}customElements.define("card-recipe",h);class g extends HTMLElement{constructor(){super();const t=this.attachShadow({mode:"open"}),o=document.createElement("div"),i=this.items;o.innerHTML=`
      <ul id="item-list">
        ${i.map(e=>`
          <li>${e}
            <button id="remove-btn">&ominus;</button>
          </li>
        `).join("")}
      </ul>
      <input id="new-item-input" type="text">
      <button id='add-item-btn'>add item</button>
    `,t.appendChild(o),this.addListItem=this.addListItem.bind(this)}get items(){const t=[];for(const o of this.attributes)o.name.includes("list-item")&&t.push(o.value);return t}addListItem(){const t=this.shadowRoot.querySelector("#new-item-input");if(t.value){const o=document.createElement("li");o.textContent=t.value,this.shadowRoot.querySelector("#item-list").appendChild(o),t.value=""}}removeItem(t){t.target.parentNode.remove()}connectedCallback(){this.shadowRoot&&(this.shadowRoot.querySelector("#add-item-btn").addEventListener("click",this.addListItem,!1),this.shadowRoot.querySelectorAll("#remove-btn").forEach(i=>{i.addEventListener("click",this.removeItem)}))}}customElements.define("todo-list",g);const v=".modal-form-recipe{width:100vw;height:100vh;position:absolute;top:0;left:0;background-color:#000000bf;display:flex;justify-content:center;align-items:center}.form{background-color:#fff;color:#000;padding:12px 16px 24px;border-radius:12px;display:flex;flex-direction:column;align-items:flex-start}form{display:flex;flex-direction:column;align-items:flex-start}form>input:not(:last-child){margin-bottom:20px}form>button{align-self:flex-end}input{width:100%;padding:10px;border:none;box-sizing:border-box;border-bottom:2px solid #000;background-color:transparent;color:#000;font-size:16px;outline:none;transition:border-color .3s ease}input:focus{border-color:#007bff}button{padding:10px 20px;background-color:#007bff;color:#fff;font-size:16px;border:none;border-radius:8px;cursor:pointer;transition:background-color .3s ease}button:hover{background-color:#0056b3}button:disabled{background-color:#ccc;color:#666;cursor:not-allowed}";class x extends HTMLElement{constructor(){super()}connectedCallback(){var d;this.innerHTML=`
      <div class="modal-form-recipe">
        <div class="form">
          <h3>New Recipe</h3>
          
          <form id="form-recipe">
            <label for="input-title">Title</label>
            <input type="text" id="input-title" />

            <label for="input-description">Description</label>
            <input type="text" id="input-description" />

            <button id="btn-cancel">Cancel</button>
            <button id="btn-submit" type="submit">Create</button>
          </form>
        </div>
      </div>
    `;const t=this.querySelector("#input-title"),o=this.querySelector("#input-description"),i=this.querySelector("#btn-submit"),e=this.querySelector("#btn-cancel"),n=document.querySelector("#recipes");t.value=this.getAttribute("title"),o.value=this.getAttribute("description"),i.disabled=!0,(d=this.querySelector("#form-recipe"))==null||d.addEventListener("submit",u=>{u.preventDefault();const p=this.getAttribute("id");if(p){const m=document.querySelector(`card-recipe[id="${p}"]`);m.setAttribute("title",t.value),m.setAttribute("description",o.value),this.closeModal();return}const l=document.createElement("card-recipe");l.setAttribute("title",t.value),l.setAttribute("description",o.value),l.setAttribute("id","id"+this.getAttribute("nextID")||"0"),n==null||n.appendChild(l),this.closeModal()}),e.addEventListener("click",u=>{u.preventDefault(),this.closeModal()});const s=()=>{i.disabled=!t.value||!o.value};t.addEventListener("input",s),o.addEventListener("input",s);const c=document.createElement("style");c.textContent=v,this.appendChild(c)}closeModal(){this.querySelector(".modal-form-recipe").remove()}}customElements.define("modal-form-recipe",x);const b=[{id:1,title:"recipe 1",description:"description 1"},{id:2,title:"recipe 2",description:"description 2"}],y=b.map(r=>{const t=document.createElement("card-recipe");return t.setAttribute("id","id"+r.id.toString()),t.setAttribute("title",r.title),t.setAttribute("description",r.description),t}),a=document.querySelector("#recipes");y.forEach(r=>a==null?void 0:a.appendChild(r));const E=document.querySelector("#btn-new");E.addEventListener("click",()=>{const r=document.createElement("modal-form-recipe");r.setAttribute("nextID",(b.length+1).toString()),document.querySelector(".container").appendChild(r)});
