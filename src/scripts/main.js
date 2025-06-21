"use strict";
const jokeSource = ["dadJ", "chuckJ"];
function randomSource() {
    return jokeSource[Math.floor(Math.random() * jokeSource.length)];
}
const jokeHistory = [];
function getJoke() {
    const jokeAux = {
        id: '',
        text: '',
        score: {
            value: 0,
            time: {
                date: '',
                hour: ''
            }
        }
    };
    let apiSource = randomSource();
    const typeJoke = document.querySelector('input[type="radio"][name="jokeInput"]:checked');
    if (typeJoke != null) {
        apiSource = jokeSource.includes(typeJoke.value) ? typeJoke.value : randomSource();
    }
    switch (apiSource) {
        case "dadJ":
            fetchAPI(API_DADJOKES_URL, API_DADJOKES_HEADER).then(apiData => {
                jokeAux.id = apiData.id;
                jokeAux.text = apiData.joke;
                jokeHistory.push(jokeAux);
                printJoke(jokeHistory[jokeHistory.length - 1]);
            });
            break;
        case "chuckJ":
            fetchAPI(API_CHUCKJOKES_URL).then(apiData => {
                jokeAux.id = apiData.id;
                jokeAux.text = apiData.value;
                jokeHistory.push(jokeAux);
                printJoke(jokeHistory[jokeHistory.length - 1]);
            });
            break;
    }
}
function printJoke(joke) {
    const jokeOutput = document.querySelector('#jokeOutput');
    jokeOutput.innerHTML = joke.text;
}
function getScore() {
    const scoreLastJoke = document.querySelector('input[type="radio"][name="scoreInput"]:checked');
    if (scoreLastJoke != null) {
        jokeHistory[jokeHistory.length - 1].score.value = parseInt(scoreLastJoke.value);
        jokeHistory[jokeHistory.length - 1].score.time = getCurrentTime();
        const scoreRadios = document.querySelectorAll('input[type="radio"][name="scoreInput"]');
        scoreRadios.forEach(radio => radio.checked = false);
    }
}
function getWeather() {
    const currentWeather = {
        time: {
            date: '',
            hour: ''
        },
        temperature: '',
        apparent_temperature: ''
    };
    const currentLocation = getLocation();
    /*
    const currentLocation:LocationData = {
        latitude: 41.45,
        longitude: 2.16,
        altitude: 300
    }
    */
    let weatherApiPara = `latitude=${currentLocation.latitude}&longitude=${currentLocation.longitude}`;
    if (currentLocation.altitude) {
        weatherApiPara += `&elevation=${currentLocation.altitude}`;
    }
    weatherApiPara += API_WEATHER_EXTRAPARA;
    fetchAPI(API_WEATHER_URL + weatherApiPara).then(apiData => {
        console.log(apiData);
        currentWeather.time = getCurrentTime();
        let apiDataIndex = apiData.hourly.time.findIndex((apiHourlyData) => {
            return apiHourlyData.split('T')[1].split(':')[0] == currentWeather.time.hour.split(':')[0];
        });
        currentWeather.temperature = apiData.hourly.temperature_2m[apiDataIndex] + apiData.hourly_units.temperature_2m;
        currentWeather.apparent_temperature = apiData.hourly.apparent_temperature[apiDataIndex] + apiData.hourly_units.apparent_temperature;
        printWeather(currentWeather);
    });
}
function getLocation() {
    const locationAux = {
        latitude: 0,
        longitude: 0,
        altitude: 0
    };
    navigator.geolocation.getCurrentPosition((position) => {
        locationAux.latitude = position.coords.latitude;
        locationAux.longitude = position.coords.longitude;
        locationAux.altitude = position.coords.altitude;
    }, (error) => { console.log(error); });
    return locationAux;
}
function printWeather(currentWeather) {
    const weatherOutput = document.querySelector('#weatherOutput');
    weatherOutput.innerHTML = JSON.stringify(currentWeather);
}
function getCurrentTime() {
    const currentTime = {
        date: '',
        hour: ''
    };
    let currentTimeData = new Date().toISOString();
    currentTime.date = currentTimeData.split('T')[0];
    currentTime.hour = currentTimeData.split('T')[1].split('.')[0];
    console.log(currentTime);
    return currentTime;
}
