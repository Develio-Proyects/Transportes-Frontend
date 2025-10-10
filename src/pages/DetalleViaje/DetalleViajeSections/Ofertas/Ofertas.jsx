import './ofertas.scss'
import { useModal } from '../../../../context/ModalContext';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { useAuth } from '../../../../context/AuthContext';
import { deleteOffer } from '../../../../api/services/offerService';
import { alerta } from '../../../../utils/alerts';

const Ofertas = ({viaje, refresh}) => {
    const {openModal} = useModal()
    const esPropio = viaje?.myPost
    const {user} = useAuth()
    const offered = viaje?.myPost || viaje?.offers?.some(off => off.userId === user?.id)
    const userIdInOffer = viaje?.offers?.find(off => off.userId === user?.id)?.userId
     
    const deleteOfferBtn = async (idOffer) => {
        const response = await deleteOffer(idOffer)
        
        if(response.status === 200){
            alerta("Acción realizada", "La oferta se eliminó correctamente.", "success")
            refresh()
        }else{
            alerta("Ocurrió un error", response.data.message, "error")
        }
    }

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
                        <div className={offered ? "oferta own" : "oferta"} key={i}>
                            <div className="number">{i + 1}</div>
                            <span className="user">{p.name}</span>
                            {esPropio && <button className="oferta-btn" onClick={()=> openModal("modalPayment", {idOffer: p.id})}>Seleccionar</button>}
                            {userIdInOffer == p.userId && <button className="oferta-btn" onClick={()=>deleteOfferBtn(p.id)}>Eliminar</button>}
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