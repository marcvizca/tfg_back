import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();


const verifyJWT = (req, res, next) => {
    const authHeader = req.cookies['authorization'];
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.username;
            next();
        }
    );
}

export default verifyJWT;