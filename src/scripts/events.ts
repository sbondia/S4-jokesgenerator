const btn_newJoke = document.querySelector("#btn_newJoke") as HTMLButtonElement
btn_newJoke!.addEventListener("click", (click) => {
	click.preventDefault()
    if(jokeHistory.length!=0){getScore(); console.log(jokeHistory[jokeHistory.length-1])}
    getJoke()
    
})

getWeather()