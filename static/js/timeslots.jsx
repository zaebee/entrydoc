var app = app || {};
var Flux = DeLorean.Flux;

(function (app) {
  var TimeSlot = React.createClass({
    mixins: [Flux.mixins.storeListener],
    watchStores: ['timeslots'],

    render: function() {
      return (
        <a onClick={this.showForm} className="item">
          <div className="content">
            <i className="large green clock middle aligned icon"></i>
            <span className="text">{this.props.hour_title}</span>
          </div>
        </a>
      );
    },
    showForm: function() {
      console.log(this);
      window.th = this;
      //$('.content.order').transition('vertical flip');
    },
  });

  var TimeBox = React.createClass({
    mixins: [Flux.mixins.storeListener],
    watchStores: ['timeslots'],

    render: function() {
      var slotNodes = this.props.data.map(function (slot) {
        return (
          <TimeSlot hour_title={slot.hour_title} key={slot.hour} />
        );
      });
      return (
        <div className="ui fluid vertical menu">
          {slotNodes}
        </div>
      );
    }
  });

  React.render(
    <TimeBox data={app.data} dispatcher={app.Dispatcher} />,
    document.getElementById('timeBox')
  );
})(app);
