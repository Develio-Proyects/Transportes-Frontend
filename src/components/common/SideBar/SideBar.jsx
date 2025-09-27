import './sideBar.scss'
import SideBarBtn from '../SideBarBtn/SideBarBtn'
import { useSideBar } from '../../../context/SideBarContext'
import { useWindowResolution } from '../../../hooks/useWindowResolution'
import { useEffect, useRef, useState } from 'react'
import { logout } from '../../../api/services/authService'
import { useAuth } from '../../../context/AuthContext'
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom'
import { useModal } from '../../../context/ModalContext'

const SideBar = () => {
    const { user } = useAuth()
    const {openModal} = useModal()
    const userRoutes = user?.getRoutes() || [];
    const {isOpen, closeSidebar} = useSideBar()
    const isMobile = useWindowResolution() < 1024
    const [userOptions, setUserOptions] = useState(false)
    const sidebarRef = useRef()
    const userRef = useRef()
    const token = localStorage.getItem("token")
    const isAuthenticated = !!user && !!token
    
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

    useEffect(() => {
        const handleClickOutsideUser = (event) => {
            if (userOptions && userRef.current && !userRef.current.contains(event.target)) {
                setUserOptions(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutsideUser)
        return () => document.removeEventListener('mousedown', handleClickOutsideUser)
    }, [userOptions])
    
    return (
        <aside ref={sidebarRef} className={"sideBar" + (isOpen ? " sb-open" : "")}>
            <div className="sb-head">
                <div className="sb-logo-container">
                    <Link to="/">
                        <img src="/logo.png" alt="Logo" />
                        Transporta
                    </Link>
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
               {isAuthenticated && (
                <>
                    <ul className="sb-nav-list">
                    {userRoutes.map(({ path, label }, id) => (
                        <SideBarBtn key={id} to={path} label={label} onClick={handleNavClick} />
                    ))}
                    </ul>
                </>
                )}
                </ul>

                { isAuthenticated && <span className='lineSpace'></span> }

                <SideBarBtn to={"/ayuda"} label="Ayuda" onClick={handleNavClick}/>
                
            </nav>
            <div ref={userRef} className='user-control' onClick={handleUserOptions}>
                {
                    userOptions && 
                    <div className="user-options">
                        <span className='option' onClick={()=> openModal("modalPassword")}>Cambiar contraseña</span>
                        <span className='option' onClick={logout}>Cerrar sesión</span>
                    </div>
                }
                <div className="user-container">
                    <div className="user-icon">
                        <PersonIcon />
                    </div>
                    <div className="user-info" >
                        {
                            isAuthenticated ? (
                                <>
                                <span className='user-name'>{user?.name}</span>
                                <span className='user-rol'>{user?.rol}</span>
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