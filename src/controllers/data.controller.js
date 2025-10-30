import {pool} from '../database.js'

//Aguda setmana actual
const getActualCargaAguda = async (teamId) => {
    try {
        const result = await pool.query(
            'SELECT M.user_id, U.name, U.surname, M.number, IFNULL(SUM(R.rpe * TM.minuts), 0) AS carga_aguda FROM Member M JOIN User U ON M.user_id = U.id JOIN Team T ON M.team_id = T.id LEFT JOIN Poll P ON M.user_id = P.user_id AND M.team_id = P.team_id  AND P.date BETWEEN SUBDATE(CURDATE(), WEEKDAY(CURDATE())) AND CURDATE() LEFT JOIN Rpe R ON P.id = R.poll_id LEFT JOIN trainedMin TM ON T.id = TM.team_id AND P.date = TM.date WHERE M.team_id = ? AND M.is_trainer=0 GROUP BY M.user_id, U.name, U.surname, M.number', [teamId]);
        return result[0];
    } catch (error) {
        return error;
    }
}

//Aguda setmana anterior
const getCargaAguda = async (teamId) => {
    try {
        const result = await pool.query(
            'SELECT M.user_id, U.name, U.surname, M.number, IFNULL(SUM(R.rpe * TM.minuts), 0) AS carga_aguda FROM Member M JOIN User U ON M.user_id = U.id JOIN Team T ON M.team_id = T.id LEFT JOIN Poll P ON M.user_id = P.user_id AND M.team_id = P.team_id  AND P.date BETWEEN SUBDATE(CURDATE(), WEEKDAY(CURDATE()) + 7) AND SUBDATE(CURDATE(), WEEKDAY(CURDATE()) +1) LEFT JOIN Rpe R ON P.id = R.poll_id LEFT JOIN trainedMin TM ON T.id = TM.team_id AND P.date = TM.date WHERE M.team_id = ? AND M.is_trainer=0 GROUP BY M.user_id, U.name, U.surname, M.number', [teamId]);
        return result[0];
    } catch (error) {
        return error;
    }
}

//Carga Diaria actual
const getCargaDiaria = async (teamId) => {
    try {
        const result = await pool.query(
            'SELECT user_id, name, surname, number, GROUP_CONCAT(carga_user_diaria ORDER BY date) AS carga_diaria FROM ( SELECT M.user_id, U.name, U.surname, M.number, P.date, IFNULL(SUM(R.rpe * TM.minuts), 0) AS carga_user_diaria FROM Member M JOIN User U ON M.user_id = U.id JOIN Team T ON M.team_id = T.id LEFT JOIN Poll P ON M.user_id = P.user_id AND M.team_id = P.team_id AND P.date BETWEEN SUBDATE(CURDATE(), WEEKDAY(CURDATE())) AND CURDATE() LEFT JOIN Rpe R ON P.id = R.poll_id LEFT JOIN trainedMin TM ON T.id = TM.team_id AND P.date = TM.date WHERE M.team_id = ? AND M.is_trainer = 0 GROUP BY M.user_id, U.name, U.surname, M.number, P.date ) AS subquery GROUP BY user_id, name, surname, number', [teamId]
        );
        return result[0];
    } catch (error) {
        return error;
    }
}

//Carga Diaria setmana anterior
const getCargaDiariaLastWeek = async (teamId) => {
    try {
        const result = await pool.query(
            'SELECT user_id, name, surname, number, GROUP_CONCAT(carga_user_diaria ORDER BY date) AS carga_diaria FROM ( SELECT M.user_id, U.name, U.surname, M.number, P.date, IFNULL(SUM(R.rpe * TM.minuts), 0) AS carga_user_diaria FROM Member M JOIN User U ON M.user_id = U.id JOIN Team T ON M.team_id = T.id LEFT JOIN Poll P ON M.user_id = P.user_id AND M.team_id = P.team_id AND P.date BETWEEN SUBDATE(CURDATE(), WEEKDAY(CURDATE()) + 7) AND SUBDATE(CURDATE(), WEEKDAY(CURDATE()) +1) LEFT JOIN Rpe R ON P.id = R.poll_id LEFT JOIN trainedMin TM ON T.id = TM.team_id AND P.date = TM.date WHERE M.team_id = ? AND M.is_trainer = 0 GROUP BY M.user_id, U.name, U.surname, M.number, P.date ) AS subquery GROUP BY user_id, name, surname, number', [teamId]
        );
        return result[0];
    } catch (error) {
        return error;
    }
}

