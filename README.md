# Конструктoр

## Настройка https

В проекте **shop** копируем сертификаты из гостевой системы в папку с проектом:
```shell
vagrant ssh
sudo cp -r /etc/ssl/shop.test /app/certs
```
Переносим директорию `certs` из shop в корневую директорию конструктора, например:
```shell
mv ~/Projects/shop/certs ~/Projects/constructor
```

## Сборка
+ `npm run dev` - дев сервер
+ `npm run build` - продакшн билд
+ `npm run serve` - продакшн билд + статический сервер (чисто полюбоваться) 
