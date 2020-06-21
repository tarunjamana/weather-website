console.log('client side js is loaded');
const weatherForm = document.querySelector('form')
const input = document.querySelector('input')

const result = document.getElementById('result')
const area  = document.getElementById('area')



weatherForm.addEventListener('submit' , (e) =>{
  e.preventDefault()
  const location = input.value

  result.textContent= 'loading ...'
  area.textContent = ''

  fetch(`/weather?address=${location}`)
     .then((response) =>
       response.json().then((data) => {
         if(data.error){
           result.textContent = data.error
         } else{
          area.textContent = data.location
          result.textContent = data.forecast
         
         }
         
      })
       
     )
    
 
})