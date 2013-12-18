$(function () { // wait for on-ready

  var apiKey = localStorage.getItem('apiKey');

  if (!apiKey) {
    apiKey = "a981b48f64d44549870777bac4da560d";
  }

  overrideBackboneSync(apiKey);
  launchApp({});

});

function launchApp (weatherData) {

  var MainView = require('./views/main');
  var WeatherModel = require('./models/weather');

  var app = {};

  app.views = {};
  app.models = {};

  app.models.currentWeather = new WeatherModel(weatherData);

  app.views.main = new MainView({model: app.models.currentWeather});

  window.app = app;

}

function overrideBackboneSync (apiKey) {
  var LatLong = "45.4794462,-122.6748268";

  Backbone.sync = function (method, model, options) {
    options || (options = {});
    var cached;

    switch (method) {
      case 'create':
        localStorage.setItem('weather_dat', JSON.stringify(model.toJSON()));
      break;

      case 'update':
      break;

      case 'delete':
      break;

      case 'read':
        try {
          cached = JSON.parse(localStorage.getItem('weather_dat'));
        } catch (e) {
          cached = { currently: { time: 0 } };
        }

        model.set(cached);

        if (Date.now() - cached.currently.time * 1000 > 60000) {
          navigator.geolocation.getCurrentPosition(function (position) {
            var latlong = position.coords.latitude + ',' + position.coords.longitude;
            var url = "https://api.forecast.io/forecast/" + apiKey + '/' + latlong;
            $.getJSON(url + "?callback=?", null, function (weatherData) {
              model.set(weatherData);
              model.save();
            });
          });
        }
      break;
    }
  }
}