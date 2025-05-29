import { BrowserRouter } from "react-router-dom"
import AppRouter from "./routes/AppRouter"
import './styles/index.scss'
import { SideBarProvider } from "./context/SideBarContext/SideBarContext"

function App() {
    return (
        <SideBarProvider>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </SideBarProvider>
    )
}

export default App
