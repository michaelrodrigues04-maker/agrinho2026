window.onload = function() {
  carregarRegistros();
};

function carregarRegistros() {
  const registros = JSON.parse(localStorage.getItem("registrosSono")) || [];

  const tabela = document.getElementById("tabelaRegistros");
  const totalRegistros = document.getElementById("totalRegistros");
  const mediaSono = document.getElementById("mediaSono");
  const alunosAlerta = document.getElementById("alunosAlerta");

  tabela.innerHTML = "";

  let somaHoras = 0;
  let totalAlerta = 0;

  registros.forEach(function(registro) {
    somaHoras += Number(registro.horasDormidas);

    if (registro.situacao === "Crítico") {
      totalAlerta++;
    }

    let linha = document.createElement("tr");

    linha.innerHTML = `
      <td>${registro.nome}</td>
      <td>${registro.turma}</td>
      <td>${registro.horasDormidas}h</td>
      <td>${registro.celular}</td>
      <td>${registro.energia}</td>
      <td>${mostrarSituacao(registro.situacao)}</td>
    `;

    tabela.appendChild(linha);
  });

  totalRegistros.innerHTML = registros.length;

  if (registros.length > 0) {
    mediaSono.innerHTML = (somaHoras / registros.length).toFixed(1) + "h";
  } else {
    mediaSono.innerHTML = "0h";
  }

  alunosAlerta.innerHTML = totalAlerta;
}

function mostrarSituacao(situacao) {
  if (situacao === "Excelente") {
    return "🟢 Excelente";
  }

  if (situacao === "Atenção") {
    return "🟡 Atenção";
  }

  return "🔴 Crítico";
}

function limparRegistros() {
  const confirmar = confirm("Tem certeza que deseja apagar todos os registros?");

  if (confirmar) {
    localStorage.removeItem("registrosSono");
    carregarRegistros();
  }
}