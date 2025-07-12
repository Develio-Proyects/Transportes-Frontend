import { useSideBar } from '../../../context/SideBarContext'
import './menuButton.scss'

const MenuButton = ({onMouseDownProp, isOpenProp, theme}) => {
    const {toggleSideBar, isOpen} = useSideBar()
    
    const handleToggle = (e) => {
        e.stopPropagation()     
        toggleSideBar()
    }

    const toggleFunction = onMouseDownProp != null ? onMouseDownProp : handleToggle
    const isOpenState = isOpenProp != null ? isOpenProp : isOpen

    return (
        <div className="menu-icon" onMouseDown={toggleFunction} data-theme={theme}>
            <span className={isOpenState ? "line line1 activeLine1" : "line line1"}></span>
            <span className={isOpenState ? "line line2 activeLine2" : "line line2"}></span>
        </div>
    )
}

export default MenuButton