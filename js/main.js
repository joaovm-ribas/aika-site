/* =========================================================
   Grupo Aika — comportamento do site
   1. Troca de idioma (1b. Tema claro / escuro)
   2. Menu no celular
   3. Vídeos do YouTube
   4. Galerias de fotos (integrantes, página Galeria e prévia na inicial)
   ========================================================= */

/* 1. Troca de idioma ------------------------------------- */
const IDIOMAS = { pt: "pt-BR", en: "en", es: "es", ja: "ja" };

function idiomaSalvo() {
  try { return localStorage.getItem("aika-idioma") || "pt"; }
  catch (e) { return "pt"; }
}

function aplicarIdioma(idioma) {
  if (!TRADUCOES[idioma]) idioma = "pt";
  const textos = TRADUCOES[idioma];

  document.documentElement.lang = IDIOMAS[idioma];

  // Textos: <p data-i18n="chave">
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const texto = textos[el.dataset.i18n];
    if (texto) el.textContent = texto;
  });

  // Atributos: <button data-i18n-aria="chave"> (texto para leitores de tela)
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const texto = textos[el.dataset.i18nAria];
    if (texto) el.setAttribute("aria-label", texto);
  });

  document.querySelectorAll("[data-idioma]").forEach((botao) => {
    botao.setAttribute("aria-pressed", botao.dataset.idioma === idioma);
  });

  try { localStorage.setItem("aika-idioma", idioma); } catch (e) {}
}

document.querySelectorAll("[data-idioma]").forEach((botao) => {
  botao.addEventListener("click", () => aplicarIdioma(botao.dataset.idioma));
});

aplicarIdioma(idiomaSalvo());

/* 1b. Tema claro / escuro -------------------------------- */
/* O tema inicial é definido por um script no <head> de cada página
   (escolha salva ou, na primeira visita, o modo do aparelho). */
const botaoTema = document.querySelector(".tema-botao");

function aplicarTema(tema) {
  document.documentElement.dataset.tema = tema;
  if (botaoTema) {
    botaoTema.textContent = tema === "escuro" ? "☀" : "☾";
    botaoTema.setAttribute("aria-pressed", tema === "escuro");
  }
}

if (botaoTema) {
  aplicarTema(document.documentElement.dataset.tema === "escuro" ? "escuro" : "claro");
  botaoTema.addEventListener("click", () => {
    const novo = document.documentElement.dataset.tema === "escuro" ? "claro" : "escuro";
    aplicarTema(novo);
    try { localStorage.setItem("aika-tema", novo); } catch (e) {}
  });
}

/* 2. Menu no celular ------------------------------------- */
const botaoMenu = document.querySelector(".menu-botao");
const menu = document.querySelector(".menu");

if (botaoMenu && menu) {
  botaoMenu.addEventListener("click", () => {
    const aberto = menu.classList.toggle("aberto");
    botaoMenu.setAttribute("aria-expanded", aberto);
  });
}

/* 3. Vídeos do YouTube ----------------------------------- */
/* Para mostrar um vídeo dentro do site, coloque o código do vídeo
   no atributo data-youtube. Ex.: youtube.com/watch?v=ABC123 → data-youtube="ABC123".
   Sem código, o cartão continua sendo um link para o canal. */
document.querySelectorAll(".video[data-youtube]").forEach((cartao) => {
  const id = cartao.dataset.youtube.trim();
  if (!id) return;
  const titulo = cartao.querySelector("[data-i18n]")?.textContent || "Vídeo";
  cartao.outerHTML =
    `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${id}"
      title="${titulo}" loading="lazy" allowfullscreen
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"></iframe></div>`;
});

/* 4. Galerias de fotos ----------------------------------- */
/* Cada <… class="galeria" data-pasta="…"> procura as fotos 1.jpg, 2.jpg, 3.jpg...
   dentro da pasta (também aceita .jpeg, .JPG, .JPEG, .png e .webp). O site testa
   os números em ordem e para no primeiro que não existir, então não pule números.
   Usada na página de cada integrante (img/membros/<nome>/), na página Galeria
   (um bloco por álbum) e na prévia da página inicial (data-limite="8" mostra
   só as primeiras). Todas as galerias da página usam o mesmo visor (<dialog>). */
function carregarImagem(src) {
  return new Promise((ok, falha) => {
    const img = new Image();
    img.onload = () => ok(src);
    img.onerror = falha;
    img.src = src;
  });
}

async function procurarFotos(pasta, limite) {
  const fotos = [];
  for (let n = 1; n <= limite; n++) {
    let achou = null;
    for (const ext of ["jpg", "jpeg", "JPG", "JPEG", "png", "webp"]) {
      try { achou = await carregarImagem(`${pasta}${n}.${ext}`); break; } catch (e) {}
    }
    if (!achou) break;
    fotos.push(achou);
  }
  return fotos;
}

const visor = document.querySelector(".visor");

if (visor) {
  const visorImg = visor.querySelector(".visor__img");
  let fotosAbertas = [];   // fotos da galeria que foi clicada
  let nomeAberto = "";
  let atual = 0;

  function mostrar(i) {
    atual = (i + fotosAbertas.length) % fotosAbertas.length;
    visorImg.src = fotosAbertas[atual];
    visorImg.alt = `${nomeAberto} (${atual + 1}/${fotosAbertas.length})`;
  }

  function abrir(fotos, nome, i) {
    fotosAbertas = fotos;
    nomeAberto = nome;
    visor.classList.toggle("visor--uma", fotos.length === 1);
    mostrar(i);
    visor.showModal();
  }

  document.querySelectorAll(".galeria[data-pasta]").forEach((galeria) => {
    const grade = galeria.querySelector(".galeria__grade");
    const nome = galeria.dataset.nome || "";
    const limite = Number(galeria.dataset.limite) || 300;

    procurarFotos(galeria.dataset.pasta, limite).then((fotos) => {
      if (!fotos.length) return; // fica a mensagem "Mais fotos em breve"
      grade.innerHTML = "";
      fotos.forEach((src, i) => {
        const botao = document.createElement("button");
        botao.className = "galeria__item";
        botao.type = "button";
        botao.innerHTML = `<img src="${src}" alt="${nome} (${i + 1}/${fotos.length})" loading="lazy">`;
        botao.addEventListener("click", () => abrir(fotos, nome, i));
        grade.append(botao);
      });
    });
  });

  visor.querySelector(".visor__fechar").addEventListener("click", () => visor.close());
  visor.querySelector(".visor__ant").addEventListener("click", () => mostrar(atual - 1));
  visor.querySelector(".visor__prox").addEventListener("click", () => mostrar(atual + 1));
  visor.addEventListener("click", (e) => { if (e.target === visor) visor.close(); });
  visor.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") mostrar(atual - 1);
    if (e.key === "ArrowRight") mostrar(atual + 1);
  });
}
