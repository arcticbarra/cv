const request = require('request');
const creds = require('./credentials');

const city_name = 'Monterrey, Nuevo Leon';

request(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city_name}.json?access_token=${creds.MAPBOX_TOKEN}&limit=1`,
  function (error, response, body) {
    const parsedBody = JSON.parse(body);
    const longitude = parsedBody.features[0].center[0];
    const latitude = parsedBody.features[0].center[1];
    request(`https://api.darksky.net/forecast/${creds.DARK_SKY_SECRET_KEY}/${latitude},${longitude}?units=si&lang=es`,
      function (error, response, body) {
        const parsedBody = JSON.parse(body);
        console.log(parsedBody.daily.summary);
      }
    )
  }
);
