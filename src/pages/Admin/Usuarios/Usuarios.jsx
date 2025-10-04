import { useEffect, useState } from 'react'
import MenuButton from '../../../components/common/SideBarButton/MenuButton'
import UserAdminCard from '../../../components/common/UserAdminCard/UserAdminCard'
import { useWindowResolution } from "../../../hooks/useWindowResolution"
import { getUsers } from '../../../api/services/adminService'

const Usuarios = () => {
    const [users, setUsers] = useState([])
    const isDesktop = useWindowResolution() < 1024

    const fetchUsers = async () => {
        const response = await getUsers()
        
        if(response.status === 200){
            setUsers(response?.data)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <main id='users' className="main expandedContainer">
            <div className="container">
                <header className="page-header">
                    <div className="page-title">
                        <h2>Gestión de Usuarios</h2>
                    </div>
                    { isDesktop && <MenuButton theme="dark"/> }
                </header>
                   
                {users?.length > 0 ? (
                    <div className="users-container" style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        marginBottom: '2rem'
                    }}>
                        {Array.isArray(users) && 
                            users.map((user, k) => <UserAdminCard key={k} user={user}/>)
                        }
                    </div>
                    ):(
                        <p className="empty" style={{textAlign: 'start', marginLeft: 0}}>No se encontraron usuarios.</p>
                    )
                }
            </div>
        </main>
    )
}

export default Usuarios