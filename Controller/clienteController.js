const express = require("express");
const router = express.Router();

//MODEL
const Cliente = require("../Model/cliente");

//LISTAR TODOS OS CLIENTES CADASTRADOS
router.get("/listar", async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.header("Access-Control-Allow-Origin", "*");
    res.send(clientes);
  } catch (err) {
    console.log(err);
  }
});

//CADASTRAR CLIENTE
router.post("/registrar", async (req, res) => {
  var { cpfCnpj } = req.body;

  try {
    if (await Cliente.findOne({ cpfCnpj: cpfCnpj })) {
      return res.status(400).send({ error: "CLIENTE JA CADASTRADO!" });
    } else {
      const cliente = await Cliente.create(req.body);
      res.send(cliente);
      console.log(cliente);
    }
  } catch (err) {
    return res
      .status(400)
      .send({ error: "FALHA AO REGISTRAR CLIENTE", dada: err });
  }
});

//REMOVER CLIENTE
router.post("/remover", async (req, res) => {
  const { _id } = req.body;

  try {
    const cliente = await Cliente.findOne({ _id: _id });
    await cliente.delete();
    res.send({ sucess: "CLIENTE " + cliente.name + " FOI REMOVIDO!" });
  } catch (err) {
    return res.send({ error: "CLIENTE NAO FOI ENCONTRADO", dada: err });
  }
});

//ATUALIZAR CLIENTE
router.post("/atualizar", async (req, res) => {
  const { _id } = req.body;

  try {
    const cliente = await Cliente.findOne({ _id: _id });
    await cliente.overwrite(req.body);
    await cliente.save();
    res.json({ sucess: "OS DADOS DO CLIENTE FORAM ATUALIZADOS" });
  } catch (err) {
    return res.json({
      error: "FALHA AO ATUALIZAR OS DADOS DO CLIENTE",
      dada: err,
    });
  }
});

//BUSCAR CLIENTE POR ID
router.post("/buscarPorId", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { _id } = req.body;
  try {
    const cliente = await Cliente.find({ _id: _id });
    res.send(cliente);
  } catch (err) {
    res.send({ error: "erro" });
  }
});

//BUSCAR CLIENTE POR NOME
router.post("/buscarPorNome", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { name } = req.body;
  try {
    const cliente = await Cliente.find({
      name: { $regex: "^" + name, $options: "i" },
    });
    res.send(cliente);
  } catch (err) {
    res.send({ error: "Falha ao buscar cliente", dada: err });
  }
});

//BUSCAR CLIENTE POR CPF OU CNPJ
router.post("/BuscarPorCpfCnpj", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { cpfCnpj } = req.body;
  try {
    const cliente = await Cliente.find({ cpfCnpj: cpfCnpj });
    res.send(cliente);
  } catch (err) {
    res.send({ error: "FALHA BUSCAR CLIENTE", data: err });
  }
});

module.exports = (app) => app.use("/cliente", router);
