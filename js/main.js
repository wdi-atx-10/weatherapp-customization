//http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=b1b15e88fa797225412429c1c50c122a1

//I didn't include the flag as I didn't want to download them

$(function() {
  //console.log('main js works');
  var apiUrl = 'http://api.openweathermap.org/data/2.5/weather',
    apiKey = '9f7fe3b0ceb0a7cf1e86812469152bc0',
    apiGoogleKey = 'AIzaSyDhNVLewOIG4HvyY_Yb0xkqotnmCd5mTAk',
    lat=30.2672,
    long=-97.7431;


  function getMap(lat, long) {
    $('iframe').attr('src','https://www.google.com/maps/embed/v1/view?key=AIzaSyDhNVLewOIG4HvyY_Yb0xkqotnmCd5mTAk&zoom=10&center='+lat+','+long);
  }

  function getWeatherData(city) {
    var getWeather = $.ajax({
      url: apiUrl,
      method: 'GET',
      datatype: 'json',
      data: {
        q: city,
        appid: apiKey,
        units: 'imperial'
      }
    });
    getWeather.done(function(response) {
      //console.log(response);
      var city = response.name,
        temperature =response.main.temp,
        humidity = response.main.humidity,
        description = response.weather[0].description,
        icon = response.weather[0].icon;

      lat = response.coord.lat,
      long= response.coord.lon;

      getMap(lat, long);

        //Put API response onto page
        $('.results .results-city').text(city);
        $('.temperature-container .temperature').text(temperature+'ºF');
        $('.humidity-container .humidity').text(humidity+'%');
        $('.description-container .description').text(description);
        $('.weather-icon').attr('src','http://openweathermap.org/img/w/'+icon+'.png');
    });
    getWeather.fail(function(error){
      $('.city-error').css('display','inline-block');
    });
  }

  function setHandlers() {
    $('.getWeatherData').on('submit', function(e){
      e.preventDefault();
      var city = $(this).find('.weather-city').val();
      getWeatherData(city);
    });
  }


  function main() {
    getWeatherData('Austin');
    setHandlers();
    getMap(lat,long);
  }
  //Flow of web app
  main();
});
