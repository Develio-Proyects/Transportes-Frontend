import './detalleViaje.scss'
import '../../components/common/DetalleViajeSections/detalleViajeSections.scss'
import { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import { getDetalleViaje } from "../../api/services/viajesService"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import MenuButton from '../../components/common/SideBarButton/MenuButton'
import { useWindowResolution } from '../../hooks/useWindowResolution'
import Detalle from '../../components/common/DetalleViajeSections/Detalle/Detalle'
import Ofertas from '../../components/common/DetalleViajeSections/Ofertas/Ofertas'
import InformacionAdicional from '../../components/common/DetalleViajeSections/Informacion/InformacionAdicional'
import HacerOferta from '../../components/common/DetalleViajeSections/HacerOferta/HacerOferta'

const DetalleViaje = () => {
    const { id } = useParams()
    const esPropio = useLocation().state?.esPropio ?? false
    const [viaje, setViaje] = useState(null)
    const isDesktop = useWindowResolution() < 1024
    
    const fetchDetalleViaje = async () => {
        const response = await getDetalleViaje(id)
        
        if(response.status === 200){
            setViaje(response.data)
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
                        <Link to="/viajes"><KeyboardBackspaceIcon /></Link>
                        <h2>Subasta del viaje</h2>
                    </div>
                    { isDesktop && <MenuButton theme="dark"/> }
                </header>

                <div className={`sections-container ${esPropio && "propio"}`}>
                    <Detalle viaje={viaje}/>
                    <Ofertas viaje={viaje} esPropio={esPropio}/>
                    <InformacionAdicional viaje={viaje} />
                    {!esPropio && <HacerOferta viaje={viaje} />}
                </div>
            </div>
        </main>
    )
}

export default DetalleViaje