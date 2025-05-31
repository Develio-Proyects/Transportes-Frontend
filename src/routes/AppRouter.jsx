import { Route, Routes } from "react-router-dom"
import Landing from "../pages/Landing/Landing"
import Viajes from "../pages/Viajes/Viajes"
import Layout from "../components/Layout/Layout"
import UserLayout from "../components/UserLayout/UserLayout"
import DetalleViaje from "../pages/DetalleViaje/DetalleViaje"
import ViajesConductor from "../pages/ViajesConductor/ViajesConductor"
import Postulaciones from "../pages/Postulaciones/Postulaciones"
import Vehiculos from "../pages/Vehiculos/Vehiculos"
import ViajesActivos from "../pages/ViajesActivos/ViajesActivos"
import HistorialEmpresa from "../pages/HistorialEmpresa/HistorialEmpresa"
import HistorialAdmin from "../pages/HistorialAdmin/HistorialAdmin"
import Usuarios from "../pages/Usuarios/Usuarios"
import Documentos from "../pages/Documentos/Documentos"
import Login from "../pages/Auth/Login"
import SignUp from "../pages/Auth/SignUp"
import ProtectedRoutes from "./ProtectedRoutes"
import { ROLES } from "../api/models/roles"

const AppRouter = () => {

    return (
        <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<Layout />}>
                <Route path="/" element={<Landing />} />
                <Route path="/viajes" element={<Viajes />} />
                <Route path="*" element={<Landing />} />
            </Route>

            <Route element={<ProtectedRoutes allowedRoles={[ROLES.TRANSPORTE, ROLES.FLETERO, ROLES.ADMIN]} />}>
                <Route path="/viajes/:id" element={<DetalleViaje />} />
            </Route>

            <Route element={<ProtectedRoutes allowedRoles={[ROLES.FLETERO]} />}>
                <Route element={<UserLayout />}>
                    <Route path="/perfil/mis-viajes" element={<ViajesConductor />} />
                    <Route path="/perfil/postulaciones" element={<Postulaciones />} />
                    <Route path="/perfil/vehiculos" element={<Vehiculos />} />
                    <Route path="/perfil/documentos" element={<Documentos />} />
                </Route>
            </Route>

            <Route element={<ProtectedRoutes allowedRoles={[ROLES.TRANSPORTE]} />}>
                <Route element={<UserLayout />}>
                    <Route path="/perfil/viajes-activos" element={<ViajesActivos />} />
                    <Route path="/perfil/historial" element={<HistorialEmpresa />} />
                    <Route path="/perfil/documentos" element={<Documentos />} />
                </Route>
            </Route>

            {/* Rutas exclusivas para Admin */}
            <Route element={<ProtectedRoutes allowedRoles={[ROLES.ADMIN]} />}>
                <Route element={<UserLayout />}>
                    <Route path="/perfil/historial" element={<HistorialAdmin />} />
                    <Route path="/admin/usuarios" element={<Usuarios />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRouter