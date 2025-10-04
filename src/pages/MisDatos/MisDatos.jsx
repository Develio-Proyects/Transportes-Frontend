import './misDatos.scss'
import MenuButton from '../../components/common/MenuButton/MenuButton'
import { useAuth } from '../../context/AuthContext'
import { useWindowResolution } from '../../hooks/useWindowResolution'
import DatosGenerales from './DatosSections/DatosGenerales'
import Documentos from './DatosSections/Documentos'
import Vehiculos from './DatosSections/Vehiculos'
import Employees from './DatosSections/Employees'
import { ROLES } from '../../api/models/roles'
import { useEffect, useState } from 'react'
import { getEmployees } from '../../api/services/employeeService'

const MisDatos = () => {
    const {user} = useAuth()
    const isDesktop = useWindowResolution() < 1024
    const [employees, setEmployees] = useState(null)

    const getInfo = async () => {
        const response = await getEmployees()
        if (response.status === 200) {
            setEmployees(response.data)
        }
    }

    useEffect(() => {
        if(user.rol === ROLES.FLOTA){
            getInfo()
        }
    }, [])

    return (
        <main id='mis-datos' className="main expandedContainer">
            <div className="container">
                <header className="page-header">
                    <div className="page-title">
                        <h2>Mis datos</h2>
                    </div>
                    { isDesktop && <MenuButton theme="dark"/> }
                </header>
                <DatosGenerales user={user}/>
                <Documentos user={user} employees={employees}/>
                <Vehiculos />
                { user?.rol === ROLES.FLOTA && <Employees employees={employees} refresh={()=>getInfo()}/> }
            </div>
        </main>
    )
}

export default MisDatos