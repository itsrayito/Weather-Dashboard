// this will get the search DOM elements
var form = document.getElementById("form-container");
var citySearch = document.getElementById("city-search");
var searchButton = document.getElementById("search-button");
var recentSearches = document.getElementById("button-container");
var buttons = document.getElementById("buttons");

// this will get the DOM for the current weather
var selectedCity = document.getElementById("current-city");
var currentDate = document.getElementById("current-date");
var currentTemperature = document.getElementById("current-temperature");
var currentWind = document.getElementById("current-wind");
var currentHumidity = document.getElementById("current-humidity");
var currentUVIndex = document.getElementById("current-uv-index");
var currentWeatherIcon = document.getElementById("current-weather-icon");

// this gets the first day predicted weather's DOM element
var firstDayDate = document.getElementById("first-day-date");
var firstDayIcon = document.getElementById("first-day-icon");
var firstdayTemperature = document.getElementById("first-day-temperature");
var firstDayWind = document.getElementById("first-day-wind");
var firstDayHumidity = document.getElementById("first-day-humidity");

// this gets the second day predicted weather DOM element
var secondDayDate = document.getElementById("second-day-date");
var secondDayIcon = document.getElementById("second-day-icon");
var secondDayTemperature = document.getElementById("second-day-temperature");
var secondDayWind = document.getElementById("second-day-wind");
var secondDayHumidity = document.getElementById("second-day-humidity");

// this gets the third day predicted weather DOM element
var thirdDayDate = document.getElementById("third-day-date");
var thirdDayIcon = document.getElementById("third-day-icon");
var thirdDayTemperature = document.getElementById("third-day-temperature");
var thirdDayWind = document.getElementById("third-day-wind");
var thirdDayHumidity = document.getElementById("third-day-humidity");

// this gets the Fourth day predicted weather DOM element
var fourthDayDate = document.getElementById("fourth-day-date");
var fourthDayIcon = document.getElementById("fourth-day-icon");
var fourthDayTemperature = document.getElementById("fourth-day-temperature");
var fourthDayWind = document.getElementById("fourth-day-wind");
var fourthDayHumidity = document.getElementById("fourth-day-humidity");

// this gets the fifth day predicted weather DOM element
var fifthDayDate = document.getElementById("fifth-day-date");
var fifthDayIcon = document.getElementById("fifth-day-icon");
var fifthDayTemperature = document.getElementById("fifth-day-temperature");
var fifthDayWind = document.getElementById("fifth-day-wind");
var fifthDayHumidty = document.getElementById("fifth-day-humidity");


// this is where the NON DOM elements begin

// the API information for the OpenWeatherMap website
var apiKey = "e131f57ee59f114737040c6655dfc6ad";
var currentLongitude = 0;
var currentLatitude = 0;

// API for Luxon to exhibit the date and time
var DateTime = luxon.DateTime;
var now = DateTime.now();

// this is going to start the list of the recently searched
var buttonList = [];

// this is to check if there is a buttonList in the localStorage
if (!(JSON.parse(localStorage.getItem("buttonlist")))) {
    localStorage.setItem("buttonlist", JSON.stringify(buttonList));
}

// this will save a buttonList in the localStorage if one is there
else {
    buttonList = JSON.parse(localStorage.getItem("buttonlist"));
}
    // End for Non DOM elements

