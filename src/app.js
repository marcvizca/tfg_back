import express from 'express'
import cors from 'cors'
import usersRoutes from './routes/users.routes.js'
import pollsRoutes from './routes/polls.routes.js'
import registerRoutes from './routes/register.routes.js'
import authRoutes from './routes/auth.routes.js'
import logoutRoutes from './routes/logout.routes.js'
import refreshRoutes from './routes/refreshToken.routes.js'
import teamsRoutes from './routes/teams.routes.js'
import membersRoutes from './routes/members.routes.js'
import minutsRoutes from './routes/minuts.routes.js'
import dataRoutes from './routes/data.routes.js'
import verifyJWT from './middleware/verifyJWT.js'
import cookieParser from 'cookie-parser'


const app = express() //iniciamos express
const corsOptions = {
    origin:'http://localhost:3000', 
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api', registerRoutes);
app.use('/api', authRoutes);
app.use('/api', logoutRoutes);
app.use('/api', refreshRoutes);
//app.use(verifyJWT);
app.use('/api', usersRoutes);
app.use('/api', pollsRoutes);
app.use('/api', teamsRoutes);
app.use('/api', membersRoutes);
app.use('/api', minutsRoutes);
app.use('/api', dataRoutes);




app.use((req, res, next) => { //si es consulta una ruta que no existeix
    res.status(400).json ({
        message: 'endpoint not found'
    })
})

app.get('/', function(req, res){
    res.send('aplicacion iniciada')
})

export default app;