let utcArray = [1593021600,1593108000,1593194400,1593280800,1593367200]
let dateArray = []
let dayList = []
const utcToDate = (utcArray) =>{
 
  utcArray.forEach( (element)=> {
      const date = new Date(element*1000)
      dateArray.push(date.getUTCDay());
  });

}

utcToDate(utcArray);
console.log(dateArray);

var weekday = new Array(7);
  weekday[0] = "Sun";
  weekday[1] = "Mon";
  weekday[2] = "Tue";
  weekday[3] = "Wed";
  weekday[4] = "Thu";
  weekday[5] = "Fri";
  weekday[6] = "Sat";


const day = (dateArray) =>{
  dateArray.forEach((item) =>{
    const n = weekday[item];
    dayList.push(n);
  })
}


day(dateArray);
console.log(dayList);

const htmlContent = (item) =>{
  return `
    <div class="forecast">
    <p>${item}</p>
    <img src="/images/sun.png" alt="sun">
    <p>23<span>&#176F</span></p>
    </div>
  `
}

const databox = document.getElementById("data");

dayList.forEach((item) =>{
  const innerHtml = htmlContent(item);
  databox.innerHTML = databox.innerHTML + innerHtml
})