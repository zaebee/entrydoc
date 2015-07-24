var app = app || {};

(function (app) {

  app.Doctor = Backbone.Model.extend({
    urlRoot: '/api/doctors/',
  });

  app.Doctors = Backbone.Collection.extend({
    url: '/api/doctors/',
    model: app.Doctor
  });

  app.Schedule = Backbone.Model.extend({
    urlRoot: '/api/schedules/',
  });

  app.Schedules = Backbone.Collection.extend({
    url: '/api/schedules/',
    model: app.Schedule
  });

})(app);
