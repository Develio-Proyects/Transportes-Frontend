import { BrowserRouter } from "react-router-dom"
import AppRouter from "./routes/AppRouter"
import './styles/index.scss'

function App() {
    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    )
}

export default App
