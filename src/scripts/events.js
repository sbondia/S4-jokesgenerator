"use strict";
const btn = document.querySelector("#btn_newJoke");
btn.addEventListener("click", (click) => {
    click.preventDefault();
    console.log(document.querySelector('input[type="radio"][name="jokeInput"]:checked'));
    console.log("+click", click);
    fetchAPI(API_DADJOKES_URL, API_DADJOKES_HEADER);
});
