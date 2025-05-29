import { Outlet } from "react-router-dom"
import SideBar from "../common/SideBar/SideBar"

const UserLayout = () => {
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <SideBar />
            <div style={{ flexGrow: 1, padding: "1rem" }}>
                <Outlet />
            </div>
        </div>
    )
}

export default UserLayout