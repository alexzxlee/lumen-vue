<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>App</title>
</head>
<body>
    <div id="app">

    </div>

    @if(env('APP_ENV') === 'local')
        {{-- development scripts --}}
        <script src="http://localhost:8081/js/app.js"></script>
    @else
        {{-- production scripts --}}
        <script src="/js/dist/app.min.js"></script>
    @endif

</body>
</html>