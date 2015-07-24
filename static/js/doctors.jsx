var app = app || {};
var Flux = DeLorean.Flux;

(function (app) {
  var DoctorBox = React.createClass({
    mixins: [Flux.mixins.storeListener],
    watchStores: ['doctors'],

    componentDidMount: function() {
      $('select').dropdown();
    },

    render: function() {
      var options = this.props.data.map(function (doctor) {
        return (
          <option value={doctor.id}>{doctor.first_name} {doctor.last_name}</option>
        );
      });
      return (
        <div className="field">
          <select>
            <option value="">Выберите врача</option>
            {options}
          </select>
        </div>
      );
    }
  });

  React.render(
    <DoctorBox data={app.doctors} dispatcher={app.Dispatcher} />,
    document.getElementById('doctorBox')
  );
})(app);
