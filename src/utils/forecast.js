const request = require('request')


const forecast = (long,lat,callback) =>{
  const url = `http://api.weatherstack.com/current?access_key=26ca0c8f27fe1c4d3753299754e7c6ea&query=${long},${lat}&units=f`

  request({url,json:true} , (error,{body} = {}) =>{
    if(error){
      callback('unable to connect to weather service', undefined)
    } else if(body.error){
      callback('Unable to find location' ,undefined)
    } else {
       
      callback(undefined,body.current.weather_descriptions[0] + ` It is currently ${body.current.temperature} degrees out .The humidity is ${body.current.humidity} , it feels like ${body.current.feelslike} degrees out`,body.current)
    }
  })
}

module.exports = forecast