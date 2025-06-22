import { Outlet } from "react-router-dom"
import SideBar from "../common/SideBar/SideBar"

const UserLayout = () => {
    return (
        <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
            <SideBar />
            <div style={{ flexGrow: 1 }}>
                <Outlet />
            </div>
        </div>
    )
}

export default UserLayout