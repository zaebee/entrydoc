var app = app || {};
var Flux = DeLorean.Flux;

(function (app) {
  /*
   * Stores are simple data buckets which manages data.
   */
  app.Store = Flux.createStore({
    data: null,
    setData: function (data) {
      this.data = data;
      this.emit('change');
    },
    actions: {
      'incoming-data': 'setData'
    }
  });

  /*
   * Dispatcher are simple action dispatchers for stores.
   * Stores handle the related action.
   */
  app.Dispatcher = Flux.createDispatcher({
    setData: function (data) {
      this.dispatch('incoming-data', data);
    },
    getStores: function () {
      return {timeslots: app.Store};
    }
  });

  /*
   * Action Creators are simple controllers. They are simple functions.
   * They talk to dispatchers. They are not required.
   */
  app.Actions = {
    setData: function (data) {
      app.Dispatcher.setData(data);
    }
  };

  /*
  app.store.onChange(function () {
    document.getElementById('result').innerText = store.store.data;
  });

  document.getElementById('dataChanger').onclick = function () {
    app.Actions.setData(Math.random());
  };
  */

})(app);
