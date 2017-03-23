/* Javascript goes here! */
// http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b1b15e88fa797225412429c1c50c122a1
// api.openweathermap.org/data/2.5/weather?q=London

$(function() {
  var apiUrl = 'http://api.openweathermap.org/data/2.5/weather',
    apiKey = '9f7fe3b0ceb0a7cf1e86812469152bc0';

  function getWeatherData(city) {
    var getWeather = $.ajax({
      url: apiUrl,
      method: 'GET',
      dataType: 'json',
      data: {
        q: city,
        appid: apiKey,
        units: 'imperial',
      }
    });

    getWeather.done(function(response){
      // console.log(response);
      var city = response.name,
        temperature = response.main.temp,
        humidity = response.main.humidity,
        country = response.sys.country.toLowerCase(),
        description = response.weather[0].description;

        console.log(city, temperature, humidity);

      // put API response on the page
        $('.results .results-city').text(city);
        $('.temperature-container .temperature').text(temperature + 'º');
        $('.humidity-container .humidity').text(humidity + '%');
        $('.description-container .description').text(description);
        $('.weather-icon').attr('src', "http://openweathermap.org/img/w/"+response.weather[0].icon+".png");
        $('.city-error').hide();
        $('#flag-icon').attr('class', 'flag-icon flag-icon-' + country);
        initMap();


    });


    getWeather.fail(function(error){
      $('.city-error').show('p');
    });


    getWeather.always(function() {

    });
  }

  function setHandlers() {
    $('.getWeatherData').on('submit', function(e) {
      e.preventDefault();
      var city = $(this).find('.weather-city').val();
      getWeatherData(city);
    });
  }

  function initMap() {
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      scrollwheel: false,
      zoom: 8
    });
  }



  /* Flow of our webapp */
  function main() {
    getWeatherData('Austin');
    setHandlers();
  }

  main();

});
