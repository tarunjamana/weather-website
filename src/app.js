const path = require('path');
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const weeklyForecast = require('./utils/weeklyForecast')
const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicPathDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handleBars engine and views location
app.set('view engine' , 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicPathDirectory))

app.get('' , (req,res) =>{
  res.render('index',{
    title:'Weather APP',
    name:'tarun'
  })
})


app.get('/about' , (req,res) =>{
  res.render('about' , {
    title:'About Page',
    intro:'Welcome',
    name:'tarun'
  })
})

app.get('/help' , (req,res) =>{
  res.render('help' , {
    content:'this is the Help Page',
    title:'Help',
    name:'tarun '
  })
})

app.get('/forecast' ,(req,res) =>{
  res.render('forecast' , {
    content:'this is the forecast Page',
    title:'forecast',
    name:'tarun '
  })
 
})

app.get('/legend' ,(req,res) =>{
  res.render('legend' ,{
    content:'this is the Legend Page',
    title:'Legend',
    name:'tarun '
  })
})

app.get('/weekWeather',(req,res) =>{
 
  const address = req.query.address
  if(!address){
    return res.send({
      error:'provide an address'
    })
  }else {
    geocode(address , (error ,{latitude,longitude,location} = {}) =>{
      console.log('triggered');
      if(error){
        return res.send({
          error
        })
      }
      weeklyForecast(latitude,longitude,(error,body) =>{
        if(error){
          return res.send({
            error
          })
        }
        
        res.send({
          address:address,
          body:body,
          location
        })
      })
    })
  }
})

app.use(express.static(path.join(__dirname,'../public/')))

app.use(express.static(path.join(__dirname,'../public/')))




app.get('/weather',(req,res) =>{
  
  const address = req.query.address
  if(!address){
    return res.send({
      error:'provide an address'
    })
  } else{
      geocode(address , (error , {latitude,longitude,location} ={}) =>{
        if(error){
          return res.send({
            error
          })
        }
        forecast(latitude,longitude,(error,forecastData,body)=>{
          if(error){
           return res.send({
             error
            })
          }
         
          res.send({
            forecast:forecastData,
            location,
            address:req.query.address,
            body:body
          })
        })
      } )
  }
 
})



app.get('/help/*' ,(req,res) =>{
  res.render('404' , {
    title:'404 help',
    name:'tarun',
    errorMessage:'help article not found'
  })
})


app.get('*' ,(req,res) =>{
  res.render('404' , {
    title:'404',
    name:'tarun',
    errorMessage:'page not found'
  })
})




app.listen(port,() =>{
  console.log('server is up on port ' + port)
})