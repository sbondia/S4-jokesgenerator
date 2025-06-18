"use strict";
const jokeSource = ["dadJ", "chuckJ"];
function randomSource() {
    return jokeSource[Math.floor(Math.random() * jokeSource.length)];
}
const jokeHistory = [];
function getJoke() {
    const typeJoke = document.querySelector('input[type="radio"][name="jokeInput"]:checked');
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
            console.log(1, apiSource, jokeHistory.length, jokeHistory);
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
            console.log(2, apiSource, jokeHistory.length, jokeHistory);
            break;
    }
    console.log(3, apiSource, jokeHistory.length, jokeHistory);
    printJoke(jokeHistory[jokeHistory.length - 1]);
}
function printJoke(joke) {
    const jokeOutput = document.querySelector('#jokeOutput');
    //console.log(jokeOutput)
    jokeOutput.innerHTML = joke.text;
}
