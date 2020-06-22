const path = require('path');
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

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


app.use(express.static(path.join(__dirname,'../public/')))

app.use(express.static(path.join(__dirname,'../public/')))

// app.get('/help' ,(req,res) =>{
//   res.send([{
//     name:'tarun',
//     age:25
//   },{
//     name:'isha',
//     age:26
//   }])
// })

// app.get('/about' , (req,res) =>{
//   res.send('<h1>about the weather App</h1>')
// } )


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
         console.log(body);
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

app.get('/products' ,(req,res) =>{
  if(!req.query.search){
  return   res.send({
      error:'provide a search term '
    })
  }
  res.send({
    products:[]
  })
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