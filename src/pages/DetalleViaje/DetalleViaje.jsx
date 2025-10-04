import './detalleViaje.scss'
import './DetalleViajeSections/detalleViajeSections.scss'
import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { getDetalleViaje } from "../../api/services/viajesService"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import MenuButton from '../../components/common/SideBarButton/MenuButton'
import { useWindowResolution } from '../../hooks/useWindowResolution'
import Detalle from './DetalleViajeSections/Detalle/Detalle'
import Ofertas from './DetalleViajeSections/Ofertas/Ofertas'
import InformacionAdicional from './DetalleViajeSections/Informacion/InformacionAdicional'
import HacerOferta from './DetalleViajeSections/HacerOferta/HacerOferta'
import Chat from './DetalleViajeSections/Chat/Chat'
import TripStatusChanger from './DetalleViajeSections/TripStatusChanger/TripStatusChanger'

const DetalleViaje = () => {
    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    const esPropio =
        location.state?.esPropio === true ||
        location.state?.from === "/perfil/publicaciones" ||
        location.state?.from === "/perfil/mis-viajes"
    const from = location.state?.from ?? "/viajes"

    const [viaje, setViaje] = useState(null)
    const [enSubasta, setEnSubasta] = useState(false)
    const isDesktop = useWindowResolution() < 1024

    const fetchDetalleViaje = async () => {
        const response = await getDetalleViaje(id)
        
        if (response.status === 200 && response.data) {
            setViaje(response.data)
            setEnSubasta(response.data.state === "En subasta")
        } else {
            navigate("/viajes")
        }
    }
    
    useEffect(() => {
        fetchDetalleViaje()
    }, [])
    
    return (
        <main id='detalle-viaje' className="main expandedContainer">
            <div className="container">
                <header className="page-header">
                    <div className='page-title'>
                        <Link to={from}><KeyboardBackspaceIcon /></Link>
                        <h2>Detalle de viaje</h2>
                    </div>
                    { isDesktop && <MenuButton theme="dark"/> }
                </header>

                <div className={`sections-container ${esPropio && "propio"}`}>
                    <Detalle viaje={viaje}/>
                    
                    {viaje && !enSubasta ? (
                        <>
                            <Chat id={id}/>
                            {esPropio && <TripStatusChanger id={id} viaje={viaje} refresh={() => fetchDetalleViaje()}/>}
                        </>
                    ) : (
                        <>
                            <Ofertas viaje={viaje} esPropio={esPropio}/>
                            {!esPropio && <HacerOferta viaje={viaje} id={id} onOfertaHecha={fetchDetalleViaje}/>}
                        </>
                    )}
                    
                    <InformacionAdicional viaje={viaje} />
                </div>
            </div>
        </main>
    )
}

export default DetalleViaje