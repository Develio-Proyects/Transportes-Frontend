import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { logout, validateToken } from "../api/services/authService"
import { useAuth } from "../context/AuthContext"

const ProtectedRoutes = ({ allowedRoles = [] }) => {
    const { user, createUser } = useAuth()
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
                    // si user todavía no existe, lo creamos
                    if (!user) {
                        const storedUser = localStorage.getItem("user")
                        if (storedUser) {
                            createUser(JSON.parse(storedUser))
                        }
                    }
                    setIsTokenValid(true)
                } else {
                    logout()
                    setIsTokenValid(false)
                }
            } catch (error) {
                logout()
                setIsTokenValid(false)
            }
        }

        checkToken()
    }, []) // solo al montar

    if (isTokenValid === null) return null // o loader

    if (isTokenValid) {
        console.log(user, allowedRoles);
        if (!user) return <Navigate to="/login" />
        if (allowedRoles.length === 0 || allowedRoles.includes(user.rol)) {
            return <Outlet />
        }
        return <Navigate to="/unauthorized" />
    }

    return <Navigate to="/login" />
}

export default ProtectedRoutes