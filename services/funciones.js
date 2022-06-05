
export const formatDate = (fechaString) => {
  let fecha = new Date(fechaString)
  return `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`
}

export const convertirFecha = (fechaString) => {
  var fechaSp = fechaString.split("-");
  var anio = new Date().getFullYear();
  if (fechaSp.length === 3) anio = fechaSp[0];
  var mes = fechaSp[1] - 1;
  var dia = fechaSp[2];

  return new Date(anio, mes, dia);
}

export const aplicarDescuento = (precio, descuento = 5) => {
  return parseFloat((precio - (Math.floor((precio * descuento)) / 100)).toFixed(2))
}

export const fetchPost = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
}