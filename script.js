async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const error = document.getElementById("error-message");
  const card = document.getElementById("weather-card");
  const loading = document.querySelector(".loading");

  error.style.display = card.style.display = "none";
  loading.style.display = "block";

  if (!city) {
    showError("Please enter a city!");
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=78887c76d179e15f6feb670c19120235&units=metric`
    );
    const data = await res.json();
    loading.style.display = "none";

    if (!res.ok) return showError("City not found!");

    document.getElementById("city-name").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").textContent = `${data.main.temp} °C`;
    document.getElementById("weather-description").textContent = data.weather[0].description;
    document.getElementById("feels-like").textContent = `${data.main.feels_like} °C`;
    document.getElementById("humidity").textContent = `${data.main.humidity}%`;
    document.getElementById("wind-speed").textContent = `${data.wind.speed} m/s`;
    document.getElementById("pressure").textContent = `${data.main.pressure} hPa`;
    document.getElementById("weather-icon").src =
      `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    card.style.display = "block";
  } catch {
    showError("Error fetching data!");
  }

  function showError(msg) {
    loading.style.display = "none";
    error.textContent = msg;
    error.style.display = "block";
  }
}

document.getElementById("city").addEventListener("keyup", e => {
  if (e.key === "Enter") getWeather();
});
