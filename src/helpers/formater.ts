const convertirANumero = (cadena: string) => {
  cadena = cadena.replace("$", "").replace(/,/g, "");
  return cadena;
};

export { convertirANumero };
