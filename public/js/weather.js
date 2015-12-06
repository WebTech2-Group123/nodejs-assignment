$(function () {
    'use strict';

    /////////////////////////////////////////////////////////////////////
    // Socket.IO section
    /////////////////////////////////////////////////////////////////////

    // create socket.io instance
    var socket = io();

    // connected to the server
    socket.on('connect', function () {
        console.log('connect');
        showWeather();
    });

    // disconnected (eg. problems with the connection to the server)
    socket.on('disconnect', function () {
        console.log('disconnect');
        showLoading();
    });

    // weather update
    socket.on('weather', function (weather) {
        console.log('weather: ' + JSON.stringify(weather));
        displayWeather(weather);
    });

    /////////////////////////////////////////////////////////////////////
    // DOM manipulation functions
    /////////////////////////////////////////////////////////////////////

    var $loading = $('.loading');
    var $weather = $('.weather');
    var $weatherTitle = $weather.find('.title');
    var $weatherImage = $weather.find('.image');
    var $weatherTemperature = $weather.find('.temperature');
    var $weatherQuoteText = $weather.find('.quote-text');
    var $weatherQuoteAuthor = $weather.find('.quote-author');
    var $weatherUpdateTime = $weather.find('.update-time');

    function showLoading() {
        $weather.hide();
        $loading.show();
    }

    function showWeather() {
        $loading.hide();
        $weather.show();
    }

    function weatherToImage(weather) {
        switch (weather) {
            case 'Sunny':
                return 'img/sun.png';

            case 'Cloudy':
                return 'img/cloud.png';

            case 'Rainy':
                return 'img/rain.png';

            default:
                return 'img/question.png';
        }
    }

    function displayWeather(weather) {
        $weatherTitle.text(weather.weather);
        $weatherImage.attr('src', weatherToImage(weather.weather));
        $weatherTemperature.text(weather.temperature);
        $weatherQuoteText.text(weather.quote.text);
        $weatherQuoteAuthor.text(weather.quote.author);
        $weatherUpdateTime.text(new Date(weather.time).toDateString());
    }

});
