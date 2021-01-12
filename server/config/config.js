require('dotenv').config();
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

process.env.URLDB = '';

//process.env.URLDB = urlDB;

// ================
// Vencimiento del Token
// ================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = '48h';


// ================
// SEED de autentificación
// ================
process.env.SEED = process.env.SEED || 'this-is-develop-seed';

// ================
// Google Client ID
// ================
process.env.CLIENT_ID = process.env.CLIENT_ID || '1060448732163-c2otkrpatf3496u0q738cqi1702mqkv8.apps.googleusercontent.com';