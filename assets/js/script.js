


var temp = $("#temperature");
var wind = $("#wnd");
var humidness = $("humidity-reading");


// current day weather API
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Orlando&appid=b11cb0cfc1337df893547ad4b4c74492&units=imperial"
fetch(apiUrl).then(function (data) {
    data.json().then(function (info) {
        var currentTemp = info.main.temp;
        temp.text(currentTemp);
        
        var currentWind = info.wind.speed;
        wind.text(currentWind);

        var currentHumidity = info.main.humidity;
        humidness.text(currentHumidity);
        
        console.log(currentHumidity);

        // console.log(bacon);
    });
});
    
    
    // weather forecast, 5 days
    var apiUrl2 = "https://api.openweathermap.org/data/2.5/forecast?q=Orlando&appid=b11cb0cfc1337df893547ad4b4c74492&units=imperial"
    fetch(apiUrl2).then(function (data) {
        data.json()
        .then(function (info) {
        var tempTest = info.list[0].main.temp;
        var tempTest2 = info.list[3].wind.speed;
        var tempTest3 = info.list[0].main.humidity;
        
        // console.log(burger.list[0].main.temp);
        // console.log(burger.list[3].wind.speed);
    })
});

// the current day forecast 
var currentDayWeather = function () {
temp.text(tempTest);
wind.text(tempTest2);
}

// week forecast 5 day
var fiveDayWeather = function () {
    
}
