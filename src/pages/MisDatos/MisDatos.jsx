import './misDatos.scss'
import MenuButton from '../../components/common/SideBarButton/MenuButton'
import { useAuth } from '../../context/AuthContext'
import { useWindowResolution } from '../../hooks/useWindowResolution'
import DatosGenerales from './DatosSections/DatosGenerales'
import Documentos from './DatosSections/Documentos'
import Vehiculos from './DatosSections/Vehiculos'

const MisDatos = () => {
    const {user} = useAuth()
    const isDesktop = useWindowResolution() < 1024

    return (
        <main id='mis-datos' className="main expandedContainer">
            <div className="container">
                <header className="page-header">
                    <div className="page-title">
                        <h2>Mis Datos</h2>
                    </div>
                    { isDesktop && <MenuButton theme="dark"/> }
                </header>
                <DatosGenerales user={user}/>
                <Documentos user={user}/>
                <Vehiculos />
            </div>
        </main>
    )
}

export default MisDatos