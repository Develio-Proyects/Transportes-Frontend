import './detalleViaje.scss'
import './DetalleViajeSections/detalleViajeSections.scss'
import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { getDetalleViaje } from "../../api/services/viajesService"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import MenuButton from '../../components/common/MenuButton/MenuButton'
import { useWindowResolution } from '../../hooks/useWindowResolution'
import Detalle from './DetalleViajeSections/Detalle/Detalle'
import Ofertas from './DetalleViajeSections/Ofertas/Ofertas'
import InformacionAdicional from './DetalleViajeSections/Informacion/InformacionAdicional'
import HacerOferta from './DetalleViajeSections/HacerOferta/HacerOferta'
import Chat from './DetalleViajeSections/Chat/Chat'
import TripStatusChanger from './DetalleViajeSections/TripStatusChanger/TripStatusChanger'
import ReplayIcon from '@mui/icons-material/Replay';
import { alerta } from '../../utils/alerts'
import { IconButton } from '@mui/material'
import { validateToken } from '../../api/services/authService'

const DetalleViaje = () => {
    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    
    const from = location.state?.from ?? "/viajes"
    
    const [viaje, setViaje] = useState(null)
    const [enSubasta, setEnSubasta] = useState(false)
    const [esPropio, setEsPropio] = useState(false)
    const isDesktop = useWindowResolution() < 1024
    
    const fetchDetalleViaje = async () => {
        const response = await getDetalleViaje(id)
        
        if (response.status === 200 && response.data) {
            setViaje(response.data)
            setEnSubasta(response.data.state === "En subasta")
            setEsPropio(response.data.myPost)

            if(!enSubasta){
                const token = localStorage.getItem("token")
                const response = await validateToken(token)
                if(!response.data.isValid) navigate("/login")
            }
        } else {
            navigate("/viajes")
        }
    }
    
    useEffect(() => {
        const query = new URLSearchParams(location.search)
        const status = query.get("status")

        if (status) {
            const cleanUrl = location.pathname
            navigate(cleanUrl, { replace: true })

            switch (status) {
                case "approved":
                    alerta("Pago realizo", "", "success")
                    break
                case "pending":
                    alerta("Pago en proceso", "", "warn")
                    break
                case "failure":
                default:
                    alerta("Ocurrió un error", "Vuelva a intetar mas tarde", "error")
                    break
            }
        }
    }, [])

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
                        {/* <IconButton
                            onClick={fetchDetalleViaje}
                            aria-label="reload"
                            size='small'
                        >
                            <ReplayIcon />
                        </IconButton> */}
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
                            <Ofertas viaje={viaje} refresh={fetchDetalleViaje}/>
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