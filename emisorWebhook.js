const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());  // Para parsear el cuerpo de la solicitud como JSON

// Endpoint para registrar un nuevo usuario
app.post('/register', (req, res) => {
    // Obtener la información del usuario desde el cuerpo de la solicitud
    const newUser = req.body;

    // Asegurarse de que el cuerpo de la solicitud tenga los campos necesarios
    if (!newUser.name || !newUser.email) {
        return res.status(400).send('Nombre y correo electrónico son requeridos');
    }

    // Enviar los datos al webhook (servidor receptor)
    axios.post('http://localhost:3000/webhook', newUser)
        .then(response => {
            console.log('Webhook enviado exitosamente:', response.data);
        })
        .catch(error => {
            console.error('Error al enviar el webhook:', error);
        });

    res.status(200).send('Usuario registrado y webhook enviado');
});

// Iniciar el servidor emisor en el puerto 4000
app.listen(4000, () => {
    console.log('Servidor emisor escuchando en el puerto 4000');
});
