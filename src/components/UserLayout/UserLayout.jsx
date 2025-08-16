import { Outlet } from "react-router-dom"
import SideBar from "../common/SideBar/SideBar"
import { ModalContainer } from "../common/Modals/ModalContainer"

const UserLayout = () => {
    return (
        <div style={{ 
            display: "flex", 
            height: "100dvh", 
            overflow: "hidden" 
        }}>
            <SideBar />
            <div style={{ flexGrow: 1 }}>
                <Outlet />
            </div>
            <ModalContainer />
        </div>
    )
}

export default UserLayout