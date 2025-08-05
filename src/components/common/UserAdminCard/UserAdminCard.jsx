import './userAdminCard.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const UserAdminCard = () => {
    return (
        <article className="user-card">
            <div className="user-img">
                {/* <img src="" alt="" /> */}
                <AccountCircleIcon className='user-icon'/>
            </div>
            <div className="user-info">
                <span className="user-name">Martin</span>
                <div className="user-email-container">
                    <MailOutlineIcon />
                    <span className="user-email">martin.benedetto@gmail.com</span>
                </div>
                <span className="user-rol">Transportista</span>
                <div className="user-state-container">
                    <FiberManualRecordIcon className='state-icon'/>
                    <span className='user-state'>Activo</span>
                </div>
            </div>
        </article>
    )
}

export default UserAdminCard