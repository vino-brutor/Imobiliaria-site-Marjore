const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const imoveisRouter = require('./routes/properties');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexão com o MongoDB
mongoose.connect('mongodb+srv://vitor_bruno:V!tor210506@bancodedados.s5qqsva.mongodb.net/?retryWrites=true&w=majority&appName=bancoDeDados', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Usando as rotas dos imóveis
app.use('/api/imoveis', imoveisRouter);

// Servindo arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para servir a página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para servir a página de administração
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Rota para servir a página sobre
app.get('/sobre', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sobre.html'));
});

// Rota para servir a página contato
app.get('/contato', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contato.html'));
});


app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});