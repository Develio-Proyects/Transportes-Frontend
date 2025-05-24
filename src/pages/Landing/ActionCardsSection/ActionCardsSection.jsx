import './ActionCardsSection.scss'
import { Link } from 'react-router-dom'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const ActionCardsSection = () => {
    return (
        <div className="expandedContainer">
            <section id='action-cards' className="container">
                <div className="action-card action-card-1">
                    <h2>Publicá tu carga</h2>
                    <p>Publica tus necesidades y recibí postulaciones de transportistas confiables en minutos.</p>
                    <Link to="/signup" className="action-button">
                        Publicar
                        <ArrowRightAltIcon className='arrow' />
                    </Link>
                </div>

                <div className="action-card action-card-2">
                    <h2>Encontrá Viajes Ideales</h2>
                    <p>Buscar viajes que se ajusten a tu tipo de camión y disponibilidad. Oportunidades al alcance de un clic.</p>
                    <Link to="/signup" className="action-button">
                        Buscar
                        <ArrowRightAltIcon className='arrow' />
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default ActionCardsSection