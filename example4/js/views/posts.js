var Posts = Backbone.View.extend({
  el: '#posts',

  template: require('../../templates/post.hbs'),

  initialize: function () {
    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'remove', this.render);
    this.listenTo(this.collection, 'change', this.render);
  },

  render: function () {
    var self = this;

    this.$el.empty();

    this.collection.each(function (post) {
      var $post = $(self.template(post.toJSON()));
      $post.find('#destroy-btn').click(function () {
        post.destroy();
      });

      self.$el.append($post);
    });

    return this;
  }
})

module.exports = Posts;