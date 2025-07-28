const express = require('express')
const router = express.Router()

//MODEL
const Employee = require('../Model/employee')

//LISTAR TODOS OS COLABORADOR
router.get('/list', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.header("Access-Control-Allow-Origin", "*");
        res.send(employees);
    } catch (err) {
        return res.status(400).send({ error: 'Falha ao listar colaborador', data: err })
    }
});

//CADASTRAR COLABORADOR
router.post('/register', async (req, res) => {
    const { cpf } = req.body
    try {
        if (await Employee.findOne({ cpf })) {
            return res.status(400).send({ error: 'Colaborador Já cadastrado' })
        } else {
            const employee = await Employee.create(req.body)
            return res.send({ sucess: 'Colaborador Cadastrado!', employee: employee })
        }
    } catch (err) {
        return res.status(400).send({ error: 'Falha ao cadastrar colaborador', data: err })
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

module.exports = app => app.use('/employee', router)