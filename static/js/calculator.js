var app = app || {};

(function (app) {

  app.deviceCollection = new app.Devices;

  app.calculatorBox = new Ractive({
    el: '#calculatorBox',
    template: '#calculator-box-template',
    data: {
      stats: {},
    },
    computed: {
      networkHashRate: '${stats.difficulty} / ${stats.blockTime} / 1e9'
    },
    //adapt: [ Ractive.adaptors.Backbone ],
    onrender: function() {
      var self = this;
      $(this.el).find('select').dropdown({
        onChange: function(value, text, $selectedItem) {
          self.set('selectedDevice', value);
        }
      });

    },
  });

  app.calculatorBox.observe({
    selectedDevice: function(deviceId) {
      if (deviceId) {
        $('.dimmer.active').dimmer('hide');
      } else {
        $('.dimmer.active').dimmer('show');
      }
    },
  });


})(app);
