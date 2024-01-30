function _(el) {
  return document.createElement(el);
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
function $(el) {
  return document.querySelector("." + el) || document.getElementById(el);
}
function $all(el) {
  return document.querySelectorAll("." + el) || document.getElementsByTagName(el);
}
function AddNewDiv(klas, id, parent, inner) {
  let div = document.createElement("div");
  div.className = klas, 
  div.id = id, 
  div.insertAdjacentHTML("afterbegin", inner);
  parent.appendChild(div);
  return div;
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
function ToggleStan(items) {
  let button = event.currentTarget;
  let active = $check(button, "active");
  items = $all(items);
  active 
    ? (button.classList.remove("active"), items.forEach(e => e.classList.remove("active"))) 
    : (button.classList.add("active"), items.forEach(e => e.classList.add("active")))
}
function $check(el, klas) {
  return true === el.classList.contains(klas);
}
const isMobile = /iPhone|iPad|iPod|Android|Opera Mini|BlackBerry|IEMobile|WPDesktop|Windows Phone|webOS|/i.test(navigator.userAgent);
document.documentElement.setAttribute("data-deck", "basic");
document.documentElement.setAttribute("lang", "uk");
let Ranks = [];
let Suits = [];
function GetUnique(tags) {
  let results = [];
  tags.forEach(tag => {
    tag = tag.trim();
    if (results.indexOf(tag) === -1) {
      results.push(tag)
    }
  })
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
SetCards();
((item) => {
  item = _("span");
  item.className = "author";
  item.innerHTML = "Copyright © " + (new Date()).getFullYear() + " Serhii Vernii";
  AddNewDiv("version", "", document.body, `<span>Version: alpha 1.0</span>`);
  $insert($("menu"), item);
  return item;
})();
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
    })
  })
}
function Names(turn) {
  turn = Math.floor(Math.random() * 2);
  let name = "";
  let user, avatar, foto;
  let girls = ["Олена", "Настя", "Марина", "Юля", "Яна", "Інна", "Соломія", "Дарина", "Ксенія", "Кіра", "Катя", "Тетяна", "Аня"];
  let $boys = ["Сергій", "Макс", "Славік", "Влад", "Євген", "Олег", "Петро", "Володимир", "Нікіта", "Роман", "Андрій", "Дмитро"];
  if (turn === 1) {
    name += girls[Math.floor(Math.random() * girls.length)];
    avatar = "https://i.postimg.cc/vTvNKTDN/avatar-female.webp";
  } else {
    name += $boys[Math.floor(Math.random() * $boys.length)];
    avatar = "https://i.postimg.cc/XNKmqHxk/avatar-male.webp";
  }
  foto = localStorage.getItem("foto");
  user = localStorage.getItem("user");
  if (!foto) { 
    foto = "https://i.postimg.cc/XNKmqHxk/avatar-male.webp";
  }
  AddNewDiv("user", "user", $("bottom"), `<img src="${foto}" alt="Фото суперника"><span>Ваш стіл</span>`);
  AddNewDiv("enemy", "enemy", $("top"), `<img src="${avatar}" alt="Фото суперника"><span>Стіл опонента</span>`);
  AddButton("username", "", "button", name, $("enemy"), "", "");
  if (!user) {
    user = prompt("Вкажіть своє ім'я, будь ласка!", "") || "Стицько";
    localStorage.setItem("user", user);
  }
  AddButton("username", "", "button", user, $("user"), "", "");
  HideElement($("version"));
}
function PlaySound(src, vol) {
  let audio = _("audio"); audio.src = src;
  audio.play();
  audio.volume = vol;
}
function GetLeft() {
  let l1 = `${($("Attack").clientWidth / 4) + "px"}`;
  let l2 = `${2 * ($("Attack").clientWidth / 4) + "px"}`;
  document.querySelector(":root").style.setProperty("--l1", l1);
  document.querySelector(":root").style.setProperty("--l2", l2);
}
