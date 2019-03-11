const request = require('request');
const creds = require('./credentials');

let city_name = 'Monterrey, Nuevo Leon';
const errorMsg = "Hubo un error al procesar el clima.\nFavor de revisar lo siguiente: \n- Las credenciales sean correctas\n- Conexión a internet\n- La ubicación ingresada sea válida";

if (process.argv.length === 3) {
  city_name = process.argv[2];
}

function getWeather(longitude, latitude) {
  request(`https://api.darksky.net/forecast/${creds.DARK_SKY_SECRET_KEY}/${latitude},${longitude}?units=si&lang=es`,
    function (error, response, body) {
      if (error) {
        console.log(errorMsg);
      } else {
        const parsedBody = JSON.parse(body);
        const dailyData = parsedBody.daily.data[0];
        console.log(`Cómo está el día en ${city_name}:`);
        console.log(`${dailyData.summary} Actualmente está a ${parsedBody.currently.temperature}°C. Hay ${dailyData.precipProbability * 100}% de posibilidad de lluvia.`);
      }
    }
  )
}

function getLocation(city_name) {
  return new Promise(function (resolve, reject) {
    request(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city_name}.json?access_token=${creds.MAPBOX_TOKEN}&limit=1`,
      function (error, response, body) {
        if (error) {
          return reject(error);
        } else {
          try {
            const parsedBody = JSON.parse(body);
            resolve(parsedBody.features[0].center);
          } catch (e) {
            reject(e)
          }
        }
      }
    );
  })
}


getLocation(city_name).then((coords) => (getWeather(coords[0], coords[1]))).catch((err) => (
  console.log(errorMsg)
));
