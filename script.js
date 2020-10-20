var cityToSearch = "";
var loadLastCity = "";
var apiKey = "&APPID=549bf1423006452f81dc918ddda35db0";

cityHist= [];

init();


function init() {
    pullCityFromStor();

    if(loadLastCity) {
        cityToSearch = cityHist[cityHist.length - 1].location;
        sCityWeather();
        sCityForecast();
        loadLastCity = false;
    }

}


function sCityWeather() {
    var bURl =  "http://api.openweathermap.org/data/2.5/weather?q=";
    var lURL = cityToSearch;
    var locaUnits = "&Units=imperial";
    var queryURl = bURl + lURL  + locaUnits + apiKey;

    $.ajax({
        url: queryURl,
        method: "GET",
    }).then(function (response){
        var cName = response.name;
        var cDate = monent.unix(response.dt).format("MM/DD/YYYY");
        var cIcon = response.weather[0].icon
        var cIconUrl = "http://api.openweathermap.org/img/w/" + cIcon + ".png";
        var cTemp = response.main.temp;
        var cHumid = response.main.humidity;
        var cWindS = response.main.speed
        var cLat = response.coord.lat;
        var cLon = response.coord.lon;

        getCityWeather(cName, cDate, cTemp, cHumid, cWindS, cIconUrl);
        uvInd(cLat, cLon);

    });

}



function uvInd(lat, lon) {
    queryURl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=549bf1423006452f81dc918ddda35db0";
    $.ajax({
        url: queryURl,
        method: "GET"
    }).then( function(response){
        UVScale(response.value);
    });


}




function UVScale(indVal) {
    if(indVal > 0 && indVal < 2.5){
        uvSpan = "green";
    } else if(indVal > 2.5 && indVal < 5){
        uvSpan = "yellow"
    } else if ( indVal > 5 && indVal < 7){
        uvSpan = "orange"
    } else if ( indVal > 7 && indVal < 11){
        uvSpan = "red"
    }
    var uvSpan = $("<span>").attr("class", uvSpan).text(indVal);
    var uvIndH5 = $("<h5>").attr("class")
}




function sCityForecast() {

}




function getCityWeather() {

} 





function getCityForecast() {

}


function getCityHist() {

}


function putCityToStor() {

}

function pullCityFromStor() {

}


$("#search-button").click(function(event){
    event.preventDefault();
    cityToSearch = $("#search-form").val().trim();
    $("#search-form").val("");

    if(cityToSearch === ""){
        return;
    }
    putCityToStor();
    sCityWeather();
    sCityForecast();
});






