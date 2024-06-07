// models/Property.js
const mongoose = require('mongoose');

const ImovelSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String, required: true },
  endereco: { type: String, required: true },
  valor: { type: Number, required: true },
  imagens: { type: [String], required: true } // Armazenará os caminhos das imagens
});

module.exports = mongoose.model('Imovel', ImovelSchema);