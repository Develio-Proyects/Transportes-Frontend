import { privateRoutes } from "../../routes/routes"

export class User {
    constructor({id, rol, name, email}){
        this.id = id,
        this.rol = rol,
        this.name = name,
        this.email = email
    }

    getDashboardURL(){
        if (this.rol === 'ADMINISTRADOR') {
            return '/admin/usuarios'
        }else{
            return '/perfil/mis-viajes'
        }
    }

    getRoutes() {
        return privateRoutes
            .filter(route => route.roles.includes(this.rol))
            .flatMap(route => 
                route.routes.map(({ path, label }) => ({ path, label }))
            )
            .filter(r => !!r.label)
    }
}