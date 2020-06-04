This file gives a description of the Node.js application developed for Yum technical assessment. 

The server is organized into the following routes. 

1. /api 

    Request type: GET
    Prints a welcome message for the user to know the application is up and running.

2. /api/login

    Request type: GET
    Generates an API token for authentication upon invocation. 
    This token is set to expire in 10 minutes. 
    A new token can be generated if and when the token expires. 
    Expiration of the token can be increased if required by the developer and/or user. 

3. /api/loadstationinfo

    Request type: POST
    Renders data from endpoint https://gbfs.divvybikes.com/gbfs/en/station_information.json upon invocation. 
    Authentication token is required and needs to be provided in the headers. Authorization : Bearer <token>.
    File is saved on the file system /files/input/station_information.json

4. /api/stationinfo/:id

    Request type: POST
    Renders data for the station ID given in the request parameter(:id).
    Authentication token is required and needs to be provided in the headers. Authorization : Bearer <token>.
    If the given station ID is invalid, it returns an appropriate error message.

5. /api/loaddivvydatafile

    Request type: POST
    Downloads zip file available on https://s3.amazonaws.com/divvy-data/tripdata/Divvy_Trips_2019_Q2.zip
    Extracts the data file from the zip and saves it on the file system /files/input/Divvy_Trips_2019_Q2

6. /api/agegroups

    Request type: POST
    Processes large data file Divvy_Trips_2019_Q2 for the given end station IDs and end dates.
    Age groups of riders are returned and saved into a JSON file named rideragegroups.json.
    File will be available on the file system /files/output/rideragegroups.json after processing of large data file.
    Approximate time taken for processing over 1 million lines is 1.5 hours.

7.  /api/trips

    Request type: POST
    Processes large data file Divvy_Trips_2019_Q2 for the given end staion IDs and end date. 
    Last 20 trips for all given stations on a given date are rendered and saved into data files. 
    Output files will be available on the file system /files/output.tripsforstation_stationID.json.
    Approximate time taken for processing over 1 million lines is 1.5 hours.

Postman collection is provieded in Postman folder which can be downloaded to execute requests. 

Commands to run the application 

1. npm run start

    Starts the server on localhost and requests can be made

2. npm run test

    Executes test cases for the server. 
    Please provide updated token in test/test.js for successful execution of all test cases. 

3. Docker image can be accessed from the link: https://hub.docker.com/r/shank136/firstimage

    docker pull shank136/firstimage
    Download the docker image and run using docker on localhost to access the application.