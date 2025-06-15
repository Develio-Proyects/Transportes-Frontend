import { Route, Routes } from "react-router-dom"
import { ROLES } from "../api/models/roles"
import Landing from "../pages/Landing/Landing"
import Viajes from "../pages/Viajes/Viajes"
import Layout from "../components/Layout/Layout"
import UserLayout from "../components/UserLayout/UserLayout"
import DetalleViaje from "../pages/DetalleViaje/DetalleViaje"
import Postulaciones from "../pages/Postulaciones/Postulaciones"
import Login from "../pages/Auth/Login"
import SignUp from "../pages/Auth/SignUp"
import ProtectedRoutes from "./ProtectedRoutes"
import MisDatos from "../pages/MisDatos/MisDatos"
import Ayuda from "../pages/Ayuda/Ayuda"
import MisViajes from "../pages/MisViajes/MisViajes"
import MiFlota from "../pages/MiFlota/MiFlota"
import Transportistas from "../pages/Admin/Transportistas/Transportistas"
import Pagos from "../pages/Admin/Pagos/Pagos"
import Configuracion from "../pages/Admin/Configuracion/Configuracion"

const AppRouter = () => {

    return (
        <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            
            <Route element={<Layout />}>
                <Route path="/" element={<Landing />} />
                <Route path="*" element={<Landing />} />
            </Route>

            <Route element={<UserLayout />}>
                <Route path="/viajes" element={<Viajes />} />
                <Route path="/viajes/:id" element={<DetalleViaje />} />
                <Route path="/ayuda" element={<Ayuda />} />
            </Route>

            <Route element={<ProtectedRoutes allowedRoles={[ROLES.UNIPERSONAL, ROLES.FLOTA]} />}>
                <Route element={<UserLayout />}>
                    <Route path="/perfil/mis-viajes" element={<MisViajes />} />
                    <Route path="/perfil/mis-datos" element={<MisDatos />} />
                </Route>
            </Route>

            <Route element={<ProtectedRoutes allowedRoles={[ROLES.FLOTA]} />}>
                <Route element={<UserLayout />}>
                    <Route path="/perfil/postulaciones" element={<Postulaciones />} />
                    <Route path="/perfil/flota" element={<MiFlota />} />
                </Route>
            </Route>

            {/* Rutas exclusivas para Admin */}
            <Route element={<ProtectedRoutes allowedRoles={[ROLES.ADMIN]} />}>
                <Route element={<UserLayout />}>
                    <Route path="/admin/transportistas" element={<Transportistas />} />
                    <Route path="/admin/pagos" element={<Pagos />} />
                    <Route path="/admin/configuracion" element={<Configuracion />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRouter