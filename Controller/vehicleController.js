const express = require('express')
const router = express.Router()

//MODEL
const Vehicle = require('../Model/vehicle')


//LISTAR TODOS OS VEICULOS
router.get('/list', async (req, res) => {
  try {
    const vehicle = await Vehicle.find();
    res.header("Access-Control-Allow-Origin", "*");
    res.send(vehicle);
  } catch (err) {
    console.log(err);
  }
});

//CADASTRAR VEICULO
router.post('/register', async (req, res) => {
  const { licensePlate } = req.body
  try {
    if (await Vehicle.findOne({ licensePlate })) {
      return res.status(400).send({ error: 'Veiculo já cadastrado, verifique a placa.' });
    } else {
      const vehicle = await Vehicle.create(req.body);
      return res.send({ sucess: 'Veiculo cadastrado com sucesso!', vehicle: vehicle });
    }
  } catch (err) {
    return res.status(400).send({ error: 'Falha ao cadastrar veiculo' });
  }
});

//REMOVER VEICULO
router.post('/delete', async (req, res) => {
  const { _id } = req.body;
  try {
    const vehicle = await Vehicle.findOne({ _id: _id });
    await vehicle.delete();
    res.send({ sucess: 'Veiculo removido!' });
  } catch (err) {
    return res.send({ error: 'Falha ao remover veiculo' });
  }
});

//ATUALIZAR VEICULO
router.post('/update', async (req, res) => {

  const { _id } = req.body;

  var data = {
    client: req.body.client,
    licensePlate: req.body.licensePlate,
    color: req.body.color,
    manufacturer: req.body.manufacturer,
    model: req.body.model,
  };
  
  try {
    const vehicle = await Vehicle.findOne({ _id: _id });
    await vehicle.overwrite(data);
    await vehicle.save();
    res.json({ sucess: 'Veiculo atualizado com sucesso' })
  } catch (err) {
    return res.json({ error: 'Falha ao atualizar veiculo' })
  }
});

//BUSCAR VEICULO POR ID
router.post('/findById', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { _id } = req.body;
  try {
    const vehicle = await Vehicle.find({ _id: _id });
    res.send(vehicle);
  } catch (error) {
    res.send({ error: "Falha ao buscar veiculo - verifique de o id está correto" })
  }
});

//BUSCAR VEICULO POR CLIENTE
router.post('/findByClient', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { client } = req.body;
  try {
    const vehicle = await Vehicle.find({ client: client });
    res.send(vehicle);
  } catch (error) {
    res.send({ error: "Falha ao buscar veiculo - verifique de o id está correto" });
  }
});

//BUSCAR VEICULO POR PLACA
router.post('/findByPlate', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { licensePlate } = req.body;
  try {
    const vehicle = await Vehicle.find({ licensePlate: licensePlate });
    res.send(vehicle);
  } catch (error) {
    res.send({ error: "Falha ao buscar veiculo - verifique de o id está correto" });
  }
});

module.exports = app => app.use('/vehicle', router)