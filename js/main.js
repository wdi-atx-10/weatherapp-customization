$(function(){


  var apiUrl = 'http://api.openweathermap.org/data/2.5/weather',
   apiKey = '9f7fe3b0ceb0a7cf1e86812469152bc0';

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
      console.log('Cute!');
      var city = response.name,
      temperature = response.main.temp,
      humidity = response.main.humidity,
      description = response.weather[0].description,
      icon = response.weather[0].id;

      console.log(city,temperature,humidity);

// Put API response onto the page
      $('.results .results-city').text(city);
      $('.icon-container .icon').html('<i class="owf owf-' + icon + '"></i>');
      $('.temperature-container .temperature').text(temperature + 'F');
      $('.humidity-container .humidity').text(humidity + "%");
      $('.description-container .description').text(description);
      $('.getWeatherData .city-error').attr('style', 'display:none');
      $('#anime').addClass('fadeIn');
      $('#icon').addClass('fadeInDown');
      $('#temp').addClass('fadeInRight');
      $('.humidity-label').addClass('fadeInUp');
      $('.humidity').addClass('fadeInUp');
      $('.description').addClass('fadeInUp');
      $('.city-error').addClass('fadeInUpBig');
    });

    getWeather.fail(function(error){
      console.log('UGHHHHH!');
      $('.getWeatherData .city-error').attr('style', 'block');
    });

    getWeather.always(function(){});
  }

  function setHandlers(){
    $('.getWeatherData').on('submit', function(e){
    e.preventDefault();
    var city = $(this).find('.weather-city').val();
    getWeatherData(city);
    $('#anime').removeClass('fadeIn');
    $('#icon').removeClass('fadeInDown');
    $('#temp').removeClass('fadeInRight');
    $('.humidity-label').removeClass('fadeInUp');
    $('.humidity').removeClass('fadeInUp');
    $('.description').removeClass('fadeInUp');
    $('city-error').removeClass('fadeInUpBig');
    });
  }



/* Flow of this bitch */

  function main(){
    getWeatherData('Austin');
    setHandlers();
  }

  main();

});
