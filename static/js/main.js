$(document).ready(function() {

  // create sidebar and attach to menu open
  $('.ui.sidebar').sidebar('attach events', '.toc.item');

  $.ajaxSetup({
    beforeSend: function (xhr) {
      xhr.setRequestHeader('X-CSRFToken', $.cookie('csrftoken'));
    }
  });

  moment.locale('ru');
  app.today = moment();

  app.$calendar = $('#datepicker').datepicker({
    startDate: new Date,
    language: 'ru',
    daysOfWeekDisabled: "0,6",
    todayHighlight: true,
    toggleActive: true,
    format: 'yyyy-mm-dd'
  })
  .on('changeDate', function(e) {
    var day = e.format();
    app.timeSlots.set('selectedDay', day);
  });

});
