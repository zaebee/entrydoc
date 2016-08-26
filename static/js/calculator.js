var app = app || {};

(function (app) {

  app.calculatorBox = new Ractive({
    el: '#calculatorBox',
    template: '#calculator-box-template',
    data: {
      stats: {},
    },
    computed: {
      networkHashRate: '${stats.difficulty} / ${stats.blockTime} / 1e9',
      userRatio: '${userHashRate} * 1e6 / (${networkHashRate} * 1e9)',
      blocksPerMin: '60.0 / ${stats.blockTime}',
      ethPerMin: '${blocksPerMin} * 5.0',
      earningsMin: '${userRatio} * ${ethPerMin}',
      earningsHour: '${earningsMin} * 60',
      earningsDay: '${earningsHour} * 24',
      earningsWeek: '${earningsDay} * 7',
      earningsMonth: '${earningsDay} * 30',
      earningsYear: '${earningsDay} * 365',
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

  app.calculatorBox.on({
    isKeyNumber: function(event, userHashRate) {
      console.log(userHashRate);
      var e = event.original;
      //e.preventDefault();
      var charCode = (e.which) ? e.which : e.keyCode;
      if (charCode < 46 || charCode > 57) {
        e.preventDefault();
      } else {
        return true;
      }
    }
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
