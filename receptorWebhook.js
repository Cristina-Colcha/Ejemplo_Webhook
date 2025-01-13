const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Usar middleware para parsear los datos JSON
app.use(bodyParser.json());

// Endpoint que recibe el webhook
app.post('/webhook', (req, res) => {
    const data = req.body;

    console.log('Datos recibidos por el webhook:', data);

    // Procesar los datos según el evento
    if (data.event === 'new_user') {
        console.log('Nuevo usuario registrado:', data.user);
    }

    res.status(200).send('Webhook recibido correctamente');
});

app.listen(3000, () => {
    console.log('Servidor receptor escuchando en el puerto 3000');
});
