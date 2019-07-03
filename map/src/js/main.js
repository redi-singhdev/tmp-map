var DATA_FILE_NAME = 'data/program2.csv';

//var zipFilterArray = [];
function startup() {
  console.log('%c startup called, loading csv to parse zips etc', 'background-color:#999');

  $.ajax({
    url: DATA_FILE_NAME,
    type: 'GET',
    dataType: 'text',
    success: function (result) {

      var data = $.csv.toObjects(result);
      processDataAndLoadMap(data);

    }
  });
}

function processDataAndLoadMap(data) {
  var dataIndex = buildPropertyValueIndex(data,
    //["model_type"])
    ['zip', 'name', 'contract_type', 'model_type', 'summer_session', 'contract_type'])

  var filterChoiceOptions = buildFilterChoiceOptions(
    dataIndex,
    {
      default: {
        title: function (propertyName) { return propertyName.replace('_', ' '); },
        applyDefaults: function (optionObj, propertyName) { optionObj.radio = false; },

        label: function (val) {
          if (val == null || val == "" || val == "null") {
            return "(Blank)";
          }
          else {
            return val + ''; // convert any type of string
          }
        }
      },
      "model_type": {
        label: function (val) {
          switch (val) {
            case "GC":
              return "Child care";
            case "GD":
              return "Dual";
            case "GH":
              return "Headstart";
            default:
              return "Others"
          }
        }
      }
    }
  );

  loadMap(filterChoiceOptions);

  //var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(result);
  //window.open(uri, 'tiketi.csv');

}

function loadMap(customFilterChoiceOptions) {
  console.log('%c loading map with filters', 'background-color:yellow', customFilterChoiceOptions);
  var myApp = new nyc.ol.FinderApp({
    title: 'Childcare Providers',
    splashOptions: { message: 'Put something in here.' },
    geoclientUrl: 'https://maps.nyc.gov/geoclient/v1/search.json?app_key=74DF5DB1D7320A9A2&app_id=nyc-lib-example',
    facilityTabTitle: 'Childcare Providers',
    facilityUrl: DATA_FILE_NAME,
    facilityFormat: new nyc.ol.format.CsvPoint({
      x: 'lon',
      y: 'lat',
      dataProjection: 'EPSG:4326'
    }),
    /*facilityStyle: function(feature, resolution) {
      var z = nyc.ol.TILE_GRID.getZForResolution(resolution);
      return new ol.style.Style({
        image: new ol.style.Icon({
          src: '../img/' + feature.get('TYPE') + '.png',
          scale: 24 / 64
        })
      });
    },
    */


    filterChoiceOptions: customFilterChoiceOptions
    ,
    facilitySearch: { nameField: 'name' },
    decorations: [{
      extendFeature: function () {

      },
      getName: function () {
        return this.get('name');
      },
      getAddress: function () {
        return this.get('address');
      },
      getAddress1: function () {
        return this.getAddress();
      },
      getCityStateZip: function () {
        return '';
      },
      getPhone: function () {
        return this.get('phone');
      },
      detailsHtml() {
        // const detail = this.get(program1.detail)
        //             if (detail) {
        //   return $('<div></div>').append(detail)

        //     }
      }
      //,
      // getEmail: function() {
      //   return this.get('EMAIL');
      // },
      // getWebsite: function() {
      //   return this.get('WEBSITE');
      // // },
      // cssClass: function() {
      //   return this.get('TYPE');
      // },
      // detailsHtml: function() {
      //   return $('<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis, massa id consequat lacinia, massa enim semper nunc, sit amet dapibus ex mi posuere tellus. Aenean vulputate iaculis lorem elementum finibus. Fusce mauris libero, lacinia sed ultricies nec, imperdiet vel diam.</div>');
      // },
    }],
    directionsUrl: 'https://maps.googleapis.com/maps/api/js?client=gme-newyorkcitydepartment&channel=accis&sensor=false&libraries=visualization'
  });

}
