import {pool} from '../database.js'
import dotenv from 'dotenv'

dotenv.config();

export const getTeam = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM team WHERE id=?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
        message : 'Team not found'
        })

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json( {
            message: 'Something went wrong'
        })
    }
    
}

export const postTeam = async (req, res) => {
    const { userId, teamName, sport } = req.body
    try {
        const [result] = await pool.query('INSERT INTO team (name, sport) VALUES (?, ?)', [teamName, sport])
        const teamId = result.insertId;
        await pool.query('INSERT INTO member (user_id, team_id, is_trainer) VALUES (?, ?, ?)', [userId, teamId, true])
        res.status(201).json ({
            teamId: teamId,
            success: 'Team created succesfully!',
        })
    } catch(error) {
        return res.status(500).json( {
            message: 'Something went wrong'
        })
    }
}

export const joinTeam = async (req, res) => {
    const { teamId, userId, number, position } = req.body;

    try {
        const teamResult = await pool.query('SELECT * FROM team WHERE id = ?', [teamId]);
        console.log(teamResult[0]);

        if (teamResult[0] != '') {
            console.log("entra if");
            try {
                await pool.query('INSERT INTO MemberPendent (user_id, team_id, number, position) VALUES (?, ?, ?, ?)',
                [userId, teamId, number, position]);
                return res.status(200).json({ message: 'User joined the team successfully. Wait for the trainer to accept you!' });
            } catch (error) {
                if(error.sqlMessage) return res.status(400).json({error: error.sqlMessage});
                else return res.status(500).json({ error: 'Something went wrong '})
            }
        } else {
            console.log("Entra else")
            return res.status(404).json({ error: 'Team not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' });
    }
};

export const getMembersPendents = async (req, res) => {
    const { teamId } = req.params;
    try {
        const result = await pool.query('SELECT MP.user_id, MP.team_id, U.name, U.surname, MP.number, MP.position FROM memberpendent MP LEFT JOIN user U ON MP.user_id = U.id WHERE MP.team_id = ?', [teamId]);
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' });
    }
}
