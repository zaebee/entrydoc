var app = app || {};

(function (app) {

  app.loadChart = function (histoDayModel) {
    var chartData = [];

    chartData = histoDayModel.toJSON()['Data'];
    chartData = _.map(chartData, function(el){
      el.time = el.time * 1000;
      el.volume = el.volumeto - el.volumefrom;
      return el;
    });
    app.chart = AmCharts.makeChart( "chartdiv", {
      "type": "stock",
      "theme": "light",
      "dataSets": [
        {
          "color": "#b0de09",
          "fieldMappings": [ {
            "fromField": "open",
            "toField": "open"
          }, {
            "fromField": "close",
            "toField": "close"
          }, {
            "fromField": "high",
            "toField": "high"
          }, {
            "fromField": "low",
            "toField": "low"
          }, {
            "fromField": "volume",
            "toField": "volume"
          }, {
            "fromField": "value",
            "toField": "value"
          } ],
          "dataProvider": chartData,
          "categoryField": "time",
        },
      ],
      "panels": [ {
        "title": "Цена",
        "stockGraphs": [ {
          "id": "g1",
          "type": "candlestick",
          "openField": "open",
          "closeField": "close",
          "highField": "high",
          "lowField": "low",
          "valueField": "close",
          "lineColor": "#7f8da9",
          "fillColors": "#7f8da9",
          "negativeLineColor": "#db4c3c",
          "negativeFillColors": "#db4c3c",
          "fillAlphas": 1,
          "balloonText": "open:<b>[[open]]</b><br>close:<b>[[close]]</b><br>low:<b>[[low]]</b><br>high:<b>[[high]]</b>",
          "useDataSetColors": false
        } ],
        "stockLegend": {
          "valueTextRegular": " ",
          "markerType": "none"
        }
      } ],

      "chartScrollbarSettings": {
        "graph": "g1"
      },

      "chartCursorSettings": {
        "valueBalloonsEnabled": true,
        "graphBulletSize": 1,
        "valueLineBalloonEnabled": true,
        "valueLineEnabled": true,
        "valueLineAlpha": 0.5
      },

      "periodSelector": {
        "periods": [ {
          "period": "DD",
          "count": 10,
          "label": "10 дней"
        }, {
          "period": "MM",
          "count": 1,
          "label": "1 месяц"
        }, {
          "period": "YYYY",
          "count": 1,
          "label": "1 год"
        }, {
          "period": "YTD",
          "label": "YTD"
        }, {
          "period": "MAX",
          "label": "MAX"
        } ]
      },

      "panelsSettings": {
        "usePrefixes": true
      },
    });
  };
  app.histoDay = new app.HistoDay;

  app.chartBox = new Ractive({
    el: '#chartBox',
    template: '#chart-box-template',
    data: {
      tsym: 'USD',
    },
    adapt: [ Ractive.adaptors.Backbone ],
    onrender: function() {
      var self = this;
      app.histoDay.fetch({
        data: {
          tsym: this.get('tsym'),
        },
        success: function() {
          app.loadChart(app.histoDay);
        }
      });
    },
  });

  app.chartBox.on({
    changeChart: function(event, currency) {
      event.original.preventDefault();
      this.set('tsym', currency);
      console.log(currency);
      this.onrender();
    }
  });

  app.calculatorBox.observe({
    selectedDevice: function(deviceId) {
      if (deviceId) {
        $('.dimmer.active').dimmer('hide');
      } else {
        $('.dimmer.active').dimmer('show');
      }
    },
  });


})(app);
