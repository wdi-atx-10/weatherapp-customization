# Weather App
Weather App built for class project using Open Weather API and Google Maps API. Unfortunately, Open Weather API does not currently support secure connections for AJAX calls, so this site is not deployed.

Functionality:
  1. Display current weather, humidity and temperature for selected city
  2. Display country flag for selected city
  3. Display 5 day forecast for selected city
  4. Display location of selected city on maps
  5. Change background based on current weather for selected city

Screenshots:
[Seattle Weather](http://i.imgur.com/BROV8jl.png)
[Austin Weather and Map](http://i.imgur.com/jc8H2mw.png)
[Madrid Weather](http://i.imgur.com/1OOdnVj.png)



## Class Instructions

Now that we have built a basic weather app, let's go ahead and make it our own! Inside of this repository is the starter code from the beginning of class, go ahead and paste in your own code when you are ready to submit it via pull request.

### Convert to Fahrenheit
Right now the temperature is in kelvin units, using this existing API, make the JSON response give back the temperature in Fahrenheit.

Check out the API documentation, and scroll to the bottom under "Unit Format" to see how this is done.
http://openweathermap.org/current

### Include an icon representing the weather above the city
Let's make this app a little more visual by adding weather icons on the page representing the cities existing weather.

If you look at the JSON response, at `response.weather[0].icon` , we can see that the JSON gives us an icon ID such as `03n`. Let's look at the documentation to see how we can take that ID here:
http://openweathermap.org/weather-conditions

Using what we see on this page, how can we get icons on the screen?

### Make a city cannot be found error message

The API for this weather app is actually pretty stable when it comes to the cities you can provide. But occasionally if you provide a city name that it doesn't like, such as "zzzzzzzzz", the api will send back an error. Right now, we are using the jQuery `$.get()` method, let's look at the documentation and look at `.fail()`, and think about how we can implement an error message with this.

![error message](https://content.screencast.com/users/ddunn91/folders/Jing/media/2c0b4d62-333f-4a6c-a2a2-5725c04b6fd0/00000048.png)

jQuery $.get() documentation: https://api.jquery.com/jquery.get/

### Make Flags for city countries
Another thing that our API gives us is the country id of whichever country the given city is located in.

This is located at `response.sys.country`.

Using this CSS flags library below, how can we make it so our weathe app shows a flag symbol of whichever country the city is in?

https://github.com/lipis/flag-icon-css
http://flag-icon-css.lip.is/

**Example:**

![add flags](https://content.screencast.com/users/ddunn91/folders/Jing/media/8735906a-dbec-4137-b1d6-12488cde976f/00000050.png)

### Add some CSS
Time to slap some lipstick on this pig, so far we've created an app that has some functionality, but has no style. Go ahead and style it up and make it yours!

### Google maps
Why not go above and beyond and use another API, like the google maps api? Go ahead and get and API key here:
https://developers.google.com/maps/documentation/embed/guide#api_key

and then get the html to embed the google maps here:
https://developers.google.com/maps/documentation/embed/guide

Take a look at the sample google maps embed code:
``` javascript
<iframe
  width="600"
  height="450"
  frameborder="0" style="border:0"
  src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY
    &q=Space+Needle,Seattle+WA" allowfullscreen>
</iframe>
```

What do you need to change here in order to get it working the way you want it to?
