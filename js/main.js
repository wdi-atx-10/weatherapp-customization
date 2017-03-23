$(function(){
  var apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
  var apiKey = '9f7fe3b0ceb0a7cf1e86812469152bc0';

  function getWeatherData(city){
    var getWeather = $.ajax({
      url: apiUrl,
      method: 'GET',
      dataType:'json',
      data:{
        q: city,
        appid: apiKey
      }

    });

    getWeather.done(function(response){
      $('.city-error').hide();
      console.log(response);
      var results = response.main;
      var city = response.name;
      var temp = Math.round(results.temp*(9/5)-459.67, -2);
      var hum = results.humidity;
      var description = response.weather[0].description;
      var icon = 'http://openweathermap.org/img/w/'+response.weather[0].icon+'.png';
      var country = response.sys.country;
      var googleKey = 'AIzaSyAZFQ4pAmQo9fugzK2AbDfKQMVlragTi2g';
      var goog = 'https://www.google.com/maps/embed/v1/place?key=' + googleKey + '&q=' + city;
      console.log(goog);

      $('.results .results-city').text(city);
      $('.results .results-city').append('<img src='+icon+'>');
      $('.temperature-container .temperature').text(temp+'°F');
      $('.humidity-container .humidity').text(hum+'%');
      $('.description-container .description').text(description);
      $('.weather-app').append('<iframe width="600"  height="450" frameborder="0" style="border:0" src="'+ goog + '" allowfullscreen> </iframe>');
    });

    getWeather.fail(function(error){
      $('.city-error').show();
    });
  }

  function setHandlers(){
    $('.getWeatherData').on('submit',function(e){
      e.preventDefault();
      var city = $(this).find('.weather-city').val();
      getWeatherData(city);
    });
  }

  //flow of web app
  function main(){
    getWeatherData('Austin');
    setHandlers();
  }

  main();

});
