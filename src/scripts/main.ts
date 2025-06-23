const jokeSource = ["dadJ", "chuckJ"] as const
type JokeSelector = typeof jokeSource[number]

function randomSource():JokeSelector{
    return jokeSource[Math.floor(Math.random()*jokeSource.length)]
}

interface JokeData {
    id:string
    text:string
    score:{
        value: number
        time: TimeData
    }
}

interface LocationData {
    latitude:number
    longitude:number
    altitude:number|null
}

interface WeatherData {
    time:TimeData
    temperature:string
    apparent_temperature:string
}

interface TimeData {
    date:string
    hour:string
}

const jokeHistory:JokeData[] = []

function getJoke(){
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
            fetchAPI(API_DADJOKES_URL, API_DADJOKES_HEADER).then(apiData=>{
                jokeAux.id = apiData.id;
                jokeAux.text = apiData.joke;
                jokeHistory.push(jokeAux);
                printJoke(jokeHistory[jokeHistory.length-1]);
            })
            break;
        case "chuckJ":
            fetchAPI(API_CHUCKJOKES_URL).then(apiData=>{
                jokeAux.id = apiData.id;
                jokeAux.text = apiData.value;
                jokeHistory.push(jokeAux);
                printJoke(jokeHistory[jokeHistory.length-1]);
            })
            break;
    }
}

function printJoke(joke:JokeData){
    const jokeOutput:any = document.querySelector('#jokeOutput');
    jokeOutput.innerHTML = joke.text;
}

function getScore(){
    const scoreLastJoke = document.querySelector<HTMLInputElement>('input[type="radio"][name="scoreInput"]:checked');
    if(scoreLastJoke!=null){
        jokeHistory[jokeHistory.length-1].score.value = parseInt(scoreLastJoke.value)
        jokeHistory[jokeHistory.length-1].score.time = getCurrentTime()
        const scoreRadios = document.querySelectorAll<HTMLInputElement>('input[type="radio"][name="scoreInput"]');
        scoreRadios.forEach(radio=> radio.checked = false);
    }
}

async function getWeather(){
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
    weatherApiPara += API_WEATHER_EXTRAPARA
    fetchAPI(API_WEATHER_URL+weatherApiPara).then(apiData=>{
        currentWeather.time = getCurrentTime()
        let apiDataIndex:number = apiData.hourly.time.findIndex((apiHourlyData:any)=>{
            return apiHourlyData.split('T')[1].split(':')[0] == currentWeather.time.hour.split(':')[0]
        })
        currentWeather.temperature = apiData.hourly.temperature_2m[apiDataIndex] + apiData.hourly_units.temperature_2m
        currentWeather.apparent_temperature = apiData.hourly.apparent_temperature[apiDataIndex] + apiData.hourly_units.apparent_temperature
        printWeather(currentWeather);
    })
}

async function getLocation(){
    return new Promise ((res, rej)=>{
        const currentLocation:LocationData = {
            latitude: 0,
            longitude: 0,
            altitude: 0
        }
        navigator.geolocation.getCurrentPosition(
            (position)=>{   
                currentLocation.latitude = position.coords.latitude
                currentLocation.longitude = position.coords.longitude
                if(position.coords.altitude) {currentLocation.altitude = position.coords.altitude}
                res(currentLocation)
            },
            (error)=> {rej(error)}
        )
    })
}

function printWeather(currentWeather:WeatherData){
    const weatherOutput:any = document.querySelector('#weatherOutput');
    weatherOutput.innerHTML = JSON.stringify(currentWeather);
}

function getCurrentTime(){
    const currentTime:TimeData = {
        date: '',
        hour: ''
    }
    let currentTimeData = new Date().toISOString()
    let auxHour:string = currentTimeData.split('T')[1].split('.')[0]
    currentTime.hour = `${parseInt(auxHour.split(':')[0])+API_TIMEZONE}:${auxHour.split(':')[1]}:${auxHour.split(':')[2]}`
    currentTime.date = currentTimeData.split('T')[0]
    return currentTime
}