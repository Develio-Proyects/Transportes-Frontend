import './tripStatusChanger.scss'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import { getNextState, getEstadoKeyFromText, getStateFromText, ESTADOS } from '../../../../api/models/estado'
import { cancelTrip, changeTripStatus } from '../../../../api/services/viajesService'
import { Button } from '@mui/material'
import { alerta } from '../../../../utils/alerts'
import { confirmAlerta } from '../../../../utils/confirmAlert'
import { useNavigate } from 'react-router-dom'

const TripStatusChanger = ({id, viaje, refresh}) => {
    const navigate = useNavigate()
    const esSubasta = viaje?.state === "En subasta"

    const changeState = async (state) => {
        if(esSubasta){
            const isConfirmed = await confirmAlerta("Eliminar viaje", "¿Esta seguro que desea Eliminar el viaje?")
            
            if(isConfirmed){
                const response = await cancelTrip(id)
                if(response.status === 200) {
                    alerta("Estado actualizado", response.data.message, "success")
                    navigate("/viajes")
                }else {
                    alerta("Ocurrió un error", response.data.message, "error")
                }
            }
        }else{
            let nextState = getEstadoKeyFromText(state || getNextState(viaje?.state))
            const isConfirmed = await confirmAlerta("Modificar estado", `¿Deseás cambiar el estado a ${getNextState(viaje?.state)}?`)

            if(isConfirmed){
                const response = await changeTripStatus(id, nextState)
                if(response.status === 200) alerta("Estado actualizado", response.data.message, "success")
                else alerta("Ocurrió un error", response.data.message, "error")
                refresh()
            }
        }
    }
    
    const getColor = () => ESTADOS[getStateFromText(getNextState(viaje?.state))]?.color
    const isFinished = ["Finalizado", "Cancelado"].includes(viaje?.state)

    return (
        <section id="statusChanger" className="dv-section">
            <div className="dv-s-header">
                <div className="dv-s-header-title">
                    <ChangeCircleIcon className='icon'/>
                    <h2>Estado de viaje</h2>
                </div>
            </div>
            <div className="statusAction">
                {!isFinished ? (
                    <>
                        {!esSubasta &&
                            <Button variant='contained' className='state' onClick={() => changeState()} style={{backgroundColor: getColor()}}>
                                <span className='state'>{getNextState(viaje?.state)}</span>
                            </Button>
                        }
                        <Button variant='contained' sx={{fontWeight: 600}} color='error' onClick={() => changeState("Cancelado")}>
                            {esSubasta ? "Eliminar" : "Cancelar"}
                        </Button>
                    </>
                ) : (
                    <p className='final-msg'>
                        El viaje fue <span>{viaje?.state}</span>
                    </p>
                )
                }
            </div>
        </section>
    )
}

export default TripStatusChanger