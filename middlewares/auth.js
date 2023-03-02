require("dotenv").config()
const { verify } = require('jsonwebtoken')

module.exports = (req, res, next) => {
  // ---get token from request header---
  // x-auth-token => cle => mettez dans postman ,, value => token
  const token = req.header('x-auth-token')

  // ---check whether token exists---
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'Token not found or invalid! Access denied' })
  }

  try {
    // feefefefefe => cle jwt 
    const decryptedToken = verify(token,"feefefefefe" )
    req.user = decryptedToken.user
    next()
  } catch (er) {
    res.status(401).json({ msg: 'Token not found or invalid! Access denied' })
  }
}