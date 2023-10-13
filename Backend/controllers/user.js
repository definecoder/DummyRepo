const { pool } = require('../db/connect')

const getID = async (email, password) => {
    sql = `
        SELECT id FROM user WHERE email = '${email}' AND password = '${password}';
    `

    const result = await pool.query(sql)

    // if (result[0][0])

    // console.log(result[0][0].id)


    if (result[0][0]) {
        return (result[0][0]).id
    }
    else return -1;
}



// getUid('a@b.com', '1234')
module.exports = {
    getID
}