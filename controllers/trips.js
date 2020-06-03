let fs = require('fs')
let path = require('path')
let readline = require('readline')
let constants = require('../util/constants')
let moment = require('moment')
let _ = require('lodash')

let inputFilePath = path.join(__dirname, '..', 'files', 'input', 'test2.txt')
//let inputFilePath = path.join(__dirname, '..', 'files', 'input', 'Divvy_Trips_2019_Q2.txt')
let outputFilePath = path.join(__dirname, '..', 'files', 'output')

function findLatestTrips (endDate, endStationIds) {

let rd = readline.createInterface({
    input: fs.createReadStream(inputFilePath),
    output: process.stdout,
    console: false
})

// provide multiple end stationids
let inputEndStationIds = endStationIds

// provide single end date
let inputEndDate = endDate

let obj = {}

let output = []

rd.on('line', (line) => {
    let rentalId = line.split(',')[0]
    let startDateTime = line.split(',')[1]
    let startDate = startDateTime.split(' ')[0]
    let endDateTime = line.split(',')[2]
    let endDate = endDateTime.split(' ')[0]
    let bikeId = line.split(',')[3]
    let duration = line.split(',')[4]
    let duration2 = line.split(',')[5]

    let substring = '"'
    let startStationId
    let startStationName 
    let endStationId
    let endStationName
    let memberUserType
    let memberGender
    let memberBirthYear
    
    if (duration.includes(substring)) {
        duration = duration.concat(duration2)
        startStationId = line.split(',')[6]
        startStationName = line.split(',')[7]
        endStationId = line.split(',')[8]
        endStationName = line.split(',')[9]
        memberUserType = line.split(',')[10]
        memberGender = line.split(',')[11]
        memberBirthYear = line.split(',')[12]
    } else {
        startStationId = duration2
        startStationName = line.split(',')[6]
        endStationId = line.split(',')[7]
        endStationName = line.split(',')[8]
        memberUserType = line.split(',')[9]
        memberGender = line.split(',')[10]
        memberBirthYear = line.split(',')[11]
    }

    obj.rentalId = rentalId
    obj.startDateTime = startDateTime
    obj.startDate = startDate
    obj.endDateTime = endDateTime
    obj.endDate = endDate
    obj.bikeId = bikeId
    obj.duration = duration
    obj.startStationId = startStationId
    obj.startStationName = startStationName
    obj.endStationId = endStationId
    obj.endStationName = endStationName
    obj.memberUserType = memberUserType
    obj.memberGender = memberGender
    obj.memberBirthYear = memberBirthYear
    
    //calculate member age and store value
    constants.currentYear - memberBirthYear === constants.currentYear? 
    obj.memberAge = constants.unkwown : obj.memberAge = constants.currentYear - memberBirthYear
    
    //console.log(obj)
    
    // check for given dates and endStationIds
    if (inputEndDate.includes(obj.endDate) && inputEndStationIds.includes(obj.endStationId)) {
        //console.log(obj)
        let trip = {}
        trip.rentalId = obj.rentalId
        trip.startDateTime = obj.startDateTime
        trip.endDateTime = obj.endDateTime
        trip.bikeId = obj.bikeId
        trip.duration = obj.duration
        trip.startStationId = obj.startStationId
        trip.startStationName = obj.startStationName
        trip.endStationId = obj.endStationId
        trip.endStationName = obj.endStationName
        trip.memberUserType = obj.memberUserType
        trip.memberGender = obj.memberGender
        trip.memberBirthYear = obj.memberBirthYear
        trip.memberAge = obj.memberAge
        output.push(trip)
    }

});

rd.on('close', () => {

    for (let i = 0; i < inputEndStationIds.length; i++) {

    let filteredArray = output.filter((element) => {return element.endStationId == inputEndStationIds[i]})

    let orderedFilteredArray = _.orderBy(filteredArray, [object => new moment(object.endDateTime)], ['desc'])

    let splicedFilteredArray = orderedFilteredArray.slice(0, 20)

    let fileName = '/tripsforstation_' + inputEndStationIds[i].toString() + '.json'

    fs.writeFile(outputFilePath + fileName, JSON.stringify(splicedFilteredArray), (err) => {
        
        if (err) throw err

        console.log('File was written successfully!', fileName)
    })

    }

})

}

exports.findLatestTrips = findLatestTrips