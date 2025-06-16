"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_DADJOKES_HEADER = { headers: { 'Accept': 'application/json' } };
const API_DADJOKES_URL = "https://icanhazdadjoke.com/";
function fetchAPIpre(url, header) {
    //fetch(url, header).then(response=> response.json()).then(x=> console.log("+fetch",x))
    const response = fetch(url, header).then(x => console.log(x));
    //console.log(response.json())
    return "w";
}
function fetchAPI(url, header) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url, header);
            if (!response.ok) {
                throw new Error("Error HTTP: " + response.status);
            }
            const apiData = yield response.json();
            console.log(apiData);
            return apiData;
        }
        catch (error) {
            return { er: error.message };
        }
    });
}
