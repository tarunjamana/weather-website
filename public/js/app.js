console.log('client side js is loaded');
const weatherForm = document.querySelector('form')
const input = document.querySelector('input')



const card = document.querySelector('.card')
console.log(card);
const wImage = document.getElementById('weather-image')
const temp = document.getElementById('temp')
const description = document.getElementById('description')
const humidity = document.getElementById('humidity')
const loader = document.getElementById('loader')
const error = document.getElementById('error')
const area = document.getElementById('location')
// loader.style.display = "none"
let loading = false


weatherForm.addEventListener('submit' , (e) =>{
  e.preventDefault()
  const location = input.value
  card.style.display = "none"
  error.textContent = ""
  if(loading ===false){
    loader.style.display = "block"
  }


  fetch(`/weather?address=${location}`)
     .then((response) =>
       response.json().then((data) => {
         if(data.error){
           console.log(data.error)
           error.textContent = "please enter a correct location"
         } else{
           console.log(data)
           card.style.display="block"
           loading = false
           loader.style.display = "none"
           wImage.src = `${data.body.weather_icons[0]}`
           temp.textContent = data.body.temperature
           description.textContent = data.body.weather_descriptions[0];
           humidity.textContent = data.body.humidity
         }
         
      })
       
     )
    
 
})