
//shorthand for document.ready:
$(function(){
  var apiUrl='http://api.openweathermap.org/data/2.5/weather?';
  var apiKey='9f7fe3b0ceb0a7cf1e86812469152bc0';
  var iconUrl='http://openweathermap.org/img/w/10d.png';
  //get data from api
  function getWeatherData(city){
    var getWeather =$.ajax({
      url: apiUrl,
      method: 'GET',
      dataType: 'json',
      data: {  //instead of ?q you put in data you want; look at the existing url for this info
        q: city,
        appid: apiKey,
        units: 'imperial',
      }

    });

    // if it gets info or request successfully
    getWeather.done(function(response){
      // console.log(response);
      var city=response.name,  //shorthand so don't have to declare var for temp and humidity
            temperature=response.main.temp,
            humidity=response.main.humidity,
            description=response.weather[0].description,
            icon='http://openweathermap.org/img/w/' + response.weather[0].icon +'.png',
            Flag=response.sys.country,
            flag=Flag.toLowerCase(),
            flagUrl='https://lipis.github.io/flag-icon-css/flags/4x3/' +flag +'.svg';


              console.log(city, temperature, humidity)

      //put API response into the DOM
      $('.results').find('.results-city').text(city).append('<img src="'+iconUrl+'"/>');
      $('.temperature-container .temperature').text(temperature + ' F');
      $('.humidity-container .humidity').text(humidity);
      $('#flag').html('<img height="40px" width="60" src='+flagUrl+' />');


    });

    getWeather.fail(function(error){
      alert('error!', error),
      $('.getWeatherData .city-error').attr('style', 'block');

    });

    getWeather.always(function(){

    })


  }
  //setting event handlers
  function setHandlers(){        //get info from form in html which has class getWeatherData
    $('.getWeatherData').on('submit', function(e){
      e.preventDefault(); //prevent default of submitting form and first pull value
    var city= $(this).find('.weather-city').val(); //look for where the user input the data or the city they want
    getWeatherData(city);//call function
    });

  }

  function main() {
    //what do we want when it loads? default city w
    getWeatherData('Austin');
    setHandlers();

  }
  /*flow of our webapp*/
  main();
});


//bottom up approach; separate pieces and then main fnc is the one who calls the functions and shows the flow of the info
