const mongoose = require("../Database");

const ColaboradorSchema = new mongoose.Schema({
  nome: {
    type: String,
    uppercase: true,
  },
  cpf: {
    type: String,
  },
  email: {
    type: String,
  },
  celular: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Colaborador = mongoose.model("Colaborador", ColaboradorSchema);
module.exports = Colaborador;
