let express = require('express')
let jwt = require('jsonwebtoken')
let bodyParser = require('body-parser')

let app = express()

let dataSource = require('./controllers/datasource')
let stationDetails = require('./controllers/stationdetails')
let ageGroups = require('./controllers/agegroups')
let trips = require('./controllers/trips')
let constants = require('./util/constants')
let middleware = require('./middlewares/middleware')
let mockUser = require('./util/user')


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw())

app.get('/api', (req, res) => {
  res.json({message: constants.welcomeMessage})
})

app.post('/api/login', (req, res) => {

  jwt.sign({user: mockUser.user}, constants.secret, {expiresIn: constants.expiry}, (err, token) => {
    res.json({token})
  })
})

app.post('/api/loadstationinfo', middleware.verifyToken, (req, res) => {

  jwt.verify(req.token, constants.secret, (err, authData) => {
    if (err) {
      res.status(constants.forbidden).send({message: constants.tokenErrorMessage})
    } else {
      dataSource.getData().then((response) => {
        res.status(response.status).send({response, authData})
      })
    }
  })
})

app.post('/api/stationinfo/:id', middleware.verifyToken, (req, res) => {
    
  jwt.verify(req.token, constants.secret, (err, authData) => {
    if (err) {
      res.status(constants.forbidden).send({message: constants.tokenErrorMessage})
    } else {
      let stationId = req.params['id']
      let response = stationDetails.getStationDetails(stationId)
      res.status(response.status).send({response, authData})
    }
  })

  
})

app.post('/api/agegroups', middleware.verifyToken, (req, res) => {

  let endStationIds = req.body.endStationIds
  let endDates = req.body.endDates

  jwt.verify(req.token, constants.secret, (err, authData) => {
    if (err) {
      res.status(constants.forbidden).send({message: constants.tokenErrorMessage})
    } else {
      ageGroups.findAgeGroups(endStationIds, endDates)
      let response = constants.fileReadResponse
      res.status(response.status).send({response, authData})
    }
  })
})

app.post('/api/trips', middleware.verifyToken, (req, res) => {
  
  let endStationIds = req.body.endStationIds
  let endDate = req.body.endDate

  jwt.verify(req.token, constants.secret, (err, authData) => {
    if (err) {
      res.status(constants.forbidden).send({message: constants.tokenErrorMessage})
    } else {
      trips.findLatestTrips(endDate, endStationIds)
      let response = constants.fileReadResponse
      res.status(response.status).send({response, authData})
    }
  })
})

let port = (process.env.PORT || constants.port)

let server = app.listen(port, () => {

  console.log("Listening on port %s...", server.address().port)

})