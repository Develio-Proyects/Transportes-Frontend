import './sideBar.scss'
import SideBarBtn from '../SideBarBtn/SideBarBtn'
import { useSideBar } from '../../../context/SideBarContext'
import { useIsMobile } from '../../../hooks/useIsMobile'
import { useEffect, useRef, useState } from 'react'
import { logout } from '../../../api/services/authService'
import { useAuth } from '../../../context/AuthContext'
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom'

const SideBar = () => {
    const { user } = useAuth()
    const userRoutes = user?.getRoutes() || [];
    const {isOpen, closeSidebar} = useSideBar()
    const isMobile = useIsMobile()
    const [userOptions, setUserOptions] = useState(false)
    const sidebarRef = useRef();

    const handleNavClick = () => {
        if (isMobile) closeSidebar()
    }

    const handleUserOptions = () => {
        setUserOptions(!userOptions)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobile && isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                closeSidebar()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isMobile, isOpen, closeSidebar])
    
    console.log(user);
    

    return (
        <aside ref={sidebarRef} className={"sideBar" + (isOpen ? " sb-open" : "")}>
            <div className="sb-head" style={!isOpen ? { justifyContent: 'center' } : {}}>
                <div className="sb-logo-container">
                    {/* <img src="/logo.png" alt="Logo" /> */}
                    TT
                </div>
                {isMobile && 
                    <button style={{fontSize: '1.2rem',color: '#fff', backgroundColor: 'transparent', border: 'none'}} 
                    onClick={closeSidebar}>x</button>
                }
            </div>

            <nav className="sb-nav">
                <ul className="sb-nav-list">
                    <SideBarBtn to={"/home"} label="Inicio" onClick={handleNavClick}/>
                    <SideBarBtn to={"/viajes"} label="Viajes disponibles" onClick={handleNavClick}/>
                </ul>

                <span className='lineSpace'></span>

                <ul className="sb-nav-list">
                {
                    userRoutes.map( ({path, label}, id) => {
                        return <SideBarBtn key={id} to={path} label={label} onClick={handleNavClick}/>
                    })
                }
                </ul>

                {
                    user && <span className='lineSpace'></span>
                }

                <SideBarBtn to={"/ayuda"} label="Ayuda" onClick={handleNavClick}/>
                
            </nav>
            <div className='user-control' onClick={handleUserOptions}>
                {
                    userOptions && 
                    <div className="user-options">
                        <span className='option'>Cambiar contraseña</span>
                        <span className='option' onClick={logout}>Cerrar sesión</span>
                    </div>
                }
                <div className="user-container">
                    <div className="user-icon">
                        <PersonIcon />
                    </div>
                    <div className="user-info" >
                        {
                            user ? (
                                <>
                                <span className='user-name'>{user.nombre}Herrera e hijos</span>
                                <span className='user-rol'>{user.rol}</span>
                                </>
                            ) : (
                                <Link to="/login" className='user-name'>Ingresar</Link>
                            )
                        }    
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default SideBar