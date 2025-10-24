@echo off
echo ===== Compilando frontend =====
call npm run build

echo ===== Construyendo imagen Docker =====
docker build -t tobiasriccone/frontend-transportes:latest .

echo ===== Pusheando imagen a Docker Hub =====
docker push tobiasriccone/frontend-transportes:latest

echo ===== Proceso finalizado =====
pause