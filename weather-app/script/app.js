const locationTimezoneElement = document.querySelector(".location-city");
const iconElement = document.querySelector(".location-icon");
const temperatureSectionElement = document.querySelector(
  ".temperature-section"
);
const temperatureDegreeElement = document.querySelector(".temperature-degree");
const temperatureUnitElement = document.querySelector(".temperature-unit");
const temperatureDescriptionElement = document.querySelector(
  ".temperature-description"
);

window.addEventListener("load", () => {
  let lat;
  let lon;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const darkskyKey = "10394fc30d2c092f36526e876440141b";
      const darkskyApi = `${proxy}https://api.darksky.net/forecast/${darkskyKey}/${lat},${lon}?units=auto`;

      // current weather
      fetch(darkskyApi)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;

          // Set DOM Elements from API

          temperatureDegreeElement.textContent = temperature;
          temperatureDescriptionElement.textContent = summary;

          // Set Icon
          setIcon(icon, iconElement);
        });

      // city name
      const openWeatherKey = "c948009d63dea1a2c9dba97db6aa1f8d";
      const openWeatherApi = `${proxy}https://api.openweathermap.org/data/2.5/weather?appid=${openWeatherKey}&units=metric&lat=${lat}&lon=${lon}`;

      fetch(openWeatherApi)
        .then(response => {
          return response.json();
        })
        .then(data => {
          locationTimezoneElement.textContent = data.name;
          console.log(data);
        });
    });
  } else {
    h1.textContent = "Please enable geolocation feature";
  }

  function setIcon(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    console.log(currentIcon);
    skycons.play();
    return skycons.set(iconID, skycons[currentIcon]);
  }
});

// Toggle temperature unit between Celsius and Fahrenheit
temperatureSectionElement.addEventListener("click", () => {
  const currentUnit = temperatureUnitElement.textContent;
  const currentTemperature = temperatureDegreeElement.textContent;

  if (currentUnit === "C") {
    const fahrenheit = currentTemperature * (9 / 5) + 32;
    temperatureDegreeElement.textContent = fahrenheit.toFixed(2);
    temperatureUnitElement.textContent = "F";
  } else {
    const celsius = (currentTemperature - 32) * (5 / 9);
    temperatureDegreeElement.textContent = celsius.toFixed(2);
    temperatureUnitElement.textContent = "C";
  }
});

function getDayOfWeek(timestamp) {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const dt = new Date(timestamp * 1000); // convert to ms
  return days[dt.getDay()];
}
function getTime(timestamp) {
  const dt = new Date(timestamp * 1000);
  const hour = dt.getHours();

  console.log(dt + " ..... " + hour);
  if (hour === 0) {
    return "12am";
  } else if (hour === 12) {
    return "12pm";
  } else if (hour > 12) {
    return (hour % 12) + "pm";
  }
  return hour + "am";
}

async function getCityName(lat, lon) {
  // console.log(navigator);
  const key = "c948009d63dea1a2c9dba97db6aa1f8d";
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const api = `${proxy}http://api.openweathermap.org/data/2.5/weather?appid=${key}&units=metric&lat=${lat}&lon=${lon}`;

  // console.log(api);
  let response = await fetch(api);
  let data = await response.json();
  return data;
}

function openWeatherMap() {
  let lon;
  let lat;

  console.log(navigator);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      const key = "c948009d63dea1a2c9dba97db6aa1f8d";
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}http://api.openweathermap.org/data/2.5/weather?appid=${key}&units=metric&lat=${lat}&lon=${lon}`;
      // const api = `http://api.openweathermap.org/data/2.5/weather?appid=${key}&units=metric&lat=${lat}&lon=${lon}`;

      // current weather
      console.log(api);
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          // console.log(data);
          const temperature = data.main.temp;
          const description = data.weather[0].description;
          const icon = data.weather[0].icon;
          const city = data.name;
          // Set DOM Elements from API

          const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
          temperatureDegreeElement.textContent = temperature;
          temperatureDescriptionElement.textContent = description;
          locationTimezoneElement.textContent = city;
          iconElement.src = imageUrl;
        });

      // weather forecast
      const forecast_api = `http://api.openweathermap.org/data/2.5/forecast?appid=${key}&units=metric&lat=${lat}&lon=${lon}`;
      fetch(forecast_api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const forecasts = data.list;

          const forecastElement = document.querySelector(".weather-forecast");
          const ul = document.createElement("ul");
          ul.classList.add("forecast-24hr");

          for (let i = 0; i < 9; i++) {
            let forecast = forecasts[i];
            let li = document.createElement("li");

            li.textContent =
              getDayOfWeek(forecast.dt) +
              " " +
              getTime(forecast.dt) +
              " " +
              forecast.main.temp;
            ul.appendChild(li);
          }
          forecastElement.appendChild(ul);
          console.log(forecasts);
          console.log(ul);
        });
    });
  } else {
    h1.textContent = "Please enable geolocation feature";
  }
}
