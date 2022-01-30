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

## Доки и дизайн

[Авторизация на поддомене](https://docs.google.com/document/d/1aRbcRX4-Mc2gRLtAjbN4PcX1NsAxVSGBzeIWKrj1ZLk)  
[Описание API](https://docs.google.com/document/d/1-of23xufDRPvt_EGK8rrlie-6yzaIfCAQet0SkYAfmg)  
[Дизайн](https://www.figma.com/file/WyfGlpLCUwOt2mpPUOrcRD/%D0%9A%D0%BE%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%82%D0%BE%D1%80-%D1%81%D1%85%D0%B5%D0%BC-%D0%92%D0%B8%D1%82%D0%B0%D0%BB%D0%B8%D0%BA)
