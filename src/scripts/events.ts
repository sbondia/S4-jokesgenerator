import { getWeather, getScore, getJoke } from "./main.js";
import { jokeHistory } from "../fake_db.js";

getWeather()

const btn_newJoke = document.querySelector("#btn_newJoke") as HTMLButtonElement
btn_newJoke!.addEventListener("click", (click) => {
	click.preventDefault()
    if(jokeHistory.length!=0){
        getScore();
        console.clear();
        console.table(jokeHistory)}
    getJoke()
})