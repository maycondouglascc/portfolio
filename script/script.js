function atualizarHorario() {
  const agora = new Date();

  // Formata o horário para o padrão local (ex: 14:30:45)
  const horarioFormatado = agora.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Encontra o elemento no HTML e atualiza o texto
  const elementoRelogio = document.getElementById("local-time");
  if (elementoRelogio) {
    elementoRelogio.textContent = `⏲ ${horarioFormatado}`;
  }
}

// Atualiza o relógio imediatamente ao carregar
atualizarHorario();

// Atualiza o relógio a cada 1000 milissegundos (1 segundo)
setInterval(atualizarHorario, 60000);

function copiarComTooltip(evento) {
  evento.preventDefault();

  // currentTarget garante que pegamos o <a> mesmo se clicar num filho dele
  const elementoLink = evento.currentTarget;
  const textoParaCopiar = elementoLink.getAttribute("data-texto");

  // Busca o tooltip que está DENTRO deste link específico
  const tooltip = elementoLink.querySelector(".meu-tooltip");

  navigator.clipboard
    .writeText(textoParaCopiar)
    .then(() => {
      // 1. Adiciona a classe que torna o tooltip visível
      tooltip.classList.add("mostrar-tooltip");

      //2. Remove a classe após 2 segundos (2000ms)
      setTimeout(() => {
        tooltip.classList.remove("mostrar-tooltip");
      }, 1000);
    })
    .catch((erro) => {
      console.error("Erro ao copiar:", erro);
    });
}

// Prefetching logic
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href^="/"], a[href^="."]');
  const prefetchedUrls = new Set();

  const prefetchUrl = (url) => {
    if (prefetchedUrls.has(url)) return;

    // Check if it's a valid internal URL and not just a hash
    if (!url || url.startsWith("#")) return;

    prefetchedUrls.add(url);

    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = url;
    document.head.appendChild(link);

    // Fallback fetch for browsers that might ignore link rel=prefetch
    fetch(url, { priority: "low" }).catch(() => { });
  };

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      prefetchUrl(link.getAttribute("href"));
    });

    link.addEventListener("touchstart", () => {
      prefetchUrl(link.getAttribute("href"));
    }, { passive: true });
  });
});
