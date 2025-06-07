import './viajeCard.scss'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PaidIcon from '@mui/icons-material/Paid'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import { Link } from 'react-router-dom'

const ViajeCard = ({ viaje }) => {
    
    const getTime = () =>{
        return viaje.publised < 24 ? `${viaje.publised}hs` : `${Math.floor(viaje.publised / 24)}d`;
    }

    return (
        <article className='viaje-card'>
            <div className="published">
                Publicado hace <span className='item-text'>{getTime()}</span>
            </div>
            <div className="from-to">
                <div className="viaje-card-item">
                    <LocationOnIcon className='item-icon text-d' />
                    <span className='item-text'>{viaje.origin}</span>
                </div>
                <span className='dashed-line'></span>
                <div className="viaje-card-item">
                    <LocationOnIcon className='item-icon text-d' />
                    <span className='item-text text-d'>{viaje.destination}</span>
                </div>
            </div>
            <div className="viaje-card-item">
                <CalendarMonthIcon className='item-icon text-d' />
                <span className='item-text text-d'>{viaje.datetime}</span>
            </div>
            <div className="viaje-card-item">
                <PaidIcon className='item-icon text-d' />
                <span className='item-text text-d'>${viaje.price}</span>
            </div>
            <div className="viaje-bottom">
                <div className="applicants">
                    <PeopleAltIcon className='item-icon' />
                    <span className='item-text'>{viaje.applicants} postulantes</span>
                </div>
                <Link to={`/viaje/${viaje.id}`} className='viaje-card-btn'>Ver subasta</Link>
            </div>
        </article>
    )
}

export default ViajeCard