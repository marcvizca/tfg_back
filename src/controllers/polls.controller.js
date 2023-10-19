import {pool} from '../database.js'

export const postPoll = async (req, res) => {
    const { user_id, team_id, date } = req.body
    try {
        const [rows] = await pool.query('INSERT INTO poll (user_id, team_id, date) VALUES (?, ?, ?)', [user_id, team_id, date])
        res.send ({
            user_id,
            team_id,
            date
        })
    } catch ( error ) {
        return res.status(500).json( {
            message: 'Something went wrong'
        })
    }
}