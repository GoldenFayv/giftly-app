#!/bin/sh

set -e

cd /var/www/html

php artisan config:clear
php artisan migrate --force
php artisan db:seed --class=ProductSeeder --force
php artisan cache:clear


php artisan config:cachee
php artisan route:cache
php artisan view:cache

php-fpm -D

exec nginx -g "daemon off;"