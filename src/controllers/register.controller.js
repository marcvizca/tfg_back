import {pool} from '../database.js'
import bcrypt from 'bcrypt'

export const registerUser = async (req, res) => {
    const { email, password, name, surname } = req.body
    const [rows] = await pool.query('SELECT * FROM user WHERE email=?', [email])
    if (rows.length > 0) return res.status(409).json( {
        message: 'This user already exists.'
    })
    try {
        const hashedPwd = await bcrypt.hash(password, 10);
        const [rows] = await pool.query('INSERT INTO user (email, password, name, surname) VALUES (?, ?, ?, ?)', [email, hashedPwd, name, surname])
        res.status(201).json ({
            success: 'Authentication Correct!',
            email,
            name,
            surname
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json( {
            message: 'Something went wrong'
        })
    }
}