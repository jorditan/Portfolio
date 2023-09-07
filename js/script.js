const nombre = document.getElementById("from_name");
const email = document.getElementById("email__id");
const telefono = document.getElementById("telefono");
const mensaje = document.getElementById("message");
const form = document.getElementById("formulario");
const parrafo = document.getElementById("parrafo");

const enviarmail = () => {
	const btn = document.getElementById('button');

	document.getElementById('formulario')
		.addEventListener('submit', function(event) {
			event.preventDefault();

			btn.value = 'Sending...';

			const serviceID = 'default_service';
			const templateID = 'template_r41ga1a';

			emailjs.sendForm(serviceID, templateID, this)
				.then(() => {
					btn.value = 'Send Email';
					alert('¡Mail enviado!');
					nombre.value = "";
					telefono.value = "";
					mensaje.value = "";
					email.value = "";
				}, (err) => {
					btn.value = 'Send Email';
					alert(JSON.stringify(err));
				});
		});
}


form.addEventListener("submit", e => {
	e.preventDefault();
	let alertas = "";
	let regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
	let regexTelefono = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/g;
	let entrar = false;
	parrafo.innerHTML = "";
	if (nombre.value.length < 6) {
		alertas += "Ingrese un nombre y apellido <br>";
		entrar = true;
	}
	if (!regexEmail.test(email.value)) {
		alertas += "El email ingresado no es válido <br>";
		entrar = true;
	}
	if (!regexTelefono.test(telefono.value)) {
		alertas += "Ingrese un teléfono con código de área <br>";
		entrar = true;
	}

	if (mensaje.value == '') {
		alertas += "Ingrese un mensaje";
		entrar = true;
	}


	if (entrar) {
		parrafo.innerHTML = alertas;
		setTimeout(function() {
			parrafo.innerHTML = "";
			nombre.value = "";
			telefono.value = "";
			mensaje.value = "";
			email.value = "";
		}, 2000);
	} else {
		enviarmail();
	}
})




