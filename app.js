document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.classList.add('loading'); // Asegúrate de definir esta clase en tu CSS

    const formData = new FormData(this);

    fetch('/send_email', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor.');
        }
        return response.text();
    })
    .then(data => {
        showFlashMessage('Mensaje enviado correctamente.', 'success');
        this.reset();
    })
    .catch(error => {
        showFlashMessage('Hubo un error al enviar el mensaje.', 'danger');
        console.error('Error:', error);
    })
    .finally(() => {
        submitButton.classList.remove('loading');
    });
});

function showFlashMessage(message, category) {
    const flashContainer = document.getElementById('flash-messages');
    
    if (!flashContainer) return; // Verifica que el contenedor existe antes de agregar mensajes

    const flashMessage = document.createElement('div');
    flashMessage.className = `alert ${category}`;
    flashMessage.textContent = message;

    flashContainer.appendChild(flashMessage);

    setTimeout(() => {
        flashMessage.remove();
    }, 5000);
}