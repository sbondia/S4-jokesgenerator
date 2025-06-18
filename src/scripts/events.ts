const btn_newJoke = document.querySelector("#btn_newJoke") as HTMLButtonElement
btn_newJoke!.addEventListener("click", (click) => {
	click.preventDefault()
    //console.log("+click",click)
    getJoke()
})
