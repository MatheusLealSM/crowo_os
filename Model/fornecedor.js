const mongoose = require("../Database");

const FornecedorSchema = new mongoose.Schema({
  nome: {
    type: String,
  },
  cpj: {
    type: String,
  },
  email: {
    type: String,
    uppercase: true,
  },
  logo: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Fornecedor = mongoose.model("Fornecedor", FornecedorSchema);
module.exports = Fornecedor;
