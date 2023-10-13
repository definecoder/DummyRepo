const jwt = require('jsonwebtoken')

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // throw new Error('No token provided')
        res.json({ msg: 'No token provided' })
        return
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const { id, username } = decoded
        req.user = { id, username }
        next()
    } catch (error) {
        // throw new Error('Not authorized to access this route')
        res.json({ msg: 'Not authorized to access this route' })
        return
    }
}

module.exports = authenticationMiddleware
