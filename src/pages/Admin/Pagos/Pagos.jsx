import { useEffect, useState } from 'react'
import MenuButton from '../../../components/common/SideBarButton/MenuButton'
import { useWindowResolution } from "../../../hooks/useWindowResolution"
import { getPayments } from '../../../api/services/adminService'
import PaymentAdminCard from '../../../components/common/PaymentAdminCard/PaymentAdminCard'

const Pagos = () => {
    const [payments, setPayments] = useState([])
    const isDesktop = useWindowResolution() < 1024

    const fetchUsers = async () => {
        const response = await getPayments()
        
        if(response.status === 200){
            setPayments(response.data)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <main id='payments' className="main expandedContainer">
            <div className="container">
                <header className="page-header">
                    <div className="page-title">
                        <h2>Gestión de Pagos</h2>
                    </div>
                    { isDesktop && <MenuButton theme="dark"/> }
                </header>
                {payments.length > 0 ? (
                    <div className="users-container" style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '1rem'
                    }}>
                        {Array.isArray(payments) && 
                            payments.map((payment, k) => <PaymentAdminCard key={k} payment={payment}/>)
                        }
                    </div>
                    ):(
                        <p className="empty" style={{textAlign: 'start', marginLeft: 0}}>No se encontraron pagos.</p>
                    )
                }
            </div>
        </main>
    )
}

export default Pagos