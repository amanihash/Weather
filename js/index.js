let todayName = document.getElementById("todayName")
let todayNumber = document.getElementById("todayNumber")
let todayMonth = document.getElementById("todayMonth")

let todayLocation = document.getElementById("todayLocation")
let todayTemp = document.getElementById("todayTemp")
let todayConditionImg = document.getElementById("todayConditionImg")
let todayConditionText = document.getElementById("todayConditionText")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let windDirection = document.getElementById("windDirection")

let nextDay = document.getElementsByClassName("nextDay")
let nextMaxTemp = document.getElementsByClassName("nextMaxTemp")
let nextMinTemp = document.getElementsByClassName("nextMinTemp")
let nextConditioningImg = document.getElementsByClassName("nextConditioningImg")
let nextConditioningText = document.getElementsByClassName("nextConditioningText")

let searchInput = document.getElementById("searchInput")

//fetch API data
async function getWeatherData(cityName){
let dataWeather = await fetch (`http://api.weatherapi.com/v1/forecast.json?key=d9ecb7096923439baa0142454242504&q=${cityName}&days=3`)
let response = await dataWeather.json()
return response
}
//display today 
function today(data){
    let todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleDateString("en-US" ,{weekday:"long"})
    todayNumber.innerHTML = todayDate.getDate()
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-US" ,{month:"long"})
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c
    todayConditionImg.setAttribute("src" , data.current.condition.icon) 
    todayConditionText.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity+"%"
    wind.innerHTML = data.current.wind_kph+"km/h"
    windDirection.innerHTML = data.current.wind_dir
    
}

//display nextdays 
function nextdays(data){
let datas = data.forecast.forecastday
for (let i = 0; i < 2; i++) {
    let nextDays = new Date(datas[i+1].date)
    nextDay[i].innerHTML = nextDays.toLocaleDateString("en-US" ,{weekday:"long"})
    nextMaxTemp[i].innerHTML = datas[i+1].day.maxtemp_c
    nextMinTemp[i].innerHTML = datas[i+1].day.mintemp_c
    nextConditioningImg[i].setAttribute("src", datas[i+1].day.condition.icon)  
    nextConditioningText[i].innerHTML = datas[i+1].day.condition.text
}
}

//start APP
 async function start(city="londen"){
    let weatherData = await getWeatherData(city)
    if(!weatherData.error){
        today(weatherData)
        nextdays(weatherData)
    }
    }
  
start()
searchInput.addEventListener("input" ,function(){
    start(searchInput.value)
})