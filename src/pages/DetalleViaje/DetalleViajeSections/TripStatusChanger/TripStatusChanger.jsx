import './tripStatusChanger.scss'
import PrimaryButton from '../../../../components/common/PrimaryButton/PrimaryButton'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import { getNextState } from '../../../../api/models/estado'

const TripStatusChanger = ({viaje}) => {

    return (
        <section id="statusChanger" className="dv-section">
            <div className="dv-s-header">
                <div className="dv-s-header-title">
                    <ChangeCircleIcon className='icon'/>
                    <h2>Estado de viaje</h2>
                </div>
            </div>
            <div className="statusAction">
                <PrimaryButton>
                    Cambiar estado a: <span className='state'>{getNextState(viaje?.state)}</span>
                </PrimaryButton>
            </div>
        </section>
    )
}

export default TripStatusChanger