import './paymentModal.scss'
import { Button } from '@mui/material'
import PrimaryButton from '../../PrimaryButton/PrimaryButton'
import { useEffect, useState } from 'react'
import { getOfferQuote } from '../../../../api/services/viajesService'
import { payTrip } from '../../../../api/services/paymentService'

const PaymentModal = ({idOffer}) => {
    const [price, setPrice] = useState(null)
    
    const handlePay = async () => {
        const response = await payTrip(idOffer)
        if(response.status === 200){
            window.open(response.data.init_point, "_blank")
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
        <div className="paymentModal">
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
                <Button variant='contained' className='cancelBtn'>Cancelar</Button>
                <PrimaryButton onClick={()=> handlePay()}>
                    Pagar ahora
                </PrimaryButton>
            </div>
        </div>
    )
}

export default PaymentModal