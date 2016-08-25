var app = app || {};

(function (app) {

  var reports = new app.KeywordReports;

  app.reports = new Ractive({
    el: '#timeSlots',
    template: '#time-slots-template',
    data: {
      _: _,
      slots: app.slots,
      reports: reports,
      patient: {},
      errors: {},
      disabled: function(hour) {
        return !!this.get('reports').findWhere({hour: hour})
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

  app.reports.on({
    showForm: function(event) {
      app.reports.set('errors', {});
      app.reports.set('success', false);
    },

    showWordstatAlso: function(event, data) {
      event.original.preventDefault();
      console.log(event, data);
      var report = new app.KeywordReports(data);
    },

    showWordstatWith: function(event, data) {
      event.original.preventDefault();
      console.log(event, data);
    },

    submit: function(event) {
      event.original.preventDefault();
      event.original.stopPropagation();

      var $node = $(event.node);
      var schedule = new app.Schedule({
        patient: this.get('patient'),
        hour: this.get('patient'),
        keyword: this.get('selectedKeyword'),
        day_of_week: this.get('selectedDay'),
        hour: event.context.hour,
      });

      $node.parent().find('.dimmer').addClass('active');
      schedule.save(null, {
        error: function(model, response) {
          $node.parent().find('.dimmer').removeClass('active');
          app.reports.set('errors', response.responseJSON);
        },
        success: function(model, response) {
          $node.parent().find('.dimmer').removeClass('active');
          app.reports.set('errors', {});
          app.reports.set('success', true);
          $('.page.dimmer').dimmer('show');
          setTimeout(function(){
            app.reports.get('reports').add(model);
            app.reports.set('success', false);
          }, 2000);
        },
      });
    },
  });

  app.reports.observe({
    'selectedKeyword selectedDay': function() {
      var keywordId = this.get('selectedKeyword');
      var day = this.get('selectedDay');
      if (keywordId && day) {
        reports.fetch({
          data: {
            keyword: keywordId,
            day_of_week: day,
          }
        });
      }
    },
  });

  app.deviceBox.observe({
    selectedKeyword: function(keywordId) {
      if (keywordId) {
        var day = app.today.format('YYYY-MM-DD');
        var day = app.reports.get('selectedDay') || day;

        app.reports.set('reports', app.deviceBox.get('keywords').get(keywordId).get('reports'));
        app.reports.set('selectedKeyword', keywordId);

      }
    },
  });

})(app);
