var app = app || {};

(function (app) {

  var schedules = new app.Schedules;

  app.timeSlots = new Ractive({
    el: '#timeSlots',
    template: '#time-slots-template',
    data: {
      slots: app.slots,
      schedules: schedules,
      patient: {},
      errors: {},
      disabled: function(hour) {
        return !!this.get('schedules').findWhere({hour: hour})
      },
      formatDay: function(day, format) {
        return moment(day).locale('ru').format(format);
      },
    },
    adapt: [ Ractive.adaptors.Backbone ],
    onrender: function() {
      console.log(this.el);
      $(this.el).find('.accordion').accordion();
    },
  });

  app.timeSlots.on({
    showForm: function(event) {
      app.timeSlots.set('errors', {});
      app.timeSlots.set('success', false);
    },

    submit: function(event) {
      event.original.preventDefault();
      event.original.stopPropagation();

      var $node = $(event.node);
      var schedule = new app.Schedule({
        patient: this.get('patient'),
        doctor: this.get('selectedDoctor'),
        day_of_week: this.get('selectedDay'),
        hour: event.context.hour,
      });

      $node.parent().find('.dimmer').addClass('active');
      schedule.save(null, {
        error: function(model, response) {
          $node.parent().find('.dimmer').removeClass('active');
          app.timeSlots.set('errors', response.responseJSON);
        },
        success: function(model, response) {
          $node.parent().find('.dimmer').removeClass('active');
          app.timeSlots.set('errors', {});
          app.timeSlots.set('success', true);
          $('.page.dimmer').dimmer('show');
          setTimeout(function(){
            app.timeSlots.get('schedules').add(model);
            app.timeSlots.set('success', false);
          }, 2000);
        },
      });
    },
  });

  app.timeSlots.observe({
    'selectedDoctor selectedDay': function() {
      var doctorId = this.get('selectedDoctor');
      var day = this.get('selectedDay');
      if (doctorId && day) {
        schedules.fetch({
          data: {
            doctor: doctorId,
            day_of_week: day,
          }
        });
      }
    },
  });

  app.doctorBox.observe({
    selectedDoctor: function(doctorId) {
      if (doctorId) {
        var day = app.today.format('YYYY-MM-DD');
        var day = app.timeSlots.get('selectedDay') || day;
        app.$calendar.data('datepicker').update(day);

        app.timeSlots.set('selectedDay', day);
        app.timeSlots.set('selectedDoctor', doctorId);

      }
    },
  });

})(app);
