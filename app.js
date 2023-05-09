const apikey = "74bd97161e0e49f46b885e3c8ef03180";

const weatherData = document.getElementById("weather-data");
const cityInput = document.getElementById("city-input");
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault(); //get weather tıklandığında sayfanın yenilenmesi önlendi
  const cityValue = cityInput.value;
  getWeatherData(cityValue);
});
async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
    );

    if (!response.ok) throw new Error("Network response was not ok");//yanlış bir şey girilmesi durumunda verilecek hata mesajı
    
    const data = await response.json();

    const temperature = Math.round(data.main.temp); //siteden çekilen verilerden temperature değeri alınıp yuvarlatıldı

    const description = data.weather[0].description;//siteden çekilen verilerden description değeri alındı
    const icon = data.weather[0].icon;//siteden çekilen verilerden icon değeri alındı

    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed} m/s`,
    ];//siteden çekilen verilerden feels_like,humidity,speed değerleri alındı

    /*alınan değerler html taglarına eklendi */
    weatherData.querySelector(
      ".icon"
    ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">`;

    weatherData.querySelector(".temperature").textContent = `${temperature}°C;`;

    weatherData.querySelector(".description").textContent = description;

    weatherData.querySelector(".details").innerHTML = details
      .map((detail) => `<div> ${detail} </div>`)
      .join("");
  } catch (error) {
    weatherData.querySelector(".description").textContent =
      "An error happened,please try again later";
  }
}
