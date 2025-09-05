import './tripStatusChanger.scss'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import { getNextState, getEstadoKeyFromText, getStateFromText, ESTADOS } from '../../../../api/models/estado'
import { changeTripStatus } from '../../../../api/services/viajesService'
import { Button } from '@mui/material'

const TripStatusChanger = ({id, viaje, refresh}) => {

    const changeState = async (state) => {
        try{
            let nextState = getEstadoKeyFromText(state || getNextState(viaje?.state))
            await changeTripStatus(id, nextState)
            refresh()
        }catch(error){
            alert("Error")
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