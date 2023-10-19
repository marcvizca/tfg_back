import {pool} from '../database.js'

export const getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM user')
        res.json(rows)
    } catch(error) {
        return res.status(500).json( {
            message: 'Something went wrong'
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM user WHERE id=?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
        message : 'User not found'
        })

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json( {
            message: 'Something went wrong'
        })
    }
    
}

export const createUser = async (req, res) => {
    const { email, password, name, surname } = req.body
    try {
        const [rows] = await pool.query('INSERT INTO user (email, password, name, surname) VALUES (?, ?, ?, ?)', [email, password, name, surname])
        res.send ({
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

export const deleteUser = async (req, res) => {
    try {
        const [result] = await pool.query ('DELETE FROM user WHERE id=?', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'User not found'
        })

        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json( {
            message: 'Something went wrong'
        })
    }
}

export const updateUser = async (req, res) => {
    const {id} = req.params
    const { email, password, name, surname } = req.body
    try {
        const [result] = await pool.query('UPDATE user SET email = ?, password = ?, name = ?, surname = ? WHERE id = ?', [email, password, name, surname, id])

        if (result.affectedRows === 0) return res.status(404).json({
            "message": "User not found"
        })
    
        const [rows] = await pool.query('SELECT * FROM user WHERE id = ?', [id])

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json( {
            message: 'Something went wrong'
        })
    }
}