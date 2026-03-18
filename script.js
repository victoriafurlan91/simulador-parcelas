// ==========================
// ELEMENTOS
// ==========================
const valorInput = document.getElementById("valor");
const parcelasInput = document.getElementById("parcelas");
const listaParcelas = document.getElementById("listaParcelas");

const valorParcelaSpan = document.getElementById("valorParcela");
const totalSpan = document.getElementById("total");
const totalJurosSpan = document.getElementById("totalJuros");

const botaoCopiar = document.getElementById("copiar");
const mensagem = document.getElementById("mensagem");
const taxaTexto = document.getElementById("taxa");


// ==========================
// REGRA DE JUROS
// ==========================
function obterJuros(parcelas) {
  if (parcelas <= 3) return 0.015;
  if (parcelas <= 6) return 0.02;
  return 0.025;
}


// ==========================
// CÁLCULO PRINCIPAL
// ==========================
function calcular() {
  const valor = parseFloat(valorInput.value);
  const parcelas = parseInt(parcelasInput.value);

  if (isNaN(valor) || isNaN(parcelas)) return;

  const juros = obterJuros(parcelas);

  taxaTexto.innerText = `Taxa aplicada: ${(juros * 100).toFixed(1)}% ao mês`;

  const parcela = (valor * juros) / (1 - Math.pow(1 + juros, -parcelas));
  const total = parcela * parcelas;
  const jurosTotal = total - valor;

  valorParcelaSpan.innerText = parcela.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  totalSpan.innerText = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  totalJurosSpan.innerText = jurosTotal.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}


// ==========================
// OPÇÕES AUTOMÁTICAS (cards)
// ==========================
function gerarOpcoes() {
  const valor = parseFloat(valorInput.value);
  if (isNaN(valor)) return;

  const opcoes = [3, 6, 9, 12];
  const container = document.getElementById("opcoesParcelamento");

  container.innerHTML = "";

  opcoes.forEach((parcelas) => {
    const juros = obterJuros(parcelas);
    const parcela = (valor * juros) / (1 - Math.pow(1 + juros, -parcelas));

    const div = document.createElement("div");
    div.classList.add("opcao");

    div.innerText = `${parcelas}x de ${parcela.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })} (${(juros * 100).toFixed(1)}%)`;

    div.addEventListener("click", () => {
      parcelasInput.value = parcelas;
      calcular();

      document.querySelectorAll(".opcao").forEach(el => el.classList.remove("ativa"));
      div.classList.add("ativa");
    });

    container.appendChild(div);
  });
}


// ==========================
// LISTA AO CLICAR NO INPUT
// ==========================
function mostrarListaParcelas() {
  const valor = parseFloat(valorInput.value);
  const opcoes = [1, 2, 3, 6, 9, 12];

  listaParcelas.innerHTML = "";

  opcoes.forEach((num) => {
    const juros = obterJuros(num);

    let texto = `${num}x`;

    // Se tiver valor, mostra valor da parcela também
    if (!isNaN(valor)) {
      const parcela = (valor * juros) / (1 - Math.pow(1 + juros, -num));
      texto = `${num}x de ${parcela.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      })}`;
    }

    const div = document.createElement("div");
    div.classList.add("item-parcela");
    div.innerText = texto;

    div.addEventListener("click", () => {
      parcelasInput.value = num;
      calcular();
      listaParcelas.style.display = "none";
    });

    listaParcelas.appendChild(div);
  });

  listaParcelas.style.display = "block";
}


// ==========================
// EVENTOS
// ==========================

// Digitar valor
valorInput.addEventListener("input", calcular);

// Digitar parcelas
parcelasInput.addEventListener("input", calcular);

// Abrir lista ao clicar
parcelasInput.addEventListener("click", (e) => {
  e.stopPropagation(); // impede conflito
  mostrarListaParcelas();
});

// Fechar lista ao clicar fora
document.addEventListener("click", (e) => {
  if (
    !listaParcelas.contains(e.target) &&
    e.target !== parcelasInput
  ) {
    listaParcelas.style.display = "none";
  }
});


// ==========================
// BOTÃO COPIAR
// ==========================
botaoCopiar.addEventListener("click", () => {
  const texto = `${parcelasInput.value}x de ${valorParcelaSpan.innerText} (Total: ${totalSpan.innerText})`;

  navigator.clipboard.writeText(texto);

  mensagem.style.opacity = "1";

  setTimeout(() => {
    mensagem.style.opacity = "0";
  }, 2000);
});