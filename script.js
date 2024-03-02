const weatherForm = document.querySelector(".weather-form");
const cityInput = document.createElement("input");
const btn = document.createElement("button");

const title = document.createElement("h1");
title.classList.add("title");
title.textContent = "Weather Search"
document.getElementById("main").prepend(title);

cityInput.placeholder = "Enter City";
cityInput.type = "text";
btn.textContent = "search"

cityInput.classList.add("input");
btn.classList.add("button");

weatherForm.appendChild(cityInput);
weatherForm.appendChild(btn);



const card = document.querySelector(".card");
const apiKey = "cbf0740dcab6623da48d1b2b8cda310c";

weatherForm.addEventListener("submit", async (e) =>{
    e.preventDefault();
    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
            console.log(weatherData);
        } catch(error){
            displayError(error);
            console.error(error);
        }
    }else{
        displayError("Please Enter city");
    }
});

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if(!response.ok){
        throw new Error("Data Not Found!!!");
    }
    return await response.json();
}

function displayWeatherInfo(data){
    const {name: city, main:{temp, humidity}, weather:[{description, id}], sys:{sunrise, sunset}} = data;
    const currentTime = new Date();
    const sunriseTime = new Date(sunrise * 1000);
    const sunsetTime = new Date(sunset * 1000);

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p")
    const emojiDisplay = document.createElement("h2");
    const desDisplay = document.createElement("p");
    const dayDisplay = document.createElement("p");
  
    cityDisplay.textContent = city;
    tempDisplay.textContent = `Temperature: ${(temp - 275.15).toFixed(1)}℃`;
    humidityDisplay.textContent = `Humidity: ${humidity}`;
    desDisplay.textContent = description;
    emojiDisplay.textContent = getWeatherEmoji(id);
    if(currentTime > sunriseTime && currentTime < sunsetTime){
        dayDisplay.textContent = "☀️"
    }else{
        dayDisplay.textContent = "🌙"
    }

    cityDisplay.classList.add("city-display");
    tempDisplay.classList.add("p")
    humidityDisplay.classList.add("p")
    emojiDisplay.classList.add("weather-emoji");
    desDisplay.classList.add("p");
    dayDisplay.classList.add("day");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(emojiDisplay);
    card.appendChild(desDisplay);
    card.appendChild(dayDisplay); 
} 
function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
           return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
           return "🌧️";   
        case (weatherId >= 500 && weatherId < 600):
           return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
              return "❄️";
        case (weatherId >= 700 && weatherId < 800):
              return "🌫️"; 
        case (weatherId === 800):
               return "☀️";
        case (weatherId >= 801 && weatherId < 810):
              return "☁️"; 
        default:
           return"❓"                    
     }
}

function displayError(message){
    const errorDisplay = document.createElement("p")
    errorDisplay.classList.add("error-display");
    errorDisplay.textContent = message;

    card.textContent = ""
    card.style.display = "flex";
    card.style.padding = "10px";
    card.style.marginTop = "5px"
    card.appendChild(errorDisplay);
}

