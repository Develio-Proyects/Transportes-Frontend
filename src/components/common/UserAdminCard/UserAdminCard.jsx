import './userAdminCard.scss'
import MailOutlineIcon from '@mui/icons-material/MailOutline'

const UserAdminCard = ({user}) => {
    return (
        <article className="user-card">
            <div className="user-info">
                <span className="user-name">{user.name}</span>
                <div className="user-email-container">
                    <MailOutlineIcon />
                    <span className="user-email">{user.email}</span>
                </div>
                <span className="user-rol">{user.role}</span>
            </div>
        </article>
    )
}

export default UserAdminCard