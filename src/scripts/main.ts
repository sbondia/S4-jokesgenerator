const jokeSource = ["dadJ", "chuckJ"] as const
type JokeSelector = typeof jokeSource[number]

function randomSource():JokeSelector{
    return jokeSource[Math.floor(Math.random()*jokeSource.length)]
}

interface jokeObj {
    id:number
    text:string
    score:number
}
const jokeHistory:jokeObj[] = []

function getJoke(){
    let typeJoke:any = document.querySelector('input[type="radio"][name="jokeInput"]:checked');
    let apiSource:JokeSelector = jokeSource.includes(typeJoke.value) ? typeJoke.value : randomSource()
    switch(apiSource){
        case "dadJ":
            fetchAPI(API_DADJOKES_URL, API_DADJOKES_HEADER).then(apiData=>{
                const jokeAux:jokeObj = {
                    id: apiData.id,
                    text: apiData.joke,
                    score: 0
                }
                jokeHistory.push(jokeAux)
            })
            break;
        case "chuckJ":
            fetchAPI(API_CHUCKJOKES_URL).then(apiData=>{
                const jokeAux:jokeObj = {
                    id: apiData.id,
                    text: apiData.value,
                    score: 0
                }
                jokeHistory.push(jokeAux)
            })
    }
    console.log(apiSource,jokeHistory)
}