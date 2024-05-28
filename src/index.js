const express = require('express')
const mongoose = require('mongoose')

const app = express()

//Para ler requisiçoes que venha com os dados em JSON
app.use(express.json())

const port = 3000

const mongoUrl = "mongodb+srv://David:mongodbteste@starwars-api.vztquyv.mongodb.net/?retryWrites=true&w=majority&appName=starwars-api"



mongoose.connect(mongoUrl).then(() => {
    console.log("Conectado com Sucesso")
}).catch((error) => console.log(error))



// Model - Modelo que vai ser salvo - Padrão de dados
const Film = mongoose.model('Film', {
    title: String,
    description: String,
    image_url: String,
    trailer_url: String
});


// app.get('/', function(req, res){
//     res.send('Hello World')
// })



// SALVAR OS DADOS
app.post("/", async (req, res) => {
    const film = new Film({
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    })

    await film.save()
    return res.send(film)
})


// LER OS DADOS
app.get("/", async (req, res) => {
    const films = await Film.find()
    return res.send(films)
})


// DELETAR DADO
app.delete("/:id", async(req, res) => {
    const film = await Film.findByIdAndDelete(req.params.id)
    return res.send(film)
})


//  ATUALIZAR DADO
app.put("/:id", async(req, res) => {
    const film = await Film.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    }, {new: true}) // Mostra o mais atual

    return res.send(film)
})




app.listen(port, () => {
    console.log('App running na porta: ' + port)
})





/**
 * RODAR PROJETO COMANDO
 * node src/index.js
 * 
 * FRONT TESTE:
 *  Postman
 * 
 * Visualizar dados no navegador
 * http://localhost:3000/
 */
