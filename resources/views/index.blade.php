<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" href="/images/logos/online-learning.png">
        <title>E-Simplified
        </title>
         
        @viteReactRefresh
        @vite('resources/js/index.jsx')
        @vite( [ 'resources/sass/app.scss',
        'resources/js/app.js',
    ])
    </head>
    <body style="background-color: rgb(255, 255, 255)";>
        <div id="app"></div>
    </body>
</html>