const express = require("express");

let { verificaToken, verificaAdmin_Role } = require("../middlewares/autenticacion");

let app = express();

let Categoria = require('../models/categoria');

//============================
// Mostrar todas las categorias
//============================
app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            Categoria.countDocuments({}, (err, conteo) => {
                res.json({
                    ok: true,
                    categorias,
                    total: conteo
                })
            })
        })

});


//============================
// Mostrar categoria por ID
//============================
app.get('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: { message: "El ID no es correcto" }
            })
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })

    })

});

//============================
// Crear nueva categoria
//============================
app.post('/categoria', verificaToken, (req, res) => {
    // regresa la nueva categoria
    // req.usuario._id

    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    })

    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })

    })
});

//============================
// Actualizar categorias
//============================
app.put('/categoria/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({ ok: true, categoria: categoriaDB })

    })

});


//============================
// Eliminar categorias
//============================
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    //Solo un administrador puede borrar categorias
    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    }


    Categoria.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, categoriaBorrada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            })
        }

        if (!categoriaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoría no existe'
                }
            })
        }

        res.json({
            ok: true,
            message: "Categoría borrada"
        })

    })

});

module.exports = app;