/* Javascript goes here! */
/* Javascript goes here! */
// /* Javascript goes here! */dcd
// http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b1b15e88fa797225412429c1c50c122a1
// api.openweathermap.org/data/2.5/weather?q=London
$(function(){
  console.log('Hello there!');
  var apiUrl = 'http://api.openweathermap.org/data/2.5/weather',
   apiKey = '9f7fe3b0ceb0a7cf1e86812469152bc0'

  function getWeatherData(city){
    var getWeather = $.ajax({
      url: apiUrl,
      method: 'GET',
      dataType: 'json',
      data: {
        q: city,
        appid: apiKey,
        units:'imperial'

      }
    });

    getWeather.done(function(response){
        console.log(response);
        var city = response.name,
        temperature = response.main.temp,
        humidity = response.main.humidity,
        weather = 'http://openweathermap.org/img/w/'+response.weather[0].icon+'.png',
        flag  = response.sys.country.toLowerCase();

                console.log(flag);

        console.log(city, temperature, humidity);
            $('.results .results-city').text(city);
            $('.results .results-city').append('<img src='+weather+'>');
            $('.temperature-container .temperature').text(temperature);
            $('.humidity-container .humidity').text(humidity);
            $('.flag-icon').addClass('flag-icon-' + flag);





    });
    getWeather.fail(function(error){
        alert('error!', error);

    });

    getWeather.always(function(){});

  }



  function setHandlers(){
    $('.getWeatherData').on('submit', function(e){
      e.preventDefault();
      var city= $(this).find('.weather-city').val();
      console.log('city: ', city);
      getWeatherData(city);
    });
  }

  function main(){
    getWeatherData('Austin');
    setHandlers();
  }

  main()

});
