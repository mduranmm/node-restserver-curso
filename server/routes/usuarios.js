const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt')
const _ = require('underscore');
const app = express();

app.get('/usuario', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5
    limite = Number(limite)

    Usuario.find({ estado: true }, 'nombre email role')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Usuario.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    total: conteo
                })
            })


        })

});

app.post('/usuario', (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        //usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        })

    })

});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']) //req.body;

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({ ok: true, usuarioDB: usuarioDB })

    })

});

app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usaurioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!usaurioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no existe'
                }
            })
        }

        res.json({
            ok: true,
            usuario: usaurioBorrado
        })

    })

    /*Borrar fisicamente 
    Usuario.findByIdAndRemove(id, (err, usaurioBorrado) => {
         if (err) {
             return res.status(400).json({
                 ok: false,
                 err
             })
         }

         if (!usaurioBorrado) {
             return res.status(400).json({
                 ok: false,
                 err: {
                     message: 'Usuario no existe'
                 }
             })
         }

         res.json({
             ok: true,
             usuario: usaurioBorrado
         })

     })*/

});

module.exports = app;