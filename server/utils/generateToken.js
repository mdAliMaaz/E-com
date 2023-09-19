import jWT from 'jsonwebtoken';

const generateToken = (res, options) => {

    const token = jWT.sign(options, process.env.SECRET_KEY, {
        expiresIn: '30d'
    })
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
}

export { generateToken }