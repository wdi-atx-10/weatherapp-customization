/* Javascript goes here! */
/* Javascript goes here! */
console.log('am i sane any more?');

//bottom up approach to organization

$(document).ready(function(){

  var apiUrl = "http://api.openweathermap.org/data/2.5/weather",
   apiKey = "9f7fe3b0ceb0a7cf1e86812469152bc0";

  var googleApiKey = "AIzaSyAa2u92tcl2RE-2MYZ-iHw3hPrBaV6S0hs", googleUrl = "https://www.google.com/maps/embed/v1/view?key="+googleApiKey+"&center=";

  console.log(googleUrl);

  function getWeatherData(city){
    var getWeather = $.ajax({
      url : apiUrl,
      method : 'GET',
      dataType : 'json',
      data : {
        q : city,
        appid : apiKey,
        units : 'imperial', //convert to farenheit
      }
    });

    /*These two blocks are called promises*/
    getWeather.done(function(response){
      // console.log('success', response);
      var city = response.name, temperature = response.main.temp, humidity = response.main.humidity, description = response.weather[0].description, countryCode = response.sys.country.toLowerCase(); lon = response.coord.lon; lat = response.coord.lat;
      console.log(city, temperature, humidity, description, countryCode, lon, lat);
      //put API response into the page
      $('.results .results-city').text(city); //set text value of result-city to city
      $('.temperature-container .temperature').text(temperature); //set text value of temperature span to temperature
      $('.humidity-container .humidity').text(humidity); //set text value of temperature span to temperature
      $('.description-container .description').text(description); //set text value of description span to description
      $('.weather-icon').attr('src', "http://openweathermap.org/img/w/"+response.weather[0].icon+".png"); //add weather icon
      $('.display-city h1 span').attr('class','flag-icon flag-icon-'+ countryCode); //add flag
      $('.city-error').hide(); //hide error if city is valid
      $('iframe').attr('src', googleUrl + lat + ',' + lon +"&zoom=10"); //add latitude and longitude of city to google url and zoom to designated
      console.log(googleUrl + lat + ',' + lon); //check
    });
    getWeather.fail(function(error){
      console.log('fail', error);
      $('.city-error').show();
    });
    //.always will always fire
    getWeather.always(function(){

    })
  }

  //set event handlers
  function setHandlers(){
    //when enter a city get that data and pass it into getWeatherData function
    $('.getWeatherData').on('submit', function(e){ //in this case we don't need an e, but it's convention to put it in
      e.preventDefault(); //stop default behavior of form submission which is to send you somewhere/refresh
      var city = $(this).find('.weather-city').val(); //get city inputted and set to variable
      console.log(city); //test
      getWeatherData(city); //pass the city into getWeatherData function
    });
  }

  //flow of web app, sets up how page will run
  function main(){
    getWeatherData('Austin'); //default city
    setHandlers();
  }

main();
//end of doc ready
})
