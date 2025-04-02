// ele vai localizar os arquivos nos BD mongo

// Importando para uploads de arquivos
const multer = require ("multer") // faz o envio da pastas/ arquivos


//Importa o path para a manipulação de caminhos de arquivos (windows)
const path = require ("path") //procurar a pasta na maquina 


//esta guardando somente. - Configura o armazamento dos arquivos com Multer
const storage = multer.diskStorage({

    //função para definir o diretório dos arquivos 
    destination: function (req, file, cb) {
        cb(null,"uploads/"); // toda vez que ele vai achar qualquer arquivos ele vai armazenar na pasta de uploads
    },

    //função para definir o nome do arquivo
    filename: function(req, file, cb) {  

        //Define o nome do arquivo com a data e extensão original do arquvo
        cb(null, Date.now() + path.extname(file.originalname));


    },//ele vai procurar pela a data e pelo o nome do arquivo
});

//Aqui ele esta configurando o middleware de upload
const upload = multer ({ storage });


//Exporta para utiliza em outros arquivos 
module.exports = upload;