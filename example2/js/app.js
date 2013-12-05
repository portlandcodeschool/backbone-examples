$(function () { // wait for on-ready

// Little assignment for Thursday
// Add another view, that responds to changes in the model
// Have it say, "Woah, that's a big number", when the random number
// is greater than 900, and "That's a little number" if it's below 100
// Have it say, "That's a number", otherwise. :)

var CommentatorView = Backbone.View.extend({
  el: '#random-number-commentary',

  events: {
    'click button': 'randomButtonPressed'
  },

  initialize: function () {
    this.render();
  },

  template: function (str) {
    return '<button class="pure-button pure-button-primary">Random</button>' +
           '<h2>' + str + '</h2>';
  },

  render: function () {
    var randomNumber = this.model.get('rannum');
    if (randomNumber > 90000) {
      this.$el.html(this.template("Wow, that's a big number"));
    } else if (randomNumber < 10000) {
      this.$el.html(this.template("That's a small number!"));
    } else {
      this.$el.html(this.template("That's a number!"));
    }
  },

  randomButtonPressed: function () {
    this.model.newRandomNumber();
  }

});

var AppView = Backbone.View.extend({
  el: '#random-number-app', // every Backbone view has an associated DOM element

  initialize: function () {
    this.render();
  },

  template: function (context) {
    return '<h1>' + context.rannum + '</h1>';
  },

  render: function () {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }

});

var AppModel = Backbone.Model.extend({

  initialize: function () {
    this.newRandomNumber();
  },

  newRandomNumber: function () {
    var number = Math.floor(Math.random() * 100000);
    this.set('rannum', number);

    return number;
  }

});

var myModel = new AppModel();
var app = new AppView({model: myModel});
var commentaryView = new CommentatorView({model: myModel});

app.listenTo(myModel, 'change', app.render);
commentaryView.listenTo(myModel, 'change', commentaryView.render);

window.app = app;

});