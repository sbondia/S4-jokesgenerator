const API_DADJOKES_HEADER:object = {headers: {'Accept': 'application/json'}}
const API_DADJOKES_URL:string = "https://icanhazdadjoke.com/"
const API_CHUCKJOKES_URL:string = "https://api.chucknorris.io/jokes/random"
const API_WEATHER_URL:string = "https://api.open-meteo.com/v1/forecast?"
const API_WEATHER_EXTRAPARA:string = "&hourly=temperature_2m&hourly=apparent_temperature"
const API_TIMEZONE:number = 2

async function fetchAPI(url:string, header?:object){
    try{
        const response = await fetch(url, header)
        if(!response.ok) {throw new Error("Error HTTP: "+response.status)}
        return await response.json()
    }catch(error:any) {
        console.warn(error)
        return error.message
    }
}