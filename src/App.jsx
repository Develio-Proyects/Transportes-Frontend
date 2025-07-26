import './styles/index.scss'
import { BrowserRouter } from "react-router-dom"
import AppRouter from "./routes/AppRouter"
import { SideBarProvider } from "./context/SideBarContext"
import { AuthProvider } from "./context/AuthContext"

function App() {
    return (
        <AuthProvider>
            <SideBarProvider>
                <BrowserRouter>
                    <AppRouter/>
                </BrowserRouter>
            </SideBarProvider>
        </AuthProvider>
    )
}

export default App