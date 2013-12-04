$(function () { // wait for on-ready

// Little assignment for Thursday
// Add another view, that responds to changes in the model
// Have it say, "Woah, that's a big number", when the random number
// is greater than 900, and "That's a little number" if it's below 100
// Have it say, "That's a number", otherwise. :)

var AppView = Backbone.View.extend({
  el: '#random-number-app', // every Backbone view has an associated DOM element

  events: {
    'click button': 'randomButtonPressed'
  },

  initialize: function () {
    this.render();
  },

  template: function (context) {
    return '<h1>' + context.rannum + '</h1>' +
           '<button class="pure-button pure-button-primary">Random</button>';
  },

  render: function () {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },

  randomButtonPressed: function () {
    this.model.newRandomNumber();
  }

});

var AppModel = Backbone.Model.extend({

  initialize: function () {
    this.newRandomNumber();
  },

  newRandomNumber: function () {
    var number = Math.floor(Math.random() * 1000);
    this.set('rannum', number);

    return number;
  }
});

var myModel = new AppModel();
var app = new AppView({model: myModel});

app.listenTo(myModel, 'change', app.render);

window.app = app;

});