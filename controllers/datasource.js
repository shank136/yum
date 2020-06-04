let fs = require('fs')
var path = require('path')
let axios = require('axios')
let request = require('request')
let unzip = require('unzip')
let constants = require('../util/constants')
let stationInfoURL = constants.stationInfoURL
let divvyDataURL = constants.divvyDataURL

let obj = {}

let relativePath = path.join(__dirname, '..', 'files', 'input', constants.stationInfoFileName)
let dataFilePath = path.join(__dirname, '..', 'files', 'input', constants.zipFileName)
let extractToDirectoryPath = path.join(__dirname, '..', 'files', 'input')

const getData = async () => {

    try {

        let response = await axios.get(stationInfoURL)

        fs.writeFile(relativePath, JSON.stringify(response.data), (err) => {
            if (err) throw err
            console.log('File written successfully')
        })

        obj.status = constants.successResponse.status

        obj.body = constants.successResponse.statusText

        return obj

    } catch (error) {

        obj.status = constants.errorResponse.status

        obj.body = constants.errorResponse.statusText

        return obj
    }
}

const getFile = async () => {
    
    try {

        let fileUrl = divvyDataURL

        request({
            url: fileUrl,
            encoding: null,
        }, (err, resp, body) => {

            if (err) throw err

            fs.writeFile(dataFilePath, body, (err) => {
                console.log('File written successfully')
            })
        })


        obj.status = constants.successResponse.status

        obj.body = constants.successResponse.statusText

        return obj

    } catch (error) {

        console.log(error)

        let obj = {}

        obj.status = constants.errorResponse.status

        obj.body = constants.errorResponse.statusText

        return obj
    }
}

const unzipFile = async () => {

    try {

        setTimeout(() => {

            let inputFileName = dataFilePath

            let extractToDirectory = extractToDirectoryPath

            fs.createReadStream(inputFileName).pipe(unzip.Extract({path: extractToDirectory}))

            obj.status = constants.successResponse.status

            obj.body = constants.successResponse.statusText

            return obj

        }, 3000)

    } catch (error) {
        
        obj.status = constants.errorResponse.status

        obj.body = constants.errorResponse.statusText

        return obj

    }
}



exports.getData = getData
exports.getFile = getFile
exports.unzipFile = unzipFile