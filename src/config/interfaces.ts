import { jokeSource } from "../fake_db.js"

export type JokeSelector = typeof jokeSource[number]

export interface JokeData {
    id:string
    text:string
    score:{
        value: number
        time: TimeData
    }
}

export interface LocationData {
    latitude:number
    longitude:number
    altitude:number|null
}

export interface WeatherData {
    time:TimeData
    temperature:string
    apparent_temperature:string
}

export interface TimeData {
    date:string
    hour:string
}

