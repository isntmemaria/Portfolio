// script do portfolio - tema, menu, idioma e cursor
// aprendi isso no 1 periodo e fui pesquisando o resto

var html = document.documentElement;

// ----- TEMA (claro / escuro) -----
var temaSalvo = localStorage.getItem("theme");
if (temaSalvo == "light" || temaSalvo == "dark") {
  html.setAttribute("data-theme", temaSalvo);
} else {
  html.setAttribute("data-theme", "dark");
}

function atualizarLuaESol() {
  var taClaro = html.getAttribute("data-theme") == "light";
  var lua = document.querySelector(".icon-moon");
  var sol = document.querySelector(".icon-sun");
  if (lua == null || sol == null) {
    return;
  }
  if (taClaro) {
    lua.style.display = "none";
    sol.style.display = "block";
  } else {
    lua.style.display = "block";
    sol.style.display = "none";
  }
}

atualizarLuaESol();

var botaoTema = document.getElementById("theme-toggle");
if (botaoTema != null) {
  botaoTema.addEventListener("click", function () {
    var agora = html.getAttribute("data-theme");
    var proximo;
    if (agora == "light") {
      proximo = "dark";
    } else {
      proximo = "light";
    }
    html.setAttribute("data-theme", proximo);
    localStorage.setItem("theme", proximo);
    atualizarLuaESol();
  });
}

// ----- MENU -----
var menu = document.getElementById("nav-drawer");
var abrirMenu = document.getElementById("menu-open");
var fecharMenuBtn = document.getElementById("menu-close");
var fundoMenu = document.getElementById("menu-backdrop");

