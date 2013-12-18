$(function () { // wait for on-ready

  var PostsView = require('./views/posts');

  var app = {};

  app.collections = {}
  app.views = {}

  Post = Backbone.Model.extend({
    defaults: {
      title: "A post!",
      content: "Lorem Ipsum Baby!",
      date: new Date()
    }
  });

  Posts = Backbone.Collection.extend({
    model: Post,
    localStorage: new Backbone.LocalStorage("posts")
  });

  app.collections.posts = new Posts();

  app.views.posts = new PostsView({collection: app.collections.posts});

  app.collections.posts.fetch();

  window.app = app;

});