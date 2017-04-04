$(function(){
   var apiUrl = 'http://api.openweathermap.org/data/2.5/weather',
       apiKey = '779b40c4fec76005be99a0d2dad922a8';

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
     })

     getWeather.done(function(response){
       var city = response.name,
           temperature = response.main.temp,
           humidity = response.main.humidity,
           iconUrl = 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png',
          flag = 'flag-icon-' + response.sys.country.toLowerCase();

           console.log(city, temperature, humidity);

           $('.results .results-city').text(city).append('<img src="' + iconUrl + '">');
           $('.temperature-container .temperature').text(temperature);
           $('.humidity-container .humidity').text(humidity);
           $('.results .results-city').append('<span class="flag-icon ' + flag + ' flag-icon-squared"></span>')
           console.log(response.sys.country);

           //AIzaSyBu5dojGoZVfnOEZdnM_9iBZo-OuB12pNg

 markup_content

     });

     getWeather.fail(function(response){
       console.log('fail: ', response);
       $('.city-error').css('display', 'block');

     });

     getWeather.always(function(response){
       console.log('always', response);

     });
   };

   function setHandlers(){
     $('.getWeatherData').on('submit', function(e){
       e.preventDefault();
       $('.city-error').css('display', 'none');
       var city = $(this).find('.weather-city').val();
       getWeatherData(city);
     });
   }

   /* Flow of webapp */
   function main(){
     getWeatherData('Austin');
     setHandlers();
   }
   main();
 })
