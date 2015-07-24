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
        return moment(day).format(format);
      },
    },
    adapt: [ Ractive.adaptors.Backbone ],
  });

  app.timeSlots.on({
    showForm: function(event) {
      app.timeSlots.set('errors', {});
      app.timeSlots.set('success', false);
      var $node = $(event.node).not('.active').not('.disabled');
      if ($node.length) {
        this.set('slots.*.active', false);
        this.set(event.keypath + '.active', true);
        $node.parents().find('.visible.order').transition('vertical flip out');
        $node.find('.hidden.order').transition('vertical flip in');
      }
    },

    submit: function(event) {
      event.original.preventDefault();
      event.original.stopPropagation();

      var $node = $(event.node);
      var schedule = new app.Schedule({
        patient: this.get('patient'),
        hour: this.get('patient'),
        doctor: this.get('selectedDoctor'),
        day_of_week: this.get('selectedDay'),
        hour: event.context.hour,
      });

      $node.parents('.form').addClass('loading');
      schedule.save(null, {
        error: function(model, response) {
          $node.parents('.form').removeClass('loading');
          app.timeSlots.set('errors', response.responseJSON);
        },
        success: function(model, response) {
          window.n = $node;
          $node.parents('.form').removeClass('loading');
          $node.parents('.form').hide();
          app.timeSlots.set('errors', {});
          app.timeSlots.set('success', true);
          setTimeout(function(){
            app.timeSlots.get('schedules').add(model);
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
