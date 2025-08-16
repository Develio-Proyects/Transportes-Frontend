import './styles/index.scss'
import { BrowserRouter } from "react-router-dom"
import AppRouter from "./routes/AppRouter"
import { SideBarProvider } from "./context/SideBarContext"
import { AuthProvider } from "./context/AuthContext"
import { ModalProvider } from './context/ModalContext'

function App() {
    return (
        <ModalProvider>
            <AuthProvider>
                <SideBarProvider>
                    <BrowserRouter>
                        <AppRouter/>
                    </BrowserRouter>
                </SideBarProvider>
            </AuthProvider>
        </ModalProvider>
    )
}

export default App