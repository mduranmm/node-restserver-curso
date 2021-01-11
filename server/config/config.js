require('dotenv');
// ================
// Puerto
// ================

process.env.PORT = process.env.PORT || 3000;

// ================
// Entorno
// ================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;
/*
if (process.env.NODE_ENV) {
    urlDB = process.env.MONGO_URI;
} else {
    urlDB = process.env.MONGO_URI;
}*/

process.env.URLDB = process.env.MONGO_URI;

//process.env.URLDB = urlDB;

// ================
// Vencimiento del Token
// ================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


// ================
// SEED de autentificación
// ================
process.env.SEED = process.env.SEED || 'this-is-develop-seed';