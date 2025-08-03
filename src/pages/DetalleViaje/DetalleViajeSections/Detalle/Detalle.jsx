import './detalle.scss'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Detalle = ({viaje}) => {
    
    const formatearFecha = fecha => {
        const d = new Date(fecha);
        const [dia, mes, año] = d.toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' }).split(' de ');
        return `${dia} de ${mes[0].toUpperCase() + mes.slice(1)}, ${año} - ${d.toTimeString().slice(0,5)}hs`;
    }

    return (
        <section id='detalle' className="dv-section">
            <div className="dv-s-header">
                <div className="dv-s-header-title">
                    <LocationOnIcon className='icon'/>
                    <h2>Detalle viaje</h2>
                </div>
                <div className="dv-header-time">
                    <AccessTimeIcon />
                    <span>1d 12hs 44m </span>
                </div>
            </div>
            <div className="dv-date">
                <CalendarMonthIcon />
                {viaje && <span>{formatearFecha(viaje.departureDate)}</span>}
            </div>
            <div className="dv-route-container">
                <h3 className='subtitle'>Ruta</h3>
                <div className="dv-route">
                    <span>Origen: {viaje?.origin}</span>
                    <span>Origen: {viaje?.destination}</span>
                </div>
            </div>
            <div className="dv-rates">
                <div className="original-rate rate">
                    <h3 className='subtitle'>Tarifa original:</h3> 
                    <span>${viaje?.initialPrice}</span>
                </div>
                <div className="actual-rate rate">
                    <h3 className='subtitle'>Oferta más baja:</h3> 
                    <span>${viaje?.lowerOffer}</span>
                </div>
            </div>
        </section>
    )
}

export default Detalle