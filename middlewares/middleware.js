function verifyToken(req, res, next) {

  let bearerHeader = req.headers['authorization']

  if (typeof bearerHeader !== 'undefined') {

    let bearer = bearerHeader.split(' ')

    let bearerToken = bearer[1]

    req.token = bearerToken

    next()
  } else {

    res.sendStatus(403)
  }

}

exports.verifyToken = verifyToken