function abrirOuFecharMenu(aberto) {
  if (menu == null || abrirMenu == null) {
    return;
  }
  if (aberto) {
    menu.hidden = false;
    menu.classList.add("is-open");
    abrirMenu.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  } else {
    menu.hidden = true;
    menu.classList.remove("is-open");
    abrirMenu.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
}

if (abrirMenu != null) {
  abrirMenu.addEventListener("click", function () {
    abrirOuFecharMenu(true);
  });
}
if (fecharMenuBtn != null) {
  fecharMenuBtn.addEventListener("click", function () {
    abrirOuFecharMenu(false);
  });
}
if (fundoMenu != null) {
  fundoMenu.addEventListener("click", function () {
    abrirOuFecharMenu(false);
  });
}

document.addEventListener("keydown", function (evt) {
  if (evt.key == "Escape") {
    abrirOuFecharMenu(false);
  }
});

var linksDoMenu = document.querySelectorAll(".nav-drawer__list a[href^='#']");
for (var j = 0; j < linksDoMenu.length; j++) {
  linksDoMenu[j].addEventListener("click", function () {
    abrirOuFecharMenu(false);
  });
}

// ----- IDIOMA (portugues / ingles) -----
// guardo o portugues que ja esta no HTML pra poder voltar depois
var textosPt = {};
var textosEn = {
  page_title: "Isabele Gonçalves — Portfolio",
  top_bar_aria: "Page preferences",
  theme_aria: "Toggle light and dark theme",
  hero_role: "JUNIOR DEVELOPER 👩🏻‍💻",
  btn_projects: "PROJECTS",
  dock_aria: "Site shortcuts (menu)",
  menu_label: "MENU",
  menu_open_aria: "Open shortcuts to page sections",
  about_heading:
    "Hi! I'm <span class=\"about__name\">Isabele</span>. 👋",
  about_body:
    "I'm studying Internet Systems<br />at UNCISAL and embracing the challenge<br />of being a developer. I love blending design<br />and code to bring projects<br />that actually mean something to life.",
  photo_alt: "Portrait of Isabele Gonçalves",
  projetos_title: "PROJECTS",
  mind_badge: "First completed project",
  mind_desc:
    "When your head spins in a loop around a hard decision, MindScale breaks the noise into steps: two sides, pros and cons, what happens right away and what comes later, then a conclusion. Close to what therapists often guide in session, open to anyone. Pause and reflection, not productivity. Built with plain HTML, CSS, and JavaScript, no frameworks or UI libraries, with fundamentals handled with care in the experience.",
  yas_badge: "Landing page in development",
  yas_desc:
    "A landing page for Dr. Yasmin Gonçalves, facial harmonization in Maceió: the site is still in development. Built with HTML, CSS, and JavaScript: intro, services, testimonials, FAQ, and contact, with light reading and a clear next step for anyone looking for more confidence in their own face.",
  contato_aria: "Contact",
  contato_title: "CONTACT",
  contact_group_aria: "Contact icons",
  wa_aria: "WhatsApp",
  gh_aria: "GitHub",
  li_aria: "LinkedIn",
  contact_note:
    '<span class="contact-emphasis">If you made it this far</span>, our visions probably lined up. I hope you enjoyed seeing the projects I put this much care into building. My focus is always to bring together <span class="contact-emphasis">functionality and design</span> to solve real problems. 🙂',
  drawer_title: "Section shortcuts",
  nav_inicio: "HOME",
  nav_sobre: "ABOUT",
  nav_projetos: "PROJECTS",
  nav_contato: "CONTACT",
  backdrop_aria: "Close menu",
  close_aria: "Close",
};

function salvarPortuguesNaMemoria() {
  var els;
  var i;
  var chave;

  els = document.querySelectorAll("[data-i18n]");
  for (i = 0; i < els.length; i++) {
    chave = els[i].getAttribute("data-i18n");
    if (chave != null && chave != "") {
      textosPt[chave] = els[i].textContent;
    }
  }

  els = document.querySelectorAll("[data-i18n-html]");
  for (i = 0; i < els.length; i++) {
    chave = els[i].getAttribute("data-i18n-html");
    if (chave != null && chave != "") {
      textosPt[chave] = els[i].innerHTML;
    }
  }

  els = document.querySelectorAll("[data-i18n-aria]");
  for (i = 0; i < els.length; i++) {
    chave = els[i].getAttribute("data-i18n-aria");
    if (chave != null && chave != "") {
      textosPt[chave] = els[i].getAttribute("aria-label") || "";
    }
  }

  els = document.querySelectorAll("[data-i18n-alt]");
  for (i = 0; i < els.length; i++) {
    chave = els[i].getAttribute("data-i18n-alt");
    if (chave != null && chave != "") {
      textosPt[chave] = els[i].getAttribute("alt") || "";
    }
  }

  textosPt.page_title = document.title;
}

function atualizarBotaoIdioma(lingua) {
  var btn = document.getElementById("lang-toggle");
  if (btn == null) {
    return;
  }
  var label = btn.querySelector(".lang-toggle__label");
  if (lingua == "en") {
    if (label != null) {
      label.textContent = "PT";
    }
    btn.setAttribute("aria-label", "Switch to Portuguese");
  } else {
    if (label != null) {
      label.textContent = "EN";
    }
    btn.setAttribute("aria-label", "Ver página em inglês");
  }
}

function aplicarIdioma(lingua) {
  var i;
  var els;
  var chave;
  var emIngles = lingua == "en";

  els = document.querySelectorAll("[data-i18n]");
  for (i = 0; i < els.length; i++) {
    chave = els[i].getAttribute("data-i18n");
    if (emIngles) {
      els[i].textContent = textosEn[chave];
    } else {
      els[i].textContent = textosPt[chave];
    }
  }

  els = document.querySelectorAll("[data-i18n-html]");
  for (i = 0; i < els.length; i++) {
    chave = els[i].getAttribute("data-i18n-html");
    if (emIngles) {
      els[i].innerHTML = textosEn[chave];
    } else {
      els[i].innerHTML = textosPt[chave];
    }
  }

  els = document.querySelectorAll("[data-i18n-aria]");
  for (i = 0; i < els.length; i++) {
    chave = els[i].getAttribute("data-i18n-aria");
    if (emIngles) {
      els[i].setAttribute("aria-label", textosEn[chave]);
    } else {
      els[i].setAttribute("aria-label", textosPt[chave]);
    }
  }

  els = document.querySelectorAll("[data-i18n-alt]");
  for (i = 0; i < els.length; i++) {
    chave = els[i].getAttribute("data-i18n-alt");
    if (emIngles) {
      els[i].setAttribute("alt", textosEn[chave]);
    } else {
      els[i].setAttribute("alt", textosPt[chave]);
    }
  }

  if (emIngles) {
    document.title = textosEn.page_title;
    html.setAttribute("lang", "en");
    localStorage.setItem("lang", "en");
  } else {
    document.title = textosPt.page_title;
    html.setAttribute("lang", "pt-BR");
    localStorage.setItem("lang", "pt");
  }

  atualizarBotaoIdioma(lingua);
}

salvarPortuguesNaMemoria();

var idiomaSalvo = localStorage.getItem("lang");
if (idiomaSalvo == "en") {
  aplicarIdioma("en");
} else {
  atualizarBotaoIdioma("pt");
}

var botaoLang = document.getElementById("lang-toggle");
if (botaoLang != null) {
  botaoLang.addEventListener("click", function () {
    var agora = localStorage.getItem("lang");
    if (agora == "en") {
      aplicarIdioma("pt");
    } else {
      aplicarIdioma("en");
    }
  });
}

// ----- CURSOR QUE SEGUE O MOUSE (só no desktop) -----
var cursor = document.getElementById("cursor-follow");
if (cursor != null) {
  var prefereMenosAnimacao = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  var ehTelaDeComputador = window.matchMedia("(pointer: fine)").matches;

  if (prefereMenosAnimacao == false && ehTelaDeComputador == true) {
    document.documentElement.classList.add("has-custom-cursor");
    cursor.classList.add("cursor-follow--hidden");

    function seguirMouse(evt) {
      cursor.style.left = evt.clientX + "px";
      cursor.style.top = evt.clientY + "px";
      cursor.classList.remove("cursor-follow--hidden");
    }

    window.addEventListener("mousemove", seguirMouse);

    document.documentElement.addEventListener("mouseleave", function () {
      cursor.classList.add("cursor-follow--hidden");
    });
    document.documentElement.addEventListener("mouseenter", function () {
      cursor.classList.remove("cursor-follow--hidden");
    });
  } else {
    cursor.remove();
  }
}
