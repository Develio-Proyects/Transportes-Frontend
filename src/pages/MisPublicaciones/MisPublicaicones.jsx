import FilterListIcon from '@mui/icons-material/FilterList'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import IconButton from "../../components/common/IconButton/IconButton"
import ViajeCard from '../../components/common/ViajeCard/ViajeCard'
import { useEffect, useRef, useState } from 'react'
import { getMisPublicaciones } from '../../api/services/viajesService'
import { Button, Pagination } from '@mui/material'
import { useWindowResolution } from '../../hooks/useWindowResolution'
import MenuButton from '../../components/common/MenuButton/MenuButton'
import { useModal } from '../../context/ModalContext'
import PrimaryButton from '../../components/common/PrimaryButton/PrimaryButton'

const LIMIT = 9

const MisPublicaicones = () => {
const [viajesPorPagina, setViajesPorPagina] = useState({})
    const [viajes, setViajes] = useState([])
    const [page, setPage] = useState(0)
    const [totalViajes, setTotalViajes] = useState(0)
    const containerRef = useRef()
    const isDesktop = useWindowResolution() < 1024
    const {openModal} = useModal()
    const [reloadFlag, setReloadFlag] = useState(false);

    const fetchMisPublicaciones = async (pagina, force = false) => {
        if (viajesPorPagina[pagina] && !force) {
            setViajes(viajesPorPagina[pagina])
            return
        }
        const response = await getMisPublicaciones(pagina, LIMIT)
        
        setViajesPorPagina(prev => ({
            ...prev,
            [pagina]: response.data.content
        }))

        setViajes(response.data.content)
        setTotalViajes(response.data.totalElements)
        
        if (force) setReloadFlag(false)
    }

    const handleChange = (_, value) => {
        setPage(value - 1)
        containerRef.current?.scrollTo({ top: 0 })
    }

    useEffect(() => {
        fetchMisPublicaciones(page, reloadFlag)
    }, [page, reloadFlag])
    
    return (
        <main id='mis-publicaiones' className="main expandedContainer">
            <div className="container">
                <header className="page-header">
                    <div className="page-title">
                        <h2>Mis publicaciones</h2>
                    </div>
                    { isDesktop && <MenuButton theme="dark"/> }
                </header>
                
                <PrimaryButton 
                    style={{marginBottom: "1rem"}}
                    onClick={()=>openModal("modalTrip", {onTripCreated: () => setReloadFlag(f => !f)})}>
                    Crear publicación
                </PrimaryButton>

                {/* <div className="filterSortControls">
                    <IconButton Icon={FilterListIcon}>Ordenar por</IconButton>
                    <IconButton Icon={FilterAltIcon}>Filtrar</IconButton>
                </div> */}
                {viajes.length > 0 ? (
                    <div ref={containerRef} className="cards-container">
                        {Array.isArray(viajes) && 
                            viajes.map(viaje => <ViajeCard key={viaje.id} viaje={viaje} from='/perfil/publicaciones'/>)
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