
## Instalación
Asegúrese de tener la configuración del entorno correctamente. Necesitará PHP8.1, composer y Node.js.

1. Descarga el proyecto (o clona usando GIT)
2. Copie `.env.example` en `.env` y configure las credenciales de la base de datos
3. Navegue al directorio raíz del proyecto usando la terminal
4. Ejecute `instalación del compositor`
5. Establezca la clave de cifrado ejecutando `php artisan key:generate --ansi
i`
6. Ejecute las migraciones `php artisan migrate --seed`
7. Inicie el servidor local ejecutando `php artesanal serve`
8. Abra una nueva terminal y navegue a la carpeta `react`
9. Copie `react/.env.example` en `.env` y ajuste el parámetro `VITE_API_BASE_URL`
9. Ejecute `npm install`
10. Ejecute `npm run dev` para iniciar el servidor vite para React
"#AC"
