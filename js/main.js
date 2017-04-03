/* Javascript goes here! */
/* Javascript goes here! */
console.log('am i sane any more?');

//bottom up approach to organization

$(document).ready(function(){

  var apiUrl = "http://api.openweathermap.org/data/2.5/",
   apiKey = "9f7fe3b0ceb0a7cf1e86812469152bc0";

  var googleApiKey = "AIzaSyAa2u92tcl2RE-2MYZ-iHw3hPrBaV6S0hs", googleUrl = "https://www.google.com/maps/embed/v1/view?key="+googleApiKey+"&center=";

  console.log(googleUrl);

  function getWeatherData(city){
    var getWeather = $.ajax({
      url : apiUrl + "weather",
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
      var city = response.name;
      var temperature = response.main.temp;
      var humidity = response.main.humidity;
      var description = response.weather[0].description;
      var countryCode = response.sys.country.toLowerCase();
      var lon = response.coord.lon;
      var lat = response.coord.lat;
      var weatherId = response.weather[0].id;
      console.log(city, temperature, humidity, description, countryCode, lon, lat);
      //put API response into the page
      $('.results .results-city').text(city); //set text value of result-city to city
      $('.temperature-container .temperature').text(temperature.toFixed(0) + String.fromCharCode(176)); //set text value of temperature span to temperature
      $('.humidity-container .humidity').text(humidity + "%"); //set text value of temperature span to temperature
      $('.description-container .description').text(description); //set text value of description span to description
      $('.weather-icon i').attr('class', "owf owf-"+ weatherId +" owf-5x"); //add weather icon
      $('.display-city h1 span').attr('class','flag-icon flag-icon-'+ countryCode); //add flag
      $('.city-error').hide(); //hide error if city is valid
      $('iframe').attr('src', googleUrl + lat + ',' + lon +"&zoom=10"); //add latitude and longitude of city to google url and zoom to designated

      //change background based on weather
      console.log(weatherId);
      if (weatherId >= 200 && weatherId < 300){
        $('body').css('background-image', 'url("https://upload.wikimedia.org/wikipedia/commons/8/88/Thunderstorm_003.jpg")')
      } else if (weatherId >= 300 && weatherId < 400){
        $('body').css('background-image', 'url("https://cdn.pixabay.com/photo/2015/08/03/22/25/rain-874041_960_720.jpg")')
      } else if (weatherId >= 500 && weatherId < 600){
        $('body').css('background-image', 'url("https://cdn.pixabay.com/photo/2013/06/07/15/34/rain-122691_960_720.jpg")')
      } else if (weatherId >= 600 && weatherId < 700){
        $('body').css('background-image', 'url("https://upload.wikimedia.org/wikipedia/commons/b/b2/UK_snow_February_2%2C_2009_img008.jpg")')
      } else if (weatherId >= 600 && weatherId < 700){
        $('body').css('background-image', 'url("https://static.pexels.com/photos/3176/mountains-forest-fog-mist.jpeg")')
      } else if (weatherId > 800 && weatherId < 806 || weatherId === 905 || weatherId >= 952 && weatherId	< 960) {
        $('body').css('background-image', 'url("https://static.pexels.com/photos/928/sky-clouds-cloudy-blue.jpg")')
      } else {
        $('body').css('background-image', 'url("https://static.pexels.com/photos/197340/pexels-photo-197340.jpeg")')
      }

    });
    getWeather.fail(function(error){
      console.log('fail', error);
      $('.city-error').show();
    });
    //.always will always fire
    getWeather.always(function(){

    })
  }

  function getForecast(city){
    var getForecast = $.ajax({
      url : apiUrl + "forecast",
      method : 'GET',
      dataType : 'json',
      data : {
        q : city,
        appid : apiKey,
        units : 'imperial', //convert to farenheit
      }
    });

    /*These two blocks are called promises*/
    getForecast.done(function(response){
        //put API response into the page
      for (var j=0; j<response.list.length; j++){
        var iconId = response.list[j].weather[0].id;
        // var iconUrl = "http://openweathermap.org/img/w/"
        var weekday=new Array(7);
        weekday[0]="Sunday";
        weekday[1]="Monday";
        weekday[2]="Tuesday";
        weekday[3]="Wednesday";
        weekday[4]="Thursday";
        weekday[5]="Friday";
        weekday[6]="Saturday";

        var d = new Date(response.list[j].dt_txt);
        var dayOfWeek = weekday[d.getDay()];

        var dNext = new Date(response.list[j+1].dt_txt);
        var nextDay = weekday[dNext.getDay()];

        if(dayOfWeek === nextDay){
          continue
        } else {
          $('.forecast').append(
            '<div class="day-container">' +
              '<div class="day">' + dayOfWeek +'</div>' +
              '<span>'+response.list[j].main.temp.toFixed(0)+ String.fromCharCode(176)+'</span>' + //display temperature
              '<span>'+ response.list[j].weather[0].main+'</span>' + //display weather description
              '<i class="owf owf-'+ iconId+ ' owf-4x">' +
            '</div>'
          ); //add weather icon
          }
      }



    });
    getForecast.fail(function(error){
      console.log('fail', error);
      $('.city-error').show();
    });
    //.always will always fire
    getForecast.always(function(){

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
      $('.forecast').html('');
      getForecast(city); //pass the city into getForecast function
    });
  }

  //flow of web app, sets up how page will run
  function main(){
    getWeatherData('Austin'); //default city
    getForecast('Austin');
    setHandlers();
  }

main();
//end of doc ready
})
