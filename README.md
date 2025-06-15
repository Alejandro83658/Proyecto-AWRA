## Requisitos técnicos

- **Sistema operativo:** Windows 10 o superior (recomendado para WampServer)
- **WampServer:** 3.2 o superior (incluye Apache, MySQL y PHP)
- **PHP:** 8.1 o superior
- **MySQL:** 5.7 o superior
- **Node.js:** 18.x o superior
- **npm:** 8.x o superior
- **Composer:** 2.x o superior
- **Extensiones PHP:** openssl, pdo, mbstring, tokenizer, xml, ctype, json, bcmath, fileinfo
- **Archivo `.env`** configurado

Instalación

1. Clona el repositorio
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio

2. Instala las dependencias de PHP
   composer install
   
3. Instala las dependencias de Node.js
   npm install

4.Copia el archivo de entorno y configúralo
cp .env.example .env

5.Genera la clave de la aplicación
php artisan key:generate

6.Crea la base de datos en MySQL
(puedes hacerlo desde phpMyAdmin o consola)
7.Ejecuta migraciones y seeders
php artisan migrate --seed

8.Crea el enlace simbólico para el almacenamiento
php artisan storage:link

9.Compila los assets
npm run dev

10. Accede a la aplicación

Si usas WampServer:
http://localhost/tu-repositorio/public
Si usas un host virtual:
http://awra.test
   
   
