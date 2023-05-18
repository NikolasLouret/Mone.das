const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const app = express();

app.use(cors());
app.use(express.json());

// Middleware do express-fileupload para processar o upload de arquivos
app.use(fileUpload());

// Configurar o diretório de arquivos estáticos
app.use('/files', express.static(__dirname + '/files'));

// DB Connection
const conn = require("./db/conn");
conn();

// Routes
const routes = require("./routes/router");
app.use("/api", routes);

app.listen(3000, () => console.log("Servidor ONLINE"));