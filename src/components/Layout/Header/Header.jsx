import './header.scss'
import { useState } from "react"
import { Link } from "react-router-dom"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useWindowResolution } from '../../../hooks/useWindowResolution';
import MenuButton from '../../common/MenuButton/MenuButton';
import PrimaryButton from '../../common/PrimaryButton/PrimaryButton';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from '../../../context/AuthContext';

const Header = () => {
    const isMobile = useWindowResolution() < 768
    const [menuWidgetOpen, setMenuWidgetOpen] = useState(false) 
    const {user} = useAuth()

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
                        <img src="/logo.png" alt="Logo" />
                        Transporta
                    </Link>
                </div>
                <div className={menuWidgetOpen ? "nav-open nav-container": "nav-container"}>
                    {isMobile && 
                        <div className="perfil">
                            <Link to={user != null ? user?.getDashboardURL() : '/login'} onClick={closeMenu} className="perfil-link">
                                <AccountCircleIcon className="perfil-icon" /> 
                                <PrimaryButton>{user != null ? "Mi perfíl" : "Ingresar"}</PrimaryButton>
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
                                <Link to={'/ayuda'} className='nav-link'>Preguntas frecuentes</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                
                {isMobile && <MenuButton onMouseDownProp={handleWidget} isOpenProp={menuWidgetOpen} theme={"light"}/>}

                {!isMobile && 
                    <Link to={user != null ? user?.getDashboardURL() : '/login'} onClick={closeMenu} className="perfil-link">
                        <PrimaryButton>{user != null ? <PersonIcon /> : "Ingresar"}</PrimaryButton>
                    </Link>
                }
            </header>
        </div>
    )
}

export default Header