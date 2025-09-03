import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import EditButton from '../../../components/common/EditButton/EditButton'

const DatosGenerales = ({user}) => {

    return (
        <section className="data-section">
            <header className="data-header">
                <h2 className='data-title'>Datos generales</h2>
            </header>
            <div className="profile-data">
                {/* <EditButton /> */}
                <div className="user-img">
                    <AccountCircleIcon className="user-icon"/>
                </div>
                <div className="user-data-container">
                    <div className="user-data">
                        <span className="user-name">{user?.name}</span>
                        <span className="user-role">{user?.rol}</span>
                    </div>
                    <div className="user-data">
                        <span className="user-data-title">Correo electrónico</span>
                        <span className="user-email">{user?.email}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DatosGenerales