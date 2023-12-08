import {pool} from '../database.js'

const postPoll = async (user_id, team_id) => {
    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String (date.getMonth() +1).padStart(2, '0');
    var yyyy = date.getFullYear();
    date = yyyy + '-' + mm + '-' + dd;
    try {
        const [rows] = await pool.query('INSERT INTO poll (user_id, team_id, date) VALUES (?, ?, ?)', [user_id, team_id, date])
        return rows.insertId;
    } catch ( error ) {
        return error
    }
}

export const postRpe = async (req, res) => {
    const { userId, teamId, rpe } = req.body;
    try {
        const result = await postPoll(userId, teamId);
        const [rows] = await pool.query('INSERT INTO rpe (poll_id, rpe) VALUES (?, ?)', [result, rpe])
        res.status(201).json ({
            success: 'Rpe answered succesfully!'
        })
    } catch ( error ) {
        return res.status(500).json( {
            message: 'Something went wrong'
        })
    }
}

export const postWellness = async (req, res) => {
    const { user_id, team_id, data } = req.body
    try {
        const result = await postPoll(user_id, team_id);
        const [rows] = await pool.query('INSERT INTO wellness (poll_id, sleep, stress, fatigue, pain, mood) VALUES (?, ?, ?, ?, ?, ?)', [result, data.sleep, data.stress, data.fatigue, data.pain, data.mood])
        res.status(201).json ({
            success: 'Wellness answered succesfully!'
        });
    } catch ( error ) {
        return res.status(500).json( {
            message: 'Something went wrong'
        })
    }
}

export const getRpeInfo = async (req, res) => {
    const {teamId, date} = req.params;
    try {
        const result = await pool.query(
            'SELECT U.id, M.number, U.name, U.surname, GROUP_CONCAT(R.rpe) AS rpe FROM Member M JOIN User U ON M.user_id = U.id LEFT JOIN Poll P ON M.user_id = P.user_id AND M.team_id = P.team_id AND P.date = ? LEFT JOIN Rpe R ON P.id = R.poll_id WHERE M.team_id = ? AND M.is_trainer = 0 GROUP BY M.number, U.name, U.surname, U.id', [date, teamId]);
            res.json(result[0]);
    } catch (error) {
        return res.status(500).json( {
            message: 'Something went wrong'
        })
    }
}

export const getWellnessInfo = async(req, res) => {
    const {teamId, date} = req.params;
    try {
        const result = await pool.query(
            'SELECT DISTINCT U.id, M.number, U.name, U.surname, W.sleep, W.stress, W.fatigue, W.pain, W.mood FROM Member M JOIN User U ON M.user_id = U.id LEFT JOIN Poll P ON M.user_id = P.user_id AND M.team_id = P.team_id AND P.date = ? LEFT JOIN Wellness W ON P.id = W.poll_id WHERE M.team_id = ? AND M.is_trainer = 0 ORDER BY M.number', [date, teamId]);
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json( {
            message: 'Something went wrong'
        })
    }
}


export const getRpeByUser = async(req, res) => {
    const {userId, teamId, fromDate, toDate} = req.params;
    try {
        const result = await pool.query(
            'SELECT P.date, R.rpe FROM Rpe R JOIN Poll P ON R.poll_id = P.id JOIN Member M ON P.user_id = M.user_id AND P.team_id = M.team_id WHERE P.user_id = ? AND P.team_id = ? AND P.date BETWEEN ? AND ?',[userId, teamId, fromDate, toDate]);
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json( {
            message: 'Something went wrong'
        })
    }
}

export const getWellnessByUser = async (req, res) => {
    const {userId, teamId, fromDate, toDate} = req.params;
    try {
        const result = await pool.query(
            'SELECT P.date, W.sleep, W.stress, W.fatigue, W.pain, W.mood FROM Wellness W JOIN Poll P ON W.poll_id = P.id JOIN Member M ON P.user_id = M.user_id AND P.team_id = M.team_id WHERE P.user_id = ? AND P.team_id = ? AND P.date BETWEEN ? AND ?',[userId, teamId, fromDate, toDate]);
            console.log(result[0])
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json( {
            message: 'Something went wrong'
        })
    }
}