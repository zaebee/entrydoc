var app = app || {};

(function (app) {

  app.doctorCollection = new app.Doctors;

  app.doctorBox = new Ractive({
    el: '#doctorBox',
    template: '#doctor-box-template',
    data: {
      doctors: app.doctorCollection,
    },
    adapt: [ Ractive.adaptors.Backbone ],
    onrender: function() {
      var self = this;
      $(this.el).find('select').dropdown({
        onChange: function(value, text, $selectedItem) {
          self.set('selectedDoctor', value);
        }
      });
    },
  });

  app.doctorCollection.fetch();

  app.doctorBox.observe({
    selectedDoctor: function(doctorId) {
      if (doctorId) {
        $('.dimmer.active').dimmer('hide');
      } else {
        $('.dimmer.active').dimmer('show');
      }
    },
  });


})(app);
