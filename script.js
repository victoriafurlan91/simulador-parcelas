// Pegando os elementos do HTML
const valorInput = document.getElementById("valor");
const parcelasInput = document.getElementById("parcelas");
const jurosInput = document.getElementById("juros");

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

// Função que faz o cálculo
function calcular() {
  const valor = parseFloat(valorInput.value);
  const parcelas = parseInt(parcelasInput.value);
  const juros = parseFloat(jurosInput.value) / 100;

 if (isNaN(valor) || isNaN(parcelas) || isNaN(juros)) return;

  // Cálculo simples
  const total = valor * (1 + juros * parcelas);
  const parcela = total / parcelas;
  const jurosTotal = total - valor;

  // Atualizando na tela
  valorParcelaSpan.innerText = `R$ ${parcela.toFixed(2)}`;
  totalSpan.innerText = `R$ ${total.toFixed(2)}`;
  totalJurosSpan.innerText = `R$ ${jurosTotal.toFixed(2)}`;
}

// Atualizar automaticamente quando digitar
valorInput.addEventListener("input", calcular);
parcelasInput.addEventListener("input", calcular);
jurosInput.addEventListener("input", calcular);