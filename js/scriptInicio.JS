const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})


const menuLinks = document.querySelectorAll('.nav-list a[href^="#"]');

function coneguirDistanceDeArriba(element) {
    const id = element.getAttribute("href");
    return document.querySelector(id).offsetTop;
}

function scrollNativo(distanciaDesdeArriba) {
    window.scroll({
    top: distanciaDesdeArriba,
    behavior: "smooth",
    });
}

function scrollearSeccion(event) {
    event.preventDefault();
    const distanciaDesdeArriba = coneguirDistanceDeArriba(event.target) - 90;
    smoothScrollTo(0, distanciaDesdeArriba);
}

menuLinks.forEach((link) => {
    link.addEventListener("click", scrollearSeccion);
});

function smoothScrollTo(endX, endY, duration) {
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();

    duration = typeof duration !== "undefined" ? duration : 400;

    const easeInOutQuart = (time, from, distance, duration) =>{
    if ((time /= duration / 2) < 1)
      return (distance / 2) * time * time * time * time + from;
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
};

    const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
        clearInterval(timer);
    }
    window.scroll(newX, newY);
    }, 1000 / 60);
}
