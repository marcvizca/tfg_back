import {pool} from '../database.js'


export const postMinuts = async (req, res) => {
    const { teamId, date, minuts } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM trainedmin WHERE date = ?', [date]);
        if (rows.length > 0) {
            return res.status(400).json({
                message:'Ja hi ha minuts registrats en aquesta data.'
            })
        }
        await pool.query('INSERT INTO trainedmin (team_id, date, minuts) VALUES (?, ?, ?)', [teamId, date, minuts])
        res.status(201).json ({
            success: 'Minuts registered correctly!'
        })
    } catch ( error ) {
        return res.status(500).json( {
            message: 'Something went wrong'
        })
    }
}