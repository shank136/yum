module.exports = {
    "currentYear": 2020,
    "unkwown" : "Unknown",
    "stationInfoURL": "https://gbfs.divvybikes.com/gbfs/en/station_information.json",
    "stationInfoFileName" : "station_information.json",
    "divvyDataURL": "https://s3.amazonaws.com/divvy-data/tripdata/Divvy_Trips_2019_Q2.zip",
    "zipFileName": "Divvy_Trips_2019_Q2.zip",
    "successResponse" : {
        "status": 200,
        "statusText": "File written successfully!"
    },
    "errorResponse" : {
        "status": 500,
        "statusText": "Error occured duing write file operation."
    },
    "badRequest" : {
        "status": 400,
        "statusText": "Invalid Status ID"
    },
    "fileReadResponse" : {
        "status" : "200",
        "body" : "File processing in progress..."
    },
    "welcomeMessage" : "Welcome to Yum API",
    "secret": "secretkey",
    "expiry": '10m',
    "tokenErrorMessage": 'Please generate new token and try again.',
    "forbidden" : 403,
    "port" : 3000
}