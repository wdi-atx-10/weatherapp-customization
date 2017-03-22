/* Javascript goes here! */
$(function(){

 var apiUrl = 'http://api.openweathermap.org/data/2.5/weather',
  apiKey = '9f7fe3b0ceb0a7cf1e86812469152bc0';

 function getWeatherData(city){
   var getWeather = $.ajax({
     url: apiUrl,
     method: 'GET',
     dataType:'json',
     data: {
       q: city,
       units: 'imperial',
       appid: apiKey
     }
   });



   getWeather.done(function(response){
     console.log(response);
     var city = response.name;
     var temperature = response.main.temp;
     var humidity = response.main.humidity;
     var description = response.weather[0].description;
     var icon = 'http://openweathermap.org/img/w/'+response.weather[0].icon+'.png';
     var gMap = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyDsxFSObYJSaQqf_-q7o7imAcqiKPuW92I&q='+response.name;


     console.log(city, temperature, humidity);

     // Put API on page
     $('.results .results-city').text(city);
     $('.temperature-container .temperature').text(temperature);
     $('.humidity-container .humidity').text(humidity+'%');
     $('.description-container .description').text(description);
     $('.wIcon').html('<img src="'+icon+'"/>');
     $('.maps').attr('src', gMap);
   });

   getWeather.fail(function(error){
     $('.errorMessage').text('You suck at spelling');
     $('.getWeatherData').on('submit', function(){
       $('.errorMessage').text('');
     })
   });

   getWeather.always(function(){


   });


 }

 function setHandlers(){
   $('.getWeatherData').on('submit', function(e){
     e.preventDefault();
     var city = $(this).find('.weather-city').val();
     getWeatherData(city);

   });

 }

 // flow of web app
 function main(){
   getWeatherData('Austin');
   setHandlers();
 }

 main();

});
