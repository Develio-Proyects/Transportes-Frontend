import './vechicleCard.scss'
import { Button } from "@mui/material"

const VehicleCard = ({vechicle}) => {
    return (
        <article className='vehicleCard'>
            <div className="vecData">
                <h3 className="vecName">{vechicle.brand}</h3>
                <span className="status vigente">Vigente</span>
                <span className="expires">{vechicle.model}</span>
            </div>
            <div className="vecActions">
                <span className="patent">{vechicle.patent}</span>
                <Button variant='contained' className='vecBtn'>Editar</Button>
            </div>
        </article>
    )
}

export default VehicleCard