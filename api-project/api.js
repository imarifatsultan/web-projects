const apiKey = "9ef0ab4af56de880182d04b8f340d976"; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById("city").value;
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.cod !== 200) {
            document.getElementById("weather").innerText = `Error: ${data.message}`;
            return;
        }
        
        document.getElementById("weather").innerText = 
            `🌍 ${data.name}, ${data.sys.country}
             🌡️ Temp: ${data.main.temp}°C
             ☁️ Weather: ${data.weather[0].description}`;
    } catch (error) {
        document.getElementById("weather").innerText = "Failed to fetch weather data.";
    }
}
