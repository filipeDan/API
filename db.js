//se caso tiver algum erro no DB


//Importando PARA INTERAGIR COM o MONGOOSE
const mongoose = require("mongoose");

//carrega variaveis de ambientes do arquivos .ENV
require("dotenv").config();


//CONFIGURA O MONGOOSE PARA PERITIT CONSULTA (RESTRITIVAS)
mongoose.set("strictQuery", true);

//CREDENCIAIS 
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

//FUNÇÃO PARA CONECTAR DO BANCO DE DADOS
async function main() {
    await mongoose.connect( `mongodb+srv://${dbUser}:${dbPassword}@clusterapi.23ri3.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAPI`
          // AQUI COLOCA O LINK QUE TEM NO MONGOSSE
        // LINK DO SITE MONGODB

    ); 
    console.log("Conectou ao banco de dados!");
}

//caso ocorra mostra uma msg
main().catch((err)=> console.log(err));


//exportando a função para utilizar em outro arquivo
module.exports = main;

