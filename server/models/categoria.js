const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    descripcion: { type: String, unique: true, require: [true, 'La descripción es necesaria'] },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    estado: {
        type: Boolean,
        default: true,
    },
})

module.exports = mongoose.model('Categoria', categoriaSchema);