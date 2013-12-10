#Instructions

##Basic Assignment
Complete the details and forecast views so that they display the following information

###Details View

1. currently.pressure
2. currently.humidity
3. currently.visibility
4. currently.windSpeed
5. currently.dewPoint

###Forecast View

The forecast view should display the following:

* Predicted temperature max/mins for the next week.

##Less-Basic Assignment

Let's clean up the summary view a little.

It really only needs to display a few pieces of information. Let's grab the following:

1. currently.temperature
2. currently.summary
3. daily[0].temperatureMax
4. daily[0].temperatureMin
5. daily[0].summary

You'll notice that we're pulling in data from different parts of the model. It should be the view's job to collect these together into a single context to pass to the template. Here's an example render method:

```javascript
  render: function () {
    var context = {}
    context.currently = this.model.get('currently') || {};
    context.summary = this.model.get('summary') || {};
    this.$el.html(context);
    return this;
  }
```
Now in our handlebars template we can reference `currently.temperature` and `today.summary`. Notice we're creating an empty version of the required context object so that our template function won't explode when it gets called before the first time the model is populated with data.

##Intermediate Assignment

Make your views prettier with bootstrap!

Replace the included bootstrap.min.js and bootstrap.min.css with the [full library](https://github.com/twbs/bootstrap/releases/download/v3.0.3/bootstrap-3.0.3-dist.zip) from the website. (I've only included a few necessary bits in the example code.)

Try putting your forecast data in a [table](http://getbootstrap.com/css/#tables)

Format your summary and detail views a little with the [grid system](http://getbootstrap.com/css/#grid)

