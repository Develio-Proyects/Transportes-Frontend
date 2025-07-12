import './viajeCard.scss'
import CircleIcon from '@mui/icons-material/Circle';
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import { Link } from 'react-router-dom'

const ViajeCard = ({ viaje }) => {

    const formatedDate = (fechaStr) => {
        const fecha = new Date(fechaStr.replace('hs', '').trim().replace(' ', 'T'));
        if (isNaN(fecha)) return 'Fecha inválida';

        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = fecha.toLocaleString('es-AR', { month: 'short' });
        const año = fecha.getFullYear();

        return `${dia} ${mes.charAt(0).toUpperCase() + mes.slice(1)} ${año}`;
    }

    const fontSize = (title) => {
        return title.length  > 29 ? "clamp(14px, 4vw, 16px)" : "clamp(18px, 5vw, 22px)"
    }
    
    return (
        <article className="viaje-card">
            <header className="viaje-card-header">
                <span className="viaje-published">{viaje.publicadoHace}</span>
                {viaje.miPublicacion && <span className="mine">Mi publicación</span>}
            </header>

            <span className="viaje-divider"></span>

            <main className="viaje-info">
                <section className="viaje-locations">
                    <div className="viaje-location">
                        <CircleIcon className="viaje-icon circle" />
                        <span className="viaje-location-text" 
                            style={{fontSize: fontSize(viaje.origen)}}>{viaje.origen}</span>
                    </div>
                    {/* <span className="viaje-dashed-line" /> */}
                    <div className="viaje-location">
                        <LocationOnIcon className="viaje-icon" />
                        <span className="viaje-location-text" 
                            style={{fontSize: fontSize(viaje.destino)}}>{viaje.destino}</span>
                    </div>
                </section>

                <section className="viaje-details">
                    <div className="viaje-datetime">
                        <CalendarMonthIcon className="viaje-icon" />
                        <span className='datetime'>{formatedDate(viaje.fechaSalida)}</span>
                    </div>
                    <div className="viaje-price">
                        ${viaje.precioBase}
                    </div>
                </section>

                <div className="viaje-states">
                    <div className="state">Carga peligrosa</div>
                </div>
            </main>

            <footer className="viaje-footer">
                <div className="viaje-postulantes">
                    <PeopleAltIcon className="viaje-icon" />
                    <span>{viaje.cantidadPostulaciones} {viaje.cantidadPostulaciones > 1 ? "postulantes" : "postulante"}</span>
                </div>
                <Link to={`/viajes/${viaje.id}`} state={{ esPropio: viaje.miPublicacion }} className="viaje-btn">Ver detalle</Link>
            </footer>
        </article>
    )
}

export default ViajeCard