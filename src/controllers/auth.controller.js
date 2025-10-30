import {pool} from '../database.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export const authUser = async (req, res) => {
    const { email, password } = req.body
        try {
            const [rows] = await pool.query('SELECT * FROM user WHERE email=?', [email]);
            if (rows.length <= 0) return res.status(404).json({
                message : 'User not found'
            })
            const match = await bcrypt.compare(password, rows[0].password);
            if (match) {
                const accessToken = jwt.sign(
                    { "username": email },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '10m' }
                );
                const refreshToken = jwt.sign(
                    { "username": email },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: '1d' }
                )

                //res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: false, maxAge: 24 * 60 * 60 * 1000 });
                res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None',secure: true, maxAge: 24 * 60 * 60 * 1000 }); //revisar per production (secure: true - only serves on https) --> sameSite: 'None',secure: true
                // En authUser después de generar el token de acceso
                //res.setHeader('authorization', `Bearer ${accessToken}`);
                res.json({ userId: rows[0].id, accessToken: accessToken});

            } else {
                res.status(401).json({
                    message: 'Incorrect password.'
                })
            }
        } catch (error) {
            return res.status(500).json( {
                message: 'Something went wrong'
            })
        }
}