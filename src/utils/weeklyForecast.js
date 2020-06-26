const request = require('request')


const weeklyForecast = (lon,lat,callback) =>{
  const url=`http://api.openweathermap.org/data/2.5/onecall?lat=${lon}&lon=${lat}&%20exclude=current,minutely,hourly&appid=f3dd9b91ec269ce69b553d9749149c66`

  request({url,json:true} ,(error,{body}) =>{
    if(error){
      callback('unable to connect to weather service',undefined)
    }else if(body.error){
      callback('Unable to find location',undefined)
    }else {
      
      callback(undefined,body.daily)
    }
  })
}

module.exports = weeklyForecast