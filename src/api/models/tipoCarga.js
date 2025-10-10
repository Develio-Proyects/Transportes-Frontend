export const TIPO_CARGA = {
    FROZEN: { backName: "FROZEN", frontName: "Congelado" },
    DRY: { backName: "DRY", frontName: "Seco" },
    PERISHABLE: { backName: "PERISHABLE", frontName: "Perecedero" },
    DANGEROUS: { backName: "DANGEROUS", frontName: "Peligroso"},
    BULK: { backName: "BULK", frontName: "Granel"},
    SPECIAL: { backName: "SPECIAL", frontName: "Especial"}
}

export const getBackName = (frontName) => {
    const entry = Object.values(TIPO_CARGA).find(
      (tipo) => tipo.frontName.toLowerCase() === frontName.toLowerCase()
    )
    return entry ? entry.backName : null
  }
  
export const getFrontName = (backName) => {
    const entry = Object.values(TIPO_CARGA).find(
      (tipo) => tipo.backName.toLowerCase() === backName.toLowerCase()
    )
    return entry ? entry.frontName : null
}