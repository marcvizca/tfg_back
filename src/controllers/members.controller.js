import {pool} from '../database.js'


export const getMember = async (req, res) => {
    const { userId, teamId } = req.query;
    try {
        const [rows] = await pool.query('SELECT * FROM member  WHERE user_id = ? AND team_id = ?', [userId, teamId])
        if (rows.length <= 0) return res.status(404).json({
        message : 'Member not found'
        })

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json( {
            message: 'Something went wrong'
        })
    }
    
}

export const postMember = async(req, res) => {
    const {userId, teamId, number, position} = req.body;
    try {
        const result = pool.query('INSERT INTO member (user_id, team_id, is_trainer, number, position) VALUES (?,?,?,?,?)', [userId, teamId, 0, number, position]);
        pool.query('DELETE FROM memberpendent WHERE user_id = ? AND team_id = ?', [userId, teamId]);
        return res.status(200).json({message: "Miembro añadido correctamente al equipo"})
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong '})
    }
};

export const deleteMemberPendent = async (req, res) => {
    const { userId, teamId } = req.query;
    try {
        const result = pool.query('DELETE FROM memberpendent WHERE user_id = ? AND team_id = ?', [userId, teamId]);
        return res.status(200).json({message: 'Petición de miembro denegada correctamente'});
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong '})
    }
};

export const exitTeam = async (req, res) => {
    const { userId, teamId } = req.query;
    try {
        await pool.query('DELETE FROM poll WHERE user_id = ? AND team_id = ?', [userId, teamId]);
        await pool.query('DELETE FROM member WHERE user_id = ? AND team_id = ?', [userId, teamId]);
        return res.status(200).json({message: 'Ya no formas parte del equipo.'})
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong '})
    }
};