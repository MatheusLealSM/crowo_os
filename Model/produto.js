const mongoose = require("../Database");

const ProdutoSchema = new mongoose.Schema({
  descricao: {
    type: String,
    require: true,
  },
  grupo: {
    type: String,
  },
  marca: {
    type: String,
    uppercase: true,
  },
  modelo: {
    type: String,
    uppercase: true,
  },
  cor: {
    type: String,
  },
  fornecedor: {
    type: String,
    require: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Produto = mongoose.model("Produto", ProdutoSchema);
module.exports = Produto;
