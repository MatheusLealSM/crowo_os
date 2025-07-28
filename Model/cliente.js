const mongoose = require("../Database");

const ClienteSchema = new mongoose.Schema({
  nome: {
    type: String,
    require: true,
  },
  celular: {
    type: String,
  },
  email: {
    type: String,
  },
  cpfCnpj: {
    type: String,
    unique: true,
  },
  endereco: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Cliente = mongoose.model("Cliente", ClienteSchema);
module.exports = Cliente;