//Per calcular ratio amb aguda = setmana actual i cronica actual + 3 anteriors
const getActualCargaCronica3Week = async (teamId) => {
    try {
        const result = await pool.query(
            'SELECT M.user_id, U.name, U.surname, M.number, IFNULL(SUM(R.rpe * TM.minuts), 0) AS carga_cronica FROM Member M JOIN User U ON M.user_id = U.id JOIN Team T ON M.team_id = T.id LEFT JOIN Poll P ON M.user_id = P.user_id AND M.team_id = P.team_id  AND P.date BETWEEN SUBDATE(CURDATE(), WEEKDAY(CURDATE()) + 21) AND CURDATE() LEFT JOIN Rpe R ON P.id = R.poll_id LEFT JOIN trainedMin TM ON T.id = TM.team_id AND P.date = TM.date WHERE M.team_id = ? AND M.is_trainer=0 GROUP BY M.user_id, U.name, U.surname, M.number', [teamId]);
        return result[0];
    } catch (error) {
        return error;
    }
}

//Per calcular ratio amb aguda = setmana anterior i cronica 3 setmanes
const getCargaCronica3Week = async (teamId) => {
    try {
        const result = await pool.query(
            'SELECT M.user_id, U.name, U.surname, M.number, IFNULL(SUM(R.rpe * TM.minuts), 0) AS carga_cronica FROM Member M JOIN User U ON M.user_id = U.id JOIN Team T ON M.team_id = T.id LEFT JOIN Poll P ON M.user_id = P.user_id AND M.team_id = P.team_id  AND P.date BETWEEN SUBDATE(CURDATE(), WEEKDAY(CURDATE()) + 21) AND SUBDATE(CURDATE(), WEEKDAY(CURDATE()) +1) LEFT JOIN Rpe R ON P.id = R.poll_id LEFT JOIN trainedMin TM ON T.id = TM.team_id AND P.date = TM.date WHERE M.team_id = ? AND M.is_trainer=0 GROUP BY M.user_id, U.name, U.surname, M.number', [teamId]);
        return result[0];
    } catch (error) {
        return error;
    }
}
//Per calcular ratio amb aguda = setmana anterior i cronica 4 setmanes
const getCargaCronica4Week = async (teamId) => {
    try {
        const result = await pool.query(
            'SELECT M.user_id, U.name, U.surname, M.number, IFNULL(SUM(R.rpe * TM.minuts), 0) AS carga_cronica FROM Member M JOIN User U ON M.user_id = U.id JOIN Team T ON M.team_id = T.id LEFT JOIN Poll P ON M.user_id = P.user_id AND M.team_id = P.team_id  AND P.date BETWEEN SUBDATE(CURDATE(), WEEKDAY(CURDATE()) + 28) AND SUBDATE(CURDATE(), WEEKDAY(CURDATE()) +1) LEFT JOIN Rpe R ON P.id = R.poll_id LEFT JOIN trainedMin TM ON T.id = TM.team_id AND P.date = TM.date WHERE M.team_id = ? AND M.is_trainer=0 GROUP BY M.user_id, U.name, U.surname, M.number', [teamId]);
        return result[0];
    } catch (error) {
        return error;
    }
}

//Carga Mitja setmana acutal
const getCargaMitja = async (teamId) => {
    const cargaAguda = await getActualCargaAguda(teamId);
    const actualDate = new Date();
    let actualDayNum = actualDate.getDay();
    actualDayNum = (actualDayNum === 0) ? 7 : actualDayNum;
    const cargaMitja = await cargaAguda.map((agudaItem) => {
        return {
            user_id: agudaItem.user_id,
            name: agudaItem.name,
            surname: agudaItem.surname,
            number: agudaItem.number,
            cargaMedia: (agudaItem.carga_aguda/actualDayNum),
        }
    })
    return cargaMitja;
}

//Carga Mitja setmana anterior
const getCargaMitjaLastWeek = async (teamId) => {
    const cargaAguda = await getCargaAguda(teamId);
    const cargaMitja = await cargaAguda.map((agudaItem) => {
        return {
            user_id: agudaItem.user_id,
            name: agudaItem.name,
            surname: agudaItem.surname,
            number: agudaItem.number,
            cargaMedia: (agudaItem.carga_aguda/7),
        }
    })
    return cargaMitja;
}

//Desviació Estàndard setmana actual
const getSD = async(teamId) => {
    const cargaDiaria = await getCargaDiaria(teamId);
    const cargaMitja = await getCargaMitja(teamId);
    const actualDate = new Date();
    let actualDayNum = actualDate.getDay();
    actualDayNum = (actualDayNum === 0) ? 7 : actualDayNum;

    const SD = await cargaDiaria.map((diariaItem) => {
        const mitjaItem = cargaMitja.find((item) => item.user_id === diariaItem.user_id);
        let dif = 0;
        const cargaDiariaArray = diariaItem.carga_diaria.split(',').map(Number);
        cargaDiariaArray.map((cargaItem) => {
            const resta = cargaItem - mitjaItem.cargaMedia;
            dif += Math.pow(resta, 2);
        })
        const sd = Math.sqrt((dif/(actualDayNum-1)));
        return {
            user_id: diariaItem.user_id,
            name: diariaItem.name,
            surname: diariaItem.surname,
            number: diariaItem.number,
            sd: sd,
        }
    });
    return SD;
}

