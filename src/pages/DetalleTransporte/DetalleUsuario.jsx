import './detalleTransporte.scss'
import MenuButton from '../../components/common/MenuButton/MenuButton'
import { useWindowResolution } from '../../hooks/useWindowResolution'
import { useParams } from 'react-router-dom'

const DetalleTransporte = () => {
    const { id } = useParams()
    const isDesktop = useWindowResolution() < 1024
    
    
    return (
        <main id='detalle-usuario' className="main expandedContainer">
            <div className="container">
                <header className="page-header">
                    <div className="page-title">
                        <h2>Detalle transporte</h2>
                    </div>
                    { isDesktop && <MenuButton theme="dark"/> }
                </header>
                
            </div>
        </main>
    )
}

export default DetalleTransporte