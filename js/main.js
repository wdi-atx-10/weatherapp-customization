/* Javascript goes here! */
/* Javascript goes here! */
// http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b1b15e88fa797225412429c1c50c122a1
// api.openweathermap.org/data/2.5/weather?q=London

$(function() {
  var apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
  var apiKey = '9f7fe3b0ceb0a7cf1e86812469152bc0';


  // main feature of website is to get weather data
  function getWeatherData(city) {
    var getWeather = $.ajax({
      url: apiUrl,
      method: 'GET',
      dataType: 'json',
      data: {
        // the query or the entry from form is represented by q
        q: city,
        appid: apiKey,
        units: 'imperial',
      }
    });

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // these three functions below are responses
  getWeather.done(function(response){
    // console.log(response);
    var city = response.name;
    var temperature = response.main.temp;
    var humidity = response.main.humidity;
    var description = response.weather[0].description;
    var flag = response.sys.country;
    var lowerCaseFlag = flag.toLowerCase();

    console.log(city, temperature, humidity);
    console.log(lowerCaseFlag);
    // put API response on the page
    $('.results .results-city').text(city);
    $('.temperature-container .temperature').text(temperature + 'º');
    $('.humidity-container .humidity').text(humidity + '%');
    $('.description-container .description').text(description);
    $('.weather-icon').attr('src','http://openweathermap.org/img/w/'+response.weather[0].icon+'.png');
    $('.flag-icon').addClass('flag-icon-'+lowerCaseFlag);



  });

  getWeather.fail(function(error){
    $('.city-error').show('p').fadeOut(3000);
  });

  getWeather.always(function(){

  })
}
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


  function setHandlers() {
    // doing this in order to target the form
    $('.getWeatherData').on('submit', function(e) {
      e.preventDefault();
      //doing this in order to target the weather-city within the form getWeatherData
      var city = $(this).find('.weather-city').val();
      getWeatherData(city);
    })
  }
  // the flow of our web app -- the main function that controls the other functions and puts it together
  function main() {
    getWeatherData('Austin');
    setHandlers();
  }

  main();
});

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
