// ================
// Puerto
// ================

process.env.PORT = process.env.PORT || 3000;

// ================
// Entorno
// ================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if (process.env.NODE_ENV) {
    urlDB = process.env.MONGO_URI;
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;