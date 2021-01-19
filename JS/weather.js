const weather = document.querySelector(".js-weather");
const API_KEY = "3b420bfa7ad7cfbd0f2a44c379e8c89a";
const COORDS = 'coords';

function getWeather(lat, lng){
    fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=Metric`
    )
    .then(function(response){
        return response.json();
    })
    .then(function(json) {
        const teamperature = json.main.Math.round(temp);
        const place = json.name;
        weather.innerText = `${teamperature}°C ${place}시`;
    });

}

function savedCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(postion){
    const latitude = postion.coords.latitude;
    const longitude = postion.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    savedCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(postion){
    console.log("위치를 찾을 수 없습니다.")
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords === null){
        askForCoords();    
    }else {
       const parseCoords = JSON.parse(loadedCords);
       getWeather(parseCoords.latitude, parseCoords.longitude);
    }

}


function init(){
    loadCoords();
}

init();