// this is going to fetch the information on the current city that is being searched on using the OpenWeatherMap API
function fetchWeatherData(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + e131f57ee59f114737040c6655dfc6ad
    )
    .then(response => response.json())
    .then(data => {
        // this is going to display the current city name
        selectedCity.innerHTML = city;

        // this will display the current time and date
        currentDate.innerHTML = "Date and Time".bold() + ": " + now.tolocaleString(DateTime.DATETIME_MED);

        // going to display the chosen city current temperature
        currentTemperature.innerHTML = "Temperature in Degrees Farenheit".bold() + ": " + Math.round(data.main.temp - 273.15);

        // displaying the chosen city current wind conditions
        currentWind.innerHTML = "Wind speed in Miles Per Hour".bold() + ": " + data.wind.speed;

        // displaying the chosen city current humidity conditions
        currentHumidity.innerHTML = "Humidity %".bold() + ": " + data.main.humidity;

        // this will save the latitude and longitude for the selected searched city
        currentLongitude = data.coord.lon;
        currentLatitude = data.coord.lat;
    });

    // will fetch the second batch data from the current searched city coming from the OpenweatherMap API endpoint
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + currentLatitude + "&lon=" + currentLongitude + "&exclude=hourly,daily&appid=" + e131f57ee59f114737040c6655dfc6ad)
    .then(response => response.json())
    .then(data => {

        // this is going to show the current UV index
        currentUVIndex.innerHTML = "Current UV Index".bold() + ": " + data.current.uvi;

        // this will change the color depending on LOW levels of UV
        if (data.current.uvi <= 3){
            currentUVIndex.classList.remove("yellow");
            currentUVIndex.classList.remove("red");
            currentUVIndex.classList.add("green");
        }

        // this will change the color depending on MEDIUM levels of UV
        if ((data.current.uvi > 3) && (data.current.uvi <= 6)) {
            currentUVIndex.classList.remove("green");
            currentUVIndex.classList.remove("red");
            currentUVIndex.classList.add("yellow");
        }

        // this will change the color depending on HIGH levels of UV
        if (data.current.uvi > 6) {
            currentUVIndex.classList.remove("green");
            currentUVIndex.classList.remove("yellow");
            currentUVIndex.classList.add("red");
        }

        // this will save the information above to the localStorage
        var data2 = data;
        localStorage.setItem("weatherdata2", JSON.stringify(data2));

    });

    // this will fetch the third batch data from the current searched city coming from the OpenWeatherMap API endpoint
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + e131f57ee59f114737040c6655dfc6ad)
    .then(response => response.json())
    .then(data => {

        // this will display the icon for the current weather
        var data2 = data;
        localStorage.setItem("weatherdata2", JSON.stringify(data2));
    });

    // third batch of data from an endpoint coming from OpenWeatherMap API fetch for the predicted weather
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid" + e131f57ee59f114737040c6655dfc6ad)
    .then(response => response.json())
    .then(data => {

        // show the current weather icon for the first day
        var iconValue = data.list[0].weather[0].icon;
        currentWeatherIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";

        
        // beginning of the first day forecasted weather
        
        // ----------------------------------------------------

        // show the forecasted date for the first date
        firstDayDate.innerHTML = "Date and Time".bold() + ": " + data.list[2].dt_txt + " (24-Hour Clock)";

        // shows the forecasted weather icon for the first day
        var iconValue = data.list[2].weather[0].icon;
        firstDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";

        // shows the forecasted weather for the first day
        firstdayTemperature.innerHTML = "Temperature in Degrees Farenheit".bold() + ": " + Math.round(data.list[2].main.temp - 273.15);

        // shows the forecasted wind for the first day
        firstDayWind.innerHTML = "Wind Speed in Miles per Hour".bold() + ": " + data.list[2].wind.speed;

        // shows the forecasted humidity for the first day
        firstDayHumidity.innerHTML = "Humidity %".bold() + ": " + data.list[2].main.humidity;


        // end of first day weather forecast 
        
        //-------------------------------------------------------

        // beginning of second day forecasted weather

        //-------------------------------------------------------

        // shows the forecasted date for the second day
        secondDayDate.innerHTML = "Date and Time".bold() + ": " + data.list[10].dt_txt + " (24-Hour Clock)";

        // shows the forecasted weather icon for the second day
        var iconValue = data.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";

        // shows the forecasted temperature for the second day
        secondDayTemperature.innerHTML = "Temperature in Degrees Farenheit".bold() + ": " + Math.round(data.list[10].main.temp - 273.15);

        // shows the forecasted wind speed for the second day
        secondDayWind.innerHTML = "Wind Speed in Miles Per Hour".bold() + ": " + data.list[10].wind.speed;

        // shows the forecasted humidity for the second day
        secondDayHumidity.innerHTML = "Humidity %".bold() + ": " + data.list[10].main.humidity;

        // end of the second day weather forecast

        //-------------------------------------------------------

        // beginning of the third day forecasted weather

        // shows the forecated date for the third day
        thirdDayDate.innerHTML = "Date and Time".bold() + ": " + data.list[10].dt_txt + " (24-Hour Clock)";

        // shows the forecasted weather icon for the third day
        var iconValue = data.list[18].weather[0].icon;
        thirdDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";

        // shows the forecasted temperature for the third day
        thirdDayTemperature.innerHTML = "Temperature in Degrees Farenheit".bold() + ": " + Math.round(data.list[18].main.temp - 273.15);

        // shows the forecasted wind speed for the third day
        thirdDayWind.innerHTML = "Wind Speed in Miles Per Hour".bold() + ": " + data.list[18].wind.speed;

        // shows the forecasted humidity for the third day
        thirdDayHumidity.innerHTML = "Humidity %".bold() + ": " + data.list[18].main.humidity;

        // end for the third day weather forecast

        //---------------------------------------------------------

        // beginning of the fourth day forecasted weather

        // shows the forecasted date for the fourth day
        fourthDayDate.innerHTML = "Date and Time".bold() + ": " + data.list[10].dt_txt + " (24 Hour Clock)";

        // shows the forecasted weather icon for the fourth day
        var iconValue = data.list[18].weather[0].icon;
        fourthDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";

        // shows the forecasted temperature for the fourth day
        fourthDayTemperature.innerHTML = "Temperature in Degrees Farenheit".bold() + ": " + Math.round(data.list[18].main.temp - 273.15);

        // shows the forecasted wind speed for the fourth day
        fourthDayWind.innerHTML = "Wind Speed in Miles Per Hour".bold() + ": " + data.list[18].wind.speed;

        // shows the forecasted humidity for the fourth day
        fourthDayHumidity.innerHTML = "Humidity %".bold() + ": " + data.list[18].main.humidity;

        // end for the fourth day weather forecast

        //-----------------------------------------------------------

        // beginning for the fifth day forecasted weather

        // shows the forecasted date for the fifth day
        fifthDayDate.innerHTML = "Date and Time".bold() + ": " + data.list[10].dt_txt + " (24 Hour Clock)";

        // shows the forecasted weather icon for the fifth day
        var iconValue = data.list[18].weather[0].icon;
        fifthDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";

        // shows the forecasted temperature for the fifth day
        fifthDayTemperature.innerHTML = "Temperature in Degrees Farenheit".bold() + ": " + Math.round(data.list[18].main.temp - 273.15);

        // shows the forecasted wind speed for the fifth day
        fifthDayWind.innerHTML = "Wind Speed in Miles Per Hour".bold() + ": " + Math.round(data.list[18].main.temp - 273.15);

        // shows the forecasted humidity for the fifth day
        fifthDayHumidty.innerHTML = "Humidity %".bold() + ": " + data.list[18].main.humidity;

        // end for the fifth day weather forecast

        //----------------------------------------------------------

        // all the data above from this fetch will be svaed in the localStorage
        var data3 = data;
        localStorage.setItem("weatherdata3", JSON.stringify(data3));

    })

}

