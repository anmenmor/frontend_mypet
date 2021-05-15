## Wiki técnica

### Repositorios GIT

Backend: https://github.com/daw2lasallefp/backend_mypet.git
Frontend: https://github.com/daw2lasallefp/frontend_mypet.git

###Desplegar backend

Requisito: Laravel -> https://laravel.com/docs/8.x/installation
Requisito: XAMPP
git clone https://github.com/daw2lasallefp/backend_mypet.git
Crear base de datos "mypets" en PhpMyAdmin
composer update
php artisan migrate:refresh --seed
php artisan serve

###Desplegar frontend

Requisito: Angular -> https://angular.io/guide/setup-local
git clone https://github.com/daw2lasallefp/frontend_mypet.git
npm update
ng serve

### Hosting

Dominio: http://mypetcare.atwebpages.com/

Cuenta Admin por defecto MyPet (tras migración y seeding DB)

Email: default@admin.com
Password: Default_Admin1234
