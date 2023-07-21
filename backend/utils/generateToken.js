const jwt = require('jsonwebtoken');

const generateToken = ( res, userId ) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    // the code below protects against csrf attacks
    sameSite: 'strict',
    // when does this expire is what the code below says and its the same time as the token above
    maxAge: 30 * 24 * 60 * 60 * 1000
  })
}

module.exports = generateToken
