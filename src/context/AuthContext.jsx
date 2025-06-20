import { createContext, useContext, useState, useEffect } from "react"
import { User } from "../api/models/User"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser)
            setUser(new User(parsedUser))
        }
    }, [])

    const createUser = (data) => {
        const newUser = new User(data)
        setUser(newUser)
        localStorage.setItem("user", JSON.stringify(data))
    }

    return (
        <AuthContext.Provider value={{ user, setUser, createUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
