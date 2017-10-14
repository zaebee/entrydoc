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
    language: 'ru',
    daysOfWeekDisabled: "1,2,3,4,5",
    datesDisabled: [
    '2017-11-18', '2017-11-19',
    '2017-12-02', '2017-12-03',
    '2017-12-16', '2017-12-17',
    '2017-12-23',
    '2017-12-30', '2017-12-31',
    '2018-01-06', '2018-01-07',
    '2018-01-13', '2018-01-14',
    '2018-01-20', '2018-01-21',
    '2018-01-27', '2018-01-28',
    ],
    toggleActive: true,
    startDate: '2017-11-11',
    format: 'yyyy-mm-dd'
  })
  .on('changeDate', function(e) {
    var day = e.format();
    app.timeSlots.set('selectedDay', day);
  });

  app.$calendar.datepicker('setDate', '2017-11-11');

});
