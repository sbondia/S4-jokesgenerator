import { JokeData, WeatherData } from "../config/interfaces.js";

export function printJoke(joke:JokeData){
    const jokeOutput:any = document.querySelector('#jokeOutput');
    jokeOutput.innerHTML = joke.text;
}

export function printWeather(currentWeather:WeatherData){
    const weatherOutput:any = document.querySelector('#weatherOutput');
    weatherOutput.innerHTML = JSON.stringify(currentWeather);
}