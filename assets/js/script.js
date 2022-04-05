








var temp = $("#temperature");
var wind = $("#wnd");
var humid = $("#humidity-reading");
var uvi = $("#uvi-reading");
var icon = $("#current-weather-icon");
var searchHistoryItems = $("#search-history");
var locationsArray = JSON.parse(localStorage.getItem("locations")) || [];

// where the user searches for city & checking to see if it's an actual city that the API can get information on
$("#sbmt-user-input-form").on("submit", function (e) {
  e.preventDefault();
  // capturing the users input
  var userInput = $("#user-input").val();
  // putting it into the api
  var apiUrl1 = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=b11cb0cfc1337df893547ad4b4c74492&units=imperial";
  fetch(apiUrl1).then(function (data) {
    // testing to see if the user input is an actual city
    if (data.status === 404) {
      alert("City not found");
      return;
    } else {
      // if it is, then it is sent out to the other functions
      localStorageFunc(userInput)
      weatherDisplay(data)
      userCityInputDisplay(userInput)
    }
  });
  // resets search area
  $("#user-input").val("");
});

// importing user input to local storage
function localStorageFunc (data) {
  // pushes to array 
  locationsArray.push(data);
  // stores array in local storage 
  localStorage.setItem("locations", JSON.stringify(locationsArray));

  displaySearchHistory(data);
}

// displays search history in a column
function displaySearchHistory () {
  $("#search-history").empty();

  for (let i = 0; i < locationsArray.length; i++) {
    // this is the current iteration of the loop we're in for the locationsArray
    const searchHistoryList = locationsArray[i];
    // this creates the element for every iteration
    var listItems = document.createElement("li");
    var listItemsText = document.createElement("div");

    console.log(listItems);
    listItems.className = "searchListItem m-4";
    listItemsText.className = "searchListText m-3";
    listItemsText.innerHTML = searchHistoryList;

    listItems.appendChild(listItemsText);
    searchHistoryItems.append(listItems);
  }
};

// takes users input and places at the top of the page to display
function userCityInputDisplay(data) {
  // the title area of what to user inputted
  var cityTitle = $("#city-name-title");
  $(cityTitle).addClass("city-title-style d-flex justify-content-center mb-5 mt-4");
  cityTitle.text(data);
}

// where the weather will be displayed based on the users input
var weatherDisplay = function (data) {
    data.json().then(function (info) {
    var latCord = info.coord.lat;
    var lonCord = info.coord.lon;

    var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latCord + "&lon=" + lonCord + "&exclude=hourly,minutely,alerts&appid=b11cb0cfc1337df893547ad4b4c74492&units=imperial";
    fetch(apiUrl2).then(function (data) {
      data.json().then(function (info) {
        // current day date
        // var currentDayDate = info.daily[i].dt;
        // var currentWeatherIcon = info.weather.icon;
        // icon.img(currentWeatherIcon);
        // current day temperature
        var currentTemp = info.current.temp;
        temp.text(currentTemp);
        // current day wind speed
        var currentWind = info.current.wind_speed;
        wind.text(currentWind);
        // current day humidity
        var currentHumidity = info.current.humidity;
        humid.text(currentHumidity);
        // current day UV
        var currentUV = info.current.uvi;
        uvi.text(currentUV);

        // 5 day forecast
        var days = $(".weekday-report");
        for (let i = 0; i < days.length; i++) {
          var day = days[i];

          var dateInfo = new Date(info.daily[i].dt * 1000);
          // var dateLayout = dateInfo.getDate(DD-MM-YYYY);
          var dateDay = day.children[0];
          dateDay.innerText = dateInfo;

          // grabs the needed info rom API
          var tempReport = info.daily[i].temp.day;
          // points to parent element that holds the child element where the info goes
          var tempDay = day.children[2];
          // points to the child element (which in this case is a <span>) that the info goes into
          var tempDay2 = tempDay.children[0];
          // puts the info, grabbed from the API into the span element
          tempDay2.innerText = tempReport;

          // -----------------------------//

          // does the same for the wind spd
          var windSpdReport = info.daily[i].wind_speed;
          var windSpdDay = day.children[3];
          var windSpdDay2 = windSpdDay.children[0];
          windSpdDay2.innerText = windSpdReport;

          // -----------------------------//

          // does the same for humidity
          var humidityReport = info.daily[i].humidity;
          var humidityDay = day.children[4];
          var humidityDay2 = humidityDay.children[0];
          humidityDay2.innerText = humidityReport;
        }
      });
    });
  });

}; 

displaySearchHistory();
