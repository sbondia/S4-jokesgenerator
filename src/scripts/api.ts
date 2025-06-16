const API_DADJOKES_HEADER:object = {headers: {'Accept': 'application/json'}}
const API_DADJOKES_URL:string = "https://icanhazdadjoke.com/"

function fetchAPIpre(url:string, header:object) :string{
    //fetch(url, header).then(response=> response.json()).then(x=> console.log("+fetch",x))
    const response = fetch(url, header).then(x=> console.log(x))
    //console.log(response.json())
    return "w"
}

async function fetchAPI(url:string, header:object) {
    try{
        const response = await fetch(url, header)
        if(!response.ok) {throw new Error("Error HTTP: "+response.status)}
        const apiData:object = await response.json()
        console.log(apiData)
        return apiData
    }catch(error:any) {
        return {er:error.message}
    }
}