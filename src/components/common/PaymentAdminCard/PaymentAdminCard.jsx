import './paymentAdminCard.scss'

const PaymentAdminCard = ({n, payment}) => {
    return (
        <article className="payment-card">
            <div className="payment-info">
                <div className="payment-section">
                    <span className="title paymentId">Pago #{n+1}</span>
                    <span className="text paymentMount">${payment.mount}</span>
                </div>
                <div className="payment-section">
                    <span className="title">Publicador</span>
                    <span className="text">{payment.publisher}</span>
                </div>
                <div className="payment-section">
                    <span className="title">Transportista</span>
                    <span className="text">{payment.transport}</span>
                </div>
                <div className="payment-section">
                    <span className="title">Origen</span>
                    <span className="text">{payment.origin}</span>
                </div>
                <div className="payment-section">
                    <span className="title">Destino</span>
                    <span className="text">{payment.destination}</span>
                </div>
            </div>
        </article>
    )
}

export default PaymentAdminCard