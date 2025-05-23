import { Route, Routes } from "react-router-dom"
import Landing from "../pages/Landing/Landing"
import Viajes from "../pages/Viajes/Viajes"
import Login from "../pages/Login/Login"
import SignUp from "../pages/SingUp/SignUp"
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

const AppRouter = () => {
    const role = "empresa"

    return (
        <Routes>

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            
            <Route element={<Layout />}>
                <Route path="/" element={<Landing />} />
                <Route path="/viajes" element={<Viajes />} />
                <Route path="*" element={<Landing />} />
            </Route>

            <Route>
                {(role === "conductor" || role === "empresa") && (
                    <Route element={<UserLayout />}>
                        <Route path="/viajes/:id" element={<DetalleViaje />} />
                        <Route path="/perfil/documentos" element={<Documentos />} />

                        {role === "conductor" && (
                            <>
                                <Route path="/perfil/mis-viajes" element={<ViajesConductor  />} />
                                <Route path="/perfil/postulaciones" element={<Postulaciones />} />
                                <Route path="/perfil/vehiculos" element={<Vehiculos />} />
                            </>
                        )}

                        {role === "empresa" && (
                            <>
                                <Route path="/perfil/viajes-activos" element={<ViajesActivos />} />
                                <Route path="/perfil/historial" element={<HistorialEmpresa />} />
                            </>
                        )}
                    </Route>
                )}

                {role === "admin" && (
                    <Route element={<UserLayout />}>
                        <Route path="/admin/historial" element={<HistorialAdmin />} />
                        <Route path="/admin/usuarios" element={<Usuarios />} />
                    </Route>
                )}
            </Route>
        </Routes>
    )
}

export default AppRouter