//Desviació Estàndard setmana anterior
const getSDLastWeek = async (teamId) => {
    const cargaDiaria = await getCargaDiariaLastWeek(teamId);
    const cargaMitja = await getCargaMitjaLastWeek(teamId);

    const SD = await cargaDiaria.map((diariaItem) => {
        const mitjaItem = cargaMitja.find((item) => item.user_id === diariaItem.user_id);
        let dif = 0;
        const cargaDiariaArray = diariaItem.carga_diaria.split(',').map(Number);
        cargaDiariaArray.map((cargaItem) => {
            const resta = cargaItem - mitjaItem.cargaMedia;
            dif += Math.pow(resta, 2);
        })
        const sd = Math.sqrt((dif/6));
        return {
            user_id: diariaItem.user_id,
            name: diariaItem.name,
            surname: diariaItem.surname,
            number: diariaItem.number,
            sd: sd,
        }
    });
    return SD;
}

//ratio de 4 semanas anteriores sin semana actual
export const getACWR4 = async (req, res) => {
    const { teamId } = req.params;
    try {
        const aguda = await getCargaAguda(teamId);
        const cronica = await getCargaCronica4Week(teamId);
        const ratio = await aguda.map((agudaItem) => {
            const cronicaItem = cronica.find((item) => item.user_id === agudaItem.user_id);
            if (cronicaItem) {
              const ratio = agudaItem.carga_aguda / (cronicaItem.carga_cronica / 3);
              return {
                user_id: agudaItem.user_id,
                name: agudaItem.name,
                surname: agudaItem.surname,
                number: agudaItem.number,
                ratio: ratio,
              };
            } else {
                return{
                    user_id: agudaItem.user_id,
                    name: agudaItem.name,
                    surname: agudaItem.surname,
                    number: agudaItem.number,
                    ratio: 0,
                }
            }
        });
        res.json(ratio);
        
    } catch (error) {
        return res.status(500).json( {
            message: 'Something went wrong'
        })
    }
}

//ratio semana actual + 3 anteriores
export const getActualACWR3 = async (req, res) => {
    const { teamId } = req.params;
    try {
        const aguda = await getActualCargaAguda(teamId);
        const cronica = await getActualCargaCronica3Week(teamId);
        const ratio = await aguda.map((agudaItem) => {
            const cronicaItem = cronica.find((item) => item.user_id === agudaItem.user_id);
            if (cronicaItem) {
              const ratio = agudaItem.carga_aguda / (cronicaItem.carga_cronica / 3);
              return {
                user_id: agudaItem.user_id,
                name: agudaItem.name,
                surname: agudaItem.surname,
                number: agudaItem.number,
                ratio: ratio,
              };
            } else {
                return {
                    user_id: agudaItem.user_id,
                    name: agudaItem.name,
                    surname: agudaItem.surname,
                    number: agudaItem.number,
                    ratio: 0,
                  };
            }
        });
        res.json(ratio);
        
    } catch (error) {
        return res.status(500).json( {
            message: 'Something went wrong'
        })
    }
}

//Index Monotonia equip setmana actual
export const getMI = async (req, res) => {
    const {teamId} = req.params;
    const cargaMitja = await getCargaMitja(teamId);
    const sd = await getSD(teamId);
    const mi = await cargaMitja.map((cargaItem) => {
        const sdItem = sd.find((item) => item.user_id === cargaItem.user_id);
        let MI = (cargaItem.cargaMedia/sdItem.sd)
        if (!MI) MI = 0;
        return {
            user_id: cargaItem.user_id,
            name: cargaItem.name,
            surname: cargaItem.surname,
            number: cargaItem.number,
            MI: MI,
        }
    });
    res.json(mi);
}

//Index Monotonia equip setmana anterior
export const getMILastWeek = async (req, res) => {
    const { teamId } = req.params;
    const cargaMitja = await getCargaMitjaLastWeek(teamId);
    const sd = await getSDLastWeek(teamId);
    const mi = await cargaMitja.map((cargaItem) => {
        const sdItem = sd.find((item) => item.user_id === cargaItem.user_id);
        let MI = (cargaItem.cargaMedia/sdItem.sd)
        if (!MI) MI = 0;
        return {
            user_id: cargaItem.user_id,
            name: cargaItem.name,
            surname: cargaItem.surname,
            number: cargaItem.number,
            MI: MI,
        }
    });
    res.json(mi);
}