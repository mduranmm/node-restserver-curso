const express = require("express");

let { verificaToken } = require("../middlewares/autenticacion");

let app = express();

let Producto = require('../models/producto');

//============================
// Mostrar todas los productos
//============================
app.get('/productos', verificaToken, (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    Producto.find({ disponible: true })
        .skip(desde)
        .limit(5)
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            Producto.countDocuments({ disponible: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    productos,
                    total: conteo
                })
            })
        })

});


//============================
// Mostrar producto por ID
//============================
app.get('/productos/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: { message: "El ID no es correcto" }
                })
            }

            res.json({
                ok: true,
                producto: productoDB
            })

        })

});

//============================
// Buscar productos
//============================
app.get('/productos/buscar/:termino', verificaToken, (req, res) => {
    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex, disponible: true })
        .populate('categoria', 'nombre')
        .exec((err, productos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                productos
            })
        })

});

//============================
// Crear nueva producto
//============================
app.post('/productos', verificaToken, (req, res) => {
    // regresa la nueva categoria
    // req.usuario._id

    let body = req.body;

    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    })

    producto.save((err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        });

    })
});

//============================
// Actualizar productos
//============================
app.put('/productos/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: "El ID no existe"
            })
        }

        res.json({ ok: true, producto: productoDB })

    })

});


//============================
// Eliminar productos
//============================
app.delete('/productos/:id', [verificaToken], (req, res) => {
    //Solo un administrador puede borrar categorias
    let id = req.params.id;

    let cambiaEstado = {
        disponible: false
    }


    Producto.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, productoBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!productoBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no existe'
                }
            })
        }

        res.json({
            ok: true,
            message: "Producto borrado"
        })

    })

});

module.exports = app;