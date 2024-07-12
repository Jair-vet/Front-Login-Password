// Función para validar el formulario antes de enviar
function validarFormulario(event) {
    event.preventDefault(); // Evitar el envío automático del formulario

    // Obtener los valores de los campos
    const nombre = document.getElementById('nombre').value.trim();
    const edad = document.getElementById('edad').value.trim();
    const iglesia = document.getElementById('iglesia').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const instrumento = document.getElementById('instrumento').value;
    formulario.reset()
    // Validar los campos
    let formValido = true;

    // Validar Nombre Completo
    if (nombre === '') {
      document.getElementById('nombreError').textContent = 'Por favor ingrese su nombre completo.';
      formValido = false;
    } else {
      document.getElementById('nombreError').textContent = '';
    }

    // Validar Edad
    if (isNaN(edad) || edad === '') {
      document.getElementById('edadError').textContent = 'Por favor ingrese una edad válida.';
      formValido = false;
    } else {
      document.getElementById('edadError').textContent = '';
    }

    // Validar Iglesia
    if (iglesia === '') {
      document.getElementById('iglesiaError').textContent = 'Por favor ingrese el nombre de su iglesia.';
      formValido = false;
    } else {
      document.getElementById('iglesiaError').textContent = '';
    }

    // Validar Teléfono/Whatsapp
    if (telefono === '') {
      document.getElementById('telefonoError').textContent = 'Por favor ingrese su número de teléfono o Whatsapp.';
      formValido = false;
    } else {
      document.getElementById('telefonoError').textContent = '';
    }

    // Validar Instrumento
    if (instrumento === '') {
      document.getElementById('instrumentoError').textContent = 'Por favor seleccione un instrumento.';
      formValido = false;
    } else {
      document.getElementById('instrumentoError').textContent = '';
    }

    // Si el formulario es válido, enviar los datos a la API
    if (formValido) {
      enviarDatosAPI(nombre, edad, iglesia, telefono, instrumento);
    }
}


// Asociar la función de validación al evento submit del formulario
document.getElementById('registroForm').addEventListener('submit', validarFormulario);
