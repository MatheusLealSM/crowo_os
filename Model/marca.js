const mongoose = require("../Database");

const MarcaSchema = new mongoose.Schema({
  descricao: {
    type: String,
    require: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Marca = mongoose.model("Marca", MarcaSchema);
module.exports = Marca;
