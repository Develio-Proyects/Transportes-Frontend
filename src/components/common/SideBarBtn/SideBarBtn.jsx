import './SideBarBtn.scss'
import { useSideBar } from '../../../context/SideBarContext'
import { NavLink } from "react-router-dom"

const SideBarBtn = ({ to, label, onClick }) => {
    return (
        <NavLink 
            to={to}
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