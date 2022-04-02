


var fudge = $("#ice-cream");
var cherry = $("#chocolate");


// current day weather API
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Orlando&appid=b11cb0cfc1337df893547ad4b4c74492&units=imperial"
fetch(apiUrl).then(function (pasta) {
    pasta.text()
    .then(function (bacon) {
            // console.log(bacon);
        }
        )
    });
    
    
    // weather forecast, 5 days
    var apiUrl2 = "https://api.openweathermap.org/data/2.5/forecast?q=Orlando&appid=b11cb0cfc1337df893547ad4b4c74492&units=imperial"
    fetch(apiUrl2).then(function (pizza) {
        pizza.json()
        .then(function (burger) {
        var tempTest = burger.list[0].main.temp;
        var tempTest2 = burger.list[3].wind.speed;
        var tempTest3 = burger.list[0].main.humidity;
        var tempTest4 = burger.list[3].wind.speed;
        
        // console.log(burger.list[0].main.temp);
        // console.log(burger.list[3].wind.speed);
    })
});

// the current day forecast 
var currentDayWeather = function () {
fudge.text(tempTest);
cherry.text(tempTest2);
}

// week forecast 5 day
var fiveDayWeather = function () {
    
}
