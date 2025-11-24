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
