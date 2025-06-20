// src/routes/AppRouter.jsx
import { Route, Routes } from "react-router-dom"
import Layout from "../components/Layout/Layout"
import UserLayout from "../components/UserLayout/UserLayout"
import ProtectedRoutes from "./ProtectedRoutes"
import { authRoutes, publicRoutes, userPublicRoutes, privateRoutes } from "../routes/routes"

const AppRouter = () => {
    return (
        <Routes>
            {/* Auth (sin layout) */}
            {authRoutes.map(({ path, Element }, i) => (
                <Route key={i} path={path} element={<Element />} />
            ))}

            {/* Públicas con Layout */}
            <Route element={<Layout />}>
                {publicRoutes.map(({ path, Element }, i) => (
                    <Route key={i} path={path} element={<Element />} />
                ))}
            </Route>

            {/* Rutas con UserLayout (tanto públicas como privadas) */}
            <Route element={<UserLayout />}>
                {/* Públicas que usan UserLayout */}
                {userPublicRoutes.map(({ path, Element }, i) => (
                    <Route key={i} path={path} element={<Element />} />
                ))}

                {/* Privadas con protección */}
                {privateRoutes.map(({ roles, routes }, i) => (
                    <Route key={i} element={<ProtectedRoutes allowedRoles={roles} />}>
                        {routes.map(({ path, Element }, j) => (
                            <Route key={j} path={path} element={<Element />} />
                        ))}
                    </Route>
                ))}
            </Route>
        </Routes>
    )
}

export default AppRouter