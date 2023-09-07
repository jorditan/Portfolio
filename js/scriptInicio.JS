const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");
const menuLinks = document.querySelectorAll('.nav-list a[href^="#"]');
const sobremi = document.getElementById('sobremi');
const skills = document.getElementById('skills');
const proyectos = document.getElementById('proyectos');

// Funcionalidad barra de navegación responsive

abrir.addEventListener("click", () => {
	/*
		Abre el menú hamburgesa y no nos permite scrolear
	*/
	document.body.classList.add('no-scroll');
	nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
	/*
		Cierra el menú hamburgesa y nos permite volver a scrollear
	*/
	nav.classList.remove("visible");
	document.body.classList.remove('no-scroll');
})

const cerrarMenu = () => { // Funcion creada para cerrar el
	nav.classList.remove("visible");
	document.body.classList.remove('no-scroll');
}

document.addEventListener("DOMContentLoaded", function() {
	let enlacesMenu = document.querySelectorAll("#nav li a");

	enlacesMenu.forEach(function(enlace) {
		enlace.addEventListener("click", function() {
			cerrarMenu();
		});
	});
});


const aparecer = (entradas, observador) => {
	/*
	Funcion para aprecer contenido a medida
	que aparece en el viewport
	*/
	entradas.forEach((entrada) => {
		if(entrada.isIntersecting){
			entrada.target.classList.add('visibleSeccion');
		}
		else {
			entrada.target.classList.remove('visibleSeccion');
		}
	})
}

const observador = new IntersectionObserver(aparecer, {
	/*
		Intersección de observador para que ejecute la funcion *aparecer*
		cada vez que se observe el contenido pedido.
	*/
	root: null,
	threshold: 0.2,
});

observador.observe(sobremi);
observador.observe(skills);
observador.observe(proyectos);



/*
	Código que hace la barra smooth
*/


document.addEventListener("DOMContentLoaded", function() {
	let enlacesMenu = document.querySelectorAll("#nav li a");

	enlacesMenu.forEach(function(enlace) {
		enlace.addEventListener("click", function() {
			let menuHamburguesa = document.getElementById("nav");
			menuHamburguesa.classList.remove("abierto");
		});
	});
});



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

	const easeInOutQuart = (time, from, distance, duration) => {
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