// this is going to load the information of the city that was recently searched
function load() {

    // this will get the data that has been saved in the localStorage
    var data1 = JSON.parse(localStorage.getItem("weatherdata1")) || {};
    var data2 = JSON.parse(localStorage.getItem("weatherdata2")) || {};
    var data3 = JSON.parse(localStorage.getItem("weatherdata3")) || {};

    // any saved information from the localStorage will be displayed
    if (JSON.parse(localStorage.getItem("weatherdata1"))) {

        // show the city name that was selected 
        selectedCity.innerHTML = data1.name;

        // show the current date and time
        currentDate.innerHTML = "Date and Time".bold() + ": " + now.tolocaleString(DateTime.DATETIME_MED);

        // shows the current temperature for the chosen city
        currentTemperature.innerHTML = "Temperature in Degrees Farenheit".bold() + ": " + Math.round(data1.main.temp - 273.15);

        // show the current wind speed for the chosen city
        currentWind.innerHTML = "Wind Speed in Miles Per Hour".bold() + ": " + data1.wind.speed;

        // show the current humidity for the chosen city
        currentHumidity.innerHTML = "Humidity %".bold() + ": " + data1.main.humidity;

        // this will save the latitude and longitude for the chosen city
        currentLatitude = data1.coord.lon;
        currentLongitude = data1.coord.lat;

        // this is going to display the uv index for the current day
        currentUVIndex.innerHTML = "Curren UV Index".bold() + ": " + data2.current.uvi;

        // this section will be on the colors of either high, low, or moderate UV index

        // low UV Index
        if (data2.current.uvi <= 3) {
            currentUVIndex.classList.remove("yellow");
            currentUVIndex.classList.remove("red");
            currentUVIndex.classList.remove("green");
        }

        // moderate UV Index
        if ((data2.current.uvi > 3)&& (data2.current.uvi <= 6)) {
            currentUVIndex.classList.remove("green");
            currentUVIndex.classList.remove("red");
            currentUVIndex.classList.add("yellow");
        }

        // high UV index
        if (data2.current.uvi > 6) {
            currentUVIndex.classList.remove("green");
            currentUVIndex.classList.remove("yellow");
            currentUVIndex.classList.add("red");
        }

        // this is going to show the weather icon for the current weather
        var iconValue = data3.list[0].weather[0].icon;
        currentWeatherIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";

        // show the date for the first day's predicted date
        firstDayDate.innerHTML = "Date and Time".bold() + ": " + data3.list[2].dt_txt + " (24-Hour Clock)";

        // show the forecasted weather icon for the first day
        var iconValue = data3.list[2].weather[0].icon;
        firstDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";

        // show the forecasted temperature for the first day
        firstdayTemperature.innerHTML = "Temperature in Degrees Farenheit".bold() + ": " + Math.round(data3.list[2].main.temp - 273.15);

        // show the forecasted wind speeds for the first day
        firstDayWind.innerHTML = "Wind Speed in Miles per Hour".bold() + ": " + data3.list[2].wind.speed;

        // show the forecasted humidity level for the first day
        firstDayHumidity.innerHTML = "Humidity %".bold() + ": " + data3.list[2].main.humidity;



        // show the forecasted date for the second day
        secondDayDate.innerHTML = "Date and Time".bold() + ": " + data3.list[10].dt_txt + " (24-Hour Clock)";

        // show the forecasted weather icon for the second date
        var iconValue = data3.list[10].weather[0].icon;
        secondDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt=Forecasted Weather Icon'></img>";

        // show the forecasted temperature for the second day
        secondDayTemperature.innerHTML = "Temperature in Degrees Farenheit".bold() + ": " + Math.round(data3.list[10].main.temp - 273.15);

        // show the forecasted wind speeds for the second day
        secondDayWind.innerHTML = "Wind Speed in Miles per Hour".bold() + ": " + data3.list[10].wind.speed;

        // show the forecasted humidity level for the second day
        secondDayHumidity.innerHTML = "Humidity %".bold() + ": " + data3.list[10].main.humidity;



        // show the forecasted date for the third day
        thirdDayDate.innerHTML = "Date and Time".bold() + ": " + data3.list[18].dt_txt + " (24-Hour Clock)";

        // show the forecasted weather icon for the third date
        var iconValue = data3.list[18].weather[0].icon;
        thirdDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt=Forecasted Weather Icon'></img>";

        // show the forecasted temperature for the third day
        thirdDayTemperature.innerHTML = "Temperature in Degrees Farenheit".bold() + ": " + Math.round(data3.list[18].main.temp - 273.15);

        // show the forecasted wind speeds for the third day
        thirdDayWind.innerHTML = "Wind Speed in Miles per Hour".bold() + ": " + data3.list[18].wind.speed;

        // show the forecasted humidity levels for the third day
        thirdDayHumidity.innerHTML = "Humidity %".bold() + ": " + data3.list[18].main.humidity;



        // show the forecasted date for the fourth day
        fourthDayDate.innerHTML = "Date and Time".bold() + ": " + data3.list[26].dt_txt + " (24-Hour Clock)";

        // show the forecasted weather icon for the fourth day
        var iconValue = data3.list[26].weather[0].icon;
        fourthDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt=Forecasted Weather Icon'></img>";

        // show the forecasted temperature for the fourth day
        fourthDayTemperature.innerHTML = "Temperature in Degrees Farenheit".bold() + ": " + Math.round(data3.list[26].main.temp - 273.15);

        // show the forecasted wind speeds for the fourth day
        fourthDayWind.innerHTML = "Wind Speeds in Miles Per Hour".bold() + ": " + data3.list[26].wind.speed;

        // show the forecasted humidity levels for the fourth day
        fourthDayHumidity.innerHTML = "Humidity %".bold() + ": " + data3.list[26].main.humidity;



        // show the forecasted date for the fifth day
        fifthDayDate.innerHTML = "Date and Time".bold() + ": " + data3.list[34].dt_txt + " (24-Hour Clock)";

        // show the forecasted weather icon for the fifth day
        var iconValue = data3.list[34].weather[0].icon;
        fifthDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";

        // show the forecasted temperature for the fifth day
        fifthDayTemperature.innerHTML = "Temperature in Degrees Farenheit".bold() + ": " + Math.round(data3.list[34].main.temp - 273.15);

        // show the forecasted wind speeds for the fifth day
        fifthDayWind.innerHTML = "Wind Speed in Miles Per Hour".bold() + ": " + data3.list[34].wind.speed;

        // shows the forecasted humidity for the fifth day
        fifthDayHumidty.innerHTML = "Humidity %".bold() + ": " + data3.list[34].main.humidity;
    }

    // this will add a button in the recent searched container for the city
    for (var i = 0; (buttonList.length > 0) && (i < buttonList.length); i++) {
        addCityButton(buttonList[i]);
    }
}

