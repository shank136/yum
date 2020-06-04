let fs = require('fs')

var path = require('path')

let constants = require('../util/constants')

let inputFile = path.join(__dirname, '..', 'files', 'input', constants.stationInfoFileName)

function getStationDetails(id) {

    let stationDetails

    let data = fs.readFileSync(inputFile, 'utf8')

    let JSONObject = JSON.parse(data)

    let stations = JSONObject.data.stations

    stations.forEach((element) => {

        if (id == element.station_id) {

            stationDetails = element

        }
    })

    let response = {}

    if (stationDetails !== undefined) {

        response.status = constants.successResponse.status

        response.body = stationDetails

        return response

    } else {

        response.status = constants.badRequest.status

        response.body = constants.badRequest.statusText

        return response
    }

}

exports.getStationDetails = getStationDetails