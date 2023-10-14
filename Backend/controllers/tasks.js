const { pool } = require('../db/connect')

const createTask = async (req, res) => {
    try {

        const { name, uid } = req.body


        let sql = `
            INSERT INTO tasks (name, uid)
            VALUES("${name}", "${uid}")
        `;

        await pool.query(sql);

        res.status(200).send('task added successfully')
    }
    catch (err) {
        res.json({ msg: "Error adding task in the database: " + err })
    }
}

const getAllTasks = async (req, res) => {
    const sql = `
        SELECT * FROM tasks
    `
    const result = await pool.query(sql)
    const data = result[0]
    return res.json({ data })
}


const getUserTasks = async (req, res) => {

    const id = req.params.id

    const sql = `
        SELECT * FROM tasks where uid = ${id};
    `
    const result = await pool.query(sql)
    const data = result[0][0]
    return res.json({ data })
}


module.exports = { createTask, getAllTasks, getUserTasks }