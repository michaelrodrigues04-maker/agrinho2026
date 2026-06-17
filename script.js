function salvarRegistro() {
  const nome = document.getElementById("nome").value;
  const turma = document.getElementById("turma").value;
  const horaDormiu = document.getElementById("horaDormiu").value;
  const horaAcordou = document.getElementById("horaAcordou").value;
  const celular = document.getElementById("celular").value;
  const energia = document.getElementById("energia").value;

  const resultado = document.getElementById("resultado");
  const fazenda = document.getElementById("fazenda");
  const imagemFazenda = document.getElementById("imagemFazenda");

  if (nome === "" || turma === "" || horaDormiu === "" || horaAcordou === "") {
    resultado.innerHTML = "Preencha todos os campos.";
    resultado.style.background = "#fff3cd";
    return;
  }

  let dormir = transformarEmMinutos(horaDormiu);
  let acordar = transformarEmMinutos(horaAcordou);

  if (acordar < dormir) {
    acordar += 24 * 60;
  }

  const minutosDormidos = acordar - dormir;
  const horasDormidas = minutosDormidos / 60;

  let situacao = "";
  let mensagem = "";

  if (horasDormidas >= 8) {
    situacao = "Excelente";
    mensagem = "Excelente descanso! Sua energia está alta. 🌟";
    resultado.style.background = "#c8e6c9";
    fazenda.innerHTML = "Sua fazenda está forte, saudável e produtiva.";
    imagemFazenda.innerHTML = "🌻🌾🐄🚜☀️";
  } else if (horasDormidas >= 6) {
    situacao = "Atenção";
    mensagem = "Seu descanso foi razoável, mas pode melhorar. 🙂";
    resultado.style.background = "#fff9c4";
    fazenda.innerHTML = "Sua fazenda está produzindo, mas precisa de mais cuidado.";
    imagemFazenda.innerHTML = "🌾🐄🌤️";
  } else {
    situacao = "Crítico";
    mensagem = "Você dormiu pouco. Seu corpo precisa de recuperação. 😴";
    resultado.style.background = "#ffcdd2";
    fazenda.innerHTML = "Sua fazenda está cansada. É hora de cuidar do descanso.";
    imagemFazenda.innerHTML = "🥀🐄💤";
  }

  resultado.innerHTML = `
    Você dormiu ${horasDormidas.toFixed(1)} horas.<br>
    Situação: ${situacao}<br>
    ${mensagem}
  `;

  const registro = {
    nome: nome,
    turma: turma,
    horaDormiu: horaDormiu,
    horaAcordou: horaAcordou,
    horasDormidas: horasDormidas.toFixed(1),
    celular: celular,
    energia: energia,
    situacao: situacao,
    data: new Date().toLocaleDateString("pt-BR")
  };

  let registros = JSON.parse(localStorage.getItem("registrosSono")) || [];

  registros.push(registro);

  localStorage.setItem("registrosSono", JSON.stringify(registros));
}

function transformarEmMinutos(hora) {
  const partes = hora.split(":");
  const horas = Number(partes[0]);
  const minutos = Number(partes[1]);

  return horas * 60 + minutos;
}