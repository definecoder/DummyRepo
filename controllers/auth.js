const { pool } = require('../db/connect')
const { getID } = require('../controllers/user')
const jwt = require('jsonwebtoken')


const login = async (req, res) => {
    const { email, password } = req.body


    if (!email || !password) {
        res.json({ msg: 'Please provide email and password' })
    }

    //just for demo, normally provided by DB!!!!
    const id = await getID(email, password)

    if (id == -1) {
        throw new Error('Invalid email or password')
    }
    // get user id from the data base using email and password

    // try to keep payload small, better experience for user
    // just for demo, in production use long, complex and unguessable string value!!!!!!!!!
    const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })

    res.status(200).json({ msg: 'user logged in', token })
}


const createUser = async (req, res) => {

    try {

        const { name, email, password, address } = req.body

        let sql = `
            INSERT INTO user (name, email, password, address)
            VALUES("${name}","${email}", "${password}", "${address}")
        `;
        await pool.query(sql);
        res.status(200).send('user added successfully')
    }
    catch (err) {
        res.status(500).json({ msg: err })
    }

}


module.exports = {
    createUser,
    login
}




