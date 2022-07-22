# Webpack & Pug plugin

## Клонирование репозитория

`git clone git@github.com:psdhtmlcss/wp.git`

## Установка пакетов

**`npm i`**

## Запуск

**`npm start`**

## Сборка

**`npm build`**

## Файловая структура

- **src/**
  - **assets/**
    - **blocks/** – папки с файлами для блоков по **БЭМ** ([файловая структура по БЭМ](https://ru.bem.info/methodology/quick-start/#%D0%A4%D0%B0%D0%B9%D0%BB%D0%BE%D0%B2%D0%B0%D1%8F-%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%82%D1%83%D1%80%D0%B0))
    - **common/** – общие стили для всех страниц сайта
    - **fonts/**
    - **img/**
  - **pug/**
    - **includes** - компоненты с разметкой
    - **pages** - папки каждой страницы сайта с импортами стилей и скриптов (`about.pug`, `about.scss`, `about.js`)
