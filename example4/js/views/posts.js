var Posts = Backbone.View.extend({
  el: '#posts',

  template: require('../../templates/post.hbs'),

  initialize: function () {
    this.listenTo(this.collection, 'add', this.render)
  },

  render: function () {
    var self = this;

    this.$el.empty();

    this.collection.each(function (post) {
      self.$el.append(self.template(post.toJSON()));
    });

    return this;
  }
})

module.exports = Posts;