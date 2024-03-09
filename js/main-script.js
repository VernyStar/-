// Базові функції-помічники:

function _(el) {
  return document.createElement(el);
}
function $(el, check) {
  if (check === null || check === "undefined") check = false;
  if (check) {
    return document.querySelector(el);
  } else {
    return document.querySelector("." + el) || document.getElementById(el);
  }
}
function $all(el, check) {
  if (check === null || check === "undefined") check = false;
  if (check) {
    return document.querySelectorAll(el);
  } else {
    return document.querySelectorAll("." + el);
  }
}
function $insert(parent, el, check) {
  return parent.appendChild(el);
}
function $check(el, klas) {
  return true === el.classList.contains(klas);
}
function $first(parent) {
  return $(parent).firstChild;
}
function $last(parent) {
  return $(parent).lastChild;
}
function AddListener(target, name, listener) {
  target.addEventListener(name, listener);
}
function RemoveListener(target, name, listener) {
  target.removeEventListener(name, listener);
}
function queue(target) {
  let array = Array.prototype;
  let queueing = [];
  target.queue = queue;
  target.queued = queued;
  return target;
  function queued(action) {
    return function() {
      let self = this;
      let args = arguments;
      queue(function (next) {
        action.apply(self, array.concat.apply(next, args));
      });
    };
  }
  function queue(action) {
    if (!action) {
      return;
    }
    queueing.push(action);
    if (queueing.length === 1) {
      next();
    }
  }
  function next() {
    queueing[0](function(error) {
      if (error) {
        throw error;
      }
      queueing = queueing.slice(1);
      if (queueing.length) {
        next();
      }
    });
  }
}
function observable(target) {
  target || (target = {});
  let listeners = {};
  target.on = on;
  target.one = one;
  target.off = off;
  target.trigger = trigger;
  return target;
  function on(name, cb, ctx) {
    listeners[name] || (listeners[name] = []);
    listeners[name].push({ cb: cb, ctx: ctx });
  }
  function one(name, cb, ctx) {
    listeners[name] || (listeners[name] = []);
    listeners[name].push({
      cb: cb, ctx: ctx, once: true
    });
  }
  function trigger(name) {
    let self = this;
    let args = Array.prototype.slice(arguments, 1);
    let currentListeners = listeners[name] || [];
    currentListeners.filter(function(listener) {
      listener.cb.apply(self, args);
      return !listener.once;
    });
  }
  function off(name, cb) {
    if (!name) {
      listeners = {};
      return;
    }
    if (!cb) {
      listeners[name] = [];
      return;
    }
    listeners[name] = listeners[name].filter(function(listener) {
      return listener.cb !== cb;
    });
  }
}
function FontSize() {
  return window.getComputedStyle(document.body).getPropertyValue("font-size").slice(0, -2);
}
function Shuffling(value) {
  let num = Math.round(Math.random()) ? -1 : 1;
  return num * value;
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

// Функції для операцій зі створенням/видаленням/зміною елементів:

function HideElement(el, check) {
  if (check === null || check === "undefined") check = false;
  if (check === true) {
    return el.forEach(item => item.setAttribute("hidden", true));
  } else {
    return el.setAttribute("hidden", true);
  }
}
function ShowElement(el) {
  if (el.hasAttribute("hidden")) { 
    return el.removeAttribute("hidden");
  }
}
function AddNewDiv(klas, id, parent, inner) {
  let element = _("div");
  element.className = klas, element.id = id, 
  element.insertAdjacentHTML("afterbegin", inner);
  $insert(parent, element);
  return element;
}
function AddButton(klas, id, type, title, parent, inner, fn) {
  let button = _("button");
  button.className = klas, button.id = id, button.type = type, button.innerHTML = title, button.onclick = fn;
  button.insertAdjacentHTML("afterbegin", inner);
  $insert(parent, button);
  return button;
}
function SetDisabled(el, time) {
  el.setAttribute("disabled", "");
  setTimeout(() => {
    el.removeAttribute("disabled");
  }, time);
}

// Виклик констант, змінних та масивів:

let context = new (window.AudioContext || window.webkitAudioContext)();
let Animations = [];
let FullDeck = 36;
let Sound;
let isSelect;
let isVictory;
let interval;
let isHased;
let isRestart;
let isProcess;
let stored = {};
let style = _("p").style;
let fontSize = FontSize();
const Root = $(":root", true);
const F1reworks = new Fireworks.default($("fireworks"), {
  sound: {
    enabled: true,
    files: [
      "https://particles.js.org/audio/explosion0.mp3",
      "https://particles.js.org/audio/explosion1.mp3",
      "https://particles.js.org/audio/explosion2.mp3"
    ],
    volume: {
      min: 4,
      max: 8
    }
  }
});
window.requestAnimationFrame || (window.requestAnimationFrame = function(cbFunction) {
  setTimeout(cbFunction, 0);
});

// Класи та загальні функції:

class AlertSV {
  constructor(t){this.options=Object.assign({position:"top-right",stack:[],offsetX:20,offsetY:20,gap:20,nomer:0,duration:"0.5s",effect:"ease",isblur:!0},t)}push(t){this.nomer++;let e=document.createElement(t.link?"a":"div");t.link&&(e.href=t.link,e.target=t.linkTarget?t.linkTarget:"_self"),e.className="sms"+(t.style?" sms-"+t.style:"")+" sms-"+this.position,e.innerHTML=`\n        ${null==t.icon||!0===t.icon?`<div class="icon ${t.style}"></div>`:""}\n        <div class="sms-wrapper">\n        ${t.title?'<h3 class="sms-header">'+t.title+"</h3>":""}\n        ${t.content?'<div class="sms-content">'+t.content+"</div>":""}\n         </div>\n        ${null==t.closeButton||!0===t.closeButton?'<button class="sms-close">&times;</button>':""}\n      `,document.body.appendChild(e),e.getBoundingClientRect(),"top-left"==this.position?(e.style.top=0,e.style.left=this.offsetX+"px"):"top-center"==this.position?(e.style.top=0,e.style.left=0):"top-right"==this.position?(e.style.top=0,e.style.right=this.offsetX+"px"):"bottom-left"==this.position?(e.style.bottom=0,e.style.left=this.offsetX+"px"):"bottom-center"==this.position?(e.style.bottom=0,e.style.left=0):"bottom-right"==this.position&&(e.style.bottom=0,e.style.right=this.offsetX+"px"),(t.width||this.width)&&(e.style.width=(t.width||this.width)+"px"),e.dataset.transitionState="queue";let s=this.stack.push({element:e,props:t,offsetX:this.offsetX,offsetY:this.offsetY,index:0});this.stack[s-1].index=s-1,e.querySelector(".sms-close")&&(e.querySelector(".sms-close").onclick=t=>{t.preventDefault(),this.closeAlert(this.stack[s-1])}),e.querySelector(".error")?e.querySelector(".icon").innerHTML='<svg width="18" height="18" fill="#c41c1c" viewBox="0 0 512 512"><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/></svg>':e.querySelector(".success")?e.querySelector(".icon").innerHTML='<svg width="18" height="18" fill="#1DB000" viewBox="0 0 512 512"><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>':e.querySelector(".verified")&&(e.querySelector(".icon").innerHTML='<svg width="18" height="18" fill="#0096c7" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>'),t.link&&(e.onclick=()=>this.closeAlert(this.stack[s-1])),this.openAlert(this.stack[s-1]),t.onOpen&&t.onOpen(this.stack[s-1])}openAlert(t){if(!0===this.isOpening())return!1;t.element.dataset.transitionState="opening",t.element.style.transition=this.duration+" transform "+this.effect,this._transformAlert(t),t.element.addEventListener("transitionend",(()=>{if("opening"==t.element.dataset.transitionState){t.element.dataset.transitionState="complete";for(let t=0;t<this.stack.length;t++)"queue"==this.stack[t].element.dataset.transitionState&&this.openAlert(this.stack[t]);t.props.dismissAfter&&this.closeAlert(t,t.props.dismissAfter)}}));for(let e=0;e<this.stack.length;e++)"complete"==this.stack[e].element.dataset.transitionState&&(this.stack[e].element.dataset.transitionState="opening",this.stack[e].element.style.transition=this.duration+" transform "+this.effect+(this.isblur?", "+this.duration+" opacity ease":""),this.isblur&&this.stack[e].element.classList.add("sms-dimmed"),this.stack[e].offsetY+=t.element.offsetHeight+this.gap,this._transformAlert(this.stack[e]));return!0}closeAlert(t,e=null){return!0===this.isOpening()?(setTimeout((()=>this.closeAlert(t,e)),100),!1):("close"==t.element.dataset.transitionState||(t.element.querySelector(".sms-close")&&(t.element.querySelector(".sms-close").onclick=null),t.element.dataset.transitionState="close",t.element.style.transition="0.2s opacity ease"+(e?" "+e:""),t.element.style.opacity=0,t.element.addEventListener("transitionend",(()=>{if("close"==t.element.dataset.transitionState){let e=t.element.offsetHeight;t.props.onClose&&t.props.onClose(t),t.element.remove();for(let s=0;s<t.index;s++)this.stack[s].element.style.transition=this.duration+" transform "+this.effect,this.stack[s].offsetY-=e+this.gap,this._transformAlert(this.stack[s]);let s=this.getFocusedAlert();s&&s.element.classList.remove("sms-dimmed")}}))),!0)}isOpening(){let t=!1;for(let e=0;e<this.stack.length;e++)"opening"==this.stack[e].element.dataset.transitionState&&(t=!0);return t}getFocusedAlert(){for(let t=0;t<this.stack.length;t++)if(this.stack[t].offsetY==this.offsetY)return this.stack[t];return!1}_transformAlert(t){"top-center"==this.position?t.element.style.transform=`translate(calc(50vw - 50%), ${t.offsetY}px)`:"top-right"==this.position||"top-left"==this.position?t.element.style.transform=`translate(0, ${t.offsetY}px)`:"bottom-center"==this.position?t.element.style.transform=`translate(calc(50vw - 50%), -${t.offsetY}px)`:"bottom-left"!=this.position&&"bottom-right"!=this.position||(t.element.style.transform=`translate(0, -${t.offsetY}px)`)}set stack(t){this.options.stack=t}get stack(){return this.options.stack}set position(t){this.options.position=t}get position(){return this.options.position}set offsetX(t){this.options.offsetX=t}get offsetX(){return this.options.offsetX}set offsetY(t){this.options.offsetY=t}get offsetY(){return this.options.offsetY}set gap(t){this.options.gap=t}get gap(){return this.options.gap}set nomer(t){this.options.nomer=t}get nomer(){return this.options.nomer}set width(t){this.options.width=t}get width(){return this.options.width}set duration(t){this.options.duration=t}get duration(){return this.options.duration}set effect(t){this.options.effect=t}get effect(){return this.options.effect}set isblur(t){this.options.isblur=t}get isblur(){return this.options.isblur}
}
class AllSound {
  constructor(context, links) {
    this.$ctx = context;
    this.$url = links;
    this.$arr = [];
  }
  LoadSound(url, i) {
    let file = this;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function() {
      file.$ctx.decodeAudioData(xhr.response,
        function(buffer) {
          file.$arr[i] = buffer;
          if (i === file.$url.length - 1) {
            file.Loaded();
          }
        }
      );
    }
    xhr.send();
  }
  Loaded() {
    SetImages();
  }
  GetAllSounds() {
    let loader = this;
    loader.$url.forEach((url, i) => {
      loader.LoadSound(url, i);
    });
  }
  GetAudio(i) {
    return this.$arr[i];
  }
}
class SoundPlay {
  constructor(context, buffer) {
    this.$ctx = context;
    this.$arr = buffer;
  }
  SoundOptions() {
    this.gainNode = this.$ctx.createGain();
    this.source = this.$ctx.createBufferSource();
    this.source.buffer = this.$arr;
    this.source.connect(this.gainNode);
    this.gainNode.connect(this.$ctx.destination);
  }
  Play() {
    this.SoundOptions();
    this.source.start(this.$ctx.currentTime);
  }
  Stop() {
    let ctx = this.$ctx.currentTime + 0.5;
    this.gainNode.gain.exponentialRampToValueAtTime(0.001, ctx);
  }
}
class DynamicSelect {
  constructor(e,t={}){this.options=Object.assign({placeholder:"Виберіть один з пунктів",columns:1,name:"",width:"",height:"",data:[],onChange:function(){}},t),this.selectElement="string"==typeof e?document.querySelector(e):e;for(const e in this.selectElement.dataset)void 0!==this.options[e]&&(this.options[e]=this.selectElement.dataset[e]);if(this.name=this.selectElement.getAttribute("name")?this.selectElement.getAttribute("name"):"dynamic-select-"+Math.floor(1e6*Math.random()),!this.options.data.length){let e=this.selectElement.querySelectorAll("option");for(let t=0;t<e.length;t++)this.options.data.push({value:e[t].value,text:e[t].innerHTML,img:e[t].getAttribute("data-img"),selected:e[t].selected,html:e[t].getAttribute("data-html"),imgWidth:e[t].getAttribute("data-img-width"),imgHeight:e[t].getAttribute("data-img-height")})}this.element=this._template(),this.selectElement.replaceWith(this.element),this._updateSelected(),this._eventHandlers()}_template(){let e="";for(let t=0;t<this.data.length;t++){let i=100/this.columns,s="";s=this.data[t].html?this.data[t].html:`\n                    ${this.data[t].img?`<img src="${this.data[t].img}" alt="${this.data[t].text}" class="${this.data[t].imgWidth&&this.data[t].imgHeight?"dynamic-size":""}" style="${this.data[t].imgWidth?"width:"+this.data[t].imgWidth+";":""}${this.data[t].imgHeight?"height:"+this.data[t].imgHeight+";":""}">`:""}\n                    ${this.data[t].text?'<span class="dynamic-select-option-text">'+this.data[t].text+"</span>":""}\n                `,e+=`\n                <div class="dynamic-select-option${this.data[t].value==this.selectedValue?" dynamic-select-selected":""}${this.data[t].text||this.data[t].html?"":" dynamic-select-no-text"}" data-value="${this.data[t].value}" style="width:${i}%;${this.height?"height:"+this.height+";":""}">\n                    ${s}\n                </div>\n            `}let t=`\n            <div class="dynamic-select ${this.name}"${this.selectElement.id?' id="'+this.selectElement.id+'"':""} style="${this.width?"width:"+this.width+";":""}${this.height?"height:"+this.height+";":""}">\n                <input type="hidden" name="${this.name}" value="${this.selectedValue}">\n                <div class="dynamic-select-header" style="${this.width?"width:"+this.width+";":""}${this.height?"height:"+this.height+";":""}"><span class="dynamic-select-header-placeholder">${this.placeholder}</span></div>\n                <div class="dynamic-select-options" style="${this.options.dropdownWidth?"width:"+this.options.dropdownWidth+";":""}${this.options.dropdownHeight?"height:"+this.options.dropdownHeight+";":""}">${e}</div>\n                </div>\n            </div>\n        `,i=document.createElement("div");return i.innerHTML=t,i}_eventHandlers(){this.element.querySelectorAll(".dynamic-select-option").forEach((e=>{e.onclick=()=>{this.element.querySelectorAll(".dynamic-select-selected").forEach((e=>e.classList.remove("dynamic-select-selected"))),e.classList.add("dynamic-select-selected"),this.element.querySelector(".dynamic-select-header").innerHTML=e.innerHTML,this.element.querySelector("input").value=e.getAttribute("data-value"),this.data.forEach((e=>e.selected=!1)),this.data.filter((t=>t.value==e.getAttribute("data-value")))[0].selected=!0,this.element.querySelector(".dynamic-select-header").classList.remove("dynamic-select-header-active"),this.options.onChange(e.getAttribute("data-value"),e.querySelector(".dynamic-select-option-text")?e.querySelector(".dynamic-select-option-text").innerHTML:"",e)}})),this.element.querySelector(".dynamic-select-header").onclick=()=>{this.element.querySelector(".dynamic-select-header").classList.toggle("dynamic-select-header-active")},this.selectElement.id&&document.querySelector('label[for="'+this.selectElement.id+'"]')&&(document.querySelector('label[for="'+this.selectElement.id+'"]').onclick=()=>{this.element.querySelector(".dynamic-select-header").classList.toggle("dynamic-select-header-active")}),document.addEventListener("click",(e=>{e.target.closest("."+this.name)||e.target.closest('label[for="'+this.selectElement.id+'"]')||this.element.querySelector(".dynamic-select-header").classList.remove("dynamic-select-header-active")}))}_updateSelected(){this.selectedValue&&(this.element.querySelector(".dynamic-select-header").innerHTML=this.element.querySelector(".dynamic-select-selected").innerHTML)}get selectedValue(){let e=this.data.filter((e=>e.selected));return e=e.length?e[0].value:"",e}set data(e){this.options.data=e}get data(){return this.options.data}set selectElement(e){this.options.selectElement=e}get selectElement(){return this.options.selectElement}set element(e){this.options.element=e}get element(){return this.options.element}set placeholder(e){this.options.placeholder=e}get placeholder(){return this.options.placeholder}set columns(e){this.options.columns=e}get columns(){return this.options.columns}set name(e){this.options.name=e}get name(){return this.options.name}set width(e){this.options.width=e}get width(){return this.options.width}set height(e){this.options.height=e}get height(){return this.options.height}
}
function ShowMessage(title, message, style, del, close) {
  if (close === null || close === "undefined") close = true;
  let msg = new AlertSV(
    { offsetX: 0, offsetY: 0, gap: 20, width: 300, timing: "ease", duration: "0.5s", dimOld: true, position: "top-right" }
  );
  msg.push(
    { title: `${title}`, content: `${message}`, style: `${style}`, icon: true, dismissAfter: `${del}`, closeButton: close }
  );
}
function OnloadFn(onloadFunc) {
  let onstart = window.onload;
  if (typeof window.onload !== "function") {
    window.onload = onloadFunc;
  } else {
    window.onload = function() {
      if (onstart) {
        onstart();
      }
      onloadFunc;
    }
  }
}
function PreloadImages(links, cbFunction) {
  let count = links.length;
  let stored = 0;
  links.forEach(url => {
    Preload(url, function() {
      stored++;
      if (stored === count) {
        cbFunction();
      }
    });
  });
  function Preload(url, cbFunc) {
    let img = new Image();
    img.onload = cbFunc;
    img.src = url;
  }
}
function ToggleStan(items) {
  let button = event.currentTarget;
  let active = $check(button, "active");
  items = $all(items);
  active
    ? (button.classList.remove("active"), items.forEach(e => e.classList.remove("active"))) 
    : (button.classList.add("active"), items.forEach(e => e.classList.add("active")));
}
function GetLinks(url, callback) {
  let xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhr.open("GET", url);
  xhr.responseType = "json";
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback.call(xhr.response);
    }
  }
  xhr.onerror = function() {
    ShowMessage(
      "Мережева помилка", "Перевірте ваше інтернет-з'єднання та оновіть сторінку!", "error", "5s"
    );
    ShowMessage(
      "", "Неможливо завантажити важливі файли", "error", "5s"
    );
  }
}
function SetAudio() {
  GetLinks("/options.json", function() {
    let links = this["sounds"]["links"];
    let Loader = new AllSound(context, links);
    Loader.GetAllSounds();
    ToggleVolume();
    $all("[data-sound]", true).forEach(button => {
      AddListener(button, "click", isPlay);
    });
    function isPlay(i) {
      let volume = Root.getAttribute("data-volume");
      i = event.currentTarget.getAttribute("data-sound");
      let MPlayer = new SoundPlay(context, Loader.GetAudio(i));
      volume ? MPlayer.Play() : "";
    }
  });
}
function SetImages() {
  GetLinks("https://rawcdn.githack.com/VernyStar/Duren-Card-Game/c07982f022df6b11bec4c45176153ab9d16d36c2/options.json", function() {
    let links = this["images"]["links"];
    PreloadImages(links, SetImage);
    function SetImage() {
      $all("l-img")[0].src = links[0];
      $all("l-img")[1].src = links[1];
      $all("l-img")[2].src = links[2];
      $("mainlogo").src = links[3];
      Root.style.setProperty("--ribbon", `url(${links[4]})`);
    }
  });
}
OnloadFn(CreateApp);

