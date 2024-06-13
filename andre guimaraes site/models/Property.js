// models/Property.js
const mongoose = require('mongoose');

const ImovelSchema = new mongoose.Schema({
  titulo: String,
  descricao: String,
  endereco: String,
  bairro: String,
  tipo: String, // Casa ou Apartamento
  valor: Number,
  imagens: [String]
});

const Imovel = mongoose.model('Imovel', ImovelSchema);

module.exports = Imovel;