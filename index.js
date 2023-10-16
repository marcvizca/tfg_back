import express from 'express'

const app = express() //iniciamos express
//Iniciamos el servidor
app.listen('8000', function() {
    console.log('Aplicacion iniciada en el puerto 8000')
})

//Configurador de pug
app.set('views', './vistas')
app.set('view engine', 'pug')

//configuracion archivos estaticos
app.use(express.static('./vistas'))
app.use(express.static('./src'))
app.use(express.static('./css'))





app.get('/', function(req, res){
    res.send('aplicacion iniciada')
})
