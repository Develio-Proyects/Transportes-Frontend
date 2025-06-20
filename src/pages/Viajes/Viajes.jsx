import './viajes.scss'
import FilterListIcon from '@mui/icons-material/FilterList'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import IconButton from "../../components/common/IconButton/IconButton"
import ViajeCard from '../../components/common/ViajeCard/ViajeCard'
import { useEffect, useState } from 'react'
import { getViajes } from '../../api/services/viajesService'
import { Pagination } from '@mui/material'
import { useSideBar } from '../../context/SideBarContext'

const LIMIT = 8

const Viajes = () => {
    const [viajesPorPagina, setViajesPorPagina] = useState({})
    const [viajes, setViajes] = useState([])
    const [page, setPage] = useState(1)
    const [totalViajes, setTotalViajes] = useState(0)
    const {toggleSideBar} = useSideBar()

    const fetchViajes = async (pagina) => {
        if (viajesPorPagina[pagina]) {
            setViajes(viajesPorPagina[pagina])
            return
        }

        const offset = (pagina - 1) * LIMIT
        const response = await getViajes(LIMIT, offset)

        setViajesPorPagina(prev => ({
            ...prev,
            [pagina]: response.data
        }))

        setViajes(response.data)
        setTotalViajes(response.total)
    }

    useEffect(() => {
        fetchViajes(page)
    }, [page])

    const handleChange = (_, value) => {
        setPage(value)
        window.scrollTo({ top: 0 })
    }

    return (
        <main id='viajes' className="container">
            <h2>Viajes disponibles</h2>
            <button onClick={toggleSideBar} style={{marginLeft: '90%'}}>Open</button>
            <div className="filterSortControls">
                <IconButton Icon={FilterListIcon}>Ordenar por</IconButton>
                <IconButton Icon={FilterAltIcon}>Filtrar</IconButton>
            </div>
            <div className="viajes-container">
                {Array.isArray(viajes) &&
                    viajes.map(viaje => <ViajeCard key={viaje.id} viaje={viaje} />)}
            </div>
            <div className="pagination-container">
                <Pagination
                    count={Math.ceil(totalViajes / LIMIT)}
                    page={page}
                    onChange={handleChange}
                    size="large"
                />
            </div>
        </main>
    )
}

export default Viajes