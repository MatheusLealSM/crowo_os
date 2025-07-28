const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
//configuracoes
app.set("port", process.env.PORT || 4000);

//
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//controllers
require("./Controller/clienteController")(app);
//require('./Controller/employeeController')(app);
//require('./Controller/vehicleController')(app);
//require('./Controller/osController')(app);

//inicia o servidor
app.listen(app.get("port"), () => {
  console.log("SISTEMA INICIADO NA PORTA " + app.get("port"));
});
