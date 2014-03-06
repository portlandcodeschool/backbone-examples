$(function () { // wait for on-ready

var AppView = Backbone.View.extend({
  el: 'body',

  events: {
    'keyup input': "changeName"
  },

  render: function () {
    var firstName = this.model.get('firstName');
    var lastName = this.model.get('lastName');

    this.$el.find('#first-name').val(firstName);
    this.$el.find('#last-name').val(lastName);

    this.$el.find('#full-name').text(firstName + ' ' + lastName);
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.render();
  },

  changeName: function () {
    var firstName = this.$el.find('#first-name').val();
    var lastName = this.$el.find('#last-name').val();

    this.model.set('firstName', firstName);
    this.model.set('lastName', lastName);
  }

});

var AppModel = Backbone.Model.extend({});

var model = new AppModel({
  firstName: 'Gary',
  lastName: 'Busey'
});

var app = new AppView({model: model});

window.app = app;

});
