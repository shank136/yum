let fs = require('fs')
var path = require('path')
let axios = require('axios')
let request = require('request')
let unzip = require('unzip')
let constants = require('../util/constants')
let url = constants.stationInfoURL

let obj = {}

let relativePath = path.join(__dirname, '..', 'files', 'input', constants.stationInfoFileName)
let dataFilePath = path.join(__dirname, '..', 'files', 'input', 'Divvy_Trips_2019_Q2.zip')

const getData = async () => {

    try {

        let response = await axios.get(url)

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

        let fileUrl = 'https://s3.amazonaws.com/divvy-data/tripdata/Divvy_Trips_2019_Q2.zip'

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

            let inputFileName = '/Users/shashankchinmulgund/Downloads/yum_latest_code/files/input/Divvy_Trips_2019_Q2.zip'

            let extractToDirectory = '/Users/shashankchinmulgund/Downloads/yum_latest_code/files/input'

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