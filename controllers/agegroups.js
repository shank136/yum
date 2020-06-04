let fs = require('fs')
let path = require('path')
let readline = require('readline')
let constants = require('../util/constants')

let inputFilePath = path.join(__dirname, '..', 'files', 'input', 'test1.txt')
//let inputFilePath = path.join(__dirname, '..', 'files', 'input', 'Divvy_Trips_2019_Q2.txt')
let outputFilePath = path.join(__dirname, '..', 'files', 'output')


function findAgeGroups(endStationIds, endDates) {

    let rd = readline.createInterface({
        input: fs.createReadStream(inputFilePath),
        output: process.stdout,
        console: false
    })

    // provide end stationids
    let inputEndStationIds = endStationIds

    // provide end dates - requirement is one date but multiple dates can be given
    let inputEndDates = endDates

    let array = []

    let obj = {}

    let ageGroupArray = []

    let zeroToTwenty = 0

    let twentyOneToThirty = 0

    let thirtyOneToForty = 0

    let fortyOneToFifty = 0

    let fiftyOneAndAbove = 0

    let unknownAges = 0

    let output = []



    rd.on('line', (line) => {
        let rentalId = line.split(',')[0]
        let startDateTime = line.split(',')[1]
        let startDate = startDateTime.split(' ')[0]
        let startTime = startDateTime.split(' ')[1]
        let endDateTime = line.split(',')[2]
        let endDate = endDateTime.split(' ')[0]
        let endTime = endDateTime.split(' ')[1]
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
        obj.startDate = startDate
        obj.startTime = startTime
        obj.endDate = endDate
        obj.endTime = endTime
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
        constants.currentYear - memberBirthYear === constants.currentYear ?
            obj.memberAge = constants.unkwown : obj.memberAge = constants.currentYear - memberBirthYear

        array.push(obj)

        // check for given dates and endStationIs
        if (inputEndDates.includes(obj.endDate) && inputEndStationIds.includes(obj.endStationId)) {
            console.log(obj)
            ageGroupArray.push(obj.memberAge)
        }

    });

    rd.on('close', () => {

        ageGroupArray.forEach((element) => {
            if (element > 0 && element <= 20) {
                zeroToTwenty++
            } else if (element > 20 && element <= 30) {
                twentyOneToThirty++
            } else if (element > 30 && element <= 40) {
                thirtyOneToForty++
            } else if (element > 40 && element <= 50) {
                fortyOneToFifty++
            } else if (element > 50) {
                fiftyOneAndAbove++
            } else if (element === constants.unkwown) {
                unknownAges++
            }
        })

        output.push({
            "zeroToTwenty": zeroToTwenty
        }, {
            "twentyOneToThirty": twentyOneToThirty
        }, {
            "thirtyOneToForty": thirtyOneToForty
        }, {
            "fortyOneToFifty": fortyOneToFifty
        }, {
            "fiftyOneAndAbove": fiftyOneAndAbove
        }, {
            "unknownAges": unknownAges
        })

        console.log(output)

        fs.writeFile(outputFilePath + '/rideragegroups.json', JSON.stringify(output), (err) => {
            if (err) throw err
            console.log('File was written successfully!')
        })

    })
}

exports.findAgeGroups = findAgeGroups