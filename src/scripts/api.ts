import * as API from "../config/api_parameters.js";
import { LocationData, TimeData } from "../config/interfaces.js";

export async function fetchAPI(url:string, header?:object){
    try{
        const response = await fetch(url, header)
        if(!response.ok) {throw new Error("Error HTTP: "+response.status)}
        return await response.json()
    }catch(error:any) {
        console.warn(error)
        return error.message
    }
}

export async function getLocation(){
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

export function getCurrentTime(){
    const currentTime:TimeData = {
        date: '',
        hour: ''
    }
    let currentTimeData = new Date().toISOString()
    let auxHour:string = currentTimeData.split('T')[1].split('.')[0]
    currentTime.hour = `${parseInt(auxHour.split(':')[0])+API.TIMEZONE}:${auxHour.split(':')[1]}:${auxHour.split(':')[2]}`
    currentTime.date = currentTimeData.split('T')[0]
    return currentTime
}