import './menuButton.scss'

const MenuButton = ({onMouseDown, isOpen, theme}) => {
    return (
        <div className="menu-icon" onMouseDown={onMouseDown} data-theme={theme}>
            <span className={isOpen ? "line line1 activeLine1" : "line line1"}></span>
            <span className={isOpen ? "line line2 activeLine2" : "line line2"}></span>
        </div>
    )
}

export default MenuButton