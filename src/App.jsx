import './styles/index.scss'
import { BrowserRouter } from "react-router-dom"
import AppRouter from "./routes/AppRouter"
import { SideBarProvider } from "./context/SideBarContext"
import { AuthProvider } from "./context/AuthContext"
import GenericModal from './components/common/Modals/GenericModal/GenericModal'

function App() {
    return (
        <AuthProvider>
            <SideBarProvider>
                <BrowserRouter>
                    <AppRouter/>
                    <GenericModal />
                </BrowserRouter>
            </SideBarProvider>
        </AuthProvider>
    )
}

export default App