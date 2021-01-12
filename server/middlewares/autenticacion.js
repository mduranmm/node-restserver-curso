const { json } = require('body-parser');
const jwt = require('jsonwebtoken');

// ================
// Verificación de Token
// ================

const { request } = require("../routes")

let verificaToken = (req, res, next) => {
    let token = req.get('token');
    console.log(token);
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        console.log(err, decoded);
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }
        req.usuario = decoded.usuario;
        next();
    })

}

let verificaAdmin_Role = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        })
    }
}

module.exports = { verificaToken, verificaAdmin_Role }