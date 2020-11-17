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
    urlDB = 'mongodb+srv://cafe-mgdb-20:4aCJ3XqcdvBRcwMB@cluster0.kyzx7.mongodb.net/cafe?retryWrites=true&w=majority';
} else {
    urlDB = 'mongodb+srv://cafe-mgdb-20:4aCJ3XqcdvBRcwMB@cluster0.kyzx7.mongodb.net/cafe?retryWrites=true&w=majority';
}

process.env.URLDB = urlDB;