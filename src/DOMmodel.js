import getCity from './returnCity';

const ICON_CODE = /^[a-z0-9]+$/i;

async function getAPIData() {
  const API = process.env.OPENWEATHER_API_KEY;
  if (!API) {
    throw new Error('OPENWEATHER_API_KEY is not defined. Set it before running the build.');
  }

  const city = getCity();
  if (city == null || city === '') {
    return null;
  }

  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API}`,
    { mode: 'cors' },
  );

  const model = document.getElementById('output-data');

  if (!data.ok) {
    model.style.display = 'none';
    return null;
  }

  model.style.display = 'block';
  return data.json();
}

async function displayData(cf = 0) {
  const data = await getAPIData();
  if (!data) {
    return;
  }

  const name = document.getElementById('output-name');
  const weather = document.getElementById('output-weather');
  const img = document.getElementById('output-img');
  const temp = document.getElementById('output-temp');
  const feel = document.getElementById('output-feel');
  const minmax = document.getElementById('output-minmax');
  const humidity = document.getElementById('output-humidity');
  const wind = document.getElementById('output-wind');

  name.textContent = `${data.name} , ${data.sys.country}`;
  weather.textContent = `${data.weather[0].main} , ${data.weather[0].description}`;

  const icon = data.weather[0].icon;
  if (ICON_CODE.test(icon)) {
    img.setAttribute('src', `https://openweathermap.org/img/wn/${icon}@2x.png`);
  } else {
    img.removeAttribute('src');
  }

  humidity.textContent = `Humidity ${data.main.humidity} %`;
  wind.textContent = `Wind ${data.wind.speed} meter/sec`;

  if (cf === 0) {
    temp.textContent = `${parseFloat(data.main.temp - 273).toFixed(1)} °C`;
    feel.textContent = `Feels like ${parseFloat(data.main.feels_like - 273).toFixed(1)} °C`;
    minmax.textContent = ` Min ${parseFloat(data.main.temp_min - 273).toFixed(1)} °C
        - Max ${parseFloat(data.main.temp_max - 273).toFixed(1)} °C`;
  }

  if (cf === 1) {
    temp.textContent = `${(1.8 * (data.main.temp - 273) + 32).toFixed(1)} °F`;
    feel.textContent = `Feels like ${(1.8 * (data.main.feels_like - 273) + 32).toFixed(1)} °F`;
    minmax.textContent = ` Min ${(1.8 * (data.main.temp_min - 273) + 32).toFixed(1)} °F
        - Max ${(1.8 * (data.main.temp_max - 273) + 32).toFixed(1)} °F`;
  }
}

export default displayData;
