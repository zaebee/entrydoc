var app = app || {};

(function (app) {

  app.keywordCollection = new app.Keywords;

  app.keywordBox = new Ractive({
    el: '#keywordBox',
    template: '#keyword-box-template',
    data: {
      keywords: app.keywordCollection,
    },
    adapt: [ Ractive.adaptors.Backbone ],
    onrender: function() {
      var self = this;
      $(this.el).find('select').dropdown({
        onChange: function(value, text, $selectedItem) {
          self.set('selectedKeyword', value);
        }
      });

      $(this.el).find('.ui.search').search({
        apiSettings: {
          action: 'search keywords'
        },
      });
    },
  });

  app.keywordCollection.fetch();

  app.keywordBox.observe({
    selectedKeyword: function(keywordId) {
      if (keywordId) {
        $('.dimmer.active').dimmer('hide');
      } else {
        $('.dimmer.active').dimmer('show');
      }
    },
  });


})(app);
