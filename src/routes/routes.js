// src/routes/routes.js
import Login from "../pages/Auth/Login"
import SignUp from "../pages/Auth/SignUp"
import Landing from "../pages/Landing/Landing"
import Viajes from "../pages/Viajes/Viajes"
import DetalleViaje from "../pages/DetalleViaje/DetalleViaje"
import Ayuda from "../pages/Ayuda/Ayuda"
import MisViajes from "../pages/MisViajes/MisViajes"
import MisDatos from "../pages/MisDatos/MisDatos"
import Postulaciones from "../pages/Postulaciones/Postulaciones"
import Transportistas from "../pages/Admin/Transportistas/Transportistas"
import Pagos from "../pages/Admin/Pagos/Pagos"
import Configuracion from "../pages/Admin/Configuracion/Configuracion"
import { ROLES } from "../api/models/roles"

// públicas sin layout
export const authRoutes = [
    { 
        path: "/login", 
        Element: Login
    },
    { 
        path: "/signup", 
        Element: SignUp
    },
]

// públicas con Layout
export const publicRoutes = [
    { 
        path: "/", 
        Element: Landing,
        label: "Inicio" 
    },
    { 
        path: "*", 
        Element: Landing 
    },
]

// públicas con UserLayout
export const userPublicRoutes = [
    { 
        path: "/viajes", 
        Element: Viajes,
        label: "Viajes disponibles" 
    },
    { 
        path: "/viajes/:id", 
        Element: DetalleViaje 
    },
    { 
        path: "/ayuda", 
        Element: Ayuda,
        label: "Ayuda"
    }
]

// privadas
export const privateRoutes = [
    {
        roles: [ROLES.UNIPERSONAL, ROLES.FLOTA],
        routes: [
            { 
                path: "/perfil/mis-viajes", 
                Element: MisViajes,
                label: "Mis viajes" 
            },
            { 
                path: "/perfil/mis-datos", 
                Element: MisDatos,
                label: "Mis datos" 
            }
        ]
    },
    {
        roles: [ROLES.FLOTA],
        routes: [
            { 
                path: "/perfil/postulaciones", 
                Element: Postulaciones,
                label: "Postulaciones" 
            }
        ]
    },
    {
        roles: [ROLES.ADMIN],
        routes: [
            { 
                path: "/admin/transportistas", 
                Element: Transportistas,
                label: "Transportistas" 
            },
            { 
                path: "/admin/pagos", 
                Element: Pagos,
                label: "Pagos" 
            },
            { 
                path: "/admin/configuracion", 
                Element: Configuracion,
                label: "Configuración" 
            },
        ],
    }
]