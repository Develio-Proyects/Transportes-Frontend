import { privateRoutes } from "../../routes/routes"

export class User {
    constructor({rol}){
        this.rol = rol
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