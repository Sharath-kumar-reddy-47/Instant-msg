const city = document.getElementById("cityname");
const time = document.getElementById("time");
const temp = document.getElementById("temp");

async function getloc(position) {
    try {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // Fetch weather data from API
        const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m`);
        const w_after_json = await weather.json();

        // Extract time and temperature for the next 10 hours
        const times = w_after_json.hourly.time.slice(0, 10);
        const temperatures = w_after_json.hourly.temperature_2m.slice(0, 10);

        // Display the time and temperature for each of the next 10 hours
        let timeTempOutput = '';
        for (let i = 0; i < times.length; i++) {
            timeTempOutput += `<p><strong>${new Date(times[i]).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}:</strong> ${temperatures[i]} °C</p>`;
        }

        time.innerHTML = timeTempOutput;
    } catch (error) {
        temp.innerText = "Error fetching weather data.";
        console.error("Weather API error:", error);
    }
}

function failloc() {
    temp.innerText = "Please allow location permission to see weather information.";
    console.log("Location access denied.");
}

window.addEventListener('load', () => {
    navigator.geolocation.getCurrentPosition(getloc, failloc);
});
