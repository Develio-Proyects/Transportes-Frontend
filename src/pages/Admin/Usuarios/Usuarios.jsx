import MenuButton from '../../../components/common/SideBarButton/MenuButton'
import UserAdminCard from '../../../components/common/UserAdminCard/UserAdminCard'
import { useWindowResolution } from "../../../hooks/useWindowResolution"

const Usuarios = () => {
    const isDesktop = useWindowResolution() < 1024

    return (
        <main id='mis-datos' className="main expandedContainer">
            <div className="container">
                <header className="page-header">
                    <div className="page-title">
                        <h2>Gestión de Usuarios</h2>
                    </div>
                    { isDesktop && <MenuButton theme="dark"/> }
                </header>
                <div className="users-container" style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <UserAdminCard />
                    <UserAdminCard />
                    <UserAdminCard />
                    <UserAdminCard />
                    <UserAdminCard />
                    <UserAdminCard />
                    <UserAdminCard />
                    <UserAdminCard />
                    <UserAdminCard />
                    <UserAdminCard />
                    <UserAdminCard />
                </div>
            </div>
        </main>
    )
}

export default Usuarios