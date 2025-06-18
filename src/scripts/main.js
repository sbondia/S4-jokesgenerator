"use strict";
const jokeSource = ["dadJ", "chuckJ"];
function randomSource() {
    return jokeSource[Math.floor(Math.random() * jokeSource.length)];
}
const jokeHistory = [];
function getJoke() {
    let typeJoke = document.querySelector('input[type="radio"][name="jokeInput"]:checked');
    let apiSource = jokeSource.includes(typeJoke.value) ? typeJoke.value : randomSource();
    switch (apiSource) {
        case "dadJ":
            fetchAPI(API_DADJOKES_URL, API_DADJOKES_HEADER).then(apiData => {
                const jokeAux = {
                    id: apiData.id,
                    text: apiData.joke,
                    score: 0
                };
                jokeHistory.push(jokeAux);
            });
            break;
        case "chuckJ":
            fetchAPI(API_CHUCKJOKES_URL).then(apiData => {
                const jokeAux = {
                    id: apiData.id,
                    text: apiData.value,
                    score: 0
                };
                jokeHistory.push(jokeAux);
            });
    }
    console.log(apiSource, jokeHistory);
}
