import { fetchAPI, getCurrentTime, getLocation } from "./api.js"; 
import { printJoke, printWeather } from "./domOutput.js";
import { jokeHistory, jokeSource } from "../fake_db.js";
import * as API from "../config/api_parameters.js";
import { JokeData, JokeSelector, WeatherData, } from "../config/interfaces.js";

export function getJoke(){
    const jokeAux:JokeData = {
        id: '',
        text: '',
        score:{
            value: 0,
            time: {
                date: '',
                hour: ''
            }
        }
    }
    let apiSource:JokeSelector = randomSource()
    const typeJoke:any = document.querySelector('input[type="radio"][name="jokeInput"]:checked');
    if(typeJoke!=null) {apiSource = jokeSource.includes(typeJoke.value) ? typeJoke.value : randomSource();}
    switch(apiSource){
        case "dadJ":
            fetchAPI(API.DADJOKES_URL, API.DADJOKES_HEADER).then(apiData=>{
                jokeAux.id = apiData.id;
                jokeAux.text = apiData.joke;
                jokeHistory.push(jokeAux);
                printJoke(jokeHistory[jokeHistory.length-1]);
            })
            break;
        case "chuckJ":
            fetchAPI(API.CHUCKJOKES_URL).then(apiData=>{
                jokeAux.id = apiData.id;
                jokeAux.text = apiData.value;
                jokeHistory.push(jokeAux);
                printJoke(jokeHistory[jokeHistory.length-1]);
            })
            break;
    }
}

function randomSource():JokeSelector{
    return jokeSource[Math.floor(Math.random()*jokeSource.length)]
}

export function getScore(){
    const scoreLastJoke = document.querySelector<HTMLInputElement>('input[type="radio"][name="scoreInput"]:checked');
    if(scoreLastJoke!=null){
        jokeHistory[jokeHistory.length-1].score.value = parseInt(scoreLastJoke.value)
        jokeHistory[jokeHistory.length-1].score.time = getCurrentTime()
        const scoreRadios = document.querySelectorAll<HTMLInputElement>('input[type="radio"][name="scoreInput"]');
        scoreRadios.forEach(radio=> radio.checked = false);
    }
}

export async function getWeather(){
    const currentWeather:WeatherData = {
        time: {
            date: '',
            hour: ''
        },
        temperature: '',
        apparent_temperature: ''
    }
    const currentLocation:any = await getLocation()
    let weatherApiPara:string = `latitude=${currentLocation.latitude}&longitude=${currentLocation.longitude}`
    if(currentLocation.altitude) {weatherApiPara += `&elevation=${currentLocation.altitude}`}
    weatherApiPara += API.WEATHER_EXTRAPARA
    fetchAPI(API.WEATHER_URL+weatherApiPara).then(apiData=>{
        currentWeather.time = getCurrentTime()
        let apiDataIndex:number = apiData.hourly.time.findIndex((apiHourlyData:any)=>{
            return apiHourlyData.split('T')[1].split(':')[0] == currentWeather.time.hour.split(':')[0]
        })
        currentWeather.temperature = apiData.hourly.temperature_2m[apiDataIndex] + apiData.hourly_units.temperature_2m
        currentWeather.apparent_temperature = apiData.hourly.apparent_temperature[apiDataIndex] + apiData.hourly_units.apparent_temperature
        printWeather(currentWeather);
    })
}