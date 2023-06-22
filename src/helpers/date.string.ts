import { MESES } from "../global.variables";

export const getStringDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${day} de ${MESES[month]} ${year}`;
};
export const getStringDateCreated = (dateString: string) => {
  const date = dateString.split("T")[0].split("-");
  const day = date[2];
  const month = date[1];
  const year = date[0];
  return `${day} de ${MESES[parseInt(month) - 1]} ${year}`;
};
