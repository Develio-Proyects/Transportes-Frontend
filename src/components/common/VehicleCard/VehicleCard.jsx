import { useModal } from '../../../context/ModalContext'
import './vechicleCard.scss'
import { Button } from "@mui/material"

const VehicleCard = ({vehicle}) => {
    const {openModal} = useModal()
    
    return (
        <article className='vehicleCard'>
            <div className="vecData">
                <h3 className="vecName">{vehicle.brand}</h3>
                <span className="status vigente">Vigente</span>
                <span className="expires">{vehicle.model}</span>
            </div>
            <div className="vecActions">
                <span className="patent">{vehicle.patent}</span>
                <Button 
                    variant='contained' 
                    className='vecBtn'
                    onClick={()=> openModal("modalTruck", {id: vehicle.id ,vehicles: [vehicle]})}
                >
                    Editar
                </Button>
            </div>
        </article>
    )
}

export default VehicleCard