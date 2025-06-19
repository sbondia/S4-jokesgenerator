const jokeSource = ["dadJ", "chuckJ"] as const
type JokeSelector = typeof jokeSource[number]

function randomSource():JokeSelector{
    return jokeSource[Math.floor(Math.random()*jokeSource.length)]
}

interface jokeObj {
    id:number
    text:string
    score:{
        value: number
        date: string
    }
}
const jokeHistory:jokeObj[] = []

function getJoke(){
    const jokeAux:jokeObj = {
        id: 0,
        text: '',
        score:{
            value: 0,
            date: ''
        }
    }
    const typeJoke:any = document.querySelector('input[type="radio"][name="jokeInput"]:checked');
    let apiSource:JokeSelector = jokeSource.includes(typeJoke.value) ? typeJoke.value : randomSource();
    switch(apiSource){
        case "dadJ":
            fetchAPI(API_DADJOKES_URL, API_DADJOKES_HEADER).then(apiData=>{
                jokeAux.id = parseInt(apiData.id);
                jokeAux.text = apiData.joke;
                jokeHistory.push(jokeAux);
                printJoke(jokeHistory[jokeHistory.length-1]);
            })
            break;
        case "chuckJ":
            fetchAPI(API_CHUCKJOKES_URL).then(apiData=>{
                jokeAux.id = parseInt(apiData.id);
                jokeAux.text = apiData.value;
                jokeHistory.push(jokeAux);
                printJoke(jokeHistory[jokeHistory.length-1]);
            })
            break;
    }
}

function printJoke(joke:jokeObj){
    const jokeOutput:any = document.querySelector('#jokeOutput');
    jokeOutput.innerHTML = joke.text;
}

function getScore(){
    const scoreLastJoke:any = document.querySelector('input[type="radio"][name="scoreInput"]:checked');
    jokeHistory[jokeHistory.length-1].score.value = parseInt(scoreLastJoke.value)
    jokeHistory[jokeHistory.length-1].score.date = new Date().toISOString()
    console.log(jokeHistory[jokeHistory.length-1].score)
}