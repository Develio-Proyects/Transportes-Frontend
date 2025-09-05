export const ESTADOS = {
    OPEN:      { text: "En subasta",  color: "#ec83e4ff" },
    ASSIGNED:  { text: "Asignado",    color: "#10b981"   },
    PROGRESS:  { text: "En progreso", color: "#3e94e4ff"   },
    CANCELED:  { text: "Cancelado",   color: "#EF4444"   },
    FINALIZED: { text: "Finalizado",  color: "#2e7d32" }
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

export const getEstadoKeyFromText = (text) => {
    return Object.entries(ESTADOS).find(([key, value]) => value.text === text)?.[0] ?? null
}

export const getNextState = (currentText) => {
    const currentKey = getStateFromText(currentText);
    if (!currentKey) return null;

    const nextKey = TRANSICIONES[currentKey];
    return nextKey ? getTextFromState(nextKey) : null;
}