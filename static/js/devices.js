var app = app || {};

(function (app) {

  app.deviceCollection = new app.Devices;

  app.deviceBox = new Ractive({
    el: '#keywordBox',
    template: '#keyword-box-template',
    data: {
      _: _,
      devices: app.deviceCollection,
    },
    adapt: [ Ractive.adaptors.Backbone ],
    onrender: function() {
      var self = this;
      $(this.el).find('select').dropdown({
        onChange: function(value, text, $selectedItem) {
          self.set('selectedDevice', value);
        }
      });

      $(this.el).find('.ui.search').search({
        apiSettings: {
          action: 'search devices'
        },
      });
    },
  });

  app.deviceCollection.fetch();

  app.deviceBox.on({
    launchModal: function(event) {
      $('#deviceModal').modal('show');
      console.log(event);
    }
  });
  app.deviceBox.observe({
    selectedDevice: function(deviceId) {
      if (deviceId) {
        $('.dimmer.active').dimmer('hide');
      } else {
        $('.dimmer.active').dimmer('show');
      }
    },
  });


})(app);