// getting a button for a city that has just been searched
function addCityButton(city) {
    // this will make a new button for the searched city in the container where recently searched cities will show
    var newButton = document.createElement("button");
    newButton.type = "submit";
    newButton.id = city;
    newButton.classList.add("btn");
    newButton.classList.add("btn-dark");
    newButton.value = city;
    newButton.textContent = city;

    // add a button in the container that has the recent searched cities
    buttons.appendChild(newButton);
}

// this will load existing weather data from the localStorage
load();

// this will load the application each minute
setInterval(function() {location.reload();}, 60*1000);

// event listeners

recentSearches.addEventListener('submit', function(event) {

    // this will prevent event behaviors
    event.preventDefault();

    var searchValue = citySearch.value;

    // this is going to fetch the first batch from the OpenWeatherMap API endpoint for the current weather
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + e131f57ee59f114737040c6655dfc6ad)
    .then(response => response.json())
    .then(data => {

        // if the information put was not successful, this will alert the user
        if ((searchValue == "") || (data.cod == 404)) {
            window.alert("'" + searchValue + "'" + " is not a valid city! Try again.");
        }

        // this is for when the API is successful, then this will fetch the current weather information for the selected city
        else {
            fetchWeatherData(searchValue);

            // this will start a counter
            var j = 0;

            // this will check to see if the city that was searched for is already in the buttonList
            for (var i = 0; (buttonList.length > 0) && (i < buttonList.length); i++) {
                if (buttonList[i] === searchValue) {
                    j++;
                }
            }

            // if the city that was searched for is not in the buttonList, then this will add it into that and a button will be made for it in the recent searched cities
            if (j === 0) {
                buttonList.push(searchValue)
                localStorage.setItem("buttonList", JSON.stringify(buttonList));
                addCityButton(searchValue);
            }
        }

    });
});

// this is the event listener for the buttons in the recently searched cities
recentSearches.addEventListener('click', function(event) {

    // this will prevent default behaviors
    event.preventDefault();

    // this is going to retrieve the search value
    var searchValue = event.target.value;
    fetchWeatherData(searchValue);
});

