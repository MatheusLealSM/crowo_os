const mongoose = require("../Database");

const ModeloSchema = new mongoose.Schema({
  descricao: {
    type: String,
    require: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Modelo = mongoose.model("Modelo", ModeloSchema);
module.exports = Modelo;
