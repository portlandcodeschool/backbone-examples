$(function () { // wait for on-ready

var SummaryView = require('./views/summary');
var WeatherModel = require('./models/weather');

var app = {};
app.views = {};
app.models = {};

var APIKey = "secret"
var LatLong = "45.532814,-122.689296"

var url = "https://api.forecast.io/forecast/" + APIKey + '/' + LatLong;

app.models.currentWeather = new WeatherModel({currently: {}});

app.views.summary = new SummaryView({model: app.models.currentWeather});
// app.views.details = new DetailView({model: app.models.currentWeather});
// app.views.forecast = new ForecastView({model: app.models.currentWeather});

window.app = app;

$.getJSON(url + "?callback=?", null, function(weatherData) {
  app.models.currentWeather.set(weatherData);
});

});