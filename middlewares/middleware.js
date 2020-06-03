// Format of token
// Authorization: Bearer <token>

//verify token
function verifyToken(req, res, next) {
    //Get auth header value
    let bearerHeader = req.headers['authorization']
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
      // Split
      let bearer = bearerHeader.split(' ')
      // Get token from array
      let bearerToken = bearer[1]
      // Set the token
      req.token = bearerToken
      // Next middleware
      next()
    } else {
      //Forbidden
      res.sendStatus(403)
    }
  
  }

  exports.verifyToken = verifyToken