// Додання нових елементів та прив'язка подій до слухачів:

function CreateApp() {
  AddButton(
    "burger part-menu", "", "button", "", $("header"), `<svg fill="gold" width="42" height="30" id="icon" viewBox="0 0 800 600"><path d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200" id="top"></path><path d="M300,320 L540,320" id="middle"></path><path d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190" id="bottom" transform="translate(480, 320) scale(1, -1) translate(-480, -318) "></path></svg>`,
    function() {
      ToggleStan("part-menu");
      SVibrate();
    }
  );
  AddButton(
    "ToMenu GPbtn", "", "button", "", document.body, '<svg width="30" height="30" viewBox="0 0 117 117" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <desc></desc> <defs></defs> <g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"> <g fill-rule="nonzero" id="exit"> <path d="M82.6,88.4 C83.4,89.2 84.4,89.6 85.5,89.6 C86.6,89.6 87.6,89.2 88.4,88.4 L115.4,61.4 C115.6,61.2 115.8,61 115.9,60.8 C115.9,60.8 116,60.7 116,60.6 C116.1,60.4 116.2,60.2 116.3,60.1 C116.3,60 116.3,59.9 116.4,59.9 C116.5,59.7 116.5,59.6 116.6,59.4 C116.7,59.1 116.7,58.9 116.7,58.6 C116.7,58.3 116.7,58.1 116.6,57.8 C116.6,57.6 116.5,57.4 116.4,57.3 C116.4,57.2 116.4,57.1 116.3,57.1 C116.2,56.9 116.1,56.7 116,56.5 C116,56.5 116,56.4 115.9,56.4 C115.8,56.2 115.6,56 115.4,55.8 L88.4,28.8 C86.8,27.2 84.2,27.2 82.6,28.8 C81,30.4 81,33 82.6,34.6 L102.6,54.6 L31.5,54.6 C29.2,54.6 27.4,56.4 27.4,58.7 C27.4,61 29.2,62.8 31.5,62.8 L102.6,62.8 L82.6,82.8 C81,84.2 81,86.8 82.6,88.4 Z" fill="#17AB13" id="Shape"></path> <path d="M4.5,116.5 L58.5,116.5 C60.8,116.5 62.6,114.7 62.6,112.4 L62.6,72.1 C62.6,69.8 60.8,68 58.5,68 C56.2,68 54.4,69.8 54.4,72.1 L54.4,108.3 L8.6,108.3 L8.6,8.6 L54.4,8.6 L54.4,44.8 C54.4,47.1 56.2,48.9 58.5,48.9 C60.8,48.9 62.6,47.1 62.6,44.8 L62.6,4.5 C62.6,2.2 60.8,0.4 58.5,0.4 L4.5,0.4 C2.2,0.4 0.4,2.2 0.4,4.5 L0.4,112.4 C0.5,114.7 2.3,116.5 4.5,116.5 Z" fill="#4A4A4A"></path> </g> </g> </g></svg>', 
    function() {
      navigator.vibrate([20, 20]);
      Engine.ToMenu();
    }
  );
  AddNewDiv(
    "turn", "", $("header"), ""
  );
  AddNewDiv(
    "logo", "", $("header"), `<div id="theme"><svg data-theme-value="dark" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M11.75 5.5C11.1977 5.5 10.75 5.05228 10.75 4.5V2C10.75 1.44772 11.1977 1 11.75 1H12.25C12.8023 1 13.25 1.44772 13.25 2V4.5C13.25 5.05228 12.8023 5.5 12.25 5.5H11.75Z" fill="#edf2f4"></path><path d="M16.4194 7.22698C16.0289 6.83646 16.0289 6.20329 16.4194 5.81277L18.1872 4.045C18.5777 3.65447 19.2109 3.65447 19.6014 4.045L19.9549 4.39855C20.3455 4.78908 20.3455 5.42224 19.9549 5.81277L18.1872 7.58053C17.7967 7.97106 17.1635 7.97106 16.773 7.58053L16.4194 7.22698Z" fill="#edf2f4"></path><path d="M18.5 11.75C18.5 11.1977 18.9477 10.75 19.5 10.75H22C22.5523 10.75 23 11.1977 23 11.75V12.25C23 12.8023 22.5523 13.25 22 13.25H19.5C18.9477 13.25 18.5 12.8023 18.5 12.25V11.75Z" fill="#edf2f4"></path><path d="M16.7728 16.4194C17.1633 16.0289 17.7965 16.0289 18.187 16.4194L19.9548 18.1872C20.3453 18.5777 20.3453 19.2109 19.9548 19.6014L19.6012 19.9549C19.2107 20.3455 18.5775 20.3455 18.187 19.9549L16.4192 18.1872C16.0287 17.7967 16.0287 17.1635 16.4192 16.773L16.7728 16.4194Z" fill="#edf2f4"></path><path d="M12.25 18.5C12.8023 18.5 13.25 18.9477 13.25 19.5V22C13.25 22.5523 12.8023 23 12.25 23H11.75C11.1977 23 10.75 22.5523 10.75 22V19.5C10.75 18.9477 11.1977 18.5 11.75 18.5H12.25Z" fill="#edf2f4"></path><path d="M7.58059 16.773C7.97111 17.1635 7.97111 17.7967 7.58059 18.1872L5.81282 19.955C5.4223 20.3455 4.78913 20.3455 4.39861 19.955L4.04505 19.6014C3.65453 19.2109 3.65453 18.5778 4.04505 18.1872L5.81282 16.4195C6.20334 16.0289 6.83651 16.0289 7.22703 16.4195L7.58059 16.773Z" fill="#edf2f4"></path><path d="M5.5 12.25C5.5 12.8023 5.05228 13.25 4.5 13.25H2C1.44772 13.25 1 12.8023 1 12.25V11.75C1 11.1977 1.44772 10.75 2 10.75H4.5C5.05228 10.75 5.5 11.1977 5.5 11.75V12.25Z" fill="#edf2f4"></path><path d="M7.22722 7.58059C6.8367 7.97111 6.20353 7.97111 5.81301 7.58059L4.04524 5.81282C3.65472 5.4223 3.65472 4.78913 4.04524 4.39861L4.3988 4.04505C4.78932 3.65453 5.42248 3.65453 5.81301 4.04505L7.58078 5.81282C7.9713 6.20334 7.9713 6.83651 7.58078 7.22703L7.22722 7.58059Z" fill="#edf2f4"></path><path d="M7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12Z" fill="#edf2f4"></path></g></svg><svg data-theme-value="light" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 21.25C6.89137 21.25 2.75 17.1086 2.75 12H1.25C1.25 17.9371 6.06294 22.75 12 22.75V21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.6538 2.50244 11.6503 2.47703C11.6461 2.44587 11.6482 2.35557 11.7553 2.29085L12.531 3.57467C13.0342 3.27065 13.196 2.71398 13.1368 2.27627C13.0754 1.82126 12.7166 1.25 12 1.25V2.75ZM21.7092 12.2447C21.6444 12.3518 21.5541 12.3539 21.523 12.3497C21.4976 12.3462 21.4347 12.3314 21.3683 12.2676C21.2899 12.1923 21.25 12.0885 21.25 12H22.75C22.75 11.2834 22.1787 10.9246 21.7237 10.8632C21.286 10.804 20.7293 10.9658 20.4253 11.469L21.7092 12.2447Z" fill="#edf2f4"></path></g></svg></div><img id="mainlogo" src="" loading="eager" alt="Логотип">`
  );
  AddButton(
    "Pass GPbtn", "", "button", "Відбій", $("DurakSV"), '<svg height="40" width="40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 426.024 426.024" xml:space="preserve" fill="#000000"><g><g><g><g><path style="fill:#FCD09F;" d="M371.105,227.42L231.784,366.741c-11.13,11.13-23.794,20.626-37.604,28.185 c-6.909,3.783-13.52,8.047-19.806,12.749c-6.286,4.716-12.233,9.871-17.798,15.436l-2.913,2.913L20.224,292.587 c0,0,12.085-77.28,16.023-94.936c3.946-17.649,12.806-34.203,26.12-47.518l65.867-65.867c8.408-8.408,22.033-8.415,30.441-0.007 c5.982,5.982,9.157,13.711,9.532,21.538c0.021,0.516,0.035,1.04,0.035,1.563c-0.007,8.365-3.189,16.723-9.574,23.108 L280.85,8.287C286.379,2.758,293.62,0,300.861,0c7.248,0.007,14.482,2.772,20.011,8.301c4.702,4.702,7.396,10.649,8.089,16.787 c0.941,8.153-1.676,16.638-7.842,22.96l16.985-16.985c0.085-0.085,0.17-0.17,0.262-0.247c5.494-5.367,12.622-8.04,19.75-8.04 c7.241,0,14.489,2.765,20.011,8.287c4.702,4.702,7.396,10.649,8.089,16.787c0.955,8.266-1.747,16.879-8.096,23.229 l-20.612,20.612c5.523-5.523,12.763-8.28,20.004-8.28s14.482,2.758,20.004,8.28c4.702,4.702,7.403,10.656,8.096,16.794 c0.955,8.266-1.747,16.879-8.089,23.221l-61.455,61.455c9.525-9.525,25.081-10.034,34.754-0.657 c4.978,4.822,7.453,11.201,7.46,17.6C378.275,216.361,375.885,222.64,371.105,227.42z"></path> </g> </g> <path style="fill:#E2B991;" d="M158.669,130.468l-54.475,54.475c-2.093-2.093-3.132-4.829-3.132-7.573 c0.007-2.736,1.047-5.473,3.14-7.566l64.007-64.007c0.021,0.516,0.035,1.04,0.035,1.563 C168.236,115.725,165.054,124.083,158.669,130.468z"></path> <path style="fill:#E2B991;" d="M338.366,30.816L217.048,152.134c-2.093-2.093-3.133-4.83-3.133-7.573 c0.007-2.736,1.046-5.473,3.14-7.566L328.961,25.088c0.941,8.153-1.676,16.638-7.842,22.96l16.985-16.985 C338.189,30.978,338.274,30.894,338.366,30.816z"></path> <path style="fill:#E2B991;" d="M378.119,71.078L248.627,200.571c-2.093-2.093-3.133-4.83-3.132-7.573 c0.007-2.737,1.046-5.473,3.139-7.566L386.216,47.85C387.17,56.116,384.469,64.729,378.119,71.078z"></path> <path style="fill:#E2B991;" d="M397.522,131.706L278.248,250.98c-2.093-2.093-3.132-4.829-3.133-7.573 c0.007-2.737,1.047-5.473,3.14-7.566l127.357-127.357C406.566,116.75,403.865,125.363,397.522,131.706z"></path> </g> </g></svg>',
    function() {
      SVibrate(), Engine.PassCardPlayer(Player), $all("GPbtn").forEach(btn => SetDisabled(btn, 2000));
    }
  );
  AddButton(
    "Take GPbtn", "", "button", "Взяти", $("DurakSV"), '<svg width="50" height="50" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M42.3944 34.6289C42.239 36.0423 41.0783 37.7908 40.5684 37.8297C40.0585 37.8685 39.6408 36.6397 39.5534 35.4303C39.466 34.2258 31.9872 39.7676 31.5356 39.9862C31.1957 40.1513 27.432 40.3213 24.897 41.6764C24.052 42.1281 22.566 44.2652 22.3474 44.2992C21.4733 44.4352 20.5554 43.0607 19.7541 40.9236C18.9528 38.7865 12.7076 45.5377 13.3438 48.6462C14.1936 52.8135 16.1944 66.1848 21.2305 69.8664C29.8407 76.1562 44.0407 74.8594 49.3729 68.6813C54.7052 62.5032 54.914 58.5933 59.5032 53.5129C63.3883 49.2145 68.3806 49.8701 70.2746 47.6796C71.8675 45.834 69.5122 43.0218 68.6137 42.2495C67.0209 40.875 61.169 39.3888 56.5263 44.7703C54.7198 46.8637 52.4907 48.2431 50.3442 46.3925C48.2026 44.542 48.7367 40.3067 49.742 36.868" fill="url(#paint0_linear)"></path> <path d="M19.7491 40.9235C18.9478 38.7864 17.3841 33.0795 16.0438 29.9856C14.7034 26.8917 12.6541 25.8377 10.1725 27.1491C7.69093 28.4654 9.85198 34.2257 10.289 35.6488C10.9592 37.8296 12.5035 45.3288 13.3388 48.6413" fill="url(#paint1_linear)"></path> <path d="M31.5356 39.9861C31.084 40.2047 29.5737 39.0536 29.1317 35.1291C28.7918 32.1323 28.1508 23.754 27.2572 19.5138C26.3636 15.2737 25.0427 12.8403 22.4494 12.8209C19.8561 12.8015 18.9626 16.0556 19.3074 19.5721C19.7347 23.9191 20.4777 28.5819 21.1916 33.0552C21.7452 36.5522 23.2216 44.1631 22.3474 44.2991" fill="url(#paint2_linear)"></path> <path d="M21.1865 33.0599C21.711 36.3578 23.0514 43.3179 22.4686 44.2068C23.7604 43.7016 24.7074 40.0929 24.2558 38.2569C21.6624 27.6395 21.8373 13.7048 20.8077 13.3745C19.4771 14.4479 19.04 16.9347 19.2974 19.5769C19.7345 23.9239 20.4775 28.5866 21.1865 33.0599Z" fill="url(#paint3_linear)"></path> <path d="M49.742 36.8726C50.7472 33.4387 52.85 21.1165 53.6562 17.8526C54.4623 14.5935 52.7626 12.6702 50.6452 12.165C48.5327 11.6648 46.3085 12.9276 44.9779 19.4408C44.1377 23.5499 43.2199 27.1683 42.3943 34.6238L46.5805 38.7426L49.742 36.8726Z" fill="url(#paint4_linear)"></path> <path d="M39.5486 35.4303C39.4612 34.2258 39.5923 22.4864 39.5486 19.9122C39.4758 15.0892 41.4378 6.58948 35.5178 6.02121C32.4048 5.72493 31.7394 8.60999 31.6035 9.87767C31.4675 11.1453 31.4966 25.5221 31.5889 26.8189C31.686 28.1206 31.9823 39.7628 31.5306 39.9862" fill="url(#paint5_linear)"></path> <path d="M42.3945 34.6292C42.244 35.9892 41.8069 37.4754 41.3164 37.558C45.1773 38.2186 46.304 28.6017 47.1247 22.9918C47.7609 18.6497 50.4416 15.2498 50.8107 12.2141C50.7573 12.1996 50.699 12.185 50.6456 12.1704C48.5331 11.6701 46.3088 12.933 44.9782 19.4462C44.138 23.5552 43.2201 27.1737 42.3945 34.6292Z" fill="url(#paint6_linear)"></path> <path d="M31.589 26.8237C31.6862 28.1254 31.9824 39.7676 31.5307 39.991C35.4936 39.107 34.6486 25.726 34.3669 19.0962C34.1241 13.3455 36.0181 10.1253 34.4543 6.05518C32.2446 6.42916 31.725 8.7751 31.5988 9.88249C31.4628 11.1502 31.4968 25.522 31.589 26.8237Z" fill="url(#paint7_linear)"></path> <path d="M31.2734 40.0153C30.9528 39.9619 30.2341 39.0391 29.8262 38.1162C30.0399 38.9225 30.6615 40.0202 31.2734 40.0153Z" fill="url(#paint8_linear)"></path> <path d="M68.3904 43.3665C70.1484 44.4058 70.2649 44.8138 70.2358 44.299C69.7307 43.381 69.0217 42.6039 68.6138 42.2493C67.0209 40.8748 61.169 39.3886 56.5263 44.7701C54.7197 46.8635 52.4907 48.2429 50.3442 46.3924C49.4992 45.6638 49.0135 44.4447 48.761 43.0168C48.9261 50.4285 55.2636 49.0491 58.0366 46.7469C60.8047 44.4447 63.2329 40.3163 68.3904 43.3665Z" fill="url(#paint9_linear)"></path> <path d="M31.5891 26.824C31.6862 28.1257 31.9824 39.7679 31.5308 39.9913C33.6432 40.1856 34.0074 37.9611 33.7306 34.1969C33.1625 26.4743 32.1961 15.9298 33.8375 9.33882C33.9929 8.71713 33.8618 8.04686 33.4344 7.56602C32.3224 6.32263 31.7105 8.91141 31.6036 9.8828C31.4628 11.1505 31.4968 25.5223 31.5891 26.824Z" fill="url(#paint10_linear)"></path><path d="M19.3025 19.5769C19.7299 23.9239 20.4729 28.5866 21.1867 33.0599C21.7403 36.557 23.2166 44.1679 22.3425 44.3039C26.9316 43.9931 20.0504 25.687 20.808 13.3745C19.4822 14.4431 19.0452 16.9347 19.3025 19.5769Z" fill="url(#paint11_linear)"></path><path d="M21.41 44.3527C21.7596 44.445 21.9879 44.4207 22.1336 44.3187C21.3711 44.3382 20.4873 42.8908 19.7491 40.9237C18.9478 38.7866 17.3841 33.0796 16.0437 29.9857C15.4561 28.6258 14.7276 27.6592 13.8923 27.1152C14.7373 28.5723 13.9992 28.548 15.6649 32.1859C16.5536 34.1336 19.1518 43.7602 21.41 44.3527Z" fill="url(#paint12_linear)"></path><path d="M27.3833 29.1505C27.5921 32.7835 28.7625 39.627 31.1372 39.9767C30.5933 39.7582 29.4715 38.1796 29.1267 35.1294C28.7867 32.1327 28.1457 23.7543 27.2521 19.5142C26.5285 16.0803 25.5233 13.8315 23.7896 13.0884C27.0724 17.6685 27.189 25.7166 27.3833 29.1505Z" fill="url(#paint13_linear)"></path><path d="M38.2813 21.9911C38.4513 27.4406 37.3975 37.038 40.4082 37.8006C39.9712 37.6063 39.6312 36.5135 39.5487 35.4352C39.4613 34.2307 39.5924 22.4913 39.5487 19.9171C39.4953 16.5755 40.4228 11.4708 39.0291 8.45947C39.7721 12.2625 38.1453 17.5761 38.2813 21.9911Z" fill="url(#paint14_linear)"></path> <path d="M48.7609 43.0218C48.3772 40.8313 49.1348 38.9565 49.7419 36.8728C50.7471 33.4389 52.8499 21.1168 53.6561 17.8529C53.9038 16.8572 53.9135 15.9926 53.7532 15.2495C53.389 16.76 52.3546 18.3434 52.0001 21.345C51.427 26.1583 49.3339 33.6332 48.6201 36.1977C47.9013 38.767 45.9928 43.2258 48.7609 43.0218Z" fill="url(#paint15_linear)"></path> <path d="M52.4082 56.2228C42.069 68.2051 32.0843 65.6745 28.6752 63.7803C25.2709 61.8861 22.9107 56.8299 21.3275 48.879L18.7731 40.729C18.0398 41.171 15.2765 42.9729 12.4792 44.9983C12.7949 46.4117 13.096 47.7036 13.334 48.6508C14.1838 52.8181 16.1846 66.1894 21.2207 69.871C29.831 76.1608 44.031 74.864 49.3633 68.6859C54.6955 62.5078 54.9044 58.5979 59.4936 53.5175C63.3787 49.219 68.371 49.8796 70.265 47.6842C71.1294 46.6837 70.8283 45.3966 70.2261 44.3037C68.2593 48.7285 62.7474 44.2406 52.4082 56.2228Z" fill="url(#paint16_linear)"></path> <path d="M49.8391 12.0684C47.984 12.0684 46.1386 13.7537 44.9779 19.4461C44.1378 23.5551 43.2199 27.1736 42.3943 34.6291C42.2389 36.0424 41.0783 37.791 40.5684 37.8298C40.6169 37.791 40.8743 38.0144 41.3939 37.5384C45.6432 33.6431 44.9585 24.4391 46.43 19.621C47.6052 15.7548 48.8436 14.0937 49.8391 12.0684Z" fill="url(#paint17_linear)"></path> <defs> <linearGradient id="paint0_linear" x1="22.9049" y1="80.5243" x2="40.8757" y2="48.9646" gradientUnits="userSpaceOnUse"> <stop offset="0.00132565" stop-color="#D2A374"></stop> <stop offset="1" stop-color="#DEBA94"></stop> </linearGradient> <linearGradient id="paint1_linear" x1="-3.20533" y1="65.6565" x2="14.7654" y2="34.0969" gradientUnits="userSpaceOnUse"> <stop offset="0.00132565" stop-color="#D2A374"></stop> <stop offset="1" stop-color="#DEBA94"></stop> </linearGradient> <linearGradient id="paint2_linear" x1="2.13466" y1="68.6972" x2="20.1054" y2="37.1375" gradientUnits="userSpaceOnUse"> <stop offset="0.00132565" stop-color="#D2A374"></stop> <stop offset="1" stop-color="#DEBA94"></stop> </linearGradient> <linearGradient id="paint3_linear" x1="23.0509" y1="12.2725" x2="18.2123" y2="75.6841" gradientUnits="userSpaceOnUse"> <stop stop-color="#D2A374" stop-opacity="0"></stop> <stop offset="1" stop-color="#B88653"></stop> </linearGradient> <linearGradient id="paint4_linear" x1="18.4076" y1="77.9634" x2="36.3784" y2="46.4036" gradientUnits="userSpaceOnUse"> <stop offset="0.00132565" stop-color="#D2A374"></stop> <stop offset="1" stop-color="#DEBA94"></stop> </linearGradient> <linearGradient id="paint5_linear" x1="7.36792" y1="71.6777" x2="25.3385" y2="40.1176" gradientUnits="userSpaceOnUse"> <stop offset="0.00132565" stop-color="#D2A374"></stop> <stop offset="1" stop-color="#DEBA94"></stop> </linearGradient> <linearGradient id="paint6_linear" x1="50.0533" y1="11.4962" x2="35.7109" y2="53.3089" gradientUnits="userSpaceOnUse"> <stop stop-color="#D2A374" stop-opacity="0"></stop> <stop offset="1" stop-color="#B88653"></stop> </linearGradient> <linearGradient id="paint7_linear" x1="34.5777" y1="3.73458" x2="29.0479" y2="66.8004" gradientUnits="userSpaceOnUse"> <stop stop-color="#D2A374" stop-opacity="0"></stop> <stop offset="1" stop-color="#B88653"></stop> </linearGradient> <linearGradient id="paint8_linear" x1="38.2191" y1="39.6906" x2="16.6718" y2="37.949" gradientUnits="userSpaceOnUse"> <stop stop-color="#FFBC47"stop-opacity="0"></stop> <stop offset="1" stop-color="#FFA754"></stop> </linearGradient> <linearGradient id="paint9_linear" x1="64.5608" y1="33.9178" x2="46.9355" y2="68.127" gradientUnits="userSpaceOnUse"> <stop stop-color="#D2A374" stop-opacity="0"></stop> <stop offset="1" stop-color="#B88653"></stop> </linearGradient> <linearGradient id="paint10_linear" x1="31.3308" y1="-3.28781" x2="34.6142" y2="62.1971" gradientUnits="userSpaceOnUse"> <stop stop-color="#D2A374" stop-opacity="0"></stop> <stop offset="1" stop-color="#B88653"></stop> </linearGradient> <linearGradient id="paint11_linear" x1="21.2236" y1="20.2174" x2="22.6061" y2="55.9836" gradientUnits="userSpaceOnUse"> <stop stop-color="#D2A374" stop-opacity="0"></stop> <stop offset="1" stop-color="#B88653"></stop> </linearGradient> <linearGradient id="paint12_linear" x1="15.3511" y1="25.5504" x2="20.5714" y2="45.4081" gradientUnits="userSpaceOnUse"> <stop stop-color="#D2A374" stop-opacity="0"></stop> <stop offset="1" stop-color="#B88653"></stop> </linearGradient> <linearGradient id="paint13_linear" x1="28.8684" y1="15.8364" x2="26.0639" y2="37.2472" gradientUnits="userSpaceOnUse"> <stop stop-color="#D2A374" stop-opacity="0"></stop> <stop offset="1" stop-color="#B88653"></stop> </linearGradient> <linearGradient id="paint14_linear" x1="36.314" y1="22.9256" x2="40.5317" y2="23.175" gradientUnits="userSpaceOnUse"> <stop stop-color="#D2A374" stop-opacity="0"></stop> <stop offset="1" stop-color="#B88653"></stop></linearGradient><linearGradient id="paint15_linear"x1="55.405" y1="22.9107" x2="28.4495" y2="63.3388" gradientUnits="userSpaceOnUse"> <stop stop-color="#D2A374" stop-opacity="0"></stop> <stop offset="1" stop-color="#B88653"></stop> </linearGradient> <linearGradient id="paint16_linear" x1="41.6457" y1="35.663" x2="41.6457" y2="110.545" gradientUnits="userSpaceOnUse"> <stop stop-color="#D2A374" stop-opacity="0"></stop> <stop offset="1" stop-color="#B88653"></stop></linearGradient><linearGradient id="paint17_linear" x1="48.8271" y1="25.5733" x2="28.7868" y2="22.1186" gradientUnits="userSpaceOnUse"><stop stop-color="#D2A374" stop-opacity="0"></stop> <stop offset="1" stop-color="#B88653"></stop></linearGradient></defs></g></svg>',
    function() {
      SVibrate(), Engine.TakeCardPlayer(Player, "player"), $all("GPbtn").forEach(btn => SetDisabled(btn, 2000));
    }
  );
  AddButton(
    "Stop GPbtn", "", "button", "Далі", $("DurakSV"), "",
    function() {
      SVibrate(), Engine.Stop(), $all("GPbtn").forEach(btn => SetDisabled(btn, 1500));
    }
  );
  AllListeners();
  AppSettings();
  HideElement($all("GPbtn"), true);
  HideElement($("fireworks")), SetAudio();
}
function AppSettings() {
  ToggleTheme(), GetName(), UserAvatar(),  ToggleVolume(), OffAnimations(), GetSuitPicture(), ToggleSuit(), GetPlayers(), CardSize();
}
function AllListeners() {
  let css = _("style");
  $all("[data-dynamic-select]", true).forEach(select => new DynamicSelect(select));
  css.textContent = `.sms{position:fixed;text-decoration:none;z-index:999999;max-width:300px;background-color:#fff;-webkit-box-shadow:0 0 20px 0 rgba(0,0,0,.12);box-shadow:0 0 20px 0 rgba(0,0,0,.12);border-radius:4px;display:-webkit-box;display:-ms-flexbox;display:flex;padding:10px;-webkit-transform:translate(0,-150%);-ms-transform:translate(0,-150%);transform:translate(0,-150%)}.dynamic-select,.sms .icon{display:-webkit-box;display:-ms-flexbox}.sms .icon{display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-right:.5rem;background:-o-radial-gradient(center,circle,#fff 35%,transparent 35%);background:radial-gradient(circle at center,#fff 35%,transparent 35%)}.sms .sms-wrapper{-webkit-box-flex:1;-ms-flex:1;flex:1;padding-right:10px;overflow:hidden}.sms .sms-wrapper .sms-header{padding:0 0 5px;margin:0;font-weight:700;font-size:14px;word-break:break-all;color:#4f525a}.sms .sms-wrapper .sms-content{font-size:12px;margin:0;padding:0;word-break:break-all;color:#4f525a}.sms .sms-close{-webkit-appearance:none;-moz-appearance:none;appearance:none;border:none;background:0 0;cursor:pointer;font-size:24px;line-height:24px;padding-bottom:4px;font-weight:700;color:rgba(0,0,0,.2)}.sms .sms-close:hover,.sms.sms-error .sms-close:hover,.sms.sms-success .sms-close:hover,.sms.sms-verified .sms-close:hover{color:rgba(0,0,0,.4)}.sms.sms-top-center{-webkit-transform:translate(calc(50vw - 50%),-150%);-ms-transform:translate(calc(50vw - 50%),-150%);transform:translate(calc(50vw - 50%),-150%)}.sms.sms-bottom-left,.sms.sms-bottom-right{-webkit-transform:translate(0,150%);-ms-transform:translate(0,150%);transform:translate(0,150%)}.sms.sms-bottom-center{-webkit-transform:translate(calc(50vw - 50%),150%);-ms-transform:translate(calc(50vw - 50%),150%);transform:translate(calc(50vw - 50%),150%)}.sms.sms-dark{background-color:#2d2e31}.sms.sms-dark .sms-wrapper .sms-content,.sms.sms-dark .sms-wrapper .sms-header{color:#edeff3}.sms.sms-dark .sms-close{color:rgba(255,255,255,.2)}.sms.sms-dark .sms-close:hover{color:rgba(255,255,255,.4)}.sms.sms-success{background-color:#c3f3d7;border-left:4px solid #51a775}.sms.sms-success .sms-wrapper .sms-content,.sms.sms-success .sms-wrapper .sms-header{color:#51a775}.sms.sms-error .sms-close,.sms.sms-success .sms-close,.sms.sms-verified .sms-close{color:rgba(0,0,0,.2)}.sms.sms-error{background-color:#f3c3c3;border-left:4px solid #a75151}.sms.sms-error .sms-wrapper .sms-content,.sms.sms-error .sms-wrapper .sms-header{color:#a75151}.sms.sms-verified{background-color:#d0eaff;border-left:4px solid #6097b8}.sms.sms-verified .sms-wrapper .sms-content,.sms.sms-verified .sms-wrapper .sms-header{color:#6097b8}.sms.sms-dimmed{opacity:.3}.sms.sms-dimmed:active,.sms.sms-dimmed:hover{opacity:1}.dynamic-select{display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;position:relative;width:100%;height:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.dynamic-select .dynamic-select-header{padding:0 15px 0 0;position:relative}.dynamic-select .dynamic-select-header::after{content:"";display:block;position:absolute;top:50%;right:15px;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23949ba3' viewBox='0 0 16 16'%3E%3Cpath d='M8 13.1l-8-8 2.1-2.2 5.9 5.9 5.9-5.9 2.1 2.2z'/%3E%3C/svg%3E");height:9px;width:9px}.dynamic-select .dynamic-select-header.dynamic-select-header-active{border-color:#c1c9d0}.dynamic-select .dynamic-select-header.dynamic-select-header-active::after{-webkit-transform:translateY(-50%) rotate(180deg);-ms-transform:translateY(-50%) rotate(180deg);transform:translateY(-50%) rotate(180deg)}.dynamic-select .dynamic-select-header.dynamic-select-header-active+.dynamic-select-options{display:-webkit-box;display:-ms-flexbox;display:flex}.dynamic-select .dynamic-select-header .dynamic-select-header-placeholder{color:#65727e}.dynamic-select .dynamic-select-options{display:none;-ms-flex-flow:wrap;flex-flow:wrap;position:absolute;top:100%;left:0;right:0;z-index:999;margin-top:5px;padding:5px;background-color:#fff;border-radius:5px;-webkit-box-shadow:0 0 10px rgba(0,0,0,.1);box-shadow:0 0 10px rgba(0,0,0,.1);max-height:200px;overflow-y:auto;overflow-x:hidden}.dynamic-select .dynamic-select-options::-webkit-scrollbar{width:5px}.dynamic-select .dynamic-select-options::-webkit-scrollbar-track{background:#f0f1f3;border-radius:4px}.dynamic-select .dynamic-select-options::-webkit-scrollbar-thumb{background:#149b1e;border-radius:4px}.dynamic-select .dynamic-select-options::-webkit-scrollbar-thumb:hover{background:#b2b6b9}.dynamic-select .dynamic-select-options .dynamic-select-option{padding:7px 12px}.dynamic-select .dynamic-select-options .dynamic-select-option:active,.dynamic-select .dynamic-select-options .dynamic-select-option:hover{background-color:#f3f4f7}.dynamic-select .dynamic-select-header,.dynamic-select .dynamic-select-option{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border-radius:5px;cursor:pointer;display:flex;width:100%;height:3rem;font-size:1rem;color:#212529}.dynamic-select .dynamic-select-header img,.dynamic-select .dynamic-select-option img{-o-object-fit:contain;object-fit:contain;max-height:75%;max-width:75%}.dynamic-select .dynamic-select-header img.dynamic-size,.dynamic-select .dynamic-select-option img.dynamic-size{-o-object-fit:fill;object-fit:fill;max-height:none;max-width:none;border-radius:5px}.dynamic-select .dynamic-select-header i,.dynamic-select .dynamic-select-header img,.dynamic-select .dynamic-select-header span,.dynamic-select .dynamic-select-header svg,.dynamic-select .dynamic-select-option i,.dynamic-select .dynamic-select-option img,.dynamic-select .dynamic-select-option span,.dynamic-select .dynamic-select-option svg{-webkit-box-sizing:border-box;box-sizing:border-box;margin-right:10px}.dynamic-select .dynamic-select-header.dynamic-select-no-text,.dynamic-select .dynamic-select-option.dynamic-select-no-text{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.dynamic-select .dynamic-select-header.dynamic-select-no-text i,.dynamic-select .dynamic-select-header.dynamic-select-no-text img,.dynamic-select .dynamic-select-header.dynamic-select-no-text span,.dynamic-select .dynamic-select-header.dynamic-select-no-text svg,.dynamic-select .dynamic-select-option.dynamic-select-no-text i,.dynamic-select .dynamic-select-option.dynamic-select-no-text img,.dynamic-select .dynamic-select-option.dynamic-select-no-text span,.dynamic-select .dynamic-select-option.dynamic-select-no-text svg{margin-right:0}.dynamic-select .dynamic-select-header .dynamic-select-option-text,.dynamic-select .dynamic-select-option .dynamic-select-option-text{-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-flex:1;-ms-flex:1;flex:1;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;color:#9b9b9b;font-size:inherit;padding-right:1rem;text-align:left}`;
  $insert(document.head, css);
  Root.setAttribute("data-deck", "basic");
  Root.setAttribute("lang", "uk");
  $all("value").forEach(button => {
    button.setAttribute("data-sound", "0");
    button.addEventListener("click", () => {
      button.classList.add("active"), TogglePane();
      SVibrate();
      setTimeout(() => {
        $all("part-menu").forEach(part => part.classList.remove("active"));
      }, 250);
    });
  });
  $("burger").setAttribute("data-sound", "1");
  $("suit").setAttribute("data-sound", "0");
  $("suit").addEventListener("click", () => {
    ToggleSuit();
    isSelect 
      ? (SVibrate(), isSelect = false) 
      : (SVibrate(), ShowMessage("Інфо", "Виберіть сорочку для карт", "verified", "4s"), isSelect = true);
  });
  $("cardsize").setAttribute("data-sound", "0");
  $("cardsize").addEventListener("click", () => { 
    CardSize();
    isSelect 
      ? (SVibrate(), isSelect = false) 
      : (SVibrate(), ShowMessage("Інфо", "Виберіть розмір карт", "verified", "4s"), isSelect = true);
  });
  $all("btn-menu li button").forEach(btn => {
    btn.setAttribute("data-sound", "0");
    AddListener(btn, "click", TogglePane);
    AddListener(btn, "click", SVibrate);
  });
  $all("settings-navs button").forEach(btn => {
    btn.setAttribute("data-sound", "0");
    AddListener(btn, "click", ToggleSettings);
    AddListener(btn, "click", SVibrate);
  });
  $("accept-rules").setAttribute("data-sound", "0");
  $("accept-rules").addEventListener("click", () => {
    SVibrate(), TogglePane();
  });
  $("mainlogo").onclick = () => window.location.reload();
  $("overlay").onclick = () => {
    navigator.vibrate([20, 20]), ToggleStan("part-menu");
  }
}
function SVibrate() {
  navigator.vibrate([15, 15, 15]);
}
function TogglePane(id) {
  id = event.currentTarget.getAttribute("data-id");
  $all("pane").forEach(pane => {
    pane.classList.remove("active");
    $(id).classList.add("active");
    $all("value").forEach(button => {
      button.removeAttribute("data-select");
      if (id === button.getAttribute("data-id")) {
        button.setAttribute("data-select", true);
      }
    });
  });
  SetColors(id);
  if (id === "game") {
    HideElement($("theme"));
    ShowElement($("ToMenu"));
    HideElement($("logo"));
    $insert($("header"), $("ToMenu"));
    isProcess 
      ? "" 
      : Koloda.InsertCards();
  }
}
function ToggleSettings(id) {
  $all("settings-block").forEach(block => {
    id = event.currentTarget.getAttribute("data-id");
    block.classList.remove("active");
    $(id).classList.add("active");
    $all("settings-navs button").forEach(btn => {
      btn.classList.remove("active");
      btn.setAttribute("data-sound", "0");
      event.currentTarget.classList.add("active");
    });
  });
}

