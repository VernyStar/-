class AlertSV{constructor(t){this.options=Object.assign({position:"top-right",stack:[],offsetX:20,offsetY:20,gap:20,nomer:0,duration:".5s",effect:"ease",isblur:!0},t)}push(t){this.nomer++;let s=document.createElement(t.link?"a":"div");t.link&&(s.href=t.link,s.target=t.linkTarget?t.linkTarget:"_self"),s.className="sms"+(t.style?" sms-"+t.style:"")+" sms-"+this.position,s.innerHTML=`\n         ${null==t.icon||!0===t.icon?`<div class="icon ${t.style}"></div>`:""}\n         <div class="sms-wrapper">\n         ${t.title?'<h3 class="sms-header">'+t.title+"</h3>":""}\n         ${t.content?'<div class="sms-content">'+t.content+"</div>":""}\n         </div>\n         ${null==t.closeButton||!0===t.closeButton?'<button class="sms-close">&times;</button>':""}\n      `,document.body.appendChild(s),s.getBoundingClientRect(),"top-left"==this.position?(s.style.top=0,s.style.left=this.offsetX+"px"):"top-center"==this.position?(s.style.top=0,s.style.left=0):"top-right"==this.position?(s.style.top=0,s.style.right=this.offsetX+"px"):"bottom-left"==this.position?(s.style.bottom=0,s.style.left=this.offsetX+"px"):"bottom-center"==this.position?(s.style.bottom=0,s.style.left=0):"bottom-right"==this.position&&(s.style.bottom=0,s.style.right=this.offsetX+"px"),(t.width||this.width)&&(s.style.width=(t.width||this.width)+"px"),s.dataset.transitionState="queue";let e=this.stack.push({element:s,props:t,offsetX:this.offsetX,offsetY:this.offsetY,index:0});this.stack[e-1].index=e-1,s.querySelector(".sms-close")&&(s.querySelector(".sms-close").onclick=t=>{t.preventDefault(),this.closeAlert(this.stack[e-1])}),s.querySelector(".error")?s.querySelector(".icon").innerHTML='\n            <svg width="22" height="22" fill="#c41c1c" viewBox="0 0 512 512"><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/></svg>':s.querySelector(".success")?s.querySelector(".icon").innerHTML='\n            <svg width="22" height="22" fill="#1DB000" viewBox="0 0 512 512"><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>':s.querySelector(".verified")&&(s.querySelector(".icon").innerHTML='\n            <svg width="22" height="22" fill="#0096C7" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>'),t.link&&(s.onclick=()=>this.closeAlert(this.stack[e-1])),this.openAlert(this.stack[e-1]),t.onOpen&&t.onOpen(this.stack[e-1])}openAlert(t){if(!0===this.isOpening())return!1;t.element.dataset.transitionState="opening",t.element.style.transition=this.duration+" transform "+this.effect,this._transformAlert(t),t.element.addEventListener("transitionend",(()=>{if("opening"==t.element.dataset.transitionState){t.element.dataset.transitionState="complete";for(let t=0;t<this.stack.length;t++)"queue"==this.stack[t].element.dataset.transitionState&&this.openAlert(this.stack[t]);t.props.dismissAfter&&this.closeAlert(t,t.props.dismissAfter)}}));for(let s=0;s<this.stack.length;s++)"complete"==this.stack[s].element.dataset.transitionState&&(this.stack[s].element.dataset.transitionState="opening",this.stack[s].element.style.transition=this.duration+" transform "+this.effect+(this.isblur?", "+this.duration+" opacity ease":""),this.isblur&&this.stack[s].element.classList.add("sms-dimmed"),this.stack[s].offsetY+=t.element.offsetHeight+this.gap,this._transformAlert(this.stack[s]));return!0}closeAlert(t,s=null){return!0===this.isOpening()?(setTimeout((()=>this.closeAlert(t,s)),100),!1):("close"==t.element.dataset.transitionState||(t.element.querySelector(".sms-close")&&(t.element.querySelector(".sms-close").onclick=null),t.element.dataset.transitionState="close",t.element.style.transition=".2s opacity ease"+(s?" "+s:""),t.element.style.opacity=0,t.element.addEventListener("transitionend",(()=>{if("close"==t.element.dataset.transitionState){let s=t.element.offsetHeight;t.props.onClose&&t.props.onClose(t),t.element.remove();for(let e=0;e<t.index;e++)this.stack[e].element.style.transition=this.duration+" transform "+this.effect,this.stack[e].offsetY-=s+this.gap,this._transformAlert(this.stack[e]);let e=this.getFocusedAlert();e&&e.element.classList.remove("sms-dimmed")}}))),!0)}isOpening(){let t=!1;for(let s=0;s<this.stack.length;s++)"opening"==this.stack[s].element.dataset.transitionState&&(t=!0);return t}getFocusedAlert(){for(let t=0;t<this.stack.length;t++)if(this.stack[t].offsetY==this.offsetY)return this.stack[t];return!1}_transformAlert(t){"top-center"==this.position?t.element.style.transform=`translate(calc(50vw - 50%), ${t.offsetY}px)`:"top-right"==this.position||"top-left"==this.position?t.element.style.transform=`translate(0, ${t.offsetY}px)`:"bottom-center"==this.position?t.element.style.transform=`translate(calc(50vw - 50%), -${t.offsetY}px)`:"bottom-left"!=this.position&&"bottom-right"!=this.position||(t.element.style.transform=`translate(0, -${t.offsetY}px)`)}set stack(t){this.options.stack=t}get stack(){return this.options.stack}set position(t){this.options.position=t}get position(){return this.options.position}set offsetX(t){this.options.offsetX=t}get offsetX(){return this.options.offsetX}set offsetY(t){this.options.offsetY=t}get offsetY(){return this.options.offsetY}set gap(t){this.options.gap=t}get gap(){return this.options.gap}set nomer(t){this.options.nomer=t}get nomer(){return this.options.nomer}set width(t){this.options.width=t}get width(){return this.options.width}set duration(t){this.options.duration=t}get duration(){return this.options.duration}set effect(t){this.options.effect=t}get effect(){return this.options.effect}set isblur(t){this.options.isblur=t}get isblur(){return this.options.isblur}}const css=document.createElement("style");css.textContent="\n  .sms {\n    position: fixed;\n    text-decoration: none;\n    z-index: 999999;\n    max-width: 300px;\n    background-color: #fff;\n    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.12);\n    border-radius: 4px;\n    display: flex;\n    padding: 10px;\n    transform: translate(0, -150%);\n  }\n  .sms .icon {\n    display: flex;\n    align-items: center;\n    margin-right: .5rem;\n    background: radial-gradient(circle at center, #ffffff 36.5%, transparent 36.51%);\n  }\n  .sms .sms-wrapper {\n    flex: 1;\n    padding-right: 10px;\n    overflow: hidden;\n  }\n  .sms .sms-wrapper .sms-header {\n    padding: 0 0 5px 0;\n    margin: 0;\n    font-weight: bold;\n    font-size: 14px;\n    word-break: break-word;\n    color: #4f525a;\n  }\n  .sms .sms-wrapper .sms-content {\n    font-size: 14px;\n    margin: 0;\n    padding: 0;\n    word-break: break-word;\n    color: #4f525a;\n  }\n  .sms .sms-close {\n    appearance: none;\n    border: none;\n    background: transparent;\n    cursor: pointer;\n    font-size: 24px;\n    line-height: 24px;\n    padding-bottom: 4px;\n    font-weight: bold;\n    color: rgba(0, 0, 0, 0.2);\n  }\n  .sms .sms-close:hover {\n    color: rgba(0, 0, 0, 0.4);\n  }\n  .sms.sms-top-center {\n    transform: translate(calc(50vw - 50%), -150%);\n  }\n  .sms.sms-bottom-left, .sms.sms-bottom-right {\n    transform: translate(0, 150%);\n  }\n  .sms.sms-bottom-center {\n    transform: translate(calc(50vw - 50%), 150%);\n  }\n  .sms.sms-dark {\n    background-color: #2d2e31;\n  }\n  .sms.sms-dark .sms-wrapper .sms-header {\n    color: #edeff3;\n  }\n  .sms.sms-dark .sms-wrapper .sms-content {\n    color: #edeff3;\n  }\n  .sms.sms-dark .sms-close {\n    color: rgba(255, 255, 255, 0.2);\n  }\n  .sms.sms-dark .sms-close:hover {\n    color: rgba(255, 255, 255, 0.4);\n  }\n  .sms.sms-success {\n    background-color: #C3F3D7;\n    border-left: 4px solid #51a775;\n  }\n  .sms.sms-success .sms-wrapper .sms-header {\n    color: #51a775;\n  }\n  .sms.sms-success .sms-wrapper .sms-content {\n    color: #51a775;\n  }\n  .sms.sms-success .sms-close {\n    color: rgba(0, 0, 0, 0.2);\n  }\n  .sms.sms-success .sms-close:hover {\n    color: rgba(0, 0, 0, 0.4);\n  }\n  .sms.sms-error {\n    background-color: #f3c3c3;\n    border-left: 4px solid #a75151;\n  }\n  .sms.sms-error .sms-wrapper .sms-header {\n    color: #a75151;\n  }\n  .sms.sms-error .sms-wrapper .sms-content {\n    color: #a75151;\n  }\n  .sms.sms-error .sms-close {\n    color: rgba(0, 0, 0, 0.2);\n  }\n  .sms.sms-error .sms-close:hover {\n    color: rgba(0, 0, 0, 0.4);\n  }\n  .sms.sms-verified {\n    background-color: #d0eaff;\n    border-left: 4px solid #6097b8;\n  }\n  .sms.sms-verified .sms-wrapper .sms-header {\n    color: #6097b8;\n  }\n  .sms.sms-verified .sms-wrapper .sms-content {\n    color: #6097b8;\n  }\n  .sms.sms-verified .sms-close {\n    color: rgba(0, 0, 0, 0.2);\n  }\n  .sms.sms-verified .sms-close:hover {\n    color: rgba(0, 0, 0, 0.4);\n  }\n  .sms.sms-dimmed {\n    opacity: .3;\n  }\n  .sms.sms-dimmed:hover, .sms.sms-dimmed:active {\n    opacity: 1;\n  }\n",document.head.appendChild(css);
class DynamicSelect{constructor(e,t={}){this.options=Object.assign({placeholder:"Виберіть один з пунктів",columns:1,name:"",width:"",height:"",data:[],onChange:function(){}},t),this.selectElement="string"==typeof e?document.querySelector(e):e;for(const e in this.selectElement.dataset)void 0!==this.options[e]&&(this.options[e]=this.selectElement.dataset[e]);if(this.name=this.selectElement.getAttribute("name")?this.selectElement.getAttribute("name"):"dynamic-select-"+Math.floor(1e6*Math.random()),!this.options.data.length){let e=this.selectElement.querySelectorAll("option");for(let t=0;t<e.length;t++)this.options.data.push({value:e[t].value,text:e[t].innerHTML,img:e[t].getAttribute("data-img"),selected:e[t].selected,html:e[t].getAttribute("data-html"),imgWidth:e[t].getAttribute("data-img-width"),imgHeight:e[t].getAttribute("data-img-height")})}this.element=this._template(),this.selectElement.replaceWith(this.element),this._updateSelected(),this._eventHandlers()}_template(){let e="";for(let t=0;t<this.data.length;t++){let i=100/this.columns,s="";s=this.data[t].html?this.data[t].html:`\n                    ${this.data[t].img?`<img src="${this.data[t].img}" alt="${this.data[t].text}" class="${this.data[t].imgWidth&&this.data[t].imgHeight?"dynamic-size":""}" style="${this.data[t].imgWidth?"width:"+this.data[t].imgWidth+";":""}${this.data[t].imgHeight?"height:"+this.data[t].imgHeight+";":""}">`:""}\n                    ${this.data[t].text?'<span class="dynamic-select-option-text">'+this.data[t].text+"</span>":""}\n                `,e+=`\n                <div class="dynamic-select-option${this.data[t].value==this.selectedValue?" dynamic-select-selected":""}${this.data[t].text||this.data[t].html?"":" dynamic-select-no-text"}" data-value="${this.data[t].value}" style="width:${i}%;${this.height?"height:"+this.height+";":""}">\n                    ${s}\n                </div>\n            `}let t=`\n            <div class="dynamic-select ${this.name}"${this.selectElement.id?' id="'+this.selectElement.id+'"':""} style="${this.width?"width:"+this.width+";":""}${this.height?"height:"+this.height+";":""}">\n                <input type="hidden" name="${this.name}" value="${this.selectedValue}">\n                <div class="dynamic-select-header" style="${this.width?"width:"+this.width+";":""}${this.height?"height:"+this.height+";":""}"><span class="dynamic-select-header-placeholder">${this.placeholder}</span></div>\n                <div class="dynamic-select-options" style="${this.options.dropdownWidth?"width:"+this.options.dropdownWidth+";":""}${this.options.dropdownHeight?"height:"+this.options.dropdownHeight+";":""}">${e}</div>\n                </div>\n            </div>\n        `,i=document.createElement("div");return i.innerHTML=t,i}_eventHandlers(){this.element.querySelectorAll(".dynamic-select-option").forEach((e=>{e.onclick=()=>{this.element.querySelectorAll(".dynamic-select-selected").forEach((e=>e.classList.remove("dynamic-select-selected"))),e.classList.add("dynamic-select-selected"),this.element.querySelector(".dynamic-select-header").innerHTML=e.innerHTML,this.element.querySelector("input").value=e.getAttribute("data-value"),this.data.forEach((e=>e.selected=!1)),this.data.filter((t=>t.value==e.getAttribute("data-value")))[0].selected=!0,this.element.querySelector(".dynamic-select-header").classList.remove("dynamic-select-header-active"),this.options.onChange(e.getAttribute("data-value"),e.querySelector(".dynamic-select-option-text")?e.querySelector(".dynamic-select-option-text").innerHTML:"",e)}})),this.element.querySelector(".dynamic-select-header").onclick=()=>{this.element.querySelector(".dynamic-select-header").classList.toggle("dynamic-select-header-active")},this.selectElement.id&&document.querySelector('label[for="'+this.selectElement.id+'"]')&&(document.querySelector('label[for="'+this.selectElement.id+'"]').onclick=()=>{this.element.querySelector(".dynamic-select-header").classList.toggle("dynamic-select-header-active")}),document.addEventListener("click",(e=>{e.target.closest("."+this.name)||e.target.closest('label[for="'+this.selectElement.id+'"]')||this.element.querySelector(".dynamic-select-header").classList.remove("dynamic-select-header-active")}))}_updateSelected(){this.selectedValue&&(this.element.querySelector(".dynamic-select-header").innerHTML=this.element.querySelector(".dynamic-select-selected").innerHTML)}get selectedValue(){let e=this.data.filter((e=>e.selected));return e=e.length?e[0].value:"",e}set data(e){this.options.data=e}get data(){return this.options.data}set selectElement(e){this.options.selectElement=e}get selectElement(){return this.options.selectElement}set element(e){this.options.element=e}get element(){return this.options.element}set placeholder(e){this.options.placeholder=e}get placeholder(){return this.options.placeholder}set columns(e){this.options.columns=e}get columns(){return this.options.columns}set name(e){this.options.name=e}get name(){return this.options.name}set width(e){this.options.width=e}get width(){return this.options.width}set height(e){this.options.height=e}get height(){return this.options.height}}
(() => {
  let style = document.createElement("style");
  style.textContent = `
    .dynamic-select {
      display: flex;
      flex-direction: column;
      position: relative;
      width: 100%;
      height: 100%;
      user-select: none;
      align-items: center;
    }
    .dynamic-select .dynamic-select-header {
      padding: 0 15px 0 0;
      position: relative;
      width: 100%;
    }
    .dynamic-select .dynamic-select-header::after {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      right: 15px;
      transform: translateY(-50%);
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23949ba3' viewBox='0 0 16 16'%3E%3Cpath d='M8 13.1l-8-8 2.1-2.2 5.9 5.9 5.9-5.9 2.1 2.2z'/%3E%3C/svg%3E");
      height: 9px;
      width: 9px;
    }
    .dynamic-select .dynamic-select-header.dynamic-select-header-active {
      border-color: #c1c9d0;
    }
    .dynamic-select .dynamic-select-header.dynamic-select-header-active::after {
      transform: translateY(-50%) rotate(180deg);
    }
    .dynamic-select .dynamic-select-header.dynamic-select-header-active + .dynamic-select-options {
      display: flex;
    }
    .dynamic-select .dynamic-select-header .dynamic-select-header-placeholder {
      color: #65727e;
    }
    .dynamic-select .dynamic-select-options {
      display: none;
      flex-flow: wrap;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: 999;
      margin-top: 5px;
      padding: 5px;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      max-height: 200px;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .dynamic-select .dynamic-select-options::-webkit-scrollbar {
      width: 5px;
    }
    .dynamic-select .dynamic-select-options::-webkit-scrollbar-track {
      background: #f0f1f3;
      border-radius: 4px;
    }
    .dynamic-select .dynamic-select-options::-webkit-scrollbar-thumb {
      background: #149B1E;
      border-radius: 4px;
    }
    .dynamic-select .dynamic-select-options::-webkit-scrollbar-thumb:hover {
      background: #B2B6B9;
    }
    .dynamic-select .dynamic-select-options .dynamic-select-option {
      padding: 7px 12px;
    }
    .dynamic-select .dynamic-select-options .dynamic-select-option:hover, .dynamic-select .dynamic-select-options .dynamic-select-option:active {
      background-color: #f3f4f7;
    }
    .dynamic-select .dynamic-select-header, .dynamic-select .dynamic-select-option {
      display: flex;
      box-sizing: border-box;
      align-items: center;
      border-radius: 5px;
      cursor: pointer;
      display: flex;
      width: 100%;
      height: 3rem;
      font-size: 1rem;
      color: #212529;
    }
    .dynamic-select .dynamic-select-header img, .dynamic-select .dynamic-select-option img {
      object-fit: contain;
      max-height: 75%;
      max-width: 75%;
    }
    .dynamic-select .dynamic-select-header img.dynamic-size, .dynamic-select .dynamic-select-option img.dynamic-size {
      object-fit: fill;
      max-height: none;
      max-width: none;
      border-radius: 5px;
    }
    .dynamic-select .dynamic-select-header img, .dynamic-select .dynamic-select-header svg, .dynamic-select .dynamic-select-header i, .dynamic-select .dynamic-select-header span, .dynamic-select .dynamic-select-option img, .dynamic-select .dynamic-select-option svg, .dynamic-select .dynamic-select-option i, .dynamic-select .dynamic-select-option span {
      box-sizing: border-box;
      margin-right: 10px;
    }
    .dynamic-select .dynamic-select-header.dynamic-select-no-text, .dynamic-select .dynamic-select-option.dynamic-select-no-text {
      justify-content: center;
    }
    .dynamic-select .dynamic-select-header.dynamic-select-no-text img, .dynamic-select .dynamic-select-header.dynamic-select-no-text svg, .dynamic-select .dynamic-select-header.dynamic-select-no-text i, .dynamic-select .dynamic-select-header.dynamic-select-no-text span, .dynamic-select .dynamic-select-option.dynamic-select-no-text img, .dynamic-select .dynamic-select-option.dynamic-select-no-text svg, .dynamic-select .dynamic-select-option.dynamic-select-no-text i, .dynamic-select .dynamic-select-option.dynamic-select-no-text span {
      margin-right: 0;
    }
    .dynamic-select .dynamic-select-header .dynamic-select-option-text, .dynamic-select .dynamic-select-option .dynamic-select-option-text {
      box-sizing: border-box;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: hsla(0, 0%, 61%, 1);
      font-size: inherit;
      padding-right: 1rem;
      text-align: left;
    }
  `;
  document.head.appendChild(style);
})()
function _(el) {
  return document.createElement(el);
}
function $(el) {
  return document.querySelector("." + el) || document.getElementById(el);
}
function $all(el) {
  return document.querySelectorAll("." + el) || document.getElementsByTagName(el);
}
function $first(parent) {
  return parent.firstChild;
}
function $last(parent) {
  return parent.lastChild;
}
function $insert(parent, el) {
  return parent.appendChild(el);
}
function $check(el, klas) {
  return true === el.classList.contains(klas);
}
function AddNewDiv(klas, id, parent, inner) {
  let div = document.createElement("div");
  div.className = klas, 
  div.id = id, 
  div.insertAdjacentHTML("afterbegin", inner);
  parent.appendChild(div);
  return div;
}
function AddButton(klas, id, type, title, parent, inner, fn) {
  let button = _("button");
  button.className = klas;
  button.id = id;
  button.type = type;
  button.innerHTML = title;
  button.onclick = fn;
  button.insertAdjacentHTML("afterbegin", inner);
  parent.appendChild(button);
  return button;
}
function HideElement(el) {
  return el.setAttribute("hidden", true);
}
function ShowElement(el) {
  return el.removeAttribute("hidden");
}
function ShowMessage(title, message, style, del) {
  let msg = new AlertSV(
    { offsetX: 0, offsetY: 0, gap: 20, width: 300, timing: "ease", duration: "0.5s", dimOld: true, position: "top-right" }
  );
  msg.push(
    { title: `${title}`, content: `${message}`, style: `${style}`, icon: true, dismissAfter: `${del}`, closeButton: true }
  );
}
function HideElements(items) {
  return items.forEach(item => item.setAttribute("hidden", true));
}
function ShowElements(items) {
  return items.forEach(item => item.removeAttribute("hidden"));
}
function ToggleStan(items) {
  let button = event.currentTarget;
  let active = $check(button, "active");
  items = $all(items);
  active 
    ? (button.classList.remove("active"), items.forEach(e => e.classList.remove("active"))) 
    : (button.classList.add("active"), items.forEach(e => e.classList.add("active")));
}
const isMobile = /iPhone|iPad|iPod|Android|Opera Mini|BlackBerry|IEMobile|WPDesktop|Windows Phone|webOS|/i.test(navigator.userAgent);
document.documentElement.setAttribute("data-deck", "basic");
document.documentElement.setAttribute("lang", "uk");
let Root = document.querySelector(":root");
let AllCards = [
  { suit: "hearts", name: "six" }, { suit: "hearts", name: "seven" }, { suit: "hearts", name: "eight" }, { suit: "hearts", name: "nine" }, { suit: "hearts", name: "ten" }, { suit: "hearts", name: "jack" }, { suit: "hearts", name: "queen" }, { suit: "hearts", name: "king" }, { suit: "hearts", name: "ace" }, { suit: "diamonds", name: "six" }, { suit: "diamonds", name: "seven" }, { suit: "diamonds", name: "eight" }, { suit: "diamonds", name: "nine" }, { suit: "diamonds", name: "ten" }, { suit: "diamonds", name: "jack" }, { suit: "diamonds", name: "queen" }, { suit: "diamonds", name: "king" }, { suit: "diamonds", name: "ace" }, { suit: "clubs", name: "six" }, { suit: "clubs", name: "seven" }, { suit: "clubs", name: "eight" }, { suit: "clubs", name: "nine" }, { suit: "clubs", name: "ten" }, { suit: "clubs", name: "jack" }, { suit: "clubs", name: "queen" }, { suit: "clubs", name: "king" }, { suit: "clubs", name: "ace" }, { suit: "spades", name: "six" }, { suit: "spades", name: "seven" }, { suit: "spades", name: "eight" }, { suit: "spades", name: "nine" }, { suit: "spades", name: "ten" }, { suit: "spades", name: "jack" }, { suit: "spades", name: "queen" }, { suit: "spades", name: "king" }, { suit: "spades", name: "ace" }
];
let isActive = false;
let isSelect = false;
let isStoped = false;
let Sound = _("audio");
let Ranks = [];
let Suits = [];
let Images = [];
function preload() {
  for (let i = 0; i < arguments.length; i++) {
    Images[i] = new Image();
    Images[i].src = preload.arguments[i];
  }
}
function GetUnique(tags) {
  let results = [];
  tags.forEach(tag => {
    tag = tag.trim();
    if (results.indexOf(tag) === -1) {
      results.push(tag);
    }
  });
  return results;
}
function SetCards() {
  let r = [];
  let s = [];
  for (let i = 0; i < AllCards.length; i++) {
    r.push(AllCards[i].name);
    s.push(AllCards[i].suit);
  }
  Ranks = GetUnique(r);
  Suits = GetUnique(s);
  return Ranks, Suits;
}
function PlaySound(src, vol) {
  $insert(document.body, Sound);
  let volume = Root.getAttribute("data-volume");
  volume 
    ? Sound.volume = vol 
    : Sound.volume = 0;
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      let url = URL.createObjectURL(xhr.response);
      Sound.src = url;
      Sound.addEventListener("loaded", function(e) {
        URL.revokeObjectURL(Sound.src);
      });
      Sound.play();
    }
  };
  xhr.open("GET", src, true);
  xhr.responseType = "blob";
  xhr.send();
}
function Page() {
  document.body.insertAdjacentHTML("afterbegin", `
    <div class="page">
      <header class="header"></header>
      <nav class="menu part-menu">
        <button class="value" data-id="home" data-select="true" data-color="#320b0b"><span class="menu-svg"><svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill="#7D8590" d="m1.5 13v1a.5.5 0 0 0 .3379.4731 18.9718 18.9718 0 0 0 6.1621 1.0269 18.9629 18.9629 0 0 0 6.1621-1.0269.5.5 0 0 0 .3379-.4731v-1a6.5083 6.5083 0 0 0 -4.461-6.1676 3.5 3.5 0 1 0 -4.078 0 6.5083 6.5083 0 0 0 -4.461 6.1676zm4-9a2.5 2.5 0 1 1 2.5 2.5 2.5026 2.5026 0 0 1 -2.5-2.5zm2.5 3.5a5.5066 5.5066 0 0 1 5.5 5.5v.6392a18.08 18.08 0 0 1 -11 0v-.6392a5.5066 5.5066 0 0 1 5.5-5.5z"></path></svg></span>Головна</button>
        <button class="value" data-id="rules"><span class="menu-svg"><svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#7D8590" d="m109.9 20.63a6.232 6.232 0 0 0 -8.588-.22l-57.463 51.843c-.012.011-.02.024-.031.035s-.023.017-.034.027l-4.721 4.722a1.749 1.749 0 0 0 0 2.475l.341.342-3.16 3.16a8 8 0 0 0 -1.424 1.967 11.382 11.382 0 0 0 -12.055 10.609c-.006.036-.011.074-.015.111a5.763 5.763 0 0 1 -4.928 5.41 1.75 1.75 0 0 0 -.844 3.14c4.844 3.619 9.4 4.915 13.338 4.915a17.14 17.14 0 0 0 11.738-4.545l.182-.167a11.354 11.354 0 0 0 3.348-8.081c0-.225-.02-.445-.032-.667a8.041 8.041 0 0 0 1.962-1.421l3.16-3.161.342.342a1.749 1.749 0 0 0 2.475 0l4.722-4.722c.011-.011.018-.025.029-.036s.023-.018.033-.029l51.844-57.46a6.236 6.236 0 0 0 -.219-8.589zm-70.1 81.311-.122.111c-.808.787-7.667 6.974-17.826 1.221a9.166 9.166 0 0 0 4.36-7.036 1.758 1.758 0 0 0 .036-.273 7.892 7.892 0 0 1 9.122-7.414c.017.005.031.014.048.019a1.717 1.717 0 0 0 .379.055 7.918 7.918 0 0 1 4 13.317zm5.239-10.131c-.093.093-.194.176-.293.26a11.459 11.459 0 0 0 -6.289-6.286c.084-.1.167-.2.261-.3l3.161-3.161 6.321 6.326zm7.214-4.057-9.479-9.479 2.247-2.247 9.479 9.479zm55.267-60.879-50.61 56.092-9.348-9.348 56.092-50.61a2.737 2.737 0 0 1 3.866 3.866z"></path></svg></span>Правила гри</button>
        <button class="value" data-id="profile"><span class="menu-svg"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="layer1" transform="translate(-33.022 -30.617)"><path fill="#7D8590" id="path26276" d="m49.021 31.617c-2.673 0-4.861 2.188-4.861 4.861 0 1.606.798 3.081 1.873 3.834h-7.896c-1.7 0-3.098 1.401-3.098 3.1s1.399 3.098 3.098 3.098h4.377l.223 2.641s-1.764 8.565-1.764 8.566c-.438 1.642.55 3.355 2.191 3.795s3.327-.494 3.799-2.191l2.059-5.189 2.059 5.189c.44 1.643 2.157 2.631 3.799 2.191s2.63-2.153 2.191-3.795l-1.764-8.566.223-2.641h4.377c1.699 0 3.098-1.399 3.098-3.098s-1.397-3.1-3.098-3.1h-7.928c1.102-.771 1.904-2.228 1.904-3.834 0-2.672-2.189-4.861-4.862-4.861zm0 2c1.592 0 2.861 1.27 2.861 2.861 0 1.169-.705 2.214-1.789 2.652-.501.203-.75.767-.563 1.273l.463 1.254c.145.393.519.654.938.654h8.975c.626 0 1.098.473 1.098 1.1s-.471 1.098-1.098 1.098h-5.297c-.52 0-.952.398-.996.916l-.311 3.701c-.008.096-.002.191.018.285 0 0 1.813 8.802 1.816 8.82.162.604-.173 1.186-.777 1.348s-1.184-.173-1.346-.777c-.01-.037-3.063-7.76-3.063-7.76-.334-.842-1.525-.842-1.859 0 0 0-3.052 7.723-3.063 7.76-.162.604-.741.939-1.346.777s-.939-.743-.777-1.348c.004-.019 1.816-8.82 1.816-8.82.02-.094.025-.189.018-.285l-.311-3.701c-.044-.518-.477-.916-.996-.916h-5.297c-.627 0-1.098-.471-1.098-1.098s.472-1.1 1.098-1.1h8.975c.419 0 .793-.262.938-.654l.463-1.254c.188-.507-.062-1.07-.563-1.273-1.084-.438-1.789-1.483-1.789-2.652.001-1.591 1.271-2.861 2.862-2.861z"></path></g></svg></span>Профіль</button>
        <button class="value" data-id="settings" data-color="#0a2463"><span class="menu-svg"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path fill="#7D8590" id="XMLID_1646_" d="m17.074 30h-2.148c-1.038 0-1.914-.811-1.994-1.846l-.125-1.635c-.687-.208-1.351-.484-1.985-.824l-1.246 1.067c-.788.677-1.98.631-2.715-.104l-1.52-1.52c-.734-.734-.78-1.927-.104-2.715l1.067-1.246c-.34-.635-.616-1.299-.824-1.985l-1.634-.125c-1.035-.079-1.846-.955-1.846-1.993v-2.148c0-1.038.811-1.914 1.846-1.994l1.635-.125c.208-.687.484-1.351.824-1.985l-1.068-1.247c-.676-.788-.631-1.98.104-2.715l1.52-1.52c.734-.734 1.927-.779 2.715-.104l1.246 1.067c.635-.34 1.299-.616 1.985-.824l.125-1.634c.08-1.034.956-1.845 1.994-1.845h2.148c1.038 0 1.914.811 1.994 1.846l.125 1.635c.687.208 1.351.484 1.985.824l1.246-1.067c.787-.676 1.98-.631 2.715.104l1.52 1.52c.734.734.78 1.927.104 2.715l-1.067 1.246c.34.635.616 1.299.824 1.985l1.634.125c1.035.079 1.846.955 1.846 1.993v2.148c0 1.038-.811 1.914-1.846 1.994l-1.635.125c-.208.687-.484 1.351-.824 1.985l1.067 1.246c.677.788.631 1.98-.104 2.715l-1.52 1.52c-.734.734-1.928.78-2.715.104l-1.246-1.067c-.635.34-1.299.616-1.985.824l-.125 1.634c-.079 1.035-.955 1.846-1.993 1.846zm-5.835-6.373c.848.53 1.768.912 2.734 1.135.426.099.739.462.772.898l.18 2.341 2.149-.001.18-2.34c.033-.437.347-.8.772-.898.967-.223 1.887-.604 2.734-1.135.371-.232.849-.197 1.181.089l1.784 1.529 1.52-1.52-1.529-1.784c-.285-.332-.321-.811-.089-1.181.53-.848.912-1.768 1.135-2.734.099-.426.462-.739.898-.772l2.341-.18h-.001v-2.148l-2.34-.18c-.437-.033-.8-.347-.898-.772-.223-.967-.604-1.887-1.135-2.734-.232-.37-.196-.849.089-1.181l1.529-1.784-1.52-1.52-1.784 1.529c-.332.286-.81.321-1.181.089-.848-.53-1.768-.912-2.734-1.135-.426-.099-.739-.462-.772-.898l-.18-2.341-2.148.001-.18 2.34c-.033.437-.347.8-.772.898-.967.223-1.887.604-2.734 1.135-.37.232-.849.197-1.181-.089l-1.785-1.529-1.52 1.52 1.529 1.784c.285.332.321.811.089 1.181-.53.848-.912 1.768-1.135 2.734-.099.426-.462.739-.898.772l-2.341.18.002 2.148 2.34.18c.437.033.8.347.898.772.223.967.604 1.887 1.135 2.734.232.37.196.849-.089 1.181l-1.529 1.784 1.52 1.52 1.784-1.529c.332-.287.813-.32 1.18-.089z"></path><path id="XMLID_1645_" fill="#7D8590" d="m16 23c-3.859 0-7-3.141-7-7s3.141-7 7-7 7 3.141 7 7-3.141 7-7 7zm0-12c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"></path></svg></span>Налаштування</button>
        <button class="value" data-id="apps"><span class="menu-svg"><svg fill="none" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="m11.9572 4.31201c-3.35401 0-6.00906 2.59741-6.00906 5.67742v3.29037c0 .1986-.05916.3927-.16992.5576l-1.62529 2.4193-.01077.0157c-.18701.2673-.16653.5113-.07001.6868.10031.1825.31959.3528.67282.3528h14.52603c.2546 0 .5013-.1515.6391-.3968.1315-.2343.1117-.4475-.0118-.6093-.0065-.0085-.0129-.0171-.0191-.0258l-1.7269-2.4194c-.121-.1695-.186-.3726-.186-.5809v-3.29037c0-1.54561-.6851-3.023-1.7072-4.00431-1.1617-1.01594-2.6545-1.67311-4.3019-1.67311zm-8.00906 5.67742c0-4.27483 3.64294-7.67742 8.00906-7.67742 2.2055 0 4.1606.88547 5.6378 2.18455.01.00877.0198.01774.0294.02691 1.408 1.34136 2.3419 3.34131 2.3419 5.46596v2.97007l1.5325 2.1471c.6775.8999.6054 1.9859.1552 2.7877-.4464.795-1.3171 1.4177-2.383 1.4177h-14.52603c-2.16218 0-3.55087-2.302-2.24739-4.1777l1.45056-2.1593zm4.05187 11.32257c0-.5523.44772-1 1-1h5.99999c.5523 0 1 .4477 1 1s-.4477 1-1 1h-5.99999c-.55228 0-1-.4477-1-1z" fill="#7D8590" fill-rule="evenodd"></path></svg></span>Інші додатки</button>
      </nav>
      <div class="overlay part-menu"></div>
      <div class="content"></div>
    </div>
  `);
  AddButton(
    "burger part-menu", "", "button", "", $("header"), `<svg fill="gold" width="42" height="30" id="icon" viewBox="0 0 800 600"><path d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200" id="top"></path><path d="M300,320 L540,320" id="middle"></path><path d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190" id="bottom" transform="translate(480, 320) scale(1, -1) translate(-480, -318) "></path></svg>`,
    function() {
      PlaySound("https://rawcdn.githack.com/VernyStar/Duren-Card-Game/d02e0e94f9961bdacc7f966dfb7159d8aab690b7/audio/inMenu.mp3", 0.05);
      navigator.vibrate([20, 20]);
      ToggleStan("part-menu");
    }
  );
  AddNewDiv(
    "logo", "", $("header"), `<img src="https://rawcdn.githack.com/VernyStar/Duren-Card-Game/913f7fc42b45d3a2da6ac635f87294385fc28319/images/public/mainLOGO.webp" alt="Логотип">`
  );
  AddButton(
    "author", "", "button", "Copyright © " + (new Date()).getFullYear() + " Serhii Vernii", $("menu"), "", ""
  );
  $("overlay").onclick = () => {
    ToggleStan("part-menu"), navigator.vibrate([20, 20]);
  };
  $("logo").onclick = () => {
    window.location.reload(), navigator.vibrate([20, 20]);
  };
}
function Panes() {
  $("content").insertAdjacentHTML("afterbegin", `
    <div class="pane active" id="home">
      <div class="logo-box">
        <div class="logo-text">Дурень</div>
        <img src="https://rawcdn.githack.com/VernyStar/Duren-Card-Game/913f7fc42b45d3a2da6ac635f87294385fc28319/images/logo0.webp" alt="Логотип">
        <img src="https://rawcdn.githack.com/VernyStar/Duren-Card-Game/913f7fc42b45d3a2da6ac635f87294385fc28319/images/logo1.webp" alt="Логотип">
        <img src="https://rawcdn.githack.com/VernyStar/Duren-Card-Game/913f7fc42b45d3a2da6ac635f87294385fc28319/images/logo2.webp" alt="Логотип">
      </div>
      <ul class="btn-menu">
        <li><button type="button" id="start" data-id="game" data-color="#2a7f62">Розпочати гру</button></li>
        <li><button type="button" data-id="settings" data-color="#0a2463">Налаштування</button></li>
        <li><button type="button" id="account">Аккаунт</button></li>
        <li><button type="button" id="apps">Інші ігри</button></li>
        <li><button type="button" id="exit">Вихід</button></li>
      </ul>
    </div>
    <div class="pane DurakSV" id="game"></div>
    <div class="pane" id="rules"></div>
    <div class="pane" id="profile"></div>
    <div class="pane" id="settings"></div>
    <div class="pane"></div>
  `);
  AddButton(
    "Pass GPbtn", "", "button", "Відбій", $("DurakSV"), '<svg height="40" width="40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 426.024 426.024" xml:space="preserve" fill="#000000"><g><g><g><g><path style="fill:#FCD09F;" d="M371.105,227.42L231.784,366.741c-11.13,11.13-23.794,20.626-37.604,28.185 c-6.909,3.783-13.52,8.047-19.806,12.749c-6.286,4.716-12.233,9.871-17.798,15.436l-2.913,2.913L20.224,292.587 c0,0,12.085-77.28,16.023-94.936c3.946-17.649,12.806-34.203,26.12-47.518l65.867-65.867c8.408-8.408,22.033-8.415,30.441-0.007 c5.982,5.982,9.157,13.711,9.532,21.538c0.021,0.516,0.035,1.04,0.035,1.563c-0.007,8.365-3.189,16.723-9.574,23.108 L280.85,8.287C286.379,2.758,293.62,0,300.861,0c7.248,0.007,14.482,2.772,20.011,8.301c4.702,4.702,7.396,10.649,8.089,16.787 c0.941,8.153-1.676,16.638-7.842,22.96l16.985-16.985c0.085-0.085,0.17-0.17,0.262-0.247c5.494-5.367,12.622-8.04,19.75-8.04 c7.241,0,14.489,2.765,20.011,8.287c4.702,4.702,7.396,10.649,8.089,16.787c0.955,8.266-1.747,16.879-8.096,23.229 l-20.612,20.612c5.523-5.523,12.763-8.28,20.004-8.28s14.482,2.758,20.004,8.28c4.702,4.702,7.403,10.656,8.096,16.794 c0.955,8.266-1.747,16.879-8.089,23.221l-61.455,61.455c9.525-9.525,25.081-10.034,34.754-0.657 c4.978,4.822,7.453,11.201,7.46,17.6C378.275,216.361,375.885,222.64,371.105,227.42z"></path> </g> </g> <path style="fill:#E2B991;" d="M158.669,130.468l-54.475,54.475c-2.093-2.093-3.132-4.829-3.132-7.573 c0.007-2.736,1.047-5.473,3.14-7.566l64.007-64.007c0.021,0.516,0.035,1.04,0.035,1.563 C168.236,115.725,165.054,124.083,158.669,130.468z"></path> <path style="fill:#E2B991;" d="M338.366,30.816L217.048,152.134c-2.093-2.093-3.133-4.83-3.133-7.573 c0.007-2.736,1.046-5.473,3.14-7.566L328.961,25.088c0.941,8.153-1.676,16.638-7.842,22.96l16.985-16.985 C338.189,30.978,338.274,30.894,338.366,30.816z"></path> <path style="fill:#E2B991;" d="M378.119,71.078L248.627,200.571c-2.093-2.093-3.133-4.83-3.132-7.573 c0.007-2.737,1.046-5.473,3.139-7.566L386.216,47.85C387.17,56.116,384.469,64.729,378.119,71.078z"></path> <path style="fill:#E2B991;" d="M397.522,131.706L278.248,250.98c-2.093-2.093-3.132-4.829-3.133-7.573 c0.007-2.737,1.047-5.473,3.14-7.566l127.357-127.357C406.566,116.75,403.865,125.363,397.522,131.706z"></path> </g> </g></svg>', ""
  );
  AddButton(
    "Take GPbtn", "", "button", "Взяти", $("DurakSV"), '<svg width="50" height="50" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M42.3944 34.6289C42.239 36.0423 41.0783 37.7908 40.5684 37.8297C40.0585 37.8685 39.6408 36.6397 39.5534 35.4303C39.466 34.2258 31.9872 39.7676 31.5356 39.9862C31.1957 40.1513 27.432 40.3213 24.897 41.6764C24.052 42.1281 22.566 44.2652 22.3474 44.2992C21.4733 44.4352 20.5554 43.0607 19.7541 40.9236C18.9528 38.7865 12.7076 45.5377 13.3438 48.6462C14.1936 52.8135 16.1944 66.1848 21.2305 69.8664C29.8407 76.1562 44.0407 74.8594 49.3729 68.6813C54.7052 62.5032 54.914 58.5933 59.5032 53.5129C63.3883 49.2145 68.3806 49.8701 70.2746 47.6796C71.8675 45.834 69.5122 43.0218 68.6137 42.2495C67.0209 40.875 61.169 39.3888 56.5263 44.7703C54.7198 46.8637 52.4907 48.2431 50.3442 46.3925C48.2026 44.542 48.7367 40.3067 49.742 36.868" fill="url(#paint0_linear)"></path> <path d="M19.7491 40.9235C18.9478 38.7864 17.3841 33.0795 16.0438 29.9856C14.7034 26.8917 12.6541 25.8377 10.1725 27.1491C7.69093 28.4654 9.85198 34.2257 10.289 35.6488C10.9592 37.8296 12.5035 45.3288 13.3388 48.6413" fill="url(#paint1_linear)"></path> <path d="M31.5356 39.9861C31.084 40.2047 29.5737 39.0536 29.1317 35.1291C28.7918 32.1323 28.1508 23.754 27.2572 19.5138C26.3636 15.2737 25.0427 12.8403 22.4494 12.8209C19.8561 12.8015 18.9626 16.0556 19.3074 19.5721C19.7347 23.9191 20.4777 28.5819 21.1916 33.0552C21.7452 36.5522 23.2216 44.1631 22.3474 44.2991" fill="url(#paint2_linear)"></path> <path d="M21.1865 33.0599C21.711 36.3578 23.0514 43.3179 22.4686 44.2068C23.7604 43.7016 24.7074 40.0929 24.2558 38.2569C21.6624 27.6395 21.8373 13.7048 20.8077 13.3745C19.4771 14.4479 19.04 16.9347 19.2974 19.5769C19.7345 23.9239 20.4775 28.5866 21.1865 33.0599Z" fill="url(#paint3_linear)"></path> <path d="M49.742 36.8726C50.7472 33.4387 52.85 21.1165 53.6562 17.8526C54.4623 14.5935 52.7626 12.6702 50.6452 12.165C48.5327 11.6648 46.3085 12.9276 44.9779 19.4408C44.1377 23.5499 43.2199 27.1683 42.3943 34.6238L46.5805 38.7426L49.742 36.8726Z" fill="url(#paint4_linear)"></path> <path d="M39.5486 35.4303C39.4612 34.2258 39.5923 22.4864 39.5486 19.9122C39.4758 15.0892 41.4378 6.58948 35.5178 6.02121C32.4048 5.72493 31.7394 8.60999 31.6035 9.87767C31.4675 11.1453 31.4966 25.5221 31.5889 26.8189C31.686 28.1206 31.9823 39.7628 31.5306 39.9862" fill="url(#paint5_linear)"></path> <path d="M42.3945 34.6292C42.244 35.9892 41.8069 37.4754 41.3164 37.558C45.1773 38.2186 46.304 28.6017 47.1247 22.9918C47.7609 18.6497 50.4416 15.2498 50.8107 12.2141C50.7573 12.1996 50.699 12.185 50.6456 12.1704C48.5331 11.6701 46.3088 12.933 44.9782 19.4462C44.138 23.5552 43.2201 27.1737 42.3945 34.6292Z" fill="url(#paint6_linear)"></path> <path d="M31.589 26.8237C31.6862 28.1254 31.9824 39.7676 31.5307 39.991C35.4936 39.107 34.6486 25.726 34.3669 19.0962C34.1241 13.3455 36.0181 10.1253 34.4543 6.05518C32.2446 6.42916 31.725 8.7751 31.5988 9.88249C31.4628 11.1502 31.4968 25.522 31.589 26.8237Z" fill="url(#paint7_linear)"></path> <path d="M31.2734 40.0153C30.9528 39.9619 30.2341 39.0391 29.8262 38.1162C30.0399 38.9225 30.6615 40.0202 31.2734 40.0153Z" fill="url(#paint8_linear)"></path> <path d="M68.3904 43.3665C70.1484 44.4058 70.2649 44.8138 70.2358 44.299C69.7307 43.381 69.0217 42.6039 68.6138 42.2493C67.0209 40.8748 61.169 39.3886 56.5263 44.7701C54.7197 46.8635 52.4907 48.2429 50.3442 46.3924C49.4992 45.6638 49.0135 44.4447 48.761 43.0168C48.9261 50.4285 55.2636 49.0491 58.0366 46.7469C60.8047 44.4447 63.2329 40.3163 68.3904 43.3665Z" fill="url(#paint9_linear)"></path> <path d="M31.5891 26.824C31.6862 28.1257 31.9824 39.7679 31.5308 39.9913C33.6432 40.1856 34.0074 37.9611 33.7306 34.1969C33.1625 26.4743 32.1961 15.9298 33.8375 9.33882C33.9929 8.71713 33.8618 8.04686 33.4344 7.56602C32.3224 6.32263 31.7105 8.91141 31.6036 9.8828C31.4628 11.1505 31.4968 25.5223 31.5891 26.824Z" fill="url(#paint10_linear)"></path><path d="M19.3025 19.5769C19.7299 23.9239 20.4729 28.5866 21.1867 33.0599C21.7403 36.557 23.2166 44.1679 22.3425 44.3039C26.9316 43.9931 20.0504 25.687 20.808 13.3745C19.4822 14.4431 19.0452 16.9347 19.3025 19.5769Z" fill="url(#paint11_linear)"></path><path d="M21.41 44.3527C21.7596 44.445 21.9879 44.4207 22.1336 44.3187C21.3711 44.3382 20.4873 42.8908 19.7491 40.9237C18.9478 38.7866 17.3841 33.0796 16.0437 29.9857C15.4561 28.6258 14.7276 27.6592 13.8923 27.1152C14.7373 28.5723 13.9992 28.548 15.6649 32.1859C16.5536 34.1336 19.1518 43.7602 21.41 44.3527Z" fill="url(#paint12_linear)"></path><path d="M27.3833 29.1505C27.5921 32.7835 28.7625 39.627 31.1372 39.9767C30.5933 39.7582 29.4715 38.1796 29.1267 35.1294C28.7867 32.1327 28.1457 23.7543 27.2521 19.5142C26.5285 16.0803 25.5233 13.8315 23.7896 13.0884C27.0724 17.6685 27.189 25.7166 27.3833 29.1505Z" fill="url(#paint13_linear)"></path><path d="M38.2813 21.9911C38.4513 27.4406 37.3975 37.038 40.4082 37.8006C39.9712 37.6063 39.6312 36.5135 39.5487 35.4352C39.4613 34.2307 39.5924 22.4913 39.5487 19.9171C39.4953 16.5755 40.4228 11.4708 39.0291 8.45947C39.7721 12.2625 38.1453 17.5761 38.2813 21.9911Z" fill="url(#paint14_linear)"></path> <path d="M48.7609 43.0218C48.3772 40.8313 49.1348 38.9565 49.7419 36.8728C50.7471 33.4389 52.8499 21.1168 53.6561 17.8529C53.9038 16.8572 53.9135 15.9926 53.7532 15.2495C53.389 16.76 52.3546 18.3434 52.0001 21.345C51.427 26.1583 49.3339 33.6332 48.6201 36.1977C47.9013 38.767 45.9928 43.2258 48.7609 43.0218Z" fill="url(#paint15_linear)"></path> <path d="M52.4082 56.2228C42.069 68.2051 32.0843 65.6745 28.6752 63.7803C25.2709 61.8861 22.9107 56.8299 21.3275 48.879L18.7731 40.729C18.0398 41.171 15.2765 42.9729 12.4792 44.9983C12.7949 46.4117 13.096 47.7036 13.334 48.6508C14.1838 52.8181 16.1846 66.1894 21.2207 69.871C29.831 76.1608 44.031 74.864 49.3633 68.6859C54.6955 62.5078 54.9044 58.5979 59.4936 53.5175C63.3787 49.219 68.371 49.8796 70.265 47.6842C71.1294 46.6837 70.8283 45.3966 70.2261 44.3037C68.2593 48.7285 62.7474 44.2406 52.4082 56.2228Z" fill="url(#paint16_linear)"></path> <path d="M49.8391 12.0684C47.984 12.0684 46.1386 13.7537 44.9779 19.4461C44.1378 23.5551 43.2199 27.1736 42.3943 34.6291C42.2389 36.0424 41.0783 37.791 40.5684 37.8298C40.6169 37.791 40.8743 38.0144 41.3939 37.5384C45.6432 33.6431 44.9585 24.4391 46.43 19.621C47.6052 15.7548 48.8436 14.0937 49.8391 12.0684Z" fill="url(#paint17_linear)"></path> <defs> <linearGradient id="paint0_linear" x1="22.9049" y1="80.5243" x2="40.8757" y2="48.9646" gradientUnits="userSpaceOnUse"> <stop offset="0.00132565" stop-color="#D2A374"></stop> <stop offset="1" stop-color="#DEBA94"></stop> </linearGradient> <linearGradient id="paint1_linear" x1="-3.20533" y1="65.6565" x2="14.7654" y2="34.0969" gradientUnits="userSpaceOnUse"> <stop offset="0.00132565" stop-color="#D2A374"></stop> <stop offset="1" stop-color="#DEBA94"></stop> </linearGradient> <linearGradient id="paint2_linear" x1="2.13466" y1="68.6972" x2="20.1054" y2="37.1375" gradientUnits="userSpaceOnUse"> <stop offset="0.00132565" stop-color="#D2A374"></stop> <stop offset="1" stop-color="#DEBA94"></stop> </linearGradient> <linearGradient id="paint3_linear" x1="23.0509" y1="12.2725" x2="18.2123" y2="75.6841" gradientUnits="userSpaceOnUse"> <stop stop-color="#D2A374" stop-opacity="0"></stop> <stop offset="1" stop-color="#B88653"></stop> </linearGradient> <linearGradient id="paint4_linear" x1="18.4076" y1="77.9634" x2="36.3784" y2="46.4036" gradientUnits="userSpaceOnUse"> <stop offset="0.00132565" stop-color="#D2A374"></stop> <stop offset="1" stop-color="#DEBA94"></stop> </linearGradient> <linearGradient id="paint5_linear" x1="7.36792" y1="71.6777" x2="25.3385" y2="40.1176" gradientUnits="userSpaceOnUse"> <stop offset="0.00132565" stop-color="#D2A374"></stop> <stop offset="1" stop-color="#DEBA94"></stop> </linearGradient> <linearGradient id="paint6_linear" x1="50.0533" y1="11.4962" x2="35.7109" y2="53.3089" gradientUnits="userSpaceOnUse"> <stop stop-color="#D2A374" stop-opacity="0"></stop> <stop offset="1" stop-color="#B88653"></stop> </linearGradient> <linearGradient id="paint7_linear" x1="34.5777" y1="3.73458" x2="29.0479" y2="66.8004" gradientUnits="userSpaceOnUse"> <stop stop-color="#D2A374" stop-opacity="0"></stop> <stop offset="1" stop-color="#B88653"></stop> </linearGradient> <linearGradient id="paint8_linear" x1="38.2191" y1="39.6906" x2="16.6718" y2="37.949" gradientUnits="userSpaceOnUse"> <stop stop-color="#FFBC47" stop-opacity="0"></stop> <stop offset="1" stop-color="#FFA754"></stop> </linearGradient> <linearGradient id="paint9_linear" x1="64.5608" y1="33.9178" x2="46.9355" y2="68.127" gradientUnits="userSpaceOnUse"> <stop stop-color="#D2A374" stop-opacity="0"></stop> <stop offset="1" stop-color="#B88653"></stop> </linearGradient> <linearGradient id="paint10_linear" x1="31.3308" y1="-3.28781" x2="34.6142" y2="62.1971" gradientUnits="userSpaceOnUse"> <stop stop-color="#D2A374" stop-opacity="0"></stop> <stop offset="1" stop-color="#B88653"></stop> </linearGradient> <linearGradient id="paint11_linear" x1="21.2236" y1="20.2174" x2="22.6061" y2="55.9836" gradientUnits="userSpaceOnUse"> <stop stop-color="#D2A374" stop-opacity="0"></stop> <stop offset="1" stop-color="#B88653"></stop> </linearGradient> <linearGradient id="paint12_linear" x1="15.3511" y1="25.5504" x2="20.5714" y2="45.4081" gradientUnits="userSpaceOnUse"> <stop stop-color="#D2A374" stop-opacity="0"></stop> <stop offset="1" stop-color="#B88653"></stop> </linearGradient> <linearGradient id="paint13_linear" x1="28.8684" y1="15.8364" x2="26.0639" y2="37.2472" gradientUnits="userSpaceOnUse"> <stop stop-color="#D2A374" stop-opacity="0"></stop> <stop offset="1" stop-color="#B88653"></stop> </linearGradient> <linearGradient id="paint14_linear" x1="36.314" y1="22.9256" x2="40.5317" y2="23.175" gradientUnits="userSpaceOnUse"> <stop stop-color="#D2A374" stop-opacity="0"></stop> <stop offset="1" stop-color="#B88653"></stop></linearGradient><linearGradient id="paint15_linear"x1="55.405" y1="22.9107" x2="28.4495" y2="63.3388" gradientUnits="userSpaceOnUse"> <stop stop-color="#D2A374" stop-opacity="0"></stop> <stop offset="1" stop-color="#B88653"></stop> </linearGradient> <linearGradient id="paint16_linear" x1="41.6457" y1="35.663" x2="41.6457" y2="110.545" gradientUnits="userSpaceOnUse"> <stop stop-color="#D2A374" stop-opacity="0"></stop> <stop offset="1" stop-color="#B88653"></stop></linearGradient><linearGradient id="paint17_linear" x1="48.8271" y1="25.5733" x2="28.7868" y2="22.1186" gradientUnits="userSpaceOnUse"><stop stop-color="#D2A374" stop-opacity="0"></stop> <stop offset="1" stop-color="#B88653"></stop></linearGradient></defs></g></svg>', ""
  );
  AddButton(
    "Stop GPbtn", "", "button", "Далі", $("DurakSV"), "", ""
  );
  HideElements($all("GPbtn"));
  $all("value").forEach(button => {
    button.onclick = () => {
      button.classList.add("active");
      PlaySound("https://rawcdn.githack.com/VernyStar/Duren-Card-Game/913f7fc42b45d3a2da6ac635f87294385fc28319/audio/btnMenu.mp3", 0.05);
      TogglePane();
      navigator.vibrate([15, 15]);
      setTimeout(() => {
        $all("part-menu").forEach(
          part => part.classList.remove("active"));
      }, 250)
    }
  });
  $all("btn-menu li button").forEach(button => {
    button.onclick = () => {
      TogglePane();
      navigator.vibrate([20, 20]);
      PlaySound("../audio/btnMenu.mp3", 0.05);
    }
  });
}
function TogglePane(id) {
  $all("pane").forEach(pane => {
    id = event.currentTarget.getAttribute("data-id");
    pane.classList.remove("active");
    $(id).classList.add("active");
    $("menu").querySelectorAll(".value").forEach(button => {
      button.removeAttribute("data-select");
      if (id === button.getAttribute("data-id")) {
        button.setAttribute("data-select", true);
      }
    });
    Root.style.setProperty("--body-color", event.currentTarget.getAttribute("data-color"));
    Root.style.setProperty("--hr-border", event.currentTarget.getAttribute("data-color") + "a6");
  });
  ShowElement($("logo"));
  if ($("ToMenu")) {
    $("ToMenu").remove();
  }
  if ($("turn")) {
    $("turn").remove();
  }
  if (id === "home") {
    Root.style.setProperty("--body-color", "#781418");
  } else if (id === "game") {
    Root.style.setProperty("--hr-border", "#0B3210A6");
    HideElement($("logo"));
    AddNewDiv("turn", "", $("header"), "");
    AddButton(
      "ToMenu GPbtn", "", "button", "", document.body, '<svg width="30" height="30" viewBox="0 0 117 117" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <desc></desc> <defs></defs> <g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"> <g fill-rule="nonzero" id="exit"> <path d="M82.6,88.4 C83.4,89.2 84.4,89.6 85.5,89.6 C86.6,89.6 87.6,89.2 88.4,88.4 L115.4,61.4 C115.6,61.2 115.8,61 115.9,60.8 C115.9,60.8 116,60.7 116,60.6 C116.1,60.4 116.2,60.2 116.3,60.1 C116.3,60 116.3,59.9 116.4,59.9 C116.5,59.7 116.5,59.6 116.6,59.4 C116.7,59.1 116.7,58.9 116.7,58.6 C116.7,58.3 116.7,58.1 116.6,57.8 C116.6,57.6 116.5,57.4 116.4,57.3 C116.4,57.2 116.4,57.1 116.3,57.1 C116.2,56.9 116.1,56.7 116,56.5 C116,56.5 116,56.4 115.9,56.4 C115.8,56.2 115.6,56 115.4,55.8 L88.4,28.8 C86.8,27.2 84.2,27.2 82.6,28.8 C81,30.4 81,33 82.6,34.6 L102.6,54.6 L31.5,54.6 C29.2,54.6 27.4,56.4 27.4,58.7 C27.4,61 29.2,62.8 31.5,62.8 L102.6,62.8 L82.6,82.8 C81,84.2 81,86.8 82.6,88.4 Z" fill="#17AB13" id="Shape"></path> <path d="M4.5,116.5 L58.5,116.5 C60.8,116.5 62.6,114.7 62.6,112.4 L62.6,72.1 C62.6,69.8 60.8,68 58.5,68 C56.2,68 54.4,69.8 54.4,72.1 L54.4,108.3 L8.6,108.3 L8.6,8.6 L54.4,8.6 L54.4,44.8 C54.4,47.1 56.2,48.9 58.5,48.9 C60.8,48.9 62.6,47.1 62.6,44.8 L62.6,4.5 C62.6,2.2 60.8,0.4 58.5,0.4 L4.5,0.4 C2.2,0.4 0.4,2.2 0.4,4.5 L0.4,112.4 C0.5,114.7 2.3,116.5 4.5,116.5 Z" fill="#4A4A4A"></path> </g> </g> </g></svg>', function() {
        navigator.vibrate([20, 20]);
        Engine.ToMenu();
      }
    );
    $insert($("header"), $("ToMenu"));
    Engine.LoadGamePage();
    ShowElement($("new-game"));
  }
}
function Rules() {
  $("rules").insertAdjacentHTML("afterbegin", `
    <div class="rules-card">
      <span class="title">📋 Правила гри</span>
      <p class="description">
        <strong>1.</strong> Першим атакує той, у кого на руках козирна масть <b><i>найнижчої вартості (рангу)</i></b>. Атакуючий скидає з руки будь-яку карту, а захисник повинен <b><i>побити</i></b> цю карту. Карту можна побити <b><i>старшою картою тієї ж масті</i></b> або будь-якою <b><i>картою козирної масті</i></b>, за винятком випадків, коли сама карта <b><i>не належить</i></b> до козирної масті. В останньому випадку її може побити тільки <b><i>старший козир (більшої вартості)</i></b>.<br>
        <strong>2.</strong> Якщо захисник <b><i>не може</i></b> або <b><i>не хоче</i></b> побити карту нападника, він повинен забрати її і додати до своєї колоди. Якщо захисник б'є карту, нападник може додати ще одну карту <b><i>того ж рангу</i></b> до однієї з карт на столі. Захисник також повинен побити цю карту. Захисник <b><i>не може</i></b> бути атакований кількістю карт, що перевищує кількість карт у нього на руках.<br>
        <strong>3.</strong> Якщо захисник не може побити одну або декілька карт, якими його атакували, він повинен <b><i>забрати</i></b> всі карти зі столу і додати їх до своєї колоди. Якщо захисникові вдається побити всі карти, ці карти скидаються. У наступний хід захисник атакує.<br>
        <strong>4.</strong> Якщо козирем випадає <b><i>"Туз"</i></b>, то відбувається перероздача. Якщо на початку гри ніхто з гравців не має жодного козиря на руках, відбувається перероздача.<br>
        <strong>5.</strong> Якщо в колоді, що залишилася, не залишилося карт, то козир обличчям догори бере той, чия черга брати карти. Після цього карти більше не беруться, і гра продовжується до тих пір, поки один з гравців не позбудеться своєї колоди. Той, хто залишився з картами, називається <b><i>Дурнем</i></b>.<br>
      </p>
      <div class="actions">
        <button class="pref" id="font-size">Збільшити шрифт</button>
        <button class="accept-rules" data-id="home" data-color="#320b0b">Назад</button>
      </div>
    </div>
  `);
  $("accept-rules").onclick = () => TogglePane();
  $("font-size").onclick = () => {
    let inner = $("font-size").innerHTML;
    if (inner === "Збільшити шрифт") {
      Root.style.setProperty("--font-rules", "1rem");
      Root.style.setProperty("--rules-scroll", "5px");
      $("font-size").innerHTML = "Зменшити шрифт";
    } else {
      Root.style.setProperty("--font-rules", "0.775rem");
      Root.style.setProperty("--rules-scroll", "0");
      $("font-size").innerHTML = "Збільшити шрифт";
    }
  }
}
function Settings() {
  $("settings").insertAdjacentHTML("afterbegin", `
    <div class="settings-navs">
      <button type="button" data-id="basic-settings" class="active">Базові</button>
      <button type="button" data-id="account-settings">Акаунт</button>
      <button type="button" data-id="stat-settings">Статистика</button>
    </div>
    <div class="settings-block active" id="basic-settings">
      <div class="avatar">
        <span id="foto"></span>
        <div class="acc-foto">
          <span>Виберіть фото профілю</span>
          <input type="file" accept="image/*" id="foto-input">
        </div>
      </div>
      <ul class="settings-options">
        <li>
          <div class="acc-name">
            <input id="username" type="input" class="textbox" placeholder="Ваше ім'я">
            <label id="un-lable" for="name" class="textbox-lable">Ім'я гравця</label>
          </div>
        </li>
        <li>
          <div class="acc-name">
            <input type="input" class="textbox" placeholder="Ваш нікнейм">
            <label for="name" class="textbox-lable">Нікнейм</label>
          </div>           
        </li>
        <div class="box-options">
          <li>
            <div class="option">
              <svg height="30px" width="30px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_iconCarrier"> <path style="fill:#DC2C13;" d="M316.085,257.888c0,44.365-35.633,80.327-79.593,80.327h-80.667V177.561h80.667 C280.451,177.561,316.085,213.525,316.085,257.888z"></path> <path style="fill:#B21100;" d="M308.584,223.837c4.803,10.34,7.501,21.875,7.501,34.05c0,44.365-35.633,80.327-79.593,80.327 h-80.666v-68.1h80.667C268.387,270.114,295.885,251.175,308.584,223.837z"></path> <path style="fill:#234556;" d="M50.714,157.927h82.852v199.925H50.714C22.824,357.851,0,334.822,0,306.673v-97.571 C0,180.957,22.824,157.927,50.714,157.927L50.714,157.927z"></path> <path style="fill:#071C23;" d="M133.565,357.851H66.783V157.959h66.783V357.851z"></path> <path style="fill:#415E70;" d="M101.422,157.925L209.283,30.27h27.209v455.238h-27.209L101.422,357.851V157.925L101.422,157.925z"></path> <path style="fill:#F2702F;" d="M357.308,107.985c33.906,37.467,53.352,92.052,53.352,149.758c0,55.579-18.261,108.814-50.1,146.06 c-1.981,2.317-4.796,3.508-7.628,3.508c-2.298,0-4.609-0.785-6.495-2.39c-4.21-3.582-4.712-9.889-1.122-14.088 c28.796-33.684,45.31-82.194,45.31-133.091c0-52.821-17.564-102.525-48.188-136.366c-3.708-4.096-3.384-10.416,0.723-14.115 C347.266,103.564,353.601,103.888,357.308,107.985z M429.028,25.558c-3.708-4.097-10.042-4.419-14.148-0.72 s-4.43,10.017-0.722,14.115c49.448,54.634,77.807,134.751,77.807,219.808c0,81.938-26.657,160.12-73.136,214.502 c-3.59,4.201-3.086,10.507,1.124,14.088c1.885,1.604,4.196,2.389,6.493,2.389c2.832,0,5.646-1.191,7.628-3.509 C483.597,428.287,512,345.377,512,258.76C512,168.817,481.757,83.819,429.028,25.558z"></path></g></svg>
              <span style="padding-left: 1.15rem">Звук</span>
              <input class="toggler" type="checkbox" id="settings-volume" checked>
            </div>
          </li>
          <li>
            <div class="option">
              <svg style="margin-left: -5px" width="38px" height="38px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 12.1333C2 8.58633 2 6.81283 2.69029 5.45806C3.29749 4.26637 4.26637 3.29749 5.45806 2.69029C6.81283 2 8.58633 2 12.1333 2H19.8667C23.4137 2 25.1872 2 26.5419 2.69029C27.7336 3.29749 28.7025 4.26637 29.3097 5.45806C30 6.81283 30 8.58633 30 12.1333V19.8667C30 23.4137 30 25.1872 29.3097 26.5419C28.7025 27.7336 27.7336 28.7025 26.5419 29.3097C25.1872 30 23.4137 30 19.8667 30H12.1333C8.58633 30 6.81283 30 5.45806 29.3097C4.26637 28.7025 3.29749 27.7336 2.69029 26.5419C2 25.1872 2 23.4137 2 19.8667V12.1333Z" fill="#00005B"></path> <path d="M12.8157 18.9018H8.46207L7.57628 21.8194C7.55168 21.9276 7.45513 22.0042 7.3501 21.9989H5.14503C5.01928 21.9989 4.97531 21.9258 5.0131 21.7795L8.78245 10.3383C8.82018 10.2186 8.85784 10.1017 8.89557 9.94863C8.94487 9.68251 8.97011 9.41204 8.97095 9.14086C8.96015 9.06073 9.02717 8.9898 9.10288 9.00121H12.0995C12.1873 9.00121 12.2376 9.03446 12.2503 9.10096L16.5286 21.7994C16.5662 21.9325 16.5285 21.999 16.4155 21.9989H13.9653C13.8794 22.009 13.7973 21.9482 13.7769 21.8593L12.8157 18.9018ZM9.14055 16.4417H12.1184C11.6291 14.7166 11.077 13.0142 10.6295 11.2758C10.1224 13.0791 9.65412 14.7516 9.14055 16.4417Z" fill="#9999FF"></path> <path d="M17.7262 21.7823V14.3625C17.7262 14.1366 17.723 13.884 17.7168 13.6046C17.7103 13.3254 17.7009 13.0594 17.6885 12.8068C17.6758 12.5543 17.6633 12.3549 17.6508 12.2084C17.6161 12.1144 17.6983 12.042 17.7827 12.0488H19.7428C20.0964 12.0366 20.156 12.5809 20.1763 12.8666C20.5407 12.5288 20.963 12.2681 21.4202 12.0987C21.8748 11.9322 22.3526 11.8479 22.8337 11.8494C23.2083 11.8512 23.5803 11.9152 23.9362 12.0389C24.3471 12.1779 24.7218 12.416 25.0309 12.7345C25.34 13.0529 25.5749 13.443 25.7173 13.8739C25.9057 14.3859 26 15.0474 26 15.8585V21.7823C26 21.902 25.9497 21.9618 25.8492 21.9618H23.5687C23.4605 21.9783 23.3647 21.8769 23.3802 21.7624V16.0978C23.3915 15.7499 23.3337 15.4034 23.2106 15.0806C22.7165 13.8564 21.1101 14.1251 20.3459 14.8811V21.7823C20.3459 21.902 20.2956 21.9618 20.1951 21.9618H17.8958C17.7984 21.9765 17.7123 21.8853 17.7262 21.7823Z" fill="#9999FF"></path></g></svg>
              <span style="padding-left: 0.75rem">Анімації</span>
              <input class="toggler" type="checkbox" id="anim-settings" checked>
            </div>
          </li>
        </div>
        <li>
          <div class="option">
            <select id="cardsize" name="country" data-placeholder="Виберіть розмір карт" data-dynamic-select>
              <option value="L" data-img="../images/assets/l.png"> Стандарт</option>
              <option value="S" data-img="../images/assets/s.png"> Маленькі</option>
              <option value="XL" data-img="../images/assets/xl.png">Великі</option>
            </select>
          </div>
        </li>
        <li class="suit">
          <select id="suit" name="photo"></select>
        </li>
      </ul>
    </div>
    <div class="settings-block" id="account-settings"></div>
    <div class="settings-block" id="stat-settings"></div>
  `);
  ToggleVolume(), OffAnimations(), UserAvatar(), GetName(), GetSuitPicture();
}
function ToggleVolume() {
  let btn = $("settings-volume");
  let PrefVolume = () => localStorage.getItem("volume");
  let SetPrefVolume = volume => localStorage.setItem("volume", volume);
  let GetVolume = () => {
    let volume = PrefVolume();
    if (volume) {
      return volume;
    }
    return btn.checked ? "on" : "off";
  };
  let SetVolume = volume => {
    if (volume === "on") {
      btn.checked = true, Root.setAttribute("data-volume", true);
    } else {
      btn.checked = false, Root.removeAttribute("data-volume");
    }
  };
  SetVolume(GetVolume());
  window.addEventListener("DOMContentLoaded", () => {
    GetVolume();
    btn.addEventListener("change", () => {
      btn.checked ? SetPrefVolume("on") : SetPrefVolume("off");
      SetVolume(GetVolume());
    });
  });
}
function ToggleSuit(value) {
  let input = $("photo").querySelector("input");
  value = input.value;
  let PrefSuit = () => localStorage.getItem("suit");
  let SetPrefSuit = suit => localStorage.setItem("suit", suit);
  let GetSuitCard = () => {
    let suit = PrefSuit();
    if (suit) {
      return suit;
    }
    return value;
  }
  let SetSuit = suit => {
    if (suit === "bicycle") {
      Root.style.setProperty("--card-back", "url('../images/deck/bicycle/Bicycle.jpg')");
      Root.style.setProperty("--card-back-bg-size", "100% 100%");
      Root.style.setProperty("--card-back-bg-position", "center center");
    } else if (suit === "tally-ho") {
      Root.style.setProperty("--card-back", "url('../images/deck/tally-ho.jpg')");
      Root.style.setProperty("--card-back-bg-size", "100% 100%");
      Root.style.setProperty("--card-back-bg-position", "center center");
    } else if (suit === "bicycle-blue") {
      Root.style.setProperty("--card-back", "url('../images/deck/bicycle/Bicycle-blue.png')");
      Root.style.setProperty("--card-back-bg-size", "100% 100%");
      Root.style.setProperty("--card-back-bg-position", "center center");
    } else {
      Root.style.setProperty("--card-back", "var(--cards-img)");
      Root.style.setProperty("--card-back-bg-size", "var(--cards-bg-size)");
      Root.style.setProperty("--card-back-bg-position", "-1527.95px -8.9px");
    }
    localStorage.setItem("suit", value);
  }
  SetSuit(GetSuitCard());
  window.addEventListener("DOMContentLoaded", () => {
    GetSuitCard();
    input.addEventListener("change", () => {
      SetPrefSuit(value);
      SetSuit(GetSuitCard());
    });
  });
}
function OffAnimations() {
  let btn = $("anim-settings");
  let UserPref = () => localStorage.getItem("isAnim");
  let SetPref = anim => localStorage.setItem("isAnim", anim);
  let GetPrefAnim = () => {
    let saved = UserPref();
    if (saved) {
      return saved;
    }
    return btn.checked ? "on" : "off";
  };
  let SetAnim = anim => {
    if (anim === "off") {
      btn.checked = false, Root.setAttribute("data-reduce", true);
    } else {
      btn.checked = true, Root.removeAttribute("data-reduce");
    }
  };
  SetAnim(GetPrefAnim());
  window.addEventListener("DOMContentLoaded", () => {
    GetPrefAnim();
    btn.addEventListener("change", () => {
      btn.checked ? SetPref("on") : SetPref("off");
      SetAnim(GetPrefAnim());
    });
  });
}
function UserAvatar() {
  let GetAvatar = () => localStorage.getItem("avatar");
  let image = _("img");
  image.id = "img";
  image.alt = "Фото профілю";
  $insert($("foto"), image);
  let SetAvatar = () => {
    let photo = $("foto-input").files[0];
    let reader = new FileReader();
    reader.onloadend = function() {
      image.src = reader.result;
      localStorage.setItem("avatar", reader.result);
    }
    if (photo) {
      reader.readAsDataURL(photo);
    }
  }
  let CreateAvatar = (ava) => {
    image.src = ava;
    if (ava) {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", ava);
      xhr.responseType = "blob";
      xhr.onload = (function(e) {
        let create = window.URL || window.webkitURL;
        let pic = create.createObjectURL(this.response);
        image.src = pic;
      });
      xhr.send();
      xhr.onerror = function() {
        ShowMessage(
          "Помилка", "На жаль, сталася помилка при завантаженні фото. Спробуйте ще раз.", "error", "5s"
        );
      }
    } else {
      image.src = "https://i.postimg.cc/vTvNKTDN/avatar-female.webp";
    }
  }
  window.addEventListener("DOMContentLoaded", () => {
    CreateAvatar(GetAvatar());
    $("foto-input").addEventListener("change", () => {
      SetAvatar();
    })
  });
}
function GetName() {
  let UserName = () => localStorage.getItem("user");
  let SetName = (name) => localStorage.setItem("user", name);
  let PlayerName = () => {
    let username = UserName();
    if (username) {
      return $("un-lable").innerHTML = username;
    } else {
      return $("un-lable").innerHTML = "Стицько";
    }
  }
  SetName(PlayerName());
  window.addEventListener("DOMContentLoaded", () => {
    PlayerName();
    $("username").addEventListener("click", (event) => {
      event.preventDefault();
      let user = prompt("Вкажіть своє ім'я, будь ласка!", "") || "Стицько";
      SetName(user);
      if (user !== "Стицько" && user !== null) {
        ShowMessage(
          "Успіх!", "Ім'я успішно змінено", "success", "4s"
        );
      }
      $("un-lable").innerHTML = user;
      $("un-lable").style.color = "green";
      $("username").blur();
    });
  });
}
function GameField() {
  $("game").insertAdjacentHTML("afterbegin", `
    <div class="top"></div>
    <div class="opponent"></div>
    <div class="table">
      <div class="deck"></div>
      <div class="main">
        <div class="Attack"></div>
        <div class="Defend"></div>
      </div>
    </div>
    <div class="middle"></div>
    <div class="player"></div>
    <div class="bottom"></div>
  `);
  GetPlayers(), GetLeft();
}
function GetPlayers(choise) {
  choise = Math.floor(Math.random() * 2);
  let photo, user, name = "";
  let girls = ["Олена", "Настя", "Марина", "Юля", "Яна", "Інна", "Соломія", "Дарина", "Ксенія", "Кіра", "Катя", "Тетяна", "Аня"];
  let $boys = ["Сергій", "Макс", "Славік", "Влад", "Євген", "Олег", "Петро", "Володимир", "Нікіта", "Роман", "Андрій", "Дмитро"];
  if (choise === 1) {
    name += girls[Math.floor(Math.random() * girls.length)];
    photo = "https://i.postimg.cc/vTvNKTDN/avatar-female.webp";
  } else {
    name += $boys[Math.floor(Math.random() * $boys.length)];
    photo = "https://i.postimg.cc/XNKmqHxk/avatar-male.webp";
  }
  AddNewDiv(
    "enemy", "enemy", $("top"), `<img src="${photo}" alt="Фото суперника"><span>Стіл опонента</span>
  `);
  AddButton(
    "username", "", "button", name, $("enemy"), "", ""
  );
  let Avatar = localStorage.getItem("avatar");
  if (!Avatar) {
    Avatar = "https://i.postimg.cc/XNKmqHxk/avatar-male.webp";
  }
  user = localStorage.getItem("user");
  if (!user) {
    user = promt("Вкажіть своє ім'я, будь ласка!", "") || "Стицько";
    localStorage.setItem("user", user);
  }
  AddNewDiv(
    "user", "user", $("bottom"), `<img src="${Avatar}" alt="Ваш аватар"><span>Ваш стіл</span>
  `);
  AddButton(
    "username", "", "button", user, $("user"), "", ""
  );
}
function GetLeft() {
  let l1 = `${($("Attack").clientWidth / 4) + "px"}`;
  let l2 = `${2 * ($("Attack").clientWidth / 4) + "px"}`;
  Root.style.setProperty("--l1", l1);
  Root.style.setProperty("--l2", l2);
}
function CreateApp() {
  Page(), Panes(), Rules(), Settings(), GameField();
  document.querySelectorAll("[data-dynamic-select]").forEach(
    select => new DynamicSelect(select)
  );
}
preload(
  "https://rawcdn.githack.com/VernyStar/Duren-Card-Game/913f7fc42b45d3a2da6ac635f87294385fc28319/images/bgMain.webp",
  "https://rawcdn.githack.com/VernyStar/Duren-Card-Game/913f7fc42b45d3a2da6ac635f87294385fc28319/images/ribbon.webp",
  "https://rawcdn.githack.com/VernyStar/Duren-Card-Game/913f7fc42b45d3a2da6ac635f87294385fc28319/images/logo0.webp",
  "https://rawcdn.githack.com/VernyStar/Duren-Card-Game/913f7fc42b45d3a2da6ac635f87294385fc28319/images/logo1.webp",
  "https://rawcdn.githack.com/VernyStar/Duren-Card-Game/913f7fc42b45d3a2da6ac635f87294385fc28319/images/logo2.webp",
  "https://rawcdn.githack.com/VernyStar/Duren-Card-Game/913f7fc42b45d3a2da6ac635f87294385fc28319/images/public/mainLOGO.webp"
);
window.onload = CreateApp();
class PlayCard {
  constructor(rank, suit, cost) {
    this.$rank = rank;
    this.$suit = suit;
    this.$cost = cost;
  }
}
class PlayDeck {
  constructor() {
    this.$deck = [];
  }
  ClearDeck() {
    this.$deck = [];
  }
  get Deck() {
    return this.$deck;
  }
  set Deck(card) {
    this.$deck.push(card);
  }
  LastCard() {
    return this.$deck.pop();
  }
  DelCard(card) {
    for (let i = 0; i < this.$deck.length; i++) {
      if (card === this.$deck[i]) {
        for (let k = i; k < this.$deck.length; k++) {
          this.Deck[k] = this.$deck[k + 1];
        }
        break;
      }
    }
    this.LastCard();
    return card;
  }
}
class GetDeck extends PlayDeck {
  constructor(player, opponent) {
    super();
    this.$player = player;
    this.$opponent = opponent;
    this.$turn = 0;
  }
  InsertCards() {
    for (let rank of Ranks) {
      for (let suit of Suits) {
        let cost = this.GetCost(0, rank);
        this.$deck.push(new PlayCard(rank, suit, cost));
      }
    }
  }
  CreateDeck(deck) {
    for (let i = 0; i < deck.length; i++) {
      AddNewDiv(
        "card-back", "card", $("deck"), ""
      );
    }
  }
  GetRank(card) {
    let rank = "";
    let j = 0;
    for (let i = 0; i < card.className.length; i++) {
      if (card.className[i] === "-") {
        j = i + 1;
        break;
      }
      rank += card.className[i];
    }
    return rank;
  }
  GetSuit(card) {
    let suit = "";
    let j = 0;
    for (let i = 0; i < card.className.length; i++) {
      if (card.className[i] === "-") {
        j = i + 1;
        break;
      }
    }
    for (j; j < card.className.length; j++) {
      suit += card.className[j];
    }
    return suit;
  }
  GetCost(cost, rank) {
    switch (rank) {
      case "six":
        cost = 6;
        break;
      case "seven":
        cost = 7;
        break;
      case "eight":
        cost = 8;
        break;
      case "nine":
        cost = 9;
        break;
      case "ten":
        cost = 10;
        break;
      case "jack":
        cost = 11;
        break;
      case "queen":
        cost = 12;
        break;
      case "king":
        cost = 13;
        break;
      case "ace":
        cost = 14;
        break;
    }
    return cost;
  }
  GetFull(card, item) {
    let current;
    let suit = this.GetSuit(card);
    let rank = this.GetRank(card);
    for (let i = 0; i < item.length; i++) {
      if ((item[i].$rank === rank) && (item[i].$suit === suit)) {
        current = item[i];
        break;
      }
    }
    return current;
  }
  GetCard(i, field) {
    return $(field).children[i];
  }
  ShowCard(current, card) {
    card.className = current.$rank + "-" + current.$suit;
  }
  CloseCard(card) {
    card.className = "card-back";
  }
  ShuffleCards() {
    for (let i = 0; i < 1000; i++) {
      let a = Math.floor(Math.random() * this.$deck.length);
      let b = Math.floor(Math.random() * this.$deck.length);
      let c = this.$deck[a];
      this.$deck[a] = this.$deck[b];
      this.$deck[b] = c;
    }
  }
  AddKozir() {
    let kozir = this.DelCard(this.$deck[23]);
    this.$deck.unshift(kozir);
    for (let i = 0; i < this.$deck.length; i++) {
      if (kozir.$suit === this.$deck[i].$suit) {
        this.$deck[i].$cost += 9;
      }
    }
    return kozir;
  }
  GetKozir(kozir, check) {
    let current = $first($("deck"));
    let spot, spotname;
    if (check === true) {
      switch (kozir.$suit) {
        case "hearts":
          spot = "&hearts;", spotname = "Чирва";
          break;
        case "diamonds":
          spot = "&diams;", spotname = "Бубни";
          break;
        case "clubs":
          spot = "&clubs;", spotname = "Хрести";
          break;
        case "spades":
          spot = "&spades;", spotname = "Піки";
          break;
      }
      this.ShowCard(kozir, current);
      current.setAttribute("trump", true);
      let trump = $("kozir-now");
      if (trump) trump.remove();
      AddButton(
        "kozir-now", "", "button", "Козир: " + " " + spot, $("DurakSV"), "", "");
    } else {
      return;
    }
  }
  GetMinOppTrump() {
    let trumps = [], result;
    for (let i = 0; i < this.$opponent.$deck.length; i++) {
      trumps.push(this.$opponent.$deck[i].$cost);
      result = Math.min.apply(null, trumps.filter(trump => trump > 14));
    }
    return result;
  }
  GetMinPlrTrump() {
    let trumps = [], result;
    for (let i = 0; i < this.$player.$deck.length; i++) {
      trumps.push(this.$player.$deck[i].$cost);
      result = Math.min.apply(null, trumps.filter(trump => trump > 14));
    }
    return result;
  }
  FirstTurn() {
    let res1, res2;
    res1 = this.GetMinOppTrump();
    res2 = this.GetMinPlrTrump();
    if (res1 > res2) {
      ShowMessage("Інфо", "У вас найнижчий козир. Ваш хід🙂", "verified", "5s");
      this.$turn = 1;
    } else if (res1 < res2) {
      ShowMessage("Інфо", "У суперника найнижчий козир. Хід за ним😔", "verified", "5s");
      this.$turn = 0;
    } else if (res1 === null && res2 !== null) {
      ShowMessage("Інфо", "Суперник не має козиря на відміну від вас. Ваш хід🙂", "verified", "5s");
      this.$turn = 1;
    } else if (res1 !== null && res2 === null) {
      ShowMessage("Інфо", "Ви не маєте козиря на відміну від суперника. Хід за ним😔", "verified", "5s");
      this.$turn = 0;
    } else {
      ShowMessage("Інфо", "В жодного з гравців немає козиря🤔", "verified", "5s");
      this.$turn = 0;
    }
  }
  ViewTurn(turn) {
    turn === true 
      ? ($("turn").innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.843 511.843" xml:space="preserve" width="32px" height="35px" fill="#000000"><g id="SVGRepo_iconCarrier"> <polygon style="fill:#E5E8EC;" points="127.961,251.367 184.443,504.626 327.743,501.3 383.883,248.04 "></polygon> <path style="fill:#F5BA45;" d="M255.922,106.631L255.922,106.631c28.491,0,55.264-11.091,75.398-31.233 C351.47,55.264,362.56,28.483,362.56,0h21.322c0,70.674-57.295,127.961-127.961,127.961l0,0v-21.33H255.922z"></path> <rect x="245.251" y="396.721" style="fill:#424953;" width="21.337" height="46.986"></rect> <rect x="223.242" y="426.521" style="fill:#EC5564;" width="63.98" height="78.1"></rect> <path style="fill:#CBD0D8;" d="M116.604,255.921l55.452,255.922h166.355l55.436-255.922H116.604z M321.199,490.506H189.254 l-46.205-213.247h224.369L321.199,490.506z"></path> <path style="fill:#EC5564;" d="M276.978,120.704c-1.64,10.146-10.466,17.917-21.056,17.917c-10.591,0-19.416-7.771-21.056-17.917 c-39.613,4.14-122.713,24.118-159.53,156.555h361.172C399.691,144.822,316.591,124.844,276.978,120.704z"></path> <path style="fill:#FECD57;" d="M255.233,405.22c-11.762,0-21.337-9.576-21.337-21.338c0-6.795,10.028-22.68,21.337-36.801 c11.309,14.121,21.322,30.006,21.322,36.801C276.557,395.644,266.996,405.22,255.233,405.22z"></path> <path style="fill:#F5BA45;" d="M255.233,330.555c0,0-31.99,35.661-31.99,53.327c0,17.667,14.324,31.99,31.99,31.99 c17.666,0,31.99-14.323,31.99-31.99C287.225,366.216,255.233,330.555,255.233,330.555z M255.233,394.535 c-5.764,0-10.465-4.577-10.653-10.278c0.219-1.031,1.796-6.717,10.653-19.338c8.841,12.621,10.434,18.307,10.652,19.338 C265.699,389.958,260.983,394.535,255.233,394.535z"></path> <g> <path style="fill:#D94452;" d="M429.697,255.46h-35.146v-20.868h27.008c-3.312-7.607-6.811-14.699-10.449-21.322h-59.904v-21.329 h46.611c-5.655-7.966-11.513-15.042-17.526-21.329h-71.743V149.29h47.031c-14.807-10.387-29.631-17.033-43.174-21.329h-38.02 c-3.702,6.365-10.59,10.661-18.463,10.661c-7.873,0-14.761-4.296-18.463-10.661h-38.02c-13.543,4.296-28.366,10.942-43.174,21.329 h45.642v21.322h-70.354c-6.014,6.287-11.871,13.363-17.526,21.329h45.236v21.329h-58.529c-3.64,6.623-7.139,13.715-10.45,21.322 h26.32v20.868H82.146c-2.358,6.764-4.592,13.863-6.686,21.33h360.922C434.289,269.323,432.055,262.224,429.697,255.46z M329.867,191.941v21.329h-63.98v-21.329H329.867z M223.243,149.289h63.98v21.322h-63.98V149.289z M180.586,191.941h63.98v21.329 h-63.98V191.941z M201.906,255.46h-63.98v-20.868h63.98V255.46z M287.225,255.46h-63.98v-20.868h63.98V255.46z M373.214,255.46 h-64.667v-20.868h64.667V255.46z"></path> <path style="fill:#D94452;" d="M255.922,85.309c-17.667,0-31.99,14.324-31.99,31.99c0,17.667,14.324,31.99,31.99,31.99 s31.99-14.323,31.99-31.99C287.911,99.633,273.587,85.309,255.922,85.309z M255.922,127.96c-5.874,0-10.669-4.787-10.669-10.661 c0-5.881,4.795-10.668,10.669-10.668c5.873,0,10.668,4.787,10.668,10.668C266.59,123.173,261.794,127.96,255.922,127.96z"></path> </g> <path style="fill:#FECD57;" d="M255.922,106.631L255.922,106.631c-28.492,0-55.265-11.091-75.399-31.233 C160.372,55.264,149.281,28.483,149.281,0h-21.321c0,70.674,57.295,127.961,127.961,127.961l0,0c5.889,0,10.668-4.771,10.668-10.661 C266.59,111.41,261.811,106.631,255.922,106.631z"></path> </g></svg><p>Ваш хід</p>`, document.querySelector(":root").style.setProperty("--turn", "#66f605"))
      : ($("turn").innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.843 511.843" xml:space="preserve" width="32px" height="35px" fill="#000000"><g id="SVGRepo_iconCarrier"> <polygon style="fill:#E5E8EC;" points="127.961,251.367 184.443,504.626 327.743,501.3 383.883,248.04 "></polygon> <path style="fill:#F5BA45;" d="M255.922,106.631L255.922,106.631c28.491,0,55.264-11.091,75.398-31.233 C351.47,55.264,362.56,28.483,362.56,0h21.322c0,70.674-57.295,127.961-127.961,127.961l0,0v-21.33H255.922z"></path> <rect x="245.251" y="396.721" style="fill:#424953;" width="21.337" height="46.986"></rect> <rect x="223.242" y="426.521" style="fill:#EC5564;" width="63.98" height="78.1"></rect> <path style="fill:#CBD0D8;" d="M116.604,255.921l55.452,255.922h166.355l55.436-255.922H116.604z M321.199,490.506H189.254 l-46.205-213.247h224.369L321.199,490.506z"></path> <path style="fill:#EC5564;" d="M276.978,120.704c-1.64,10.146-10.466,17.917-21.056,17.917c-10.591,0-19.416-7.771-21.056-17.917 c-39.613,4.14-122.713,24.118-159.53,156.555h361.172C399.691,144.822,316.591,124.844,276.978,120.704z"></path> <path style="fill:#FECD57;" d="M255.233,405.22c-11.762,0-21.337-9.576-21.337-21.338c0-6.795,10.028-22.68,21.337-36.801 c11.309,14.121,21.322,30.006,21.322,36.801C276.557,395.644,266.996,405.22,255.233,405.22z"></path> <path style="fill:#F5BA45;" d="M255.233,330.555c0,0-31.99,35.661-31.99,53.327c0,17.667,14.324,31.99,31.99,31.99 c17.666,0,31.99-14.323,31.99-31.99C287.225,366.216,255.233,330.555,255.233,330.555z M255.233,394.535 c-5.764,0-10.465-4.577-10.653-10.278c0.219-1.031,1.796-6.717,10.653-19.338c8.841,12.621,10.434,18.307,10.652,19.338 C265.699,389.958,260.983,394.535,255.233,394.535z"></path> <g> <path style="fill:#D94452;" d="M429.697,255.46h-35.146v-20.868h27.008c-3.312-7.607-6.811-14.699-10.449-21.322h-59.904v-21.329 h46.611c-5.655-7.966-11.513-15.042-17.526-21.329h-71.743V149.29h47.031c-14.807-10.387-29.631-17.033-43.174-21.329h-38.02 c-3.702,6.365-10.59,10.661-18.463,10.661c-7.873,0-14.761-4.296-18.463-10.661h-38.02c-13.543,4.296-28.366,10.942-43.174,21.329 h45.642v21.322h-70.354c-6.014,6.287-11.871,13.363-17.526,21.329h45.236v21.329h-58.529c-3.64,6.623-7.139,13.715-10.45,21.322 h26.32v20.868H82.146c-2.358,6.764-4.592,13.863-6.686,21.33h360.922C434.289,269.323,432.055,262.224,429.697,255.46z M329.867,191.941v21.329h-63.98v-21.329H329.867z M223.243,149.289h63.98v21.322h-63.98V149.289z M180.586,191.941h63.98v21.329 h-63.98V191.941z M201.906,255.46h-63.98v-20.868h63.98V255.46z M287.225,255.46h-63.98v-20.868h63.98V255.46z M373.214,255.46 h-64.667v-20.868h64.667V255.46z"></path> <path style="fill:#D94452;" d="M255.922,85.309c-17.667,0-31.99,14.324-31.99,31.99c0,17.667,14.324,31.99,31.99,31.99 s31.99-14.323,31.99-31.99C287.911,99.633,273.587,85.309,255.922,85.309z M255.922,127.96c-5.874,0-10.669-4.787-10.669-10.661 c0-5.881,4.795-10.668,10.669-10.668c5.873,0,10.668,4.787,10.668,10.668C266.59,123.173,261.794,127.96,255.922,127.96z"></path> </g> <path style="fill:#FECD57;" d="M255.922,106.631L255.922,106.631c-28.492,0-55.265-11.091-75.399-31.233 C160.372,55.264,149.281,28.483,149.281,0h-21.321c0,70.674,57.295,127.961,127.961,127.961l0,0c5.889,0,10.668-4.771,10.668-10.661 C266.59,111.41,261.811,106.631,255.922,106.631z"></path> </g></svg><p>Хід суперника</p>`, document.querySelector(":root").style.setProperty("--turn", "red"));
  }
  ChangeTurn() {
    this.$turn ? this.$turn = 0 : this.$turn = 1;
  }
  CheckAce() {
    if ((this.$player.$deck.length === 6) && (this.$opponent.$deck.length === 6)) {
      if (this.$deck[23].$rank === "ace") {
        ShowMessage("Інфо", "Туз не може бути козирем! Тасуємо колоду і вибираємо іншу карту.", "verified", "4s");
        setTimeout(() => {
          this.ShuffleCards();
        }, 2500);
      }
    }
  }
  ExitToMenu(check) {
    (check || confirm("Вийти з гри?")) && window.location.reload();
  }
  OpacityCard(card, spot) {
    "easy" === document.documentElement.getAttribute("data-difficult") && (
      spot 
        ? (card.style.opacity = "0.15", card.style.top = "10px") 
        : (card.style.opacity = "1", card.style.top = "")
    );
  }
  CardPlace(field) {
    let length = $(field).querySelectorAll("div").length;
    for (let i = 0; i < length; i++) {
      $(field).querySelectorAll("div")[i].style.left = `${parseInt(i) * ($(field).clientWidth / (length + 1)) + "px"}`;
    }
  }
  DropCards(check) {
    if (check === true) {
      if (this.$turn === 1) {
        this.DropOnStartPlayer(this.$player, "player");
        this.DropOnStartPlayer(this.$opponent, "opponent");
      } else {
        this.DropOnStartPlayer(this.$opponent, "opponent");
        this.DropOnStartPlayer(this.$player, "player");
      }
    } else {
      if (this.$turn === 1) {
        this.DropCardsPlayer(this.$player);
        this.DropCardsPlayer(this.$opponent);
      } else {
        this.DropCardsPlayer(this.$opponent);
        this.DropCardsPlayer(this.$player);
      }
    }
  }
  DropOnStartPlayer(player, field) {
    let rpt = 6, interval = null, card;
    interval = setInterval(() => {
      card = this.LastCard();
      player.Deck = card;
      let current = $("deck").children[$("deck").children.length - 1];
      current.remove();
      this.CloseCard(current);
      field === "player" ? (current.setAttribute("anim0", true), setTimeout(() => { current.className = card.$rank + "-" + card.$suit }, 1600)) : (current.setAttribute("anim1", true));
      $insert($(field), current);
      for (let i = 0; i < player.$deck.length; i++) {
        $(field).querySelectorAll("div")[i].style.left = `${parseInt(i) * ($(field).clientWidth / 7) + "px"}`;
      }
      rpt--;
      if (rpt <= 0) {
        clearInterval(interval);
        this.CheckAce();
        setTimeout(() => {
          $("player").querySelectorAll("div").forEach(el => el.removeAttribute("anim0"));
          $("opponent").querySelectorAll("div").forEach(el => el.removeAttribute("anim1"));
          $("player").style.pointerEvents = "auto";
        }, 3000);
      }
    }, 3000);
  }
  DropCardsPlayer(player) {
    let card;
    while ((player.$deck.length < 6) && (this.$deck.length !== 0)) {
      card = this.LastCard();
      player.Deck = card;
    }
    return;
  }
  TakeCardsByHand(item, field) {
    let card = $("deck").children[$("deck").children.length - 1];
    card.remove();
    $insert($(field), card);
    let length = $(field).children.length;
    for (let i = 0; i < length; i++) {
      $(field).className === "player" 
        ? (this.ShowCard(item, card), this.CardPlace("player"), card.style.transform = "rotate(0deg)") 
        : (this.CloseCard(card), this.CardPlace("opponent"), card.style.transform = "rotate(0deg)");
    }
    if ($("deck").children.length === 1) {
      this.GetKozir($first($("deck")), false);
    }
  }
  TakeCard(name) {
    let card;
    for (let i = $("Attack").children.length - 1; i >= 0; i--) {
      card = $("Attack").children[i];
      card.style.transform = "rotate(0deg)";
      $("Attack").children[i].remove();
      $insert($(name), card);
      if ($(name).className === "opponent") {
        this.CardPlace("opponent");
        this.CloseCard(card);
      } else if ($(name).className === "player") {
        this.CardPlace("player");
      }
    }
    for (let k = $("Defend").children.length - 1; k >= 0; k--) {
      card = $("Defend").children[k];
      card.style.transform = "rotate(0deg)";
      $("Defend").children[k].remove();
      $insert($(name), card);
      if ($(name).className === "opponent") {
        this.CardPlace("opponent");
        this.CloseCard(card);
      } else if ($(name).className === "player") {
        this.CardPlace("player");
      }
    }
  }
  GameTurn(item, card, field, attk, player) {
    if (player === "opponent") {
      card = $first($(player));
    }
    card.remove();
    $insert($(field), card);
    card.style.top = "";
    let length = $(field).children.length;
    for (let i = 0; i < length; i++) {
      attk === true 
        ? (card.style.transform = "rotate(-10deg)") 
        : (card.style.transform = "rotate(10deg)");
    }
    this.CardPlace(player);
    this.FieldPlace(card, field);
    this.ShowCard(item, card);
  }
  ClearTable() {
    let length;
    length = $("Attack").children.length;
    for (let i = 0; i < length; i++) {
      $first($("Attack")).remove();
    }
    length = $("Defend").children.length;
    for (let i = 0; i < length; i++) {
      $first($("Defend")).remove();
    }
  }
  FieldPlace(current, field) {
    let length = $(field).children.length;
    for (let i = 0; i < length; i++) {
      current = $(field).children[i];
      if (length < 4) {
        current.style.left = `${parseInt(i) * ($(field).clientWidth / 4) + "px"}`;
      }
    }
  }
}
class GamePlay {
  constructor(Player, Supernik, Koloda, GameTable) {
    this.gameUser = Player;
    this.gameOppt = Supernik;
    this.gameDeck = Koloda;
    this.gameStil = GameTable;
  }
  ToMenu(check) {
    this.gameDeck.ExitToMenu(check);
  }
  CheckTurn() {
    if (this.gameDeck.$turn) {
      return this.gameUser;
    }
    return this.gameOppt;
  }
  ChangeTurn() {
    this.gameDeck.ChangeTurn();
    if (this.gameDeck.$turn === 1) {
      this.gameDeck.ViewTurn(true);
    } else {
      this.gameDeck.ViewTurn(false);
    }
  }
  Wasted() {
    if ((this.gameDeck.$deck.length === 0) && (this.gameOppt.$deck.length === 0 || this.gameUser.$deck.length === 0)) {
      if (this.gameOppt.$deck.length === 0) {
        ShowMessage(
          "Програш!", "На жаль, Ви програли😔", "error", "4s"
        );
      } else {
        ShowMessage(
          "Успіх!", "Ви виграли🙂", "success", "4s"
        );
      }
      setTimeout(() => {
        this.ToMenu(true);
      }, 4000);
      return true;
    }
    return false;
  }
  DropCards() {
    let p1 = this.gameUser.$deck.length;
    let s1 = this.gameOppt.$deck.length;
    this.gameDeck.DropCards(false);
    let p2 = this.gameUser.$deck.length;
    let s2 = this.gameOppt.$deck.length;
    this.DropCardsPlayer(this.gameUser, "player", p1, p2);
    this.DropCardsPlayer(this.gameOppt, "opponent", s1, s2);
  }
  DropCardsPlayer(Player, field, p1, p2) {
    for (let i = p1; i < p2; i++) {
      let card = Player.$deck[i];
      this.gameDeck.TakeCardsByHand(card, field);
    }
  }
  TakeCardPlayer(player, name) {
    this.TakeCard(player, name);
    if (this.Wasted()) {
      return;
    }
    HideElement($("Take"));
    this.EnemyAttack();
  }
  TakeCard(Player, name) {
    this.OpacityCard();
    Player.TakeCard(Player.$deck);
    this.gameDeck.TakeCard(name);
    this.DropCards();
    ShowMessage("Інфо", "Забрано", "verified", "3s");
  }
  OpacityCard() {
    let Card, card, flag, cardAttackCard, AttackCard;
    for (let i = 0; i < this.gameUser.$deck.length; i++) {
      card = this.gameDeck.GetCard(i, "player");
      Card = this.gameUser.$deck[i];
      if (this.gameDeck.$turn === 1) {
        if (this.gameUser.CheckContinueTurn()) {
          flag = this.gameUser.CheckCardAttack(Card);
        } else {
          flag = false;
        }
      } else {
        cardAttackCard = this.gameDeck.GetCard(this.gameStil.$attack.length - 1, "Attack");
        AttackCard = this.gameDeck.GetFull(cardAttackCard, this.gameStil.$attack);
        flag = this.gameUser.CheckCardDefend(Card, AttackCard);
        if (this.gameStil.$attack.length === this.gameStil.$defend.length) {
          flag = false;
        }
      }
      if (flag !== true) {
        this.gameDeck.OpacityCard(card, true);
      } else {
        this.gameDeck.OpacityCard(card, false);
      }
    }
  }
  PassCardPlayer(player) {
    this.PassCard(player);
    if (this.Wasted()) {
      return;
    }
    HideElement($("Pass"));
    this.EnemyAttack();
  }
  PassCard(Player) {
    Player.Pass();
    this.gameStil.ClearTable();
    this.gameDeck.ClearTable();
    this.DropCards();
    ShowMessage("Інфо", "Відбій", "verified", "3s");
    this.ChangeTurn();
  }
  Stop() {
    this.gameUser.sideturn = 0;
    this.TakeCard(this.gameOppt, "opponent");
    HideElement($("Stop"));
    HideElement($("Pass"));
    this.OpacityCard();
  }
  EnemyAttack() {
    let current = null;
    current = this.gameOppt.EnemyAttack();
    if (current !== null) {
      ShowElement($("Take"));
      this.gameDeck.GameTurn(current, null, "Attack", true, "opponent");
    } else {
      this.PassCard(this.gameOppt);
      HideElement($("Take"));
    }
    this.OpacityCard();
    this.gameDeck.CardPlace("player");
  }
  EnemyDefend(AttackCard) {
    let current, card;
    if (this.gameUser.sideturn === 0) {
      current = this.gameOppt.EnemyDefend(AttackCard);
    }
    if (current !== null) {
      this.gameDeck.GameTurn(current, card, "Defend", false, "opponent");
      this.OpacityCard();
    } else {
      if (this.Wasted()) {
        return;
      }
      ShowElement($("Stop"));
      HideElement($("Pass"));
      this.gameUser.sideturn = 1;
      return;
    }
  }
  PlayerAttack(current, card) {
    let check = false;
    ShowElement($("Pass"));
    if (this.gameUser.CheckContinueTurn()) {
      check = this.gameUser.CheckCardAttack(current);
      if (check) {
        this.gameDeck.OpacityCard(card, false);
        this.gameUser.Attack(current);
        this.gameDeck.GameTurn(current, card, "Attack", true, "player");
        this.OpacityCard();
      }
    }
    return check;
  }
  PlayerDefend(current, card) {
    let index = this.gameStil.$defend.length;
    let AttackCard = this.gameStil.$attack[index];
    let check = this.gameUser.CheckCardDefend(current, AttackCard);
    if (check) {
      this.gameUser.Defend(current);
      this.gameDeck.GameTurn(current, card, "Defend", false, "player");
    }
    return check;
  }
  ProcessingTurn(current, card) {
    let AttackPlayer = this.CheckTurn();
    if (AttackPlayer === this.gameUser) {
      let check = this.PlayerAttack(current, card);
      if (check) {
        if (this.Wasted()) {
          return;
        }
        this.EnemyDefend(current);
      }
    } else {
      let check = this.PlayerDefend(current, card);
      if (check) {
        if (this.Wasted()) {
          return;
        }
        this.EnemyAttack();
      }
    }
  }
  LoadGamePage() {
    SetCards();
    this.gameDeck.InsertCards();
    this.gameDeck.ShuffleCards();
    this.gameDeck.CreateDeck(this.gameDeck.$deck);
    AddButton(
      "new-game", "", "button", "Нова гра", $("middle"), "",
      function() {
        GoGame();
      }
    );
    ToggleSuit();
  }
  StartGame() {
    ShowMessage("Інфо", "Починаємо нову гру", "success", "4s");
    ShowElement($("user"));
    ShowElement($("enemy"));
    this.gameDeck.DropCards(true);
    $("player").style.pointerEvents = "none";
    let kozir = this.gameDeck.AddKozir();
    this.gameDeck.GetKozir(kozir, true);
    setTimeout(() => {
      this.gameDeck.FirstTurn();
      let check = this.CheckTurn();
      if (check === this.gameOppt) {
        this.EnemyAttack();
        ShowElement($("Take"));
      }
      if (this.gameDeck.$turn === 1) {
        this.gameDeck.ViewTurn(true);
      } else {
        this.gameDeck.ViewTurn(false);
      }
    }, 22000);
    return;
  }
}
class InitUser extends PlayDeck {
  constructor(stil, supernik) {
    super();
    this.$stil = stil;
    this.$supernik = supernik;
    this.sideturn = 0;
  }
  set Table(stil) {
    this.$stil = stil;
  }
  set Enemy(supernik) {
    this.$supernik = supernik;
  }
  Attack(current) {
    this.GameTurn(current, true);
  }
  Defend(current) {
    this.GameTurn(current, false);
  }
  GameTurn(card, attk) {
    this.DelCard(card);
    attk ? this.$stil.attack = card : this.$stil.defend = card;
  }
  CheckContinueTurn() {
    if ((this.$supernik.$deck.length !== 0) && (this.$stil.$attack.length < 6) && (this.$supernik.$deck.length + this.$stil.$defend.length > this.$stil.$attack.length)) {
      return true;
    }
    return false;
  }
  CheckCardAttack(current) {
    if (this.$stil.$attack.length !== 0) {
      for (let i = 0; i < this.$stil.$attack.length; i++) {
        if (current.$rank === this.$stil.$attack[i].$rank) {
          return true;
        }
      }
    } else {
      return true;
    }
    if (this.$stil.$defend.length !== 0) {
      for (let i = 0; i < this.$stil.$defend.length; i++) {
        if (current.$rank === this.$stil.$defend[i].$rank) {
          return true;
        }
      }
    }
    return false;
  }
  CheckCardDefend(current, attkCard) {
    for (let i = 0; i < this.$stil.$attack.length; i++) {
      if (this.$stil.$attack[i] === attkCard) {
        if (current.$cost > attkCard.$cost) {
          if (current.$cost > 14) {
            return true;
          } else if (current.$suit === attkCard.$suit) {
            return true;
          }
        }
      }
    }
    return false;
  }
  TakeCard(player) {
    while (this.$stil.$attack.length !== 0) {
      let card = this.$stil.$attack.pop();
      player.push(card);
    }
    while (this.$stil.$defend.length !== 0) {
      let card = this.$stil.$defend.pop();
      player.push(card);
    }
    return false;
  }
  Pass() {
    while (this.$stil.$attack.length !== 0) {
      let card = this.$stil.$attack.pop();
    }
    while (this.$stil.$defend.length !== 0) {
      let card = this.$stil.$defend.pop();
    }
    return true;
  }
}
class InitEnemy extends InitUser {
  EnemyAttack() {
    let current = null;
    if (this.CheckContinueTurn()) {
      let minCardCost = 30;
      for (let i = 0; i < this.$deck.length; i++) {
        if (minCardCost > this.$deck[i].$cost) {
          if (
            this.CheckCardAttack(this.$deck[i]) === true || this.$stil.$attack.length === 0
          ) {
            minCardCost = this.$deck[i].$cost;
            current = this.$deck[i];
          }
        }
      }
      if (current !== null) {
        this.Attack(current);
      }
    }
    return current;
  }
  EnemyDefend(attkCard) {
    let minCardCost = 30;
    let current = null;
    for (let i = 0; i < this.$deck.length; i++) {
      if (this.CheckCardDefend(this.$deck[i], attkCard) === true) {
        if (minCardCost > this.$deck[i].$cost) {
          minCardCost = this.$deck[i].$cost;
          current = this.$deck[i];
        }
      }
    }
    if (minCardCost !== 30) {
      this.Defend(current, attkCard);
      return current;
    }
    return current;
  }
}
class MainTable {
  constructor(opponent, player) {
    this.$opponent = opponent;
    this.$player = player;
    this.$attack = [];
    this.$defend = [];
  }
  set opponent(opponent) {
    this.$opponent = opponent;
  }
  set player(player) {
    this.$player = player;
  }
  set attack(card) {
    this.$attack.push(card);
  }
  set defend(card) {
    this.$defend.push(card);
  }
  ClearTable() {
    for (let i = 0; i < this.$defend.length; i++) {
      this.$defend.pop();
    }
    for (let i = 0; i < this.$attack.length; i++) {
      this.$attack.pop();
    }
  }
}
let Player = new InitUser();
let Supernik = new InitEnemy();
let Koloda = new GetDeck(Player, Supernik);
let GameTable = new MainTable();
let Engine = new GamePlay(Player, Supernik, Koloda, GameTable);
GameTable.Supernik = Supernik;
GameTable.Player = Player;
Player.Table = GameTable;
Player.Enemy = Supernik;
Supernik.Table = GameTable;
Supernik.Enemy = Player;
let BtnTake = $("Take");
let BtnMenu = $("ToMenu");
let BtnPass = $("Pass");
let BtnStop = $("Stop");
document.addEventListener("click", event => {
  if ((event.target.id === "card") && (event.target.offsetParent !== null)) {
    if (event.target.offsetParent.className === "player") {
      let card = Koloda.GetFull(event.target, Player.$deck);
      Engine.ProcessingTurn(card, event.target);
      navigator.vibrate([15, 15]);
    }
  }
});
BtnTake.onclick = () => { 
  Engine.TakeCardPlayer(Player, "player");
}
BtnPass.onclick = () => { 
  Engine.PassCardPlayer(Player);
}
BtnStop.onclick = () => { 
  Engine.Stop();
}
function GoGame() {
  event.currentTarget.remove();
  navigator.vibrate([20, 20]);
  Engine.StartGame();
}
function GetSuitPicture() {
  new DynamicSelect("#suit", { columns: 2, height: "100px", width: "85%", dropdownWidth: "100%", placeholder: "Виберіть сорочку для карт",
    data: [
      {
        value: "bicycle",
        img: "../images/deck/bicycle/Bicycle.jpg",
        imgWidth: '53.5px',
        imgHeight: '80px',
        text:  "Bicycle",
        selected: IsTheSuits("bicycle"),
      },
      {
        value: "tally-ho",
        img: "../images/deck/tally-ho.jpg",
        imgWidth: '53px',
        imgHeight: '80px',
        text:  "Tally-Ho",
        selected: IsTheSuits("tally-ho"),
      },
      {
        value: "bicycle-blue",
        img: "../images/deck/bicycle/Bicycle-blue.png",
        imgWidth: '53.5px',
        imgHeight: '80px',
        text:  "Bicycle ",
        selected: IsTheSuits("bicycle-blue"),
      },
      {
        value: "french",
        img: '../images/deck/french/back.png',
        imgWidth: '53.5px',
        imgHeight: '80px',
        text:  "French",
        selected: IsTheSuits("french"),
      }
    ],
    onChange: function() {
      ToggleSuit();
    }
  });
}
function IsTheSuits(value) {
  let result;
  let backs = localStorage.getItem("suit");
  if (backs) {
    if (backs === value) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }
}
$("cardsize").onclick = () => { 
  isSelect 
    ? isSelect = false 
    : (ShowMessage("Інфо", "Виберіть розмір карт", "verified", "4s"), isSelect = true);
};
$("photo").onclick = () => {
  isSelect ? isSelect = false : (ShowMessage("Інфо", "Виберіть сорочку для карт", "verified", "4s"), isSelect = true)
}