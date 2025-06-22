import './viajes.scss'
import FilterListIcon from '@mui/icons-material/FilterList'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import IconButton from "../../components/common/IconButton/IconButton"
import ViajeCard from '../../components/common/ViajeCard/ViajeCard'
import { useEffect, useRef, useState } from 'react'
import { getViajes } from '../../api/services/viajesService'
import { Pagination } from '@mui/material'
import { useSideBar } from '../../context/SideBarContext'
import { useWindowResolution } from '../../hooks/useWindowResolution'
import MenuButton from '../../components/common/SideBarButton/MenuButton'

const LIMIT = 9

const Viajes = () => {
    const [viajesPorPagina, setViajesPorPagina] = useState({})
    const [viajes, setViajes] = useState([])
    const [page, setPage] = useState(0)
    const [totalViajes, setTotalViajes] = useState(0)
    const {toggleSideBar, isOpen} = useSideBar()
    const containerRef = useRef()
    const isDesktop = useWindowResolution() <= 1024

    const fetchViajes = async (pagina) => {
        if (viajesPorPagina[pagina]) {
            setViajes(viajesPorPagina[pagina])
            return
        }
        const response = await getViajes(pagina, LIMIT)

        setViajesPorPagina(prev => ({
            ...prev,
            [pagina]: response.data.content
        }))

        setViajes(response.data.content)
        setTotalViajes(response.data.totalElements)
    }

    const handleChange = (_, value) => {
        setPage(value - 1)
        containerRef.current?.scrollTo({ top: 0 })
    }

    const handleToggle = (e) => {
        e.stopPropagation()     
        toggleSideBar()
    }

    useEffect(() => {
        fetchViajes(page)
    }, [page])
    
    return (
        <main id='viajes' className="container">
            <header className="page-header">
                <h2>Viajes disponibles</h2>
                { isDesktop && <MenuButton onMouseDown={handleToggle} isOpen={isOpen} theme="dark"/> }
            </header>

            <div className="filterSortControls">
                <IconButton Icon={FilterListIcon}>Ordenar por</IconButton>
                <IconButton Icon={FilterAltIcon}>Filtrar</IconButton>
            </div>
            <div ref={containerRef} className="viajes-container">
                {Array.isArray(viajes) &&
                    viajes.map(viaje => <ViajeCard key={viaje.id} viaje={viaje} />)}
            </div>
            <div className="pagination-container">
                <Pagination
                    count={Math.ceil(totalViajes / LIMIT)}
                    page={page + 1}
                    onChange={handleChange}
                    sx={{margin: '1rem auto'}}
                    size="medium"
                />
            </div>
        </main>
    )
}

export default Viajes