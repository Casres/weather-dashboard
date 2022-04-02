



var temp = $("#temperature");
var wind = $("#wnd");
var humid = $("#humidity-reading");

// current day weather API
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Orlando&appid=b11cb0cfc1337df893547ad4b4c74492&units=imperial";
fetch(apiUrl).then(function (data) {
  data.json().then(function (info) {
    // current day temperature
    var currentTemp = info.main.temp;
    temp.text(currentTemp);
    // current day wind speed
    var currentWind = info.wind.speed;
    wind.text(currentWind);
    // current day humidity
    var currentHumidity = info.main.humidity;
    humid.text(currentHumidity);
  });
});

// weather forecast, 5 days
var apiUrl2 = "https://api.openweathermap.org/data/2.5/forecast?q=Orlando&appid=b11cb0cfc1337df893547ad4b4c74492&units=imperial";
fetch(apiUrl2).then(function (data) {
  data.json().then(function (info) {
    var days = $(".weekday-report");
    for (let i = 0; i < days.length; i++) {
      var day = days[i];
      console.log(info);
      // grabs the needed info rom API
      var tempReport = info.list[i].main.temp;
      // points to parent element that holds the child element where the info goes
      var tempDay = day.children[2];
      // points to the child element (which in this case is a <span>) that the info goes into
      var tempDay2 = tempDay.children[0];
      // puts the info, grabbed from the API into the span element
      tempDay2.innerText = tempReport;

      // -----------------------------//
      
      // does the same for the wind spd
      var windSpdReport = info.list[i].wind.speed;
      var windSpdDay = day.children[3];
      var windSpdDay2 = windSpdDay.children[0];
      windSpdDay2.innerText = windSpdReport;

      // -----------------------------//

      // does the same for humidity
      var humidityReport = info.list[i].main.humidity;
      var humidityDay = day.children[4];
      var humidityDay2 = humidityDay.children[0];
      humidityDay2.innerText = humidityReport;
    };
  });
});

// the current day forecast
var currentDayWeather = function () {};

// week forecast 5 day
var fiveDayWeather = function () {};
