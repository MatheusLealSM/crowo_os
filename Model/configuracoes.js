const mongoose = require("../Database");

const ConfiguracoesSchema = new mongoose.Schema({
  margem: {
    type: String,
  },
  vmaodeobra: {
    type: String,
  },
});

const Configuracoes = mongoose.model("Configuracoes", ConfiguracoesSchema);
module.exports = Configuracoes;
