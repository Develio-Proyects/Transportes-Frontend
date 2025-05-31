import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { validateToken } from "../api/services/authService"
import { useAuth } from "../context/AuthContext"

const ProtectedRoutes = ({ allowedRoles = [] }) => {
    const { user, setUser } = useAuth()
    const [isTokenValid, setIsTokenValid] = useState(null)

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem("token")
            
            if (!token) {
                setIsTokenValid(false)
                return
            }

            try {
                const response = await validateToken(token)
                if (response.data.isValid) {
                    setIsTokenValid(true)
                    
                    if (!user) {
                        setUser({role: "fletero"}) 
                    }

                } else {
                    setIsTokenValid(false)
                    setUser(null) 
                    localStorage.removeItem("token")
                }
            } catch (error) {
                setIsTokenValid(false)
                setUser(null)
                localStorage.removeItem("token")
            }
        }
        
        checkToken()
    }, [])

    // Mientras se valida el token, podrías mostrar un loader o nada
    if (isTokenValid === null) return null

    // Si el token es válido, verifica el rol
    if (isTokenValid) {
        if (allowedRoles.length === 0) {
            // Si no hay roles especificados, permite acceso
            return <Outlet />
        }
        
        if (user && allowedRoles.includes(user.role)) {
            return <Outlet />
        }
        // Usuario logueado pero rol no permitido, redirige o muestra "no autorizado"
        return <Navigate to="/unauthorized" />
    }
    
    // Token inválido: redirige a login
    return <Navigate to="/login" />
}

export default ProtectedRoutes