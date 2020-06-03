
let fs = require('fs')

var path = require('path')

let axios = require('axios')

let constants = require('../util/constants')

let url = constants.stationInfoURL

let obj = {}

let relativePath = path.join(__dirname, '..', 'files', 'input', constants.stationInfoFileName)

const getData = async () => {

    try {

        let response = await axios.get(url)
        
        fs.writeFileSync(relativePath, JSON.stringify(response.data))
        
        obj.status = constants.successResponse.status
        
        obj.body = constants.successResponse.statusText
        
        return obj
    
    } catch (error) { 
        
        obj.status = error.response.status
        
        obj.body = error.response.statusText
        
        return obj
    }
}

exports.getData = getData