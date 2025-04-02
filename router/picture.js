//Importando para manipular as rotas 
const express = require("express") // ele vai la no controller e segue a rota que esta la´

//Criando um arquivo de rotas pelo express
const router = express.Router()

//Importando o middleware de upload (multer)
const upload = require("../config/multer")

//controlador da imagens funçoes logicas ( GET - POST - etc...) se quiser refazer um GRUD esta no pictureController
const PictureController = require("../controllers/PictureControllers");  // Corrigido aqui

//definido a rota POST (upload da img e armaz. no DB)
router.post("/", upload.single("file"), PictureController.create);

//definindo a rota GET (trazer todas as imagens do DB)
router.get("/", PictureController.findAll);

//exportando para utilizar em outro arquivo
module.exports = router;

/* exports.findAll = async (req, res) => {
    try {
        const pictures = await Picture .find()

        res.json(pictures);
    } catch (error) {
        res.status(500).json({ message: "Error ao buscar!"});
    }
}; */