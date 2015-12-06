'use strict';

// load modules
const weather = require('./src/weather');

var callback = weather => console.log(weather);

//const WeatherGenerator = weather.js.WeatherGenerator;
//var generator = new WeatherGenerator();
//generator.on('weather_update', callback);

// or

var generator = weather.createGenerator(callback);

// start generating weather.js events
generator.run();
