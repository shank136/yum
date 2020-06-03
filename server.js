let express = require('express')
let app = express()
let bodyParser = require('body-parser');
let dataSource = require('./controllers/datasource')
let stationDetails = require('./controllers/stationdetails')
let ageGroups = require('./controllers/agegroups')
let trips = require('./controllers/trips')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw())

app.get('/loaddatafromsource', (req, res) => {

  dataSource.getData().then((response) => {
    
    res.status(response.status).send(response)
  
  })

})

app.get('/stationinformation/:id', (req, res) => {
    
  let stationId = req.params['id']

  let response = stationDetails.getStationDetails(stationId)
    
    res.status(response.status).send(response)
})

app.post('/rideragegroups', (req, res) => {
  
  console.log(req.body)

  let endStationIds = req.body.endStationIds
  
  let endDates = req.body.endDates

  ageGroups.findAgeGroups(endStationIds, endDates)

  let response = {
    status : "200",
    body: "File processing in progress..."
  }

  res.status(response.status).send(response)

})

app.post('/latesttrips', (req, res) => {
  
  console.log(req.body)

  let endStationIds = req.body.endStationIds
  
  let endDate = req.body.endDate

  console.log(endStationIds)

  console.log(endDate)

  trips.findLatestTrips(endDate, endStationIds)

  let response = {
    status : "200",
    body: "File processing in progress..."
  }

  res.status(response.status).send(response)

})

let port = (process.env.PORT || 3000)

let server = app.listen(port, () => {

  console.log("Listening on port %s...", server.address().port)

})