(function() {
  loadOptions();
  submitHandler();
})();

function submitHandler() {
  var $submitButton = $('#submitButton');

  $submitButton.on('click', function() {
    console.log('Submit');

    var return_to = getQueryParam('return_to', 'pebblejs://close#');
    document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
  });
}

function loadOptions() {
  var $backgroundColorPicker = $('#backgroundColorPicker');
  var $foregroundColorPicker = $('#foregroundColorPicker');
  var $tabsContainer = $('#tabsContainer');

  if (localStorage.backgroundColor) {
    $backgroundColorPicker[0].value = localStorage.backgroundColor;
    $foregroundColorPicker[0].value = localStorage.foregroundColor;

    var temperatureValue = localStorage.temperatureFormat;
    $tabsContainer.find('.tab-button').each(function() {
          var $tab = $(this);
          var name = $tab[0].text;
          $tab.removeClass('active');
          if (name == temperatureValue) {
            $tab.addClass('active');
          }
    });
  }
}

function getAndStoreConfigData() {
  var $backgroundColorPicker = $('#backgroundColorPicker');
  var $foregroundColorPicker = $('#foregroundColorPicker');
  var $tabsContainer = $('#tabsContainer');

  var temperatureValue = 'Celcius';
  $tabsContainer.find('.tab-button').each(function() {
        var $tab = $(this);
        var name = $tab[0].text;
        if ($tab.hasClass('active')) {
            temperatureValue = name;
        }
  });

  var options = {
    backgroundColor: $backgroundColorPicker.val(),
    foregroundColor: $foregroundColorPicker.val(),
    temperatureFormat: temperatureValue
  };

  localStorage.backgroundColor = options.backgroundColor;
  localStorage.foregroundColor = options.foregroundColor;
  localStorage.temperatureFormat = temperatureValue;

  console.log('Got options: ' + JSON.stringify(options));
  return options;
}

function getQueryParam(variable, defaultValue) {
  var query = location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (pair[0] === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return defaultValue || false;
}
