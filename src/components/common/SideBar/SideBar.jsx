import './sideBar.scss'
import EastIcon from '@mui/icons-material/East'
import WestIcon from '@mui/icons-material/West'
import HomeIcon from '@mui/icons-material/Home'
import ListIcon from '@mui/icons-material/List'
import HistoryIcon from '@mui/icons-material/History'
import GavelIcon from '@mui/icons-material/Gavel'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import FolderIcon from '@mui/icons-material/Folder'
import LogoutIcon from '@mui/icons-material/Logout'
import { Link } from 'react-router-dom'
import SideBarBtn from '../SideBarBtn/SideBarBtn'
import { useSideBar } from '../../../context/SideBarContext/SideBarContext'
import { useIsMobile } from '../../../hooks/useIsMobile'
import { useEffect, useRef } from 'react'

const SideBar = () => {
    const {isOpen, toggleSideBar, closeSidebar} = useSideBar()
    const isMobile = useIsMobile()
    const sidebarRef = useRef();

    const handleNavClick = () => {
        if (isMobile) closeSidebar()
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


    return (
        <aside ref={sidebarRef} className={"sideBar" + (isOpen ? " sb-open" : "")}>
            <div className="sb-head" style={!isOpen ? { justifyContent: 'center' } : {}}>
                {
                    isOpen && 
                    <div className="sb-logo-container">
                        {/* <img src="/logo.png" alt="Logo" /> */}
                        TT
                    </div>
                }
                {isMobile ? (
                    <button style={{fontSize: '1.2rem',color: '#fff', backgroundColor: 'transparent', border: 'none'}} 
                    onClick={closeSidebar}>x</button>
                ) : (
                    <button className="toggle-btn mix-btn" onClick={toggleSideBar}>
                        {
                            isOpen ? <WestIcon /> : <EastIcon />
                        }
                    </button>
                )}
            </div>

            <nav className="sb-nav">
                <ul className="sb-nav-list">
                    <SideBarBtn to={"/home"} icon={<HomeIcon />} label="Inicio" onClick={handleNavClick}/>
                    <SideBarBtn to={"/viajes"} icon={<ListIcon />} label="Viajes disponibles" onClick={handleNavClick}/>
                </ul>

                <span className='lineSpace'></span>

                <ul className="sb-nav-list">
                    <SideBarBtn to={"/perfil/mis-viajes"} icon={<HistoryIcon />} label="Mis viajes" onClick={handleNavClick}/>
                    <SideBarBtn to={"/perfil/postulaciones"} icon={<GavelIcon />} label="Postualciones" onClick={handleNavClick}/>
                    <SideBarBtn to={"/perfil/vehiculos"} icon={<LocalShippingIcon />} label="Mis Vehículoss" onClick={handleNavClick}/>
                    <SideBarBtn to={"/perfil/documentos"} icon={<FolderIcon />} label="Mis Documentos" onClick={handleNavClick}/>
                </ul>
                
            </nav>
            <div className='nav-tail'>
                <span className='lineSpace'></span>

                <div className="sb-logout">
                    <Link to="/logout" className="sb-logout-link">
                        <LogoutIcon />
                        { isOpen && "Cerrar sesión" }
                    </Link>
                </div>
            </div>
        </aside>
    )
}

export default SideBar