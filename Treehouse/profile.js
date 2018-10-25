const https = require('https');

const http = require('http');

function printMessage(username, badgeCount, points, topic){
    const message = `${username} has ${badgeCount} badge points and ${points} in Javasript`
    console.log(message)
}

function printError(error){
    console.error(error.message);
}

function getProfile(username){
    try{
            //Connect to the API URL(https://teamtreehouse.com/username.json)
        const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
        if(response.statusCode === 200){   
        // Read the data
            let body = "";
            response.on('data', data => {
                body += data.toString();
            });
            
            response.on('end', () =>{
                try{
                    // Parse the data
                    const profile = JSON.parse(body);
                    console.log(body);
                    //Print the data
                    printMessage(username, profile.badges.length, profile.points.JavaScript)

                }
                catch (error){
                    const message  = `There was an error parsing data)`
                    const parseError = new Error(message)
                    printError(parseError)
                }
            })
        } else {
            const message = `There was an error getting profile for ${username} (${http.STATUS_CODES[response.statusCode]})`
            const statusCodeError = new Error(message)
            printError(statusCodeError)

        }
        })

        request.on('error', error => {
            const message  = `There was an error in the URL`
            const URLError = new Error(message)
            printError(URLError)
        })
    }catch (error){
        const message  = `Unable to determine the domain name`
        const domainError = new Error(message)
        printError(domainError)
    }

}
module.exports.getProfile = getProfile;