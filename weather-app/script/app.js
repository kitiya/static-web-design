const locationTimezoneElement = document.querySelector(".location-timezone");
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
  let lon;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const key = "c948009d63dea1a2c9dba97db6aa1f8d";
      const api = `${proxy}http://api.openweathermap.org/data/2.5/weather?appid=${key}&units=metric&lat=${lat}&lon=${lon}`;

      console.log(api);
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
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
    });
  } else {
    h1.textContent = "Please enable geolocation feature";
  }
});

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
