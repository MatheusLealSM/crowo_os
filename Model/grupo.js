const mongoose = require("../Database");

const GrupoSchema = new mongoose.Schema({
  descricao: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Grupo = mongoose.model("Grupo", GrupoSchema);
module.exports = Grupo;
