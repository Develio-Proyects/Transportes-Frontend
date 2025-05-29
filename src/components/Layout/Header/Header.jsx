import { useState } from "react"
import { Link } from "react-router-dom"
import './header.scss'
import { useIsMobile } from "../../../hooks/useIsMobile";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
    const isMobile = useIsMobile();
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
                        Tu Transporte
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
                {isMobile && 
                    <div className="menu-icon" onClick={handleWidget}>
                        <span className={menuWidgetOpen ? "line line1 activeLine1" : "line line1"}></span>
                        <span className={menuWidgetOpen ? "line line2 activeLine2" : "line line2"}></span>
                    </div>
                }
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