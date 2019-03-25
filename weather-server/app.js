const request = require('request');
const express = require('express');
const creds = require('./credentials');

const errorMsg = "Hubo un error al procesar el clima. Favor de revisar que las credenciales sean correctas, la conexión a internet funcione y la ubicación ingresada sea válida";
var app = express();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get('/weather', async (req, res, next) => {
  if (req.query.search) {
    city_name = req.query.search
    const weather = await getLocation(city_name).then((data) => (getWeather(data.coords[0], data.coords[1], data.city))).catch((err) => (
      { error: errorMsg }
    ));
    res.json(weather);
  } else {
    res.json({ error: 'No se especificó una ciudad.' })
  }
})

function getWeather(longitude, latitude, city_name) {
  return new Promise(function (resolve, reject) {
    request(`https://api.darksky.net/forecast/${creds.DARK_SKY_SECRET_KEY}/${latitude},${longitude}?units=si&lang=es`,
      function (error, response, body) {
        if (error) {
          return reject(error);
        } else {
          const parsedBody = JSON.parse(body);
          const dailyData = parsedBody.daily.data[0];
          resolve({
            location: city_name,
            weather: `${dailyData.summary} Actualmente está a ${parsedBody.currently.temperature}°C. Hay ${dailyData.precipProbability * 100}% de posibilidad de lluvia.`
          });
        }
      }
    )
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
            resolve({ coords: parsedBody.features[0].center, city: city_name });
          } catch (e) {
            reject(e)
          }
        }
      }
    );
  })
}

