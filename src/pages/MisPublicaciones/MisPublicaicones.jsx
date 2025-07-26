import FilterListIcon from '@mui/icons-material/FilterList'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import IconButton from "../../components/common/IconButton/IconButton"
import ViajeCard from '../../components/common/ViajeCard/ViajeCard'
import { useEffect, useRef, useState } from 'react'
import { getMisViajes } from '../../api/services/viajesService'
import { Pagination } from '@mui/material'
import { useWindowResolution } from '../../hooks/useWindowResolution'
import MenuButton from '../../components/common/SideBarButton/MenuButton'

const LIMIT = 9

const MisPublicaicones = () => {
const [viajesPorPagina, setViajesPorPagina] = useState({})
    const [viajes, setViajes] = useState([])
    const [page, setPage] = useState(0)
    const [totalViajes, setTotalViajes] = useState(0)
    const containerRef = useRef()
    const isDesktop = useWindowResolution() < 1024

    const fetchMisViaje = async (pagina) => {
        if (viajesPorPagina[pagina]) {
            setViajes(viajesPorPagina[pagina])
            return
        }
        const response = await getMisViajes(pagina, LIMIT)
        
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

    useEffect(() => {
        fetchMisViaje(page)
    }, [page])
    
    return (
        <main id='mis-publicaiones' className="main expandedContainer">
            <div className="container">
                <header className="page-header">
                    <div className="page-title">
                        <h2>Mis publicaciones</h2>
                    </div>
                    { isDesktop && <MenuButton theme="dark"/> }
                </header>
                <div className="filterSortControls">
                    <IconButton Icon={FilterListIcon}>Ordenar por</IconButton>
                    <IconButton Icon={FilterAltIcon}>Filtrar</IconButton>
                </div>
                {viajes.length > 0 ? (
                    <div ref={containerRef} className="cards-container">
                        {Array.isArray(viajes) && 
                            viajes.map(viaje => <ViajeCard key={viaje.id} viaje={viaje} />)
                        }
                    </div>
                    ):(
                        <p className="empty">No se encontraron publicaciones.</p>
                    )
                }
            </div>
            {Math.ceil(totalViajes) > LIMIT &&
                <div className="pagination-container">
                    <Pagination
                        count={Math.ceil(totalViajes / LIMIT)}
                        page={page + 1}
                        onChange={handleChange}
                        sx={{margin: '1rem auto'}}
                        size="medium"
                    />
                </div>
            }
        </main>
    )
}

export default MisPublicaicones