import './tripStatusChanger.scss'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import { getNextState, getEstadoKeyFromText, getStateFromText, ESTADOS } from '../../../../api/models/estado'
import { changeTripStatus } from '../../../../api/services/viajesService'
import { Button } from '@mui/material'
import { alerta } from '../../../../utils/alerts'

const TripStatusChanger = ({id, viaje, refresh}) => {

    const changeState = async (state) => {
        let nextState = getEstadoKeyFromText(state || getNextState(viaje?.state))
        const response = await changeTripStatus(id, nextState)
        if(response.status === 200) alerta("Estado actualizado", response.data.message, "success")
        else alerta("Ocurrió un error", response.data.message, "error")
        refresh()
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
                        <Button variant='contained' className='state' onClick={() => changeState()} style={{backgroundColor: getColor()}}>
                            <span className='state'>{getNextState(viaje?.state)}</span>
                        </Button>
                        <Button variant='contained' sx={{fontWeight: 600}} color='error' onClick={() => changeState("Cancelado")}>Cancelar</Button>
                    </>
                ) : (
                    <p style={{fontWeight: 500, marginLeft: '2rem'}}>El viaje fue <span style={{textTransform: 'uppercase', fontWeight: 500}}>{viaje?.state}</span></p>
                )
                }
            </div>
        </section>
    )
}

export default TripStatusChanger