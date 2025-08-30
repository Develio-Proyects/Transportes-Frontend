import { useNavigate } from "react-router-dom"
import { User } from "../api/models/User"
import { login } from "../api/services/authService"
import { useAuth } from "../context/AuthContext"

export const useLoginProcess = () => {
    const { setUser } = useAuth()
    const navigate = useNavigate()

    const loginProcess = async (credencial) => {
        try {
            const response = await login(credencial)
            if (response.status === 200) {
                createUser({
                    id: response.data.userId,
                    rol: response.data.role,
                    name: response.data.name,
                    email: response.data.email,
                })

                switch (response.data.role) {
                    case 'ADMINISTRADOR':
                        navigate('/admin/usuarios')
                        break
                    case 'FLOTA':
                    case 'UNIPERSONAL':
                        navigate('/perfil/mis-viajes')
                        break
                }
            }
            return response
        } catch (e) {
            return console.error(e)
        }
    }

    const createUser = (data) => {
        const newUser = new User(data)
        setUser(newUser)
        localStorage.setItem("user", JSON.stringify(data))
    }

    return { loginProcess, createUser }
}