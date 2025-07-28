const express = require('express');
const router = express.Router();

//MODEL
const Os = require('../Model/os');
const Vehicle = require('../Model/vehicle');
const Employee = require('../Model/employee');
const Client = require('../Model/client');


//LISTAR TODAS AS OS CADASTRADAS
router.get('/list', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const os = await Os.find();
    res.send(os);
});

//CADASTRAR OS
router.post('/register', async (req, res) => {
    try {
        const os = await Os.create(req.body)
        return res.send({ sucess: 'OS Cadastrada', os: os })
    } catch (err) {
        return res.status(400).send({ error: 'Falha ao cadastrar OS', data: err })
    }
})

//REMOVER COLABORADOR
router.post('/delete', async (req, res) => {
    const { _id } = req.body;
    try {
        const employee = await Employee.findOne({ _id: _id });
        await employee.delete();
        res.send({ resposta: 'Colaborador ' + employee.name + ' foi removido' })
    } catch (err) {
        return res.send({ error: 'Falha ao remover colaborador', data: err })
    }
})

//ATUALIZAR COLABORADOR
router.post('/update', async (req, res) => {

    const { _id } = req.body;

    var data = {
        name: req.body.name,
        cpf: req.body.cpf,
        email: req.body.email,
        role: req.body.role,
        andress: req.body.andress
    }

    try {
        const employee = await Employee.findOne({ _id: _id });
        await employee.overwrite(data);
        await employee.save();
        res.json({ sucess: 'Os dados do colaborador foram atualizados', employee: employee })
    } catch (err) {
        return res.json({ error: 'Falha so atualizar os dados do colaborador', data: err })
    }
})

//BUSCAR COLABORADOR POR ID
router.post('/findById', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const { _id } = req.body;
    try {
        const employee = await Employee.find({ _id: _id });
        res.send(employee);
    } catch (error) {
        res.send({ error: "Falha ao buscar colaborador" })
    }
})

//BUSCAR COLABORADOR POR NOME
router.post('/findByName', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const { name } = req.body;
    try {
        const employee = await Employee.find({ name: { $regex: '^' + name, $options: 'i' } });
        res.send(employee);
    } catch (error) {
        res.send({ error: "Falha ao buscar colaborador", data: error })
    }
})

//BUSCAR COLABORADOR POR CPF
router.post('/findByCpf', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const { cpf } = req.body;
    try {
        const employee = await Employee.find({ cpf: cpf });
        res.send(employee);
    } catch (error) {
        res.send({ error: "Falha ao buscar colaborador", data: error })
    }
})


module.exports = app => app.use('/os', router);