const https = require('https');
const api = require('./api.json');
const http = require('http');

function printWeather(weather){
    const message = `Current temperature in ${weather.name} is ${weather.main.temp}F`
    console.log(message);
}

function printError(error){
    console.error(error.message);
}

function get(query){
    try{

        const request = https.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${api.key} `, 
            response =>{
                if(response.statusCode === 200){
                    let body = "";
                response.on('data', chunk =>{
                    body += chunk;
                })
                response.on('end', ()=>{
                    try{
                        if (weather){
                            const weather = JSON.parse(body);
                            printWeather(weather)
                        }else{
                            const parseError = new Error(`The location ${query} isnot found`)
                            printError(parseError)
                        }

                    }catch(error){
                        printError(error)
                    }
                })

                } else{
                    //Status code error
                    const statusCodeError = new Error(`There was an error getting the temperature for ${query}. (${http.STATUS_CODES[response.statusCode]})`);
                    printError(statusCodeError);
                }
            }
        )
        
    }
    //Error message for malformed URL
    catch(error){
        printError(error);
}
}

module.exports.get = get;