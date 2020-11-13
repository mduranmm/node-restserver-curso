const express = require('express')
const app = express()
const bodyParser = require('body-parser');
require('./config/config');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json('Hello World')
});

app.get('/usuario', (req, res) => {
    res.json('get Usuario')
});

app.post('/usuario', (req, res) => {
    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario',
        })
    } else {
        res.json({ persona: body })
    }


});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    res.json({ id })
});

app.delete('/usuario', (req, res) => {
    res.json('delete Usuario')
});

app.listen(process.env.PORT, () => {
    console.log(Buffer.from("GP_MORFOLOGIA_DE_LA_CIUDAD_DE_MEXICO").toString("base64"));
    console.log('Escuchando puerto', process.env.PORT);
})