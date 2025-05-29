import MenuIcon from '@mui/icons-material/Menu'
import { useSideBar } from '../../context/SideBarContext/SideBarContext'
import { useIsMobile } from '../../hooks/useIsMobile'

const ViajesConductor = () => {
    const {toggleSideBar} = useSideBar()
    const isMobile = useIsMobile()

    return (
        <div>
        {
            isMobile && 
                <button className="toggle-btn" onClick={toggleSideBar}>
                    <MenuIcon />
                </button>
        }
        </div>
    )
}

export default ViajesConductor