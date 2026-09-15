#!/bin/sh

set -e

cd /var/www/html

php artisan config:clear
php artisan migrate --force
php artisan db:seed --class=ProductSeeder --force

php artisan optimize:clear

php-fpm -D

exec nginx -g "daemon off;"