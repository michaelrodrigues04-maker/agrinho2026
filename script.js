function calcularSono() {
  const horaDormiu = document.getElementById("horaDormiu").value;
  const horaAcordou = document.getElementById("horaAcordou").value;

  const resultado = document.getElementById("resultado");
  const fazenda = document.getElementById("fazenda");
  const imagemFazenda = document.getElementById("imagemFazenda");

  if (horaDormiu === "" || horaAcordou === "") {
    resultado.innerHTML = "Preencha os dois horários para calcular.";
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

  if (horasDormidas >= 8) {
    resultado.innerHTML = `Você dormiu ${horasDormidas.toFixed(1)} horas. Excelente descanso! 🌟`;
    resultado.style.background = "#c8e6c9";

    fazenda.innerHTML = "Sua fazenda está cheia de energia! Produção forte e sustentável.";
    imagemFazenda.innerHTML = "🌻🌾🐄🚜☀️";
  } 
  else if (horasDormidas >= 6) {
    resultado.innerHTML = `Você dormiu ${horasDormidas.toFixed(1)} horas. Foi um descanso razoável. 🙂`;
    resultado.style.background = "#fff9c4";

    fazenda.innerHTML = "Sua fazenda está bem, mas poderia produzir melhor com mais descanso.";
    imagemFazenda.innerHTML = "🌾🐄🌤️";
  } 
  else {
    resultado.innerHTML = `Você dormiu apenas ${horasDormidas.toFixed(1)} horas. Cuidado com o cansaço! 😴`;
    resultado.style.background = "#ffcdd2";

    fazenda.innerHTML = "Sua fazenda está cansada. O corpo precisa descansar para produzir melhor.";
    imagemFazenda.innerHTML = "🥀🐄💤";
  }
}

function transformarEmMinutos(hora) {
  const partes = hora.split(":");
  const horas = Number(partes[0]);
  const minutos = Number(partes[1]);

  return horas * 60 + minutos;
}