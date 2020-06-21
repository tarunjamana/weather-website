
const request = require('request')

const geocode = (address, callback) =>{
  const url =  `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidGFydW5qYW1hbmEiLCJhIjoiY2tiYW9oY3A1MHB4ZDJ4bWVmZWM5eXBqcSJ9.PJ8f-qucYdQN1KUyx1SR4w&limit=1`

  request({url,json:true} , (error,{body}) =>{
   
    if(error){
      callback('unable to connect to the service', undefined)
    } else if(body.features.length === 0 ){
      callback('unable to find the location',undefined)
    } else {
       callback(undefined,{
         longitude: body.features[0].center[0],
         latitude : body.features[0].center[1],
         location: body.features[0].place_name
       })
    }
  })

}


module.exports = geocode