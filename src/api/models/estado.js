export const ESTADOS = {
    OPEN:      { text: "En subasta",  color: "#f06fe5ff" },
    ASSIGNED:  { text: "Asignado",    color: "#10b981"   },
    PROGRESS:  { text: "En progreso", color: "#EF4444"   },
    CANCELED:  { text: "Cancelado",   color: "#78BBFA"   },
    FINALIZED: { text: "Finalizado",  color: "#10b910ff" }
}

const TRANSICIONES = {
    OPEN: "ASSIGNED",
    ASSIGNED: "PROGRESS",
    PROGRESS: "FINALIZED",
    CANCELED: null, 
    FINALIZED: null 
}

export const getStateFromText = (text) => {
    return Object.keys(ESTADOS).find(key => ESTADOS[key].text === text);
}

export const getTextFromState = (stateKey) => {
    return ESTADOS[stateKey]?.text || null;
}

export const getNextState = (currentText) => {
    const currentKey = getStateFromText(currentText);
    if (!currentKey) return null;

    const nextKey = TRANSICIONES[currentKey];
    return nextKey ? getTextFromState(nextKey) : null;
}