// quando tiver erro na aplicação

//Express para criar o servidor e definir rotas 
const express = require("express");

//Crio uma instancia do Exoress
const app = express();

//Carrega variaveis de ambientes do arquivo .env
require("dotenv").config();

//Estabeleça a conexão com o Banco de dados , feito pelo banco de dados DB.js
require("./db");

//Define a porta do servidor  (.ENV ou 3000)
const port = process.env.PORT || 3000; //roda tanto no .env (4000) ou na 3000

// Importa o roteador de img. para ultilizar as rotas / 
const pictureRouter = require("./router/picture");

//essa é a rota principal que ele vai fazer começando no pictures
// sera todos os envios (GET, POST E DELETE, ECT), PELO PICTURErOUTER
//HTTPS://LOCALHOST:4000/PICTURES 
app.use("/pictures", pictureRouter);

//inicia o servidor 

app.listen(port,() => {
    console.log(`O servidor executa na porta ${port}`);
});