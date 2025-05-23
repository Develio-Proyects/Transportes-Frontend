import { Link } from 'react-router-dom'
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import './footer.scss'

const Footer = () => {
  return (
    <div className='footer-container'>
        <footer>
            <div className="footer-logo">
                {/* <img src={} alt="logo" className='logo-img'/> */}
                Tu Transporte
            </div>
            <div className="footer-links">
                <ul>
                    <li className="footer-item">
                        <Link to={'/'} className='footer-link'>Inicio</Link>
                    </li>
                    <li className="footer-item">
                        <Link to={'/viajes'} className='footer-link'>Buscar viajes</Link>
                    </li>
                    <li className="footer-item">
                        <Link to={'/login'} className='footer-link'>Publicar carga</Link>
                    </li>
                    <li className="footer-item">
                        <Link to={'/'} className='footer-link'>Pregutnas frecuentes</Link>
                    </li>
                </ul>
            </div>
            <div className="footer-media">
                <ul>
                    <li className="media-item">
                        <a href="https://www.facebook.com/" target="_blank" className='media-link'>
                            <InstagramIcon className='media-icon'/>
                        </a>
                    </li>
                    <li className="media-item">
                        <a href="https://www.instagram.com/" target="_blank" className='media-link'>
                            <MailOutlineIcon className='media-icon'/>
                        </a>
                    </li>
                </ul>
            </div>
            <span className="develio">Desarrollado por&nbsp;<a href='https://develio.dev' target='_blank'>Develio</a></span>
        </footer>
    </div>
  )
}

export default Footer