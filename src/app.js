const express = require("express")
<<<<<<< HEAD
const bodyParser = require("body-parser")
=======
//const bodyParser = require("body-parser")
>>>>>>> 6b4908b (Resolução de atividades)
const mongoose = require("mongoose")

const app = express()

<<<<<<< HEAD

//String de conexão
mongoose.connect("mongodb://localhost:27017/cursos", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

//Conexão com o mongo
=======
mongoose.connect("mongodb+srv://nadyLuna:nlrb1107@cluster0.thgjc.mongodb.net/cursos?retryWrites=true&w=majority", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});
//conexão com o mongo
>>>>>>> 6b4908b (Resolução de atividades)
let db = mongoose.connection;

// Captura de erro ou sucesso na conexão
db.on("error", console.log.bind(console, "connection error:"))
db.once("open", function (){
  console.log("conexão feita com sucesso.")
})

//rotas
const cursos = require("./routes/cursosRoute")

//configurar body parser
//app.use(bodyParser.json());
app.use(express.json()); 
//Podemos usar a propria função de parser de json do express, sem a necessidade de instalar o body parser 

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
  })

app.use("/cursos", cursos)

module.exports = app
