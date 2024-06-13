const express = require('express');
const multer = require('multer');
const path = require('path');
const Imovel = require('../models/Property');

const router = express.Router();

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nome único para cada arquivo
  }
});

const upload = multer({ storage: storage });

// Rota para cadastrar imóvel
router.post('/', upload.array('imagens', 15), async (req, res) => {
  try {
    const { titulo, descricao, endereco, bairro, tipo, valor } = req.body;
    const imagens = req.files.map(file => `/uploads/${file.filename}`);

    const novoImovel = new Imovel({
      titulo,
      descricao,
      endereco,
      bairro,
      tipo,
      valor,
      imagens
    });

    await novoImovel.save();
    res.status(201).json(novoImovel);
  } catch (error) {
    console.error(error);  // Adicione esta linha para logar erros no servidor
    res.status(500).json({ error: 'Erro ao cadastrar imóvel' });
  }
});

// Rota para listar imóveis com filtros
router.get('/', async (req, res) => {
  try {
    const { bairro, tipo, valorMin, valorMax } = req.query;
    let query = {};

    if (bairro) {
      query.bairro = new RegExp(bairro, 'i'); // 'i' para case-insensitive
    }
    if (tipo) {
      query.tipo = tipo;
    }
    if (valorMin) {
      query.valor = { ...query.valor, $gte: parseFloat(valorMin) };
    }
    if (valorMax) {
      query.valor = { ...query.valor, $lte: parseFloat(valorMax) };
    }

    const imoveis = await Imovel.find(query);
    res.status(200).json(imoveis);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar imóveis' });
  }
});

// Rota para listar imóveis (exibindo como card)
// router.get('/', async (req, res) => {
//   try {
//     const imoveis = await Imovel.find();
//     res.status(200).json(imoveis);
//   } catch (error) {
//     res.status(500).json({ error: 'Erro ao buscar imóveis' });
//   }
// });

module.exports = router;
