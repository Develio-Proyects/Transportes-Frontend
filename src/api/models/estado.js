export const ESTADOS = {
  SUBASTA:   { text: "En subasta",  color: "#CD7EEA" },
  ACORDADO:  { text: "Acordado",    color: "#DEEA00" },
  CANCELADO: { text: "Cancelado",   color: "#EF4444" },
  CURSO:     { text: "En curso",    color: "#78BBFA" },
  FINALIZADO:{ text: "Finalizado",  color: "#10B981" }
}

export const getStateFromText = (text) => {
  return Object.keys(ESTADOS).find(key => ESTADOS[key].text === text);
}