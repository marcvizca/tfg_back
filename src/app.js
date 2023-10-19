import express from 'express'
import cors from 'cors'
import usersRoutes from './routes/users.routes.js'
import pollsRoutes from './routes/polls.routes.js'

const app = express() //iniciamos express
app.use(cors());
app.use(express.json())

app.use('/api', usersRoutes)
app.use('/api', pollsRoutes)

app.use((req, res, next) => { //si es consulta una ruta que no existeix
    res.status(400).json ({
        message: 'endpoint not found'
    })
})

app.get('/', function(req, res){
    res.send('aplicacion iniciada')
})

export default app;