require('./config/config');
const express = require('express');
const mongoose = require('mongoose')

const app = express()
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//Habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(require('./routes/index'));


app.get('/', (req, res) => {
    console.log("CONN", process.env.URLDB);
    res.json('Hello World')
});



//'mongodb+srv://cafe-mgdb-20:4aCJ3XqcdvBRcwMB@cluster0.kyzx7.mongodb.net/cafe?retryWrites=true&w=majority'
console.log("CONN", process.env.URLDB);
mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err, res) => {
    if (err) throw err;
    console.log("Base de datos ONLINE");
})



app.listen(process.env.PORT, () => {
    console.log(Buffer.from("GP_MORFOLOGIA_DE_LA_CIUDAD_DE_MEXICO").toString("base64"));
    console.log('Escuchando puerto', process.env.PORT);
})