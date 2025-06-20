"use strict";
const btn_newJoke = document.querySelector("#btn_newJoke");
btn_newJoke.addEventListener("click", (click) => {
    click.preventDefault();
    if (jokeHistory.length != 0) {
        getScore();
    }
    getJoke();
});
getCurrentTime();
getWeather();
