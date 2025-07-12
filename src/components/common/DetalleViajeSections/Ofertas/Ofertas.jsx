import './ofertas.scss'
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const Ofertas = ({viaje, esPropio}) => {
    
    return (
        <section id="ofertas" className="dv-section">
            <div className="dv-s-header">
                <div className="dv-s-header-title">
                    <TrendingDownIcon className='icon'/>
                    <h2>Ofertas actuales</h2>
                </div>
            </div>
            <div className="oa-container">
                {viaje && viaje.postulantes.length > 0 ? (
                    viaje.postulantes.map((p, i) => (
                        <div className="oferta" key={i}>
                            <div className="number">{i + 1}</div>
                            <span className="user">{p.nombre}</span>
                            {esPropio && <button className="oferta-btn">Seleccionar</button>}
                        </div>
                    ))
                ) : viaje ? (
                    <span className='no-offers'>Aún no se hicieron ofertas</span>
                ) : null}
            </div>
        </section>
    )
}

export default Ofertas