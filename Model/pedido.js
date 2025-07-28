const mongoose = require("../Database");

const PedidoSchema = new mongoose.Schema({
  status: {
    type: String,
    require: true,
  },
  colaborador: {
    type: String,
    require: true,
  },
  cliente: {
    type: String,
    require: true,
  },
  produtos: {
    type: Object,
    require: true,
  },
  total: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Pedido = mongoose.model("Pedido", PedidoSchema);
module.exports = Pedido;
