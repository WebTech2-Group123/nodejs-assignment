'use strict';

// load modules
const util = require('util');
const EventEmitter = require('events');


// delay time (between weather.js's updates)
const DELAY = 1500; // ms

// weather.js states & quotes
const WEATHERS = ['Sunny', 'Cloudy', 'Rainy'];
const MIN_TEMPERATURE = -20; // °C
const MAX_TEMPERATURE = +40; // °C
const QUOTES = [
    {
        text: 'Simplicity is the ultimate sophistication.',
        author: 'Leonardo da Vinci'
    },
    {
        text: 'A year from now you will wish you had started today.',
        author: 'Karen Lamb'
    },
    {
        text: 'The wisest mind has something yet to learn.',
        author: 'George Santayana'
    }
];


// extract random element from array
function random(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// generate a random temperature
function randomTemperature(max, min) {
    return Math.round((Math.random() * (max - min) + min) * 10) / 10;
}


// inherit from EventEmitter
function WeatherGenerator() {

    // call the super constructor to initialize `this`
    EventEmitter.call(this);
}

// inherit functions from EventEmitter's prototype
util.inherits(WeatherGenerator, EventEmitter);

// run the generator
WeatherGenerator.prototype.run = function () {
    this.interval = setInterval(() => {

        // create weather.js object
        let obj = {
            weather: random(WEATHERS),
            temperature: randomTemperature(MAX_TEMPERATURE, MIN_TEMPERATURE),
            quote: random(QUOTES),
            time: Date.now()
        };

        // emit event
        this.emit('weather_update', obj);

    }, DELAY);
}

// stop the generator
WeatherGenerator.prototype.stop = function () {
    clearInterval(this.interval);
}

// export WeatherGenerator
exports.WeatherGenerator = WeatherGenerator;


// shortcut to create a WeatherGenerator and listen for events
exports.createGenerator = function (callback) {
    var generator = new WeatherGenerator();
    generator.on('weather_update', callback);
    return generator;
};
