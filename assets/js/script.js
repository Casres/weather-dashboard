var temp = $("#temperature");
var wind = $("#wnd");
var humid = $("#humidity-reading");
var uvi = $("#uvi-reading");
var searchHistoryItems = $("#search-history");
var locationsArray = JSON.parse(localStorage.getItem("locations")) || [];

$("#search-btn").on("click", function () {
  var userInput = $("#user-input").val();
  locationsArray.push(userInput);
  localStorage.setItem("locations", JSON.stringify(locationsArray));

  displaySearchHistory(userInput);
  $("#user-input").val("");
});

var displaySearchHistory = function () {
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

// current day weather API
var apiUrl1 =
    "https://api.openweathermap.org/data/2.5/weather?q=Orlando&appid=b11cb0cfc1337df893547ad4b4c74492&units=imperial";
fetch(apiUrl1).then(function (data) {
  data.json().then(function (info) {
    var latCord = info.coord.lat;
    var lonCord = info.coord.lon;

    var apiUrl2 =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" + latCord + "&lon=" + lonCord + "&exclude=hourly,minutely,alerts&appid=b11cb0cfc1337df893547ad4b4c74492&units=imperial";
    fetch(apiUrl2).then(function (data) {
        data.json().then(function (info) {
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

            var days = $(".weekday-report");
            for (let i = 0; i < days.length; i++) {
            var day = days[i];

            // var dateInfo = new Date(info.daily[i].dt*1000);
            // var dateLayout = dateInfo.getDate(DD-MM-YYYY);
            // var dateDay = day.children[0];
            // dateDay.innerText = dateInfo;

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
});

// weather forecast, 5 days


displaySearchHistory();
