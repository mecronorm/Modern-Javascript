import API from "./config.js";

const button = document.querySelector('#submit-search');
const inputField = document.querySelector('#cityName');

async function getWeatherData(){
    const inputField = document.querySelector('#cityName');
    const theNameOfTheCity = inputField.value
    const response = await fetch("http://api.weatherapi.com/v1/forecast.json?key=" + API.key + "&q=" + theNameOfTheCity + "&days=7&aqi=no&alerts=no")
    const weatherData = await response.json()
    
    return weatherData
}

async function createCityAndCountryName(data) {
    const cityNameContainer = document.querySelector('.city-info')
    cityNameContainer.textContent = data.location.name + ", " + data.location.country
}

async function createCard(data, i){
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const container = document.querySelector('.container');

    const date = new Date()
    const dayOfWeek = weekdays[(date.getDay() + i) % 7]
    
    const card = document.createElement('container');
    card.classList.add("card");
        
    if (i === 0) card.classList.add("main-card");
    
    container.appendChild(card);
    
    const initialContentBeforeSlideAnimation = document.createElement('container');
    initialContentBeforeSlideAnimation.classList.add("imgBx");
    card.appendChild(initialContentBeforeSlideAnimation);
        
    const cardImg = document.createElement('img');
    cardImg.src = data.forecast.forecastday[i].day.condition.icon;
    cardImg.alt = "Icon describing the following weather: " + data.forecast.forecastday[i].day.condition.text;
    initialContentBeforeSlideAnimation.appendChild(cardImg);
        
    const contentBox = document.createElement("container");
    contentBox.classList.add("contentBx");
    card.appendChild(contentBox);
    
    const dowContentBeforeSliderAnimation = document.createElement("h2");
    dowContentBeforeSliderAnimation.innerHTML = dayOfWeek;
    contentBox.appendChild(dowContentBeforeSliderAnimation);
    
    const tempDescription = document.createElement("h4");
    tempDescription.innerHTML = data.forecast.forecastday[i].day.condition.text;
    contentBox.appendChild(tempDescription);
    
    const currentTempBox = document.createElement("container");
    currentTempBox.classList.add("color");
    contentBox.appendChild(currentTempBox)
    
    const currentTempHeader = document.createElement("h3");
    currentTempHeader.innerHTML = "Temp:"
    currentTempBox.appendChild(currentTempHeader);
    
    const currentTemp = document.createElement("span");
    currentTemp.classList.add("current-temp");

    currentTemp.innerHTML = data.forecast.forecastday[i].day.avgtemp_c + "°C";
    currentTempBox.appendChild(currentTemp);

    const minMax = document.createElement("container");
    minMax.classList.add("details");
    contentBox.appendChild(minMax);

    const minMaxTempHeader = document.createElement("h3");
    minMaxTempHeader.innerHTML = "More:"
    minMax.appendChild(minMaxTempHeader);

    const minTemp = document.createElement("span");
    minTemp.classList.add("min-temp")
    minTemp.innerHTML = data.forecast.forecastday[i].day.mintemp_c  + "°C";
    minMax.appendChild(minTemp);

    const maxTemp = document.createElement("span");
    maxTemp.classList.add("max-temp")
    maxTemp.innerHTML = data.forecast.forecastday[i].day.maxtemp_c + "°C";
    minMax.appendChild(maxTemp); 
}

async function createCards(data){
    for(let i= 0; i < 5; i++) {
        createCard(data, i)
    }
}

async function lookForError(data){
    if (data.error) {
        alert("Hey are you sure you are not holding up your map upside down?")
    } else{
        return true
    }
}

function resetWeatherSite(){
    const container = document.querySelector(".container")
    while (container.lastChild) {
        container.removeChild(container.firstChild)
        console.log(container);
    }
}

async function startWeatherSite(){
    const data = await getWeatherData()
    resetWeatherSite()
    if (await lookForError(data)){
        createCityAndCountryName(data)
        createCards(data)
    }
}

inputField.addEventListener('keyup',async function(event) {
    if (event.code === "Enter") {
        startWeatherSite()
    }
})

button.addEventListener('click', () => {
    startWeatherSite()
})