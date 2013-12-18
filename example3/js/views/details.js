var DetailView = Backbone.View.extend({

  el: '#details',

  template: require('../../templates/details.hbs'),

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.render();
  },

  render: function () {
    var context = {}
    context.alerts = this.model.get('alerts') || {};
    context.currently = this.model.get('currently') || {};

    this.$el.html(this.template(context));

  }


});

module.exports = DetailView;