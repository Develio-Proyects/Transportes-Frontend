import { useState } from "react"
import { Button, TextField } from "@mui/material"
import { useModalStore } from "../../../store/modalStore"
import { useFilterSortStore } from "../../../store/filterSortStore"

const FilterModal = ({ scope }) => {
    const { closeModal } = useModalStore()
    const { filters, setFilter } = useFilterSortStore()
    
    const [tempFilters, setTempFilters] = useState(filters || {})

    const handleChange = (key) => (e) => {
        setTempFilters(prev => ({
            ...prev,
            [key]: e.target.value
        }))
    }
    
    const handleClear = () => {
        setTempFilters({})
    }

    const handleApply = () => {
        closeModal()
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1rem" }}>
            <TextField
                type="number"
                label="Precio mínimo"
                value={tempFilters.minPrice || ""}
                onChange={handleChange("minPrice")}
                fullWidth
                variant="outlined"
            />

            <TextField
                type="number"
                label="Precio máximo"
                value={tempFilters.maxPrice || ""}
                onChange={handleChange("maxPrice")}
                fullWidth
                variant="outlined"
            />

            <TextField
                label="Destino"
                value={tempFilters.destino || ""}
                onChange={handleChange("destino")}
                fullWidth
                variant="outlined"
            />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
                <Button 
                    onClick={handleClear}
                    variant="outlined"
                    color="error"
                >
                    Limpiar
                </Button>
                <Button 
                    onClick={handleApply} 
                    variant="contained"
                    color="primary"
                >
                    Aplicar
                </Button>
            </div>
        </div>
    )
}

export default FilterModal