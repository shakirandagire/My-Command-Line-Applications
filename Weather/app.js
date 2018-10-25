const weather = require('./weather');
//Join multiple values pased as arguments and replace spaces with underscores
const query = process.argv.slice(2)
weather.get(query);