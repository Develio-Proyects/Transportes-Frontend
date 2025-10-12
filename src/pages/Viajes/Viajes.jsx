import ViajeCard from '../../components/common/ViajeCard/ViajeCard'
import { useEffect, useRef, useState } from 'react'
import { getViajes } from '../../api/services/viajesService'
import { InputAdornment, Pagination, TextField } from '@mui/material'
import { useWindowResolution } from '../../hooks/useWindowResolution'
import MenuButton from '../../components/common/MenuButton/MenuButton'
import { alerta } from '../../utils/alerts'
import SearchBar from '../../components/common/SearchBar/SearchBar';

const LIMIT = 9

const Viajes = () => {
    const [viajesPorPagina, setViajesPorPagina] = useState({})
    const [viajes, setViajes] = useState([])
    const [page, setPage] = useState(0)
    const [totalViajes, setTotalViajes] = useState(0)
    const containerRef = useRef()
    const isDesktop = useWindowResolution() < 1024
    const [filters, setFilters] = useState({ origin: '', destination: '', departureDate: '' })

    const fetchViajes = async (pagina) => {
        // if (viajesPorPagina[pagina]) {
        //     setViajes(viajesPorPagina[pagina])
        //     return
        // }
        const response = await getViajes(pagina, LIMIT, filters)

        if(response.status === 200){
            setViajesPorPagina(prev => ({
                ...prev,
                [pagina]: response.data.content
            }))
    
            setViajes(response.data?.content)
            setTotalViajes(response.data?.totalElements)
        }else{
            alerta("Ocurrió un error", response.data.message, "error")
        }
    }

    const handleChange = (_, value) => {
        setPage(value - 1)
        containerRef.current?.scrollTo({ top: 0 })
    }

    useEffect(() => {
        fetchViajes(page)
    }, [page, filters])
    
    return (
        <main id='viajes' className="main expandedContainer">
            <div className="container">
                <header className="page-header">
                    <div className="page-title">
                        <h2>Viajes disponibles</h2>
                    </div>
                    { isDesktop && <MenuButton theme="dark"/> }
                </header>

                <SearchBar setFilters={setFilters} />

                {viajes.length > 0 ? (
                    <div ref={containerRef} className="cards-container">
                        {Array.isArray(viajes) && 
                            viajes.map(viaje => <ViajeCard key={viaje.id} viaje={viaje} from='/viajes'/>)
                        }
                    </div>
                    ):(
                        <p className="empty">No se encontraron viajes.</p>
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

export default Viajes