/* Javascript goes here! */

/* Javascript goes here! */

// http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b1b15e88fa797225412429c1c50c122a1

$(function(){
  var apiUrl = 'http://api.openweathermap.org/data/2.5/weather',
      apiKey = '9f7fe3b0ceb0a7cf1e86812469152bc0',
      api2Url = 'https://www.google.com/maps/embed/v1/place',
      api2Key = 'AIzaSyBYVFaVlAm7z6PBipNIaVb-6SZxWY8Cj-o';

  function getWeatherData(city){
    var getWeather = $.ajax({
      url: apiUrl,
      method: 'GET',
      dataType: 'json',
      data: {
        q: city,
        appid: apiKey,
        units: 'imperial'
      }
    });


    getWeather.done(function(response){
      // console.log(response);
      var city = response.name,
          temperature = response.main.temp,
          humidity = response.main.humidity;
          var description = response.weather[0].description;
          var Icon = response.weather[0].icon;
          var Flag = response.sys.country;
          var flag = Flag.toLowerCase();

          console.log(city, temperature, humidity);

          // Put api response on the page
          $('.city-error').html("<p style='display:none;'>Whoops! Looks like that city doesn't exist, try another one.</p>");
          $('.results .results-city').text(city);
          $('.temperature-container .temperature').text(temperature + '°');
          $('.humidity-container  .humidity').text(humidity + '%');
          $('.description-container  .description').text(description);

          $('.icon').html('<img src="http://openweathermap.org/img/w/' + Icon + '.png">');
          $('.flag').html('<img src="https://lipis.github.io/flag-icon-css/flags/4x3/' + flag + '.svg">');
          $('.map').html('<iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/search?key=AIzaSyBYVFaVlAm7z6PBipNIaVb-6SZxWY8Cj-o&q=' + city + '" allowfullscreen></iframe>');
    });


    getWeather.fail(function(error){
      // alert('error!', error);
      $('.city-error').html("<p style='display:inline;'>Whoops! Looks like that city doesn't exist, try another one.</p>");

    });

    // always
    getWeather.always(function(){
    // $('.city-error').html("<p style='display:none;'>Whoops! Looks like that city doesn't exist, try another one.</p>");
  });

  }

  // function getMapData(location) {
  //   var getMap = $.ajax({
  //     url: api2Url,
  //     method: 'GET',
  //     dataType: 'json',
  //     data: {
  //       q: city,
  //       key: api2Key,
  //     }
  //   });
  //
  //   getMap.done(function(response){
  //     console.log(response);
  //
  //   });
  // }

  function setHandlers(){
    $('.getWeatherData').on('submit', function(e){
      e.preventDefault();
      var city = $(this).find('.weather-city').val();
      console.log(city);
      getWeatherData(city);
    });

  }

 /* flow of our webapp */
  function main(){
    getWeatherData('Austin');
    setHandlers();
  }

  main();
});
