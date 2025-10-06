import './ofertas.scss'
import { useModal } from '../../../../context/ModalContext';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const Ofertas = ({viaje}) => {
    const {openModal} = useModal()
    const esPropio = viaje?.myPost
    
    return (
        <section id="ofertas" className="dv-section">
            <div className="dv-s-header">
                <div className="dv-s-header-title">
                    <TrendingDownIcon className='icon'/>
                    <h2>Ofertas actuales</h2>
                </div>
            </div>
            <div className="oa-container">
                {viaje && viaje.offers.length > 0 ? (
                    viaje.offers.map((p, i) => (
                        <div className={esPropio ? "oferta own" : "oferta"} key={i}>
                            <div className="number">{i + 1}</div>
                            <span className="user">{p.name}</span>
                            {esPropio && <button className="oferta-btn" onClick={()=> openModal("modalPayment", {idOffer: p.id})}>Seleccionar</button>}
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