import './modalPayment.scss'
import { Button, CircularProgress  } from '@mui/material'
import PrimaryButton from '../../PrimaryButton/PrimaryButton'
import { useEffect, useState } from 'react'
import { getOfferQuote } from '../../../../api/services/viajesService'
import { payTrip } from '../../../../api/services/paymentService'
import { useModal } from '../../../../context/ModalContext'

const ModalPayment = ({idOffer}) => {
    const {closeModal} = useModal()
    const [price, setPrice] = useState(null)
    const [loading, setLoading] = useState(false)
    
    const handlePay = async () => {
        try {
            setLoading(true)
            const response = await payTrip(idOffer)
            if(response.status === 200){
                window.open(response.data.init_point, "_blank")
            }
        } catch (err) {
            console.error("Error en el pago:", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getOfferQuote(idOffer)
                if (response.status === 200) {
                    setPrice(response.data.tarifa)
                }
            } catch (err) {
                console.error("Error obteniendo la oferta:", err)
            }
        }

        if (idOffer) fetchData()
    }, [idOffer])

    return (
        <div className="modalPayment">
            <header className="modal-header">
                <h2 className="modal-title">Procesar Pago</h2>
                <p className="modal-text">Para confirmar al fletero y acceder al chat, se requiere el pago del servicio.</p>
            </header>
            <section className="modal-content">
                <h3 className="modal-content-title">Monto a pagar:</h3>
                <span className='monto'>{price !== null ? `$${price}` : "Cargando..."}</span>
                <span className="modal-text">Tarifa de servicio por conexión con el transportista</span>
            </section>
            <div className="modal-controls">
                <Button variant='contained' className='cancelBtn' onClick={closeModal}>Cancelar</Button>
                <PrimaryButton onClick={()=> handlePay()}>
                    {loading ? <CircularProgress size={20} color="inherit" /> : "Pagar ahora"}
                </PrimaryButton>
            </div>
        </div>
    )
}

export default ModalPayment