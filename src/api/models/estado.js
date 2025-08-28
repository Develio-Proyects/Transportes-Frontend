export const ESTADOS = {
  SUBASTA:   { text: "En subasta",  color: "#f06fe5ff" },
  ACORDADO:  { text: "Asignado",    color: "#10b981" },
  CANCELADO: { text: "Cancelado",   color: "#EF4444" },
  CURSO:     { text: "En curso",    color: "#78BBFA" },
  FINALIZADO:{ text: "Finalizado",  color: "#10b910ff" }
}

export const getStateFromText = (text) => {
  return Object.keys(ESTADOS).find(key => ESTADOS[key].text === text);
}