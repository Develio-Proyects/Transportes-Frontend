import './header.scss'
import { useState } from "react"
import { Link } from "react-router-dom"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useWindowResolution } from '../../../hooks/useWindowResolution';
import MenuButton from '../../common/SideBarButton/MenuButton';

const Header = () => {
    const isMobile = useWindowResolution() < 768
    const [menuWidgetOpen, setMenuWidgetOpen] = useState(false) 

    const handleWidget = () => { 
        setMenuWidgetOpen(!menuWidgetOpen)
    }

    const closeMenu = () => {
        setMenuWidgetOpen(false)
    }

    return (
        <div className='header-container'>
            <header>
                <div className="logo-container">
                    <Link to={'/'} onClick={closeMenu}>
                        {/* <img src={} alt="logo" className='logo-img'/> */}
                        TRANSPORTA
                    </Link>
                </div>
                <div className={menuWidgetOpen ? "nav-open nav-container": "nav-container"}>
                    {isMobile && 
                        <div className="perfil">
                            <Link to={'/login'} onClick={closeMenu} className="perfil-link">
                                <AccountCircleIcon className="perfil-icon" /> 
                                <button className="perfil-btn">Ingresar</button>
                            </Link>
                        </div>
                    }
                    <nav>
                        <ul>
                            <li className="nav-item" onClick={closeMenu}>
                                <Link to={'/'} className='nav-link'>Inicio</Link>
                            </li>
                            <li className="nav-item" onClick={closeMenu}>
                                <Link to={'/viajes'} className='nav-link'>Buscar viajes</Link>
                            </li>
                            <li className="nav-item" onClick={closeMenu}>
                                <Link to={'/login'} className='nav-link'>Publicar carga</Link>
                            </li>
                            <li className="nav-item" onClick={closeMenu}>
                                <Link to={'/'} className='nav-link'>Preguntas frecuentes</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                
                {isMobile && <MenuButton onMouseDownProp={handleWidget} isOpenProp={menuWidgetOpen} theme={"light"}/>}

                {!isMobile && 
                    <Link to={'/login'} onClick={closeMenu} className="perfil-link">
                        <button className="perfil-btn">Ingresar</button>
                    </Link>
                }
            </header>
        </div>
    )
}

export default Header