// Функції пов'язані з користувацькими налаштуваннями:

function SetColors(page) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://rawcdn.githack.com/VernyStar/Duren-Card-Game/c07982f022df6b11bec4c45176153ab9d16d36c2/options.json");
  xhr.responseType = "json";
  xhr.send();
  xhr.onload = function() {
    let options = xhr.response;
    GetColors(options, page);
  }
  xhr.onerror = function() {
    ShowMessage(
      "Помилка", "Перевірте ваше інтернет-з'єднання та оновіть сторінку!", "error", "5s"
    );
  }
  function GetColors(json, page) {
    let theme = Root.getAttribute("data-theme");
    theme === "dark" ? index = 0 : index = 1;
    let colors = json["colors"][page]["theme"][theme];
    Root.style.setProperty(
      "--page-color", colors["color"]
    );
    Root.style.setProperty(
      "--top-border", colors["border"]
    );
    Root.style.setProperty(
      "--box-bdblur", colors["blur"]
    );
    Root.style.setProperty(
      "--body-color", colors["body"]
    );
    Root.style.setProperty(
      "--header-filter", colors["header"]
    );
  }
}
function ToggleTheme() {
  let sign = $("theme").querySelectorAll("svg");
  let GetActivePage = () => {
    let pages = $all("pane");
    for (let i = 0; i < pages.length; i++) {
      if ($check(pages[i], "active")) {
        let id = pages[i].getAttribute("id");
        return id;
      }
    }
  }
  let GetSavedTheme = () => localStorage.getItem("theme");
  let SetTheme = theme => localStorage.setItem("theme", theme);
  let GetPrefTheme = () => {
    let theme = GetSavedTheme();
    if (theme) {
      return theme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  let ChangeTheme = theme => {
    HideElement(sign, true);
    if (theme === "light") {
      Root.setAttribute("data-theme", "light");
      SetColors(GetActivePage());
      ShowElement(sign[0]);
    } else if (theme === "dark") {
      Root.setAttribute("data-theme", "dark");
      SetColors(GetActivePage());
      ShowElement(sign[1]);
    }
  }
  ChangeTheme(GetPrefTheme());
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    let theme = GetSavedTheme()
    if (theme !== "light" && theme !== "dark") {
      ChangeTheme(GetPrefTheme());
    }
  });
  sign.forEach(svg => {
    svg.addEventListener("click", () => {
      let theme = event.currentTarget.getAttribute("data-theme-value");
      SetTheme(theme);
      ChangeTheme(theme);
    });
  });
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
function GetName() {
  let UserName = () => localStorage.getItem("user");
  let SetName = (name) => localStorage.setItem("user", name);
  let PlayerName = () => {
    let username = UserName();
    if (username) {
      return $("un-lable").innerHTML = username;
    } else {
      return $("un-lable").innerHTML = prompt("Вкажіть своє ім'я, будь ласка!", "") || "Стицько";
    }
  }
  SetName(PlayerName());
  window.addEventListener("DOMContentLoaded", () => {
    PlayerName();
    $("username").addEventListener("click", event => {
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
function UserAvatar() {
  let GetAvatar = () => localStorage.getItem("avatar");
  let msg = localStorage.getItem("msgAva");
  let Avatar = GetAvatar();
  if (!Avatar) {
    if (!msg) {
      ShowMessage(
        "Інфо", "Змінити аватар можна в меню налаштувань", "verified", "4s", false
      );
      Avatar = "https://i.postimg.cc/vTvNKTDN/avatar-female.webp";
      localStorage.setItem("msgAva", true);
    } else {
      Avatar = "https://i.postimg.cc/vTvNKTDN/avatar-female.webp";
      localStorage.setItem("avatar", Avatar);
    }
  }
  let image = _("img");
  image.id = "img";
  image.alt = "Фото профілю";
  image.src = Avatar;
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
    AddListener($("foto-input"), "change", SetAvatar);
  });
}
function RulesFS() {
  let inner = $("font-size").innerHTML;
  if (inner === "Збільшити шрифт") {
    $("font-size").innerHTML = "Зменшити шрифт";
    Root.style.setProperty("--font-rules", "1rem");
    Root.style.setProperty("--rules-scroll", "5px");
  } else {
    $("font-size").innerHTML = "Збільшити шрифт";
    Root.style.setProperty("--font-rules", "0.775rem");
    Root.style.setProperty("--rules-scroll", "0");
  }
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
  user = localStorage.getItem("user");
  let Avatar = localStorage.getItem("avatar");
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
function GetSuitPicture() {
  new DynamicSelect("#suit", { columns: 2, height: "100px", width: "85%", dropdownWidth: "100%", placeholder: "Виберіть сорочку для карт",
    data: [
      {
        value: "bicycle",
          img: "https://rawcdn.githack.com/VernyStar/Duren-Card-Game/ad55c9da34092102a94632ff9dbb243b374af409/images/Bicycle.jpg",
          imgWidth: "53.5px",
          imgHeight: "80px",
          text: "Bicycle",
          selected: IsTheSuits("bicycle"),
        },
        {
          value: "tally-ho",
          img: "https://rawcdn.githack.com/VernyStar/Duren-Card-Game/ad55c9da34092102a94632ff9dbb243b374af409/images/tally-ho.jpg",
          imgWidth: "53px",
          imgHeight: "80px",
          text: "Tally-Ho",
          selected: IsTheSuits("tally-ho"),
        },
        {
          value: "bicycle-blue",
          img: "https://rawcdn.githack.com/VernyStar/Duren-Card-Game/ad55c9da34092102a94632ff9dbb243b374af409/images/Bicycle-blue.png",
          imgWidth: "53.5px",
          imgHeight: "80px",
          text: "Bicycle ",
          selected: IsTheSuits("bicycle-blue"),
        },
        {
          value: "french",
          img: 'https://rawcdn.githack.com/VernyStar/Duren-Card-Game/ad55c9da34092102a94632ff9dbb243b374af409/images/back.png',
          imgWidth: "53.5px",
          imgHeight: "80px",
          text: "French",
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
function ToggleSuit(value) {
  let input = $("suit").querySelector("input");
  value = input.value;
  let PrefSuit = () => localStorage.getItem("suit");
  let SetPrefSuit = suit => localStorage.setItem("suit", suit);
  let GetSuitCard = () => {
    let suit = PrefSuit();
    if (suit) {
      return suit;
    }
    return suit ? suit : value;
  }
  let SetSuit = suit => {
    if (suit === "bicycle") {
      Root.style.setProperty("--card-back", "url('https://rawcdn.githack.com/VernyStar/Duren-Card-Game/ad55c9da34092102a94632ff9dbb243b374af409/images/Bicycle.jpg')");
      Root.style.setProperty("--card-back-bg-size", "100% 100%");
      Root.style.setProperty("--card-back-bg-position", "center center");
    } else if (suit === "tally-ho") {
      Root.style.setProperty("--card-back", "url('https://rawcdn.githack.com/VernyStar/Duren-Card-Game/ad55c9da34092102a94632ff9dbb243b374af409/images/tally-ho.jpg')");
      Root.style.setProperty("--card-back-bg-size", "100% 100%");
      Root.style.setProperty("--card-back-bg-position", "center center");
    } else if (suit === "bicycle-blue") {
      Root.style.setProperty("--card-back", "url('https://rawcdn.githack.com/VernyStar/Duren-Card-Game/ad55c9da34092102a94632ff9dbb243b374af409/images/Bicycle-blue.png')");
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
function CardSize() {
  let select = $("cardsize").querySelector("input");
  let value = select.value;
  let PrefSize = () => localStorage.getItem("size");
  let SetPrefSize = size => localStorage.setItem("size", size);
  let GetSizeCard = () => {
    let size = PrefSize();
    if (size) {
      return size;
    }
    return size ? size : value;
  }
  let SetSize = size => {
    size = value;
    if (size === "S") {
      Root.style.setProperty("--de3k-scale", "0.525");
    } else if (size === "L") {
      Root.style.setProperty("--de3k-scale", "0.6");
    } else if (size === "XL") {
      Root.style.setProperty("--de3k-scale", "0.7");
    }
    localStorage.setItem("size", size);
  }
  SetSize(GetSizeCard());
  window.addEventListener("DOMContentLoaded", () => {
    GetSizeCard();
    select.addEventListener("change", () => {
      SetSize(value);
      SetPrefSize(value);
    });
  });
}

// Функції для анімування карт та операціями з ними:

function ShuffleCards(array) {
  let random, temp;
  for (var i = array.length - 1; i; i--) {
    random = Math.random() * i | 0;
    temp = array[i];
    array[i] = array[random];
    array[random] = temp;
  }
  return array;
}
function Kut(degrees) {
  return degrees * Math.PI / 180;
}
function CreateAnimation(delay, duration) {
  let now = Date.now();
  let start = now + delay;
  let end = start + duration;
  let animation = {
    start: start,
    end: end
  };
  Animations.push(animation);
  if (!interval) {
    interval = true;
    requestAnimationFrame(Tick);
  }
  let self = {
    start: function start(cb) {
      animation.startcb = cb;
      return self;
    },
    progress: function progress(cb) {
      animation.progresscb = cb;
      return self;
    },
    end: function end(cb) {
      animation.endcb = cb;
      return self;
    }
  };
  return self;
}
function Tick() {
  let now = Date.now();
  if (!Animations.length) {
    interval = false;
    return;
  }
  for (let i = 0, animation; i < Animations.length; i++) {
    animation = Animations[i];
    if (now < animation.start) {
      continue;
    }
    if (!animation.started) {
      animation.started = true;
      animation.startcb && animation.startcb();
    }
    let t = (now - animation.start) / (animation.end - animation.start);
    animation.progresscb && animation.progresscb(t < 1 ? t : 1);
    if (now > animation.end) {
      animation.endcb && animation.endcb();
      Animations.splice(i--, 1);
      continue;
    }
  }
  requestAnimationFrame(Tick);
}
function Prefix(options) {
  if (typeof stored[options] !== "undefined") {
    return stored[options];
  }
  if (typeof style[options] !== "undefined") {
    stored[options] = options;
    return options;
  }
  let camelCase = options[0].toUpperCase() + options.slice(1);
  let prefixes = ["webkit", "moz", "Moz", "ms", "o"];
  let test;
  for (let i = 0, len = prefixes.length; i < len; i++) {
    test = prefixes[i] + camelCase;
    if (typeof style[test] !== "undefined") {
      stored[options] = test;
      return test;
    }
  }
}
function translate(a, b, c) {
  typeof isHased !== "undefined" || (isHased = CheckMobile());
  c = c || 0;
  if (isHased) {
    return "translate3d(" + a + ", " + b + ", " + c + ")";
  } else {
    return "translate(" + a + ", " + b + ")";
  }
}
function CheckMobile() {
  let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (!isMobile) {
    return false;
  }
  let transform = Prefix("transform");
  let $p = _("p");
  $insert(document.body, $p);
  $p.style[transform] = "translate3d(1px,1px,1px)";
  isHased = $p.style[transform];
  isHased = isHased != null && isHased.length && isHased !== "none";
  document.body.removeChild($p);
  return isHased;
}

// Задання рангу, масті та ціни для карт:

function isRank(rank) {
  let $rank;
  switch(rank) {
    case 1: $rank = "six";
      break;
    case 2: $rank = "seven";
      break;
    case 3: $rank = "eight";
      break;
    case 4: $rank = "nine";
      break;
    case 5: $rank = "ten";
      break;
    case 6: $rank = "jack";
      break;
    case 7: $rank = "queen";
      break;
    case 8: $rank = "king";
      break;
    case 9: $rank = "ace";
      break;
  }
  return $rank;
}
function isSuit(suit) {
  let $suit;
  switch(suit) {
    case 0: $suit = "spades";
      break;
    case 1: $suit = "hearts";
      break;
    case 2: $suit = "clubs";
      break;
    case 3: $suit = "diamonds";
      break;
  }
  return $suit;
}
function isCost(cost, rank) {
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

// Основна функція елементу 'карта'

var AddDeck = (function() {
  function PlayCard(i) {
    let transform = Prefix("transform");
    let rank = isRank(i % 9 + 1);
    let suit = isSuit(i / 9 | 0);
    let cost = isCost(0, rank);
    let z = (36 - i) / 4;
    let $el = _("div");
    let $face = _("div");
    let $back = _("div");
    let isDraggable = false;
    let isFlippable = false;
    let self = { 
      i: i, rank: rank, suit: suit, cost: cost, pos: i, $el: $el, mount: mount, unmount: unmount, setSide: setSide, isTrump: isTrump
    };
    let modules = AddDeck.modules;
    let module;
    $face.classList.add("face");
    $back.classList.add("back");
    $el.style[transform] = translate(-z + "px", -z + "px");
    self.x = -z;
    self.y = -z;
    self.z = z;
    self.rot = 0;
    self.setSide("back");
    AddListener($el, "mousedown", onMousedown);
    AddListener($el, "touchstart", onMousedown);
    for (module in modules) {
      addModule(modules[module]);
    }
    self.animateTo = function(options) {
      let delay = options.delay;
      let duration = options.duration;
      let optionsX = options.x;
      let x = optionsX === undefined ? self.x : optionsX;
      let optionsY = options.y;
      let y = optionsY === undefined ? self.y : optionsY;
      let optionsRot = options.rot;
      let rot = optionsRot === undefined ? self.rot : optionsRot;
      let ease$$ = options.Ease;
      let onStart = options.onStart;
      let onProgress = options.onProgress;
      let onComplete = options.onComplete;
      let startX, startY, startRot;
      let diffX, diffY, diffRot;
      CreateAnimation(delay, duration).start(function() {
        startX = self.x || 0;
        startY = self.y || 0;
        startRot = self.rot || 0;
        onStart && onStart();
      }).progress(function (t) {
        let et = Ease[ease$$ || "cubicInOut"](t);
        diffX = x - startX;
        diffY = y - startY;
        diffRot = rot - startRot;
        onProgress && onProgress(t, et);
        self.x = startX + diffX * et;
        self.y = startY + diffY * et;
        self.rot = startRot + diffRot * et;
        $el.style[transform] = translate(self.x + "px", self.y + "px") + (diffRot ? "rotate(" + self.rot + "deg)" : "");
      }).end(function () {
        onComplete && onComplete();
      });
    };
    self.setRankSuit = function (rank, suit) {
      $el.setAttribute("class", "card " + rank + "-" + suit);
    };
    self.setRankSuit(rank, suit);
    self.enableDragging = function () {
      if (isDraggable) {
        return;
      }
      isDraggable = true;
      $el.style.cursor = "move";
    };
    self.disableDragging = function() {
      if (!isDraggable) {
        return;
      }
      isDraggable = false;
      $el.style.cursor = "";
    };
    self.enableFlipping = function () {
      if (isFlippable) {
        return;
      }
      isFlippable = true;
    };
    self.disableFlipping = function() {
      if (!isFlippable) {
        return;
      }
      isFlippable = false;
    };
    self.isTrump = function() {
      $el.setAttribute("trump", true);
    }
    return self;
    function addModule(module) {
      module.card && module.card(self);
    }
    function onMousedown(e) {
      let startPos = {};
      let pos = {};
      let starttime = Date.now();
      e.preventDefault();
      if (e.type === "mousedown") {
        startPos.x = pos.x = e.clientX;
        startPos.y = pos.y = e.clientY;
        AddListener(window, "mousemove", onMousemove);
        AddListener(window, "mouseup", onMouseup);
      } else {
        startPos.x = pos.x = e.touches[0].clientX;
        startPos.y = pos.y = e.touches[0].clientY;
        AddListener(window, "touchmove", onMousemove);
        AddListener(window, "touchend", onMouseup);
      }
      if (!isDraggable) {
        return;
      }
      $el.style[transform] = translate(self.x + "px", self.y + "px") + (self.rot ? " rotate(" + self.rot + "deg)" : "");
      $el.style.zIndex = FullDeck++;
      function onMousemove(e) {
        if (!isDraggable) {
          return;
        }
        if (e.type === "mousemove") {
          pos.x = e.clientX;
          pos.y = e.clientY;
        } else {
          pos.x = e.touches[0].clientX;
          pos.y = e.touches[0].clientY;
        }
        $el.style[transform] = translate(Math.round(self.x + pos.x - startPos.x) + "px", Math.round(self.y + pos.y - startPos.y) + "px") + (self.rot ? " rotate(" + self.rot + "deg)" : "");
      }
      function onMouseup(e) {
        if (isFlippable && Date.now() - starttime < 200) {
          self.setSide(self.side === "front" ? "back" : "front");
        }
        if (e.type === "mouseup") {
          RemoveListener(window, "mousemove", onMousemove);
          RemoveListener(window, "mouseup", onMouseup);
        } else {
          RemoveListener(window, "touchmove", onMousemove);
          RemoveListener(window, "touchend", onMouseup);
        }
        if (!isDraggable) {
          return;
        }
        self.x = self.x + pos.x - startPos.x;
        self.y = self.y + pos.y - startPos.y;
      }
    }
    function mount(target) {
      target.appendChild($el);
      self.$root = target;
    }
    function unmount() {
      self.$root && self.$root.removeChild($el);
      self.$root = null;
    }
    function setSide(newSide) {
      if (newSide === "front") {
        if (self.side === "back") {
          $el.removeChild($back);
        } else if (self.side === "attk") {
          $el.removeAttribute("attk");
        }
        self.side = "front";
        $el.appendChild($face);
        self.setRankSuit(self.rank, self.suit);
      } else if (newSide === "attk") {
        if (self.side === "back") {
          $el.removeChild($back);
        } else if (self.side === "front") {
          $el.removeChild($face);
        }
        self.side = "attk";
        $el.setAttribute("attk", true);
      } else {
        if (self.side === "front") {
          $el.removeChild($face);
        } else if (self.side === "attk") {
          $el.removeAttribute("attk");
        }
        self.side = "back";
        $el.appendChild($back);
      }
    }
    function isTrump() {
      $el.setAttribute("trump", true);
    }
  }
  let Ease = {
    linear: function linear(t) {
      return t;
    },
    quadIn: function quadIn(t) {
      return t * t;
    },
    quadOut: function quadOut(t) {
      return t * (2 - t);
    },
    quadInOut: function quadInOut(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    cubicIn: function cubicIn(t) {
      return t * t * t;
    },
    cubicOut: function cubicOut(t) {
      return --t * t * t + 1;
    },
    cubicInOut: function cubicInOut(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    quartIn: function quartIn(t) {
      return t * t * t * t;
    },
    quartOut: function quartOut(t) {
      return 1 - --t * t * t * t;
    },
    quartInOut: function quartInOut(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
    },
    quintIn: function quintIn(t) {
      return t * t * t * t * t;
    },
    quintOut: function quintOut(t) {
      return 1 + --t * t * t * t * t;
    },
    quintInOut: function quintInOut(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
    }
  };
  let Flip = {
    deck: function deck(flipDeck) {
      flipDeck.Flip = flipDeck.queued(Flip);
      function Flip(next, side) {
        let flipped = flipDeck.cards.filter(function(card) {
          return card.side === "front";
        }).length / flipDeck.cards.length;
        flipDeck.cards.forEach(function(card, i) {
          card.setSide(side ? side : flipped > 0.5 ? "back" : "front");
        });
        next();
      }
    }
  };
  let Sort = {
    deck: function deck(sortDeck) {
      sortDeck.Sort = sortDeck.queued(Sort);
      function Sort(next, reverse) {
        let cards = sortDeck.cards;
        cards.sort(function(a, b) {
          if (reverse) {
            return a.i - b.i;
          } else {
            return b.i - a.i;
          }
        });
        cards.forEach(function(card, i) {
          card.Sort(i, cards.length, function(i) {
            if (i === cards.length - 1) {
              next();
            }
          }, reverse);
        });
      }
    },
    card: function card(sortCard) {
      let $el = sortCard.$el;
      sortCard.Sort = function(i, length, evt, reverse) {
        let z = i / 4;
        let delay = i * 10;
        sortCard.animateTo({
          delay: delay,
          duration: 400,
          x: -z,
          y: -150,
          rot: 0,
          onComplete: function onComplete() {
            $el.style.zIndex = i;
          }
        });
        sortCard.animateTo({
          delay: delay + 500,
          duration: 400,
          x: -z,
          y: -z,
          rot: 0,
          onComplete: function onComplete() {
            evt(i);
          }
        });
      };
    }
  };
  let Shuffle = {
    deck: function deck(shuffleDeck) {
      shuffleDeck.Shuffle = shuffleDeck.queued(Shuffle);
      function Shuffle(next) {
        let cards = shuffleDeck.cards;
        ShuffleCards(cards);
        cards.forEach(function(card, i) {
          card.pos = i;
          card.Shuffle(function(i) {
            if (i === cards.length - 1) {
              next();
            }
          });
        });
        return;
      }
    },
    card: function card(shuffleCard) {
      let $el = shuffleCard.$el;
      shuffleCard.Shuffle = function(evt) {
        let i = shuffleCard.pos;
        let z = i / 4;
        let delay = i * 2;
        shuffleCard.animateTo({
          delay: delay,
          duration: 200,
          x: Shuffling(Math.random() * 40 + 20) * fontSize / 16,
          y: -z,
          rot: 0
        });
        shuffleCard.animateTo({
          delay: 200 + delay,
          duration: 200,
          x: -z,
          y: -z,
          rot: 0,
          onStart: function onStart() {
            $el.style.zIndex = i;
          },
          onComplete: function onComplete() {
            evt(i);
          }
        });
      };
    }
  };
  let FirstOppDrop = {
    deck: function deck(oppDeck) {
      oppDeck.FirstOppDrop = oppDeck.queued(FirstOppDrop);
      function FirstOppDrop(next) {
        let cards = oppDeck.cards;
        let length = cards.length;
        cards.splice(0, 6).reverse().forEach(function(card, i) {
          Koloda.$opponent.Deck = card;
          card.FirstOppDrop(i, length, function(i) {
            card.mount($("opponent"));
            card.setSide("back");
            if (i === 5) {
              next();
            }
          });
        });
      }
    },
    card: function card(oppCard) {
      let $el = oppCard.$el;
      oppCard.FirstOppDrop = function(i, length, evt) {
        let delay = i * 250;
        oppCard.animateTo({
          delay: delay,
          duration: 250,
          x: Math.round(((i) * ($("opponent").clientWidth / 7))),
          y: Math.round(-40 * fontSize / 32),
          rot: 0,
          onStart: function onStart() {
            $el.style.zIndex = length - 1 + i;
          },
          onComplete: function onComplete() {
            evt(i);
          }
        });
      };
    }
  };
  let FirstPlrDrop = {
    deck: function deck(plrDeck) {
      plrDeck.FirstPlrDrop = plrDeck.queued(FirstPlrDrop);
      function FirstPlrDrop(next) {
        let cards = plrDeck.cards;
        let length = cards.length;
        cards.splice(0, 6).reverse().forEach(function(card, i) {
          Koloda.$player.Deck = card;
          card.FirstPlrDrop(i, length, function(i) {
            card.mount($("player"));
            card.setSide("front");
            if (i === 5) {
              next();
            }
          });
        });
      }
    },
    card: function card(plrCard) {
      let $el = plrCard.$el;
      plrCard.FirstPlrDrop = function(i, length, evt) {
        let delay = i * 250;
        plrCard.animateTo({
          delay: delay,
          duration: 250,
          x: Math.round((i) * ($("player").clientWidth / 7)),
          y: Math.round(40 * fontSize / 32),
          rot: 0,
          onStart: function onStart() {
            $el.style.zIndex = i;
          },
          onComplete: function onComplete() {
            evt(i);
          }
        });
      };
    }
  };
  let Intro = {
    deck: function deck(startDeck) {
      startDeck.Intro = startDeck.queued(Intro);
      function Intro(next) {
        let cards = startDeck.cards;
        cards.forEach(function(card, i) {
          card.setSide("front");
          card.Intro(i, function(i) {
            CreateAnimation(250, 0).start(function() {
              card.setSide("back");
            });
            if (i === cards.length - 1) {
              next();
            }
          });
        });
      }
    },
    card: function card(startCard) {
      let transform = Prefix("transform");
      let $el = startCard.$el;
      startCard.Intro = function(i, evt) {
        let delay = 500 + i * 10;
        let z = i / 4;
        $el.style[transform] = translate(-z + "px", "-250px");
        $el.style.opacity = 0;
        startCard.x = -z;
        startCard.y = -250 - z;
        startCard.rot = 0;
        startCard.animateTo({
          delay: delay,
          duration: 1000,
          x: -z,
          y: -z,
          onStart: function onStart() {
            $el.style.zIndex = i;
          },
          onProgress: function onProgress(t) {
            $el.style.opacity = t;
          },
          onComplete: function onComplete() {
            $el.style.opacity = "";
            evt && evt(i);
          }
        });
      };
    }
  };
  let Veer = {
    deck: function deck(veerDeck) {
      veerDeck.Veer = veerDeck.queued(Veer);
      function Veer(next) {
        let cards = veerDeck.cards;
        let length = cards.length;
        cards.forEach(function(card, i) {
          card.Veer(i, length, function(i) {
            if (i === cards.length - 1) {
              next();
            }
          });
        });
      }
    },
    card: function card(veerCard) {
      let $el = veerCard.$el;
      veerCard.Veer = function(i, length, evt) {
        let z = i / 4;
        let delay = i * 10;
        let rot = i / (length - 1) * 260 - 130;
        veerCard.animateTo({
          delay: delay,
          duration: 300,
          x: -z,
          y: -z,
          rot: 0
        });
        veerCard.animateTo({
          delay: 300 + delay,
          duration: 300,
          x: Math.cos(Kut(rot - 90)) * 55 * fontSize / 16,
          y: Math.sin(Kut(rot - 90)) * 55 * fontSize / 16,
          rot: rot,
          onStart: function onStart() {
            $el.style.zIndex = i;
          },
          onComplete: function onComplete() {
            evt(i);
          }
        });
      };
    }
  };
  let SortSuits = {
    deck: function deck(suitsDeck) {
      suitsDeck.SortSuits = suitsDeck.queued(SortSuits);
      function SortSuits(next) {
        let cards = suitsDeck.cards;
        cards.forEach(function(card) {
          card.SortSuits(function(i) {
            if (i === cards.length - 1) {
              next();
            }
          });
        });
      }
    },
    card: function card(suitCard) {
      let rank = suitCard.rank;
      let suit = suitCard.suit;
      suitCard.SortSuits = function(evt) {
        let i = suitCard.i;
        let delay = i * 10;
        suitCard.animateTo({
          delay: delay,
          duration: 400,
          x: -Math.round((6.75 - rank) * 8 * fontSize / 16),
          y: -Math.round((1.5 - suit) * 92 * fontSize / 16),
          rot: 0,
          onComplete: function onComplete() {
            evt(i);
          }
        });
      };
    }
  };
  function AddDeck() {
    let cards = new Array(36);
    let $el = $("deck");
    let self = observable(
      { 
        mount: mount, unmount: unmount, cards: cards, $el: $el 
      }
    );
    let $root;
    let modules = AddDeck.modules;
    let module;
    queue(self);
    for (module in modules) {
      addModule(modules[module]);
    }
    let card;
    for (let i = cards.length; i; i--) {
      card = cards[i - 1] = PlayCard(i - 1);
      card.setSide("back");
      card.mount($el);
    }
    return self;
    function mount(root) {
      $root = root;
      $root.appendChild($el);
    }
    function unmount() {
      $root.removeChild($el);
    }
    function addModule(module) {
      module.deck && module.deck(self);
    }
  }
  AddDeck.CreateAnimation = CreateAnimation;
  AddDeck.Prefix = Prefix;
  AddDeck.Ease = Ease;
  AddDeck.modules = { 
    Intro: Intro,
    Shuffle: Shuffle,
    Sort: Sort,
    Flip: Flip,
    FirstOppDrop: FirstOppDrop, 
    FirstPlrDrop: FirstPlrDrop,
    SortSuits: SortSuits, 
    Veer: Veer,
    Ease: Ease
  };
  AddDeck.Card = PlayCard;
  return AddDeck;
})();
let counter = localStorage.getItem("played");
if (!counter) {
  counter = 0;
  localStorage.setItem("played", counter);
}

// Створення масивів колоди:

class PlayDeck {
  constructor() {
    this.$deck = [];
  }
  get Deck() {
    return this.$deck;
  }
  set Deck(card) {
    this.$deck.push(card);
  }
  ClearDeck() {
    this.$deck = [];
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

// Першочергові операції з колодою та картами:

class GetDeck extends PlayDeck {
  constructor(player, opponent) {
    super();
    this.$opponent = opponent;
    this.$player = player;
    this.$turn = 0;
  }
  
  // Базові операції з картою:
  
  InsertCards() {
    let deck = AddDeck();
    isProcess = true;
    this.$deck = deck.cards;
    this.ShuffleDeck();
    if (!isRestart) {
      $("deck").classList.add("active");
      isRestart = false;
      ShowMessage(
        "Інфо", "Готуємо ігровий стіл", "success", "3s"
      );
      deck.Intro(), deck.Sort(), deck.Veer();
      setTimeout(() => {
        AddButton(
          "new-game", "", "button", "Нова гра", $("middle"), "",
          function() {
            event.currentTarget.remove();
            SVibrate();
            deck.Sort(true);
            setTimeout(() => {
              $("deck").classList.remove("active");
              Koloda.ShuffleDeck();
              Engine.StartGame();
              deck.FirstOppDrop();
              deck.FirstPlrDrop();
            }, 1350);
          }
        );
      }, 3550);
    } else {
      HideElement($("turn"));
      this.ShuffleDeck();
      Engine.StartGame();
      deck.FirstOppDrop();
      deck.FirstPlrDrop();
    }
  }
  CloseCard(current) {
    current.setSide("back");
  }
  ShowCard(current) {
    current.setSide("front");
  }
  GetRank(current) {
    return current.rank;
  }
  GetSuit(current) {
    return current.suit;
  }
  GetCost(current) {
    return current.cost;
  }
  GetFull(item, card) {
    let current;
    for (let i = 0; i < card.length; i++) {
      if (item.classList.contains(card[i].rank + "-" + card[i].suit)) {
        current = card[i];
        break
      }
    }
    return current;
  }
  GetCard(index, field) {
    return $(field).children[index];
  }
  ShuffleDeck() {
    for (let i = 0; i < 1000; i++) {
      let a = Math.floor(Math.random() * this.$deck.length);
      let b = Math.floor(Math.random() * this.$deck.length);
      let c = this.$deck[a];
      this.$deck[a] = this.$deck[b];
      this.$deck[b] = c;
    }
    if (this.$deck[23].rank === "ace") {
      this.ShuffleDeck();
    }
  }
  
  // Введення козирної масті та визначення права 1-го ходу:
  
  AddKozir() {
    let kozir = this.DelCard(this.$deck[23]);
    this.$deck.unshift(kozir);
    for (let i = 0; i < this.$deck.length; i++) {
      if (kozir.suit === this.$deck[i].suit) {
        this.$deck[i].cost += 9;
      }
    }
    for (let i = 0; i < this.$player.$deck.length; i++) {
      if (kozir.suit === this.$player.$deck[i].suit) {
        this.$player.$deck[i].cost += 9;
      }
    }
    for (let i = 0; i < this.$opponent.$deck.length; i++) {
      if (kozir.suit === this.$opponent.$deck[i].suit) {
        this.$opponent.$deck[i].cost += 9;
      }
    }
    kozir.setSide("front");
    kozir.isTrump();
    return kozir;
  }
  GetKozir(kozir, check) {
    let spot, spotname;
    let current = $first("deck");
    let trump = $("kozir-now");
    if (check === true) {
      switch (kozir.suit) {
        case "hearts":
          spot = "&hearts;",
            spotname = "Чирва";
          break;
        case "diamonds":
          spot = "&diams;",
            spotname = "Бубни";
          break;
        case "clubs":
          spot = "&clubs;",
            spotname = "Хрести";
          break;
        case "spades":
          spot = "&spades;",
            spotname = "Піки";
          break;
      }
      if (trump) trump.remove();
      AddButton(
        "kozir-now", "", "button", "Козир: " + " " + spot, $("DurakSV"), "",
        function() {
          SVibrate();
          ShowMessage(
            "Інфо", "Козир поточної гри - " + spotname, "verified", "3s"
          );
          SetDisabled("kozir-now", 6000);
        }
      );
    }
  }
  GetMinTrump(player) {
    let trumps = [], result;
    for (let i = 0; i < player.$deck.length; i++) {
      trumps.push(player.$deck[i].cost);
      result = Math.min.apply(null, trumps.filter(trump => trump > 14));
    }
    return result;
  }
  ShowTrump() {
    let res1 = this.GetMinTrump(this.$player);
    let res2 = this.GetMinTrump(this.$opponent);
    if (res1 < res2) {
      ShowMessage(
        "Інфо", "У вас найнижчий козир. Ваш хід🙂", "verified", "5s"
      );
      this.$turn = 1;
    } else if (res1 > res2) {
      ShowMessage(
        "Інфо", "У суперника найнижчий козир. Хід за ним😔", "verified", "5s", false
      );
      for (let i = 0; i < this.$opponent.$deck.length; i++) {
        if (this.$opponent.$deck[i].cost === res2) {
          let current = this.$opponent.$deck[i];
          setTimeout(() => {
            this.ShowCard(current);
          }, 350);
          setTimeout(() => {
            this.CloseCard(current);
          }, 2600);
        }
      }
      this.$turn = 0;
    } else {
      ShowMessage(
        "Інфо", "В жодного з гравців немає козиря🤔", "verified", "5s"
      );
      this.$turn = 1;
    }
    return this.$turn;
  }
  
  // Роздача карт гравцям:
  
  DropCards() {
    if (this.$turn === 1) {
      this.CardsToHand(this.$player);
      this.CardsToHand(this.$opponent);
    } else {
      this.CardsToHand(this.$opponent);
      this.CardsToHand(this.$player);
    }
  }
  CardsToHand(player) {
    let card;
    while ((player.$deck.length < 6) && (this.$deck.length !== 0)) {
      card = this.LastCard();
      player.Deck = card;
    }
    return;
  }
  InsertToHand(current, field) {
    current.unmount($("deck"));
    current.mount($(field));
    if ($(field).className === "player") {
      this.ShowCard(current);
      Engine.CardPlace(Engine.gameUser, "player");
    } else {
      this.CloseCard(current);
      Engine.CardPlace(Engine.gameOppt, "opponent");
    }
    if ($("deck").querySelectorAll(".card").length === 1) {
      $("[trump]", true).removeAttribute("trump");
      this.GetKozir($first("deck"), false);
    }
  }
  
  // Перший хід, зміна ходу та процес ходу:
  
  FirstTurn() {
    this.ShowTrump(), ShowElement($("turn"));
  }
  ChangeTurn() {
    this.$turn ? this.$turn = 0 : this.$turn = 1;
  }
  ViewTurn(turn) {
    turn === true ?
      ($("turn").innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.843 511.843" xml:space="preserve" width="32px" height="35px" fill="#000000"><g id="SVGRepo_iconCarrier"> <polygon style="fill:#E5E8EC;" points="127.961,251.367 184.443,504.626 327.743,501.3 383.883,248.04 "></polygon> <path style="fill:#F5BA45;" d="M255.922,106.631L255.922,106.631c28.491,0,55.264-11.091,75.398-31.233 C351.47,55.264,362.56,28.483,362.56,0h21.322c0,70.674-57.295,127.961-127.961,127.961l0,0v-21.33H255.922z"></path> <rect x="245.251" y="396.721" style="fill:#424953;" width="21.337" height="46.986"></rect> <rect x="223.242" y="426.521" style="fill:#EC5564;" width="63.98" height="78.1"></rect> <path style="fill:#CBD0D8;" d="M116.604,255.921l55.452,255.922h166.355l55.436-255.922H116.604z M321.199,490.506H189.254 l-46.205-213.247h224.369L321.199,490.506z"></path> <path style="fill:#EC5564;" d="M276.978,120.704c-1.64,10.146-10.466,17.917-21.056,17.917c-10.591,0-19.416-7.771-21.056-17.917 c-39.613,4.14-122.713,24.118-159.53,156.555h361.172C399.691,144.822,316.591,124.844,276.978,120.704z"></path> <path style="fill:#FECD57;" d="M255.233,405.22c-11.762,0-21.337-9.576-21.337-21.338c0-6.795,10.028-22.68,21.337-36.801 c11.309,14.121,21.322,30.006,21.322,36.801C276.557,395.644,266.996,405.22,255.233,405.22z"></path> <path style="fill:#F5BA45;" d="M255.233,330.555c0,0-31.99,35.661-31.99,53.327c0,17.667,14.324,31.99,31.99,31.99 c17.666,0,31.99-14.323,31.99-31.99C287.225,366.216,255.233,330.555,255.233,330.555z M255.233,394.535 c-5.764,0-10.465-4.577-10.653-10.278c0.219-1.031,1.796-6.717,10.653-19.338c8.841,12.621,10.434,18.307,10.652,19.338 C265.699,389.958,260.983,394.535,255.233,394.535z"></path> <g> <path style="fill:#D94452;" d="M429.697,255.46h-35.146v-20.868h27.008c-3.312-7.607-6.811-14.699-10.449-21.322h-59.904v-21.329 h46.611c-5.655-7.966-11.513-15.042-17.526-21.329h-71.743V149.29h47.031c-14.807-10.387-29.631-17.033-43.174-21.329h-38.02 c-3.702,6.365-10.59,10.661-18.463,10.661c-7.873,0-14.761-4.296-18.463-10.661h-38.02c-13.543,4.296-28.366,10.942-43.174,21.329 h45.642v21.322h-70.354c-6.014,6.287-11.871,13.363-17.526,21.329h45.236v21.329h-58.529c-3.64,6.623-7.139,13.715-10.45,21.322 h26.32v20.868H82.146c-2.358,6.764-4.592,13.863-6.686,21.33h360.922C434.289,269.323,432.055,262.224,429.697,255.46z M329.867,191.941v21.329h-63.98v-21.329H329.867z M223.243,149.289h63.98v21.322h-63.98V149.289z M180.586,191.941h63.98v21.329 h-63.98V191.941z M201.906,255.46h-63.98v-20.868h63.98V255.46z M287.225,255.46h-63.98v-20.868h63.98V255.46z M373.214,255.46 h-64.667v-20.868h64.667V255.46z"></path> <path style="fill:#D94452;" d="M255.922,85.309c-17.667,0-31.99,14.324-31.99,31.99c0,17.667,14.324,31.99,31.99,31.99 s31.99-14.323,31.99-31.99C287.911,99.633,273.587,85.309,255.922,85.309z M255.922,127.96c-5.874,0-10.669-4.787-10.669-10.661 c0-5.881,4.795-10.668,10.669-10.668c5.873,0,10.668,4.787,10.668,10.668C266.59,123.173,261.794,127.96,255.922,127.96z"></path> </g> <path style="fill:#FECD57;" d="M255.922,106.631L255.922,106.631c-28.492,0-55.265-11.091-75.399-31.233 C160.372,55.264,149.281,28.483,149.281,0h-21.321c0,70.674,57.295,127.961,127.961,127.961l0,0c5.889,0,10.668-4.771,10.668-10.661 C266.59,111.41,261.811,106.631,255.922,106.631z"></path> </g></svg><p>Ваш хід</p>`, document.querySelector(":root").style.setProperty("--turn", "#66f605")) :
      ($("turn").innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.843 511.843" xml:space="preserve" width="32px" height="35px" fill="#000000"><g id="SVGRepo_iconCarrier"> <polygon style="fill:#E5E8EC;" points="127.961,251.367 184.443,504.626 327.743,501.3 383.883,248.04 "></polygon> <path style="fill:#F5BA45;" d="M255.922,106.631L255.922,106.631c28.491,0,55.264-11.091,75.398-31.233 C351.47,55.264,362.56,28.483,362.56,0h21.322c0,70.674-57.295,127.961-127.961,127.961l0,0v-21.33H255.922z"></path> <rect x="245.251" y="396.721" style="fill:#424953;" width="21.337" height="46.986"></rect> <rect x="223.242" y="426.521" style="fill:#EC5564;" width="63.98" height="78.1"></rect> <path style="fill:#CBD0D8;" d="M116.604,255.921l55.452,255.922h166.355l55.436-255.922H116.604z M321.199,490.506H189.254 l-46.205-213.247h224.369L321.199,490.506z"></path> <path style="fill:#EC5564;" d="M276.978,120.704c-1.64,10.146-10.466,17.917-21.056,17.917c-10.591,0-19.416-7.771-21.056-17.917 c-39.613,4.14-122.713,24.118-159.53,156.555h361.172C399.691,144.822,316.591,124.844,276.978,120.704z"></path> <path style="fill:#FECD57;" d="M255.233,405.22c-11.762,0-21.337-9.576-21.337-21.338c0-6.795,10.028-22.68,21.337-36.801 c11.309,14.121,21.322,30.006,21.322,36.801C276.557,395.644,266.996,405.22,255.233,405.22z"></path> <path style="fill:#F5BA45;" d="M255.233,330.555c0,0-31.99,35.661-31.99,53.327c0,17.667,14.324,31.99,31.99,31.99 c17.666,0,31.99-14.323,31.99-31.99C287.225,366.216,255.233,330.555,255.233,330.555z M255.233,394.535 c-5.764,0-10.465-4.577-10.653-10.278c0.219-1.031,1.796-6.717,10.653-19.338c8.841,12.621,10.434,18.307,10.652,19.338 C265.699,389.958,260.983,394.535,255.233,394.535z"></path> <g> <path style="fill:#D94452;" d="M429.697,255.46h-35.146v-20.868h27.008c-3.312-7.607-6.811-14.699-10.449-21.322h-59.904v-21.329 h46.611c-5.655-7.966-11.513-15.042-17.526-21.329h-71.743V149.29h47.031c-14.807-10.387-29.631-17.033-43.174-21.329h-38.02 c-3.702,6.365-10.59,10.661-18.463,10.661c-7.873,0-14.761-4.296-18.463-10.661h-38.02c-13.543,4.296-28.366,10.942-43.174,21.329 h45.642v21.322h-70.354c-6.014,6.287-11.871,13.363-17.526,21.329h45.236v21.329h-58.529c-3.64,6.623-7.139,13.715-10.45,21.322 h26.32v20.868H82.146c-2.358,6.764-4.592,13.863-6.686,21.33h360.922C434.289,269.323,432.055,262.224,429.697,255.46z M329.867,191.941v21.329h-63.98v-21.329H329.867z M223.243,149.289h63.98v21.322h-63.98V149.289z M180.586,191.941h63.98v21.329 h-63.98V191.941z M201.906,255.46h-63.98v-20.868h63.98V255.46z M287.225,255.46h-63.98v-20.868h63.98V255.46z M373.214,255.46 h-64.667v-20.868h64.667V255.46z"></path> <path style="fill:#D94452;" d="M255.922,85.309c-17.667,0-31.99,14.324-31.99,31.99c0,17.667,14.324,31.99,31.99,31.99 s31.99-14.323,31.99-31.99C287.911,99.633,273.587,85.309,255.922,85.309z M255.922,127.96c-5.874,0-10.669-4.787-10.669-10.661 c0-5.881,4.795-10.668,10.669-10.668c5.873,0,10.668,4.787,10.668,10.668C266.59,123.173,261.794,127.96,255.922,127.96z"></path> </g> <path style="fill:#FECD57;" d="M255.922,106.631L255.922,106.631c-28.492,0-55.265-11.091-75.399-31.233 C160.372,55.264,149.281,28.483,149.281,0h-21.321c0,70.674,57.295,127.961,127.961,127.961l0,0c5.889,0,10.668-4.771,10.668-10.661 C266.59,111.41,261.811,106.631,255.922,106.631z"></path> </g></svg><p>Хід суперника</p>`, document.querySelector(":root").style.setProperty("--turn", "red"));
  }
  GameTurn(card, field, attack, player) {
    if (player === "opponent") {
      card.unmount($("opponent"));
      card.mount($(field));
      card.setSide("front");
    } else if (player === "player") {
      card.unmount($("player"));
      card.mount($(field));
    }
    if (Player.sideturn === 1) {
      HideElement($("Pass"));
    }
    Engine.CardPlace(Engine.gameOppt, "opponent");
    Engine.CardPlace(Engine.gameUser, "player");
  }
  ExitToMenu(check) {
    (check || confirm("Вийти з гри?")) && window.location.reload();
  }
  ClearTable() {
    let length;
    length = $("Attack").children.length;
    for (let i = 0; i < length; i++) {
      $first("Attack").remove();
    }
    length = $("Defend").children.length;
    for (let i = 0; i < length; i++) {
      $first("Defend").remove();
    }
  }
  TakeCard(name) {
    let card, current;
    for (let i = $("Attack").querySelectorAll(".card").length - 1; i >= 0; i--) {
      card = $("Attack").children[i];
      card.style.transform = "rotate(0deg)";
      if (name === "opponent") {
        current = this.GetFull(card, Supernik.$deck);
        current.mount($("opponent"));
        current.setSide("back");
      } else {
        current = this.GetFull(card, Player.$deck);
        current.mount($("player"));
      }
    }
    for (let k = $("Defend").querySelectorAll(".card").length - 1; k >= 0; k--) {
      card = $("Defend").children[k];
      card.style.transform = "rotate(0deg)";
      if (name === "opponent") {
        current = this.GetFull(card, Engine.gameOppt.$deck);
        current.mount($("opponent"));
        current.setSide("back");
      } else {
        current = this.GetFull(card, Engine.gameUser.$deck);
        current.mount($("player"));
      }
    }
  }
}

// Ігровий процес:

class GamePlay {
  constructor(Player, Supernik, Koloda, GameTable) {
    this.gameUser = Player;
    this.gameOppt = Supernik;
    this.gameDeck = Koloda;
    this.gameStil = GameTable;
  }
  
  // Атака гравця:
  
  PlayerAttack(current) {
    let check = false;
    ShowElement($("Pass"));
    if (this.gameUser.CheckContinueTurn()) {
      check = this.gameUser.CheckCardAttack(current);
      if (check) {
        this.gameUser.Attack(current);
        this.gameDeck.GameTurn(current, "Attack", true, "player");
      }
    }
    return check;
  }
  PlayerDefend(current) {
    let index = this.gameStil.$defend.length;
    let AttackCard = this.gameStil.$attack[index];
    let check = this.gameUser.CheckCardDefend(current, AttackCard);
    if (check) {
      this.gameUser.Defend(current);
      this.gameDeck.GameTurn(current, "Defend", false, "player");
    }
    return check;
  }
  ProcessingTurn(current) {
    let AttackPlayer = this.CheckTurn();
    if (AttackPlayer === this.gameUser) {
      let check = this.PlayerAttack(current);
      if (check) {
        if (this.Wasted()) {
          return;
        }
        setTimeout(() => {
          this.EnemyDefend(current);
        }, 450);
      }
    } else {
      let check = this.PlayerDefend(current);
      if (check) {
        if (this.Wasted()) {
          return;
        }
        setTimeout(() => {
          this.EnemyAttack();
        }, 450);
      }
    }
  }
  
  // Атака та захист опонента:
  
  EnemyAttack() {
    let current = null;
    current = this.gameOppt.EnemyAttack();
    if (current !== null) {
      ShowElement($("Take"));
      this.gameDeck.GameTurn(current, "Attack", true, "opponent");
    } else {
      this.PassCard(this.gameOppt);
      HideElement($("Take"));
    }
  }
  EnemyDefend(attackCard) {
    let current;
    if (this.gameUser.sideturn === 0) {
      current = this.gameOppt.EnemyDefend(attackCard);
    }
    if (current !== null) {
      this.gameDeck.GameTurn(current, "Defend", false, "opponent");
    } else {
      if (this.Wasted()) {
        return;
      }
      HideElement($("Pass"));
      ShowElement($("Stop"));
      this.gameUser.sideturn = 1;
      return;
    }
  }
  
  // Процес відбою, забору чи взяття карт:
  
  PassCardPlayer(player) {
    this.PassCard(player);
    if (this.Wasted()) {
      return;
    }
    this.EnemyAttack();
    HideElement($("Pass"));
  }
  PassCard(player) {
    player.Pass();
    ShowMessage(
      "Інфо", "Відбій", "verified", "3s"
    );
    this.gameStil.ClearTable();
    this.gameDeck.ClearTable();
    this.DropCards(), this.ChangeTurn();
  }
  TakeCardPlayer(player, name) {
    this.TakeCard(player, name);
    if (this.Wasted()) {
      return;
    }
    HideElement($("Take"));
    this.EnemyAttack();
  }
  TakeCard(player, name) {
    player.TakeCard(player.$deck);
    ShowMessage(
      "Інфо", "Забрано", "verified", "3s"
    );
    this.gameDeck.TakeCard(name);
    this.DropCards();
  }
  Stop() {
    this.gameUser.sideturn = 0;
    HideElement($("Stop"));
    HideElement($("Pass"));
    this.TakeCard(this.gameOppt, "opponent");
    this.CardPlace(this.gameOppt, "opponent");
  }
  DropCards() {
    let p1 = this.gameUser.$deck.length;
    let s1 = this.gameOppt.$deck.length;
    this.gameDeck.DropCards();
    let p2 = this.gameUser.$deck.length;
    let s2 = this.gameOppt.$deck.length;
    this.CardsToHand(this.gameUser, "player", p1, p2);
    this.CardsToHand(this.gameOppt, "opponent", s1, s2);
  }
  CardsToHand(player, field, p1, p2) {
    for (let i = p1; i < p2; i++) {
      let card = player.$deck[i];
      this.gameDeck.InsertToHand(card, field);
    }
  }
  
  // Запуск, перевірка та зміна ходу:
  
  FirstTurn() {
    let check = this.CheckTurn();
    if (check === this.gameOppt) {
      this.EnemyAttack();
      ShowElement($("Take"));
    }
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
  
  // Розташування карт на ігровому полі:
  
  CardPlace(player, field) {
    for (let i = 0; i < player.$deck.length; i++) {
      let length = player.$deck.length;
      let current = player.$deck[i];
      let $el = current.$el;
      if (field === "player") {
        current.animateTo({
          delay: 0,
          duration: 100,
          x: Math.round((i) * ($("player").clientWidth / (length + 1))),
          y: Math.round(40 * fontSize / 32),
          rot: 0,
        });
      } else {
        current.animateTo({
          delay: 0,
          duration: 100,
          x: Math.round((i) * ($("opponent").clientWidth / (length + 1))),
          y: Math.round(-40 * fontSize / 32),
          rot: 0,
        });
      }
      $el.style.zIndex = i;
    }
  }
  
  // Початок, зупинка та збереження гри:
  
  StartGame() {
    ShowMessage(
      "Інфо", "Починаємо нову гру", "success", "3s"
    );
    ShowElement($("user"));
    ShowElement($("enemy"));
    setTimeout(() => {
      let kozir = this.gameDeck.AddKozir();
      this.gameDeck.GetKozir(kozir, true);
    }, 4200);
    setTimeout(() => {
      this.gameDeck.FirstTurn();
    }, 6000);
    setTimeout(() => {
      this.FirstTurn();
    }, 10000)
    return;
  }
  ToMenu(check) {
    this.gameDeck.ExitToMenu(check);
  }
  Wasted() {
    if ((this.gameDeck.$deck.length === 0) && (this.gameOppt.$deck.length === 0 || this.gameUser.$deck.length === 0)) {
      $all("card").forEach(e => e.remove());
      $("kozir-now").remove();
      counter++;
      localStorage.setItem("played", counter);
      HideElement($all("GPbtn"), true);
      ShowElement($("ToMenu"));
      AddButton(
        "Restart", "", "button", "Рестарт", document.body, `<svg width="64px" height="64px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00024000000000000003"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM15.9346 5.59158C16.217 5.70662 16.4017 5.98121 16.4017 6.28616V9.00067C16.4017 9.41489 16.0659 9.75067 15.6517 9.75067H13C12.6983 9.75067 12.4259 9.56984 12.3088 9.29174C12.1917 9.01364 12.2527 8.69245 12.4635 8.47659L13.225 7.69705C11.7795 7.25143 10.1467 7.61303 9.00097 8.78596C7.33301 10.4935 7.33301 13.269 9.00097 14.9765C10.6593 16.6742 13.3407 16.6742 14.999 14.9765C15.6769 14.2826 16.0805 13.4112 16.2069 12.5045C16.2651 12.0865 16.5972 11.7349 17.0192 11.7349C17.4246 11.7349 17.7609 12.0595 17.7217 12.463C17.5957 13.7606 17.0471 15.0265 16.072 16.0247C13.8252 18.3248 10.1748 18.3248 7.92796 16.0247C5.69068 13.7344 5.69068 10.0281 7.92796 7.7378C9.66551 5.95905 12.244 5.55465 14.3647 6.53037L15.1152 5.76208C15.3283 5.54393 15.6522 5.47653 15.9346 5.59158Z" fill="#008f00"></path></g></svg>`, 
        function() {
          isVictory 
            ? (F1reworks.pause(), HideElement($("fireworks"))) 
            : "";
          $("Restart").remove();
          Engine.DelDeck("player");
          Engine.DelDeck("opponent");
          isRestart = true, SVibrate();
          Koloda.InsertCards();
        }
      );
      if ((this.gameOppt.$deck.length === 0) && (this.gameUser.$deck.length > 1)) {
        ShowMessage(
          "Програш!", "На жаль, Ви програли😔", "error", "4s"
        );
        Root.style.setProperty("--restart", "calc(50% - 37.5px)");
        isVictory = false;
      } else if ((this.gameUser.$deck.length === 0) && (this.gameOppt.$deck.length >= 1)) {
        ShowMessage(
          "Успіх!", "Ви виграли🙂", "success", "6s"
        );
        ShowElement($("fireworks"));
        F1reworks.start();
        isVictory = true;
        Root.style.setProperty("--restart", "90%");
      } else if ((this.gameUser.$deck.length === 0) && (this.gameOppt.$deck.length === 0)) {
        ShowMessage(
          "Результат!", "Гра закінчилась нічиєю😉", "verified", "4s"
        );
        isVictory = false;
        Root.style.setProperty("--restart", "calc(50% - 37.5px)");
      }
      return true;
    }
    return false;
  }
  DelDeck(player) {
    if (player === "player") {
      this.gameUser.$deck = [];
    } else {
      this.gameOppt.$deck = []
    }
  }
}

// Логіка ігрових операцій (атака, захист, зміни тощо):

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
        if (current.rank === this.$stil.$attack[i].rank) {
          return true;
        }
      }
    } else {
      return true;
    }
    if (this.$stil.$defend.length !== 0) {
      for (let i = 0; i < this.$stil.$defend.length; i++) {
        if (current.rank === this.$stil.$defend[i].rank) {
          return true;
        }
      }
    }
    return false;
  }
  CheckCardDefend(current, attkCard) {
    for (let i = 0; i < this.$stil.$attack.length; i++) {
      if (this.$stil.$attack[i] === attkCard) {
        if (current.cost > attkCard.cost) {
          if (current.cost > 14) {
            return true;
          } else if (current.suit === attkCard.suit) {
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

// Логіка атаки/захисту комп'ютера:

class InitEnemy extends InitUser {
  EnemyAttack() {
    let current = null;
    if (this.CheckContinueTurn()) {
      let minCardCost = 30;
      for (let i = 0; i < this.$deck.length; i++) {
        if (minCardCost > this.$deck[i].cost) {
          if (this.CheckCardAttack(this.$deck[i]) === true || this.$stil.$attack.length === 0) {
            minCardCost = this.$deck[i].cost;
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
        if (minCardCost > this.$deck[i].cost) {
          minCardCost = this.$deck[i].cost;
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

//Ігровий стіл:

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

// Виклик змінних:

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

// Задання можливості ходу гравцем:

document.addEventListener("touchstart", event => {
  if ((event.target.classList.contains("card")) && (event.target.offsetParent !== null)) {
    if (event.target.offsetParent.className === "player") {
      let card = Koloda.GetFull(event.target, Player.$deck);
      Engine.ProcessingTurn(card);
      navigator.vibrate([15, 15]);
    }
  }
});
