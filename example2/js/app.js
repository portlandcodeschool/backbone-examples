$(function () {

var CommentatorView = Backbone.View.extend({
  el: '#random-number-commentary',

  events: {
    'mousedown button': 'buttonDown',
    'mouseup button'  : 'randomButtonPressed'
  },

  initialize: function () {
    this.listenTo(myModel, 'change', this.render);
    this.render();
  },

  template: function (str) {
    return '<button class="pure-button">Random</button>' +
           '<h2>' + str + '</h2>';
  },

  render: function () {
    var randomNumber = this.model.get('rannum');
    var message = ""

    if (randomNumber > 90000) {
      message = 'Wow, that\'s a big number';
    } else if (randomNumber < 10000) {
      message = 'That\'s a small number!';
    } else {
      message = 'That\'s a number!'
    }

    this.$el.html(this.template(message));
  },

  buttonDown: function () {
    this.$el.find('button').addClass('pure-button-active');
  },

  randomButtonPressed: function () {
    this.$el.find('button').removeClass('pure-button-active');
    this.model.newRandomNumber();
  }

});

var AppView = Backbone.View.extend({
  el: '#random-number-app', // every Backbone view has an associated DOM element

  initialize: function () {
    this.listenTo(myModel, 'change', this.render);
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

window.app = app;

});