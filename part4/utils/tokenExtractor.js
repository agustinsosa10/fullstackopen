const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = async (request, response, next) => {
  //aisla la cabecera de peticion
  const authorization = request.get("authorization");
  let token = ''
  if (authorization && authorization.startsWith("Bearer ")) {
    //elimina bearer dejando solo el token
    token = authorization.replace("Bearer ", "");
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id || !token) {
    return response.status(401).json({ error: "token invalid" });
  }

  const {id: userId} = decodedToken
  request.user = await User.findById(userId)

  next()
};

module.exports = tokenExtractor
