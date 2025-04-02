// este codigo é antes de enviar para o BD
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//aqui ele esta criando uma tabela no BD (banco de dados) 
//e esta dano o nome dessa tabela de Picture e só constar o "nome" e o "src".
const PictureSchema = new Schema({ 
    name: { type: String, required: true},
    src: { type: String, required: true},
    
});

module.exports = mongoose.model("Picture", PictureSchema);

