# 🚛 App de Transportes

Aplicación web para conectar empresas con transportistas.  
Frontend desarrollado en **React** usando **Vite** y **Material UI**.

## 🚀 Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Develio-Proyects/Transportes-Frontend.git
```

# Docker
Comandos para generar la imagen que utiliza el server
- docker login
- npm run build
- docker build -t tobiasriccone/frontend-transportes:latest .
- docker push tobiasriccone/frontend-transportes:latest

# TIP
Para que el proceso siempre ocupe el mismo puerto, matarlo con q + enter. Si no se hace de esta manera el proceso ocupara el puerto hasta reiniciar la PC. Se necesita ocupar siempre el mismo puerto ya que el backend solo le da permiso a lo que viene de localhost:5173.