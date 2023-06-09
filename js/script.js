let boton = document.getElementById("botonCV");
boton.addEventListener("click", () => {
    const span = document.querySelector("a span");
    boton.style.paddingRight = '10px';
    span.style.visibility = 'visible';
    setTimeout (() => {
        span.style.visibility="hidden";
        boton.style.transition = '.3s ease-in-out';
        boton.style.paddingRight = '0px';
    },3000);
})

