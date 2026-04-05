/* Portfólio — tema, menu e cursor (Isabele) */

(function () {
  var html = document.documentElement;
  var temaSalvo = localStorage.getItem("theme");

  if (temaSalvo === "light" || temaSalvo === "dark") {
    html.setAttribute("data-theme", temaSalvo);
  } else {
    html.setAttribute("data-theme", "dark");
  }

  function atualizarIcones() {
    var taClaro = html.getAttribute("data-theme") === "light";
    var lua = document.querySelector(".icon-moon");
    var sol = document.querySelector(".icon-sun");
    if (lua && sol) {
      if (taClaro) {
        lua.style.display = "none";
        sol.style.display = "block";
      } else {
        lua.style.display = "block";
        sol.style.display = "none";
      }
    }
  }

  atualizarIcones();

  var botaoTema = document.getElementById("theme-toggle");
  if (botaoTema) {
    botaoTema.addEventListener("click", function () {
      var agora = html.getAttribute("data-theme");
      var proximo;
      if (agora === "light") {
        proximo = "dark";
      } else {
        proximo = "light";
      }
      html.setAttribute("data-theme", proximo);
      localStorage.setItem("theme", proximo);
      atualizarIcones();
    });
  }

  var menu = document.getElementById("nav-drawer");
  var abrir = document.getElementById("menu-open");
  var fechar = document.getElementById("menu-close");
  var fundo = document.getElementById("menu-backdrop");

  function abrirOuFecharMenu(aberto) {
    if (!menu || !abrir) {
      return;
    }
    menu.hidden = !aberto;
    if (aberto) {
      menu.classList.add("is-open");
    } else {
      menu.classList.remove("is-open");
    }
    if (aberto) {
      abrir.setAttribute("aria-expanded", "true");
    } else {
      abrir.setAttribute("aria-expanded", "false");
    }
    if (aberto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  if (abrir) {
    abrir.addEventListener("click", function () {
      abrirOuFecharMenu(true);
    });
  }
  if (fechar) {
    fechar.addEventListener("click", function () {
      abrirOuFecharMenu(false);
    });
  }
  if (fundo) {
    fundo.addEventListener("click", function () {
      abrirOuFecharMenu(false);
    });
  }
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      abrirOuFecharMenu(false);
    }
  });

  var linksDoMenu = document.querySelectorAll(".nav-drawer__list a[href^='#']");
  for (var j = 0; j < linksDoMenu.length; j++) {
    linksDoMenu[j].addEventListener("click", function () {
      abrirOuFecharMenu(false);
    });
  }
})();

(function () {
  var cursor = document.getElementById("cursor-follow");
  if (!cursor) {
    return;
  }
  var menosMovimento = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  var ehMouseDeVerdade = window.matchMedia("(pointer: fine)").matches;
  if (menosMovimento || !ehMouseDeVerdade) {
    cursor.remove();
    return;
  }
  document.documentElement.classList.add("has-custom-cursor");
  cursor.classList.add("cursor-follow--hidden");
  function seguirMouse(evt) {
    cursor.style.left = evt.clientX + "px";
    cursor.style.top = evt.clientY + "px";
    cursor.classList.remove("cursor-follow--hidden");
  }
  window.addEventListener("mousemove", seguirMouse, { passive: true });
  document.documentElement.addEventListener("mouseleave", function () {
    cursor.classList.add("cursor-follow--hidden");
  });
  document.documentElement.addEventListener("mouseenter", function () {
    cursor.classList.remove("cursor-follow--hidden");
  });
})();
