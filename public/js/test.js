const databox = document.getElementById("data")
const weatherForm = document.querySelector('form')
const input = document.getElementById('inputbox')
const loader = document.getElementById('loader')
const error = document.getElementById('error')
const address = document.getElementById('area')

const htmlContent = (item) =>{
  return `
    <div class="forecast">
    <p>${item.day}</p>
    <img class="icon" src="http://openweathermap.org/img/wn/${item.image}.png">
    <p>${item.temperature}<span>&#176C</span></p>
    </div>
  `
}

var weekday = new Array(7);
  weekday[0] = "Sun";
  weekday[1] = "Mon";
  weekday[2] = "Tue";
  weekday[3] = "Wed";
  weekday[4] = "Thu";
  weekday[5] = "Fri";
  weekday[6] = "Sat";

  let loading = false


weatherForm.addEventListener('submit' , (e) =>{
  e.preventDefault()
  error.textContent = ""
  if(loading ===false){
    loader.style.display = "block"
  }
  address.textContent=''
  databox.innerHTML=''
  databox.style.display="none"
  const dataArray = []
  const location = input.value

  fetch(`/weekWeather?address=${location}`)
       .then((response) =>{
         
        response.json().then((data) =>{
          if(data.error){
            
            loader.style.display = "none"
            error.textContent = data.error
          }else{
           
            databox.style.display="flex"
            loading = false
            loader.style.display ="none"
            
            address.textContent = data.location
            data.body.forEach((item) =>{
              let date = new Date(item.dt * 1000)
              let day = weekday[date.getUTCDay()]
              let temperature =  item.temp.day -273.15;
              
              let image = item.weather[0].icon
              
              dataArray.push({
                day,
                temperature:temperature.toFixed(1),
                image   
              })
            })
            
            dataArray.forEach((item,i) =>{
              if(i<5){
                const innerHtml = htmlContent(item);
                databox.innerHTML = databox.innerHTML + innerHtml
              }
            })
             
             

          }
        })
       }
        
         
       )
})


// light and dark mode
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
   
    document.documentElement.setAttribute('data-theme', currentTheme);
  
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    else {        document.documentElement.setAttribute('data-theme', 'light');
          localStorage.setItem('theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);