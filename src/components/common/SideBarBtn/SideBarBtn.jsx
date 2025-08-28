import './SideBarBtn.scss'
import { NavLink } from "react-router-dom"

const SideBarBtn = ({ to, label, onClick }) => {
    return (
        <NavLink 
            to={to}
            end
            onClick={onClick}
            className={({ isActive }) => 
                `sb-nav-link ${isActive ? "active" : ""}`
            }
        >
            {label}
        </NavLink>
    )
}

export default SideBarBtn