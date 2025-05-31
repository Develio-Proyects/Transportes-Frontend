import './SideBarBtn.scss'
import { useSideBar } from '../../../context/SideBarContext'
import { NavLink } from "react-router-dom"

const SideBarBtn = ({ to, icon, label, onClick }) => {
    const { isOpen } = useSideBar()
    return (
        <NavLink 
            to={to}
            onClick={onClick}
            className={({ isActive }) => 
                `sb-nav-link ${isActive ? "active" : ""} ${!isOpen ? "sb-nav-link-open" : ""}`
            }
        >
            {icon}
            {isOpen && label}
        </NavLink>
    )
}

export default SideBarBtn