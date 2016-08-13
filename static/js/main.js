$(document).ready(function() {

  // create sidebar and attach to menu open
  $('.ui.sidebar').sidebar('attach events', '.toc.item');

  $.ajaxSetup({
    beforeSend: function (xhr) {
      xhr.setRequestHeader('X-CSRFToken', $.cookie('csrftoken'));
    }
  });

  $.fn.api.settings.api = {
    'search keywords' : '/api/v1/keywords/?query={query}',
    'get keywords' : '/api/v1/keywords/',
    'get reports' : '/api/v1/reports/',
  };
  moment.locale('ru');
  app.today = moment();

});
