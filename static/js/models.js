var app = app || {};

(function (app) {

  app.Keyword = Backbone.Model.extend({
    urlRoot: '/api/v1/keywords/',
  });

  app.Keywords = Backbone.Collection.extend({
    url: '/api/v1/keywords/',
    model: app.Keyword
  });

  app.Device = Backbone.Model.extend({
    urlRoot: '/api/v1/devices/',
  });

  app.Devices = Backbone.Collection.extend({
    url: '/api/v1/devices/',
    model: app.Device
  });

  app.KeywordReport = Backbone.Model.extend({
    urlRoot: '/api/v1/reports/',
  });

  app.KeywordReports = Backbone.Collection.extend({
    url: '/api/v1/reports/',
    model: app.KeywordReport,

    getPopular: function( array ){
      var result = {}
      _.each(array, function(el){
        result.clear = {
          Phrase: el.Phrase,
          popular: el.Shows / array[0].Shows,
        };
        console.log(result.clear);  
      });
      n = _.map(_.pluck(c.at(0).get('SearchedWith'), 'Phrase'), function(el){el = '"' + el + '"'; return el;});
      m = _.pluck(c.at(0).get('SearchedWith'), 'Phrase');
      return array;
    },

    getLong: function( array ){
      _.each(array, function(el){
        console.log(el);  
      });
      return array;
    },
  });

})(app);
