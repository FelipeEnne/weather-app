import getCity from './returnCity';


async function getAPIData() {
  const API = '0571f1a1044888615170693425198c8d';
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${getCity()}&appid=${API}`,
    { mode: 'cors' },
  );

  const model = document.getElementById('output-data');

  if (data.ok === false) {
    model.style.display = 'none';
  } else {
    model.style.display = 'block';
  }

  const result = await data.json();

  return result;
}

async function displayData(cf = 0) {
  const data = await getAPIData();

  const name = document.getElementById('output-name');
  const weather = document.getElementById('output-weather');
  const img = document.getElementById('output-img');
  const temp = document.getElementById('output-temp');
  const feel = document.getElementById('output-feel');
  const minmax = document.getElementById('output-minmax');
  const humidity = document.getElementById('output-humidity');
  const wind = document.getElementById('output-wind');

  name.innerHTML = `${data.name} , ${data.sys.country}`;
  weather.innerHTML = `${data.weather[0].main} , ${data.weather[0].description}`;
  img.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
  humidity.innerHTML = `Humidity ${data.main.humidity} %`;
  wind.innerHTML = `Wind ${data.wind.speed} meter/sec`;

  if (cf === 0) {
    temp.innerHTML = `${parseFloat(data.main.temp - 273).toFixed(1)} °C`;
    feel.innerHTML = `Feels like ${parseFloat(data.main.feels_like - 273).toFixed(1)} °C`;
    minmax.innerHTML = ` Min ${parseFloat(data.main.temp_min - 273).toFixed(1)} °C
        - Max ${parseFloat(data.main.temp_max - 273).toFixed(1)} °C`;
  }

  if (cf === 1) {
    temp.innerHTML = `${(1.8 * (data.main.temp - 273) + 32).toFixed(1)} °F`;
    feel.innerHTML = `Feels like ${(1.8 * (data.main.feels_like - 273) + 32).toFixed(1)} °F`;
    minmax.innerHTML = ` Min ${(1.8 * (data.main.temp_min - 273) + 32).toFixed(1)} °F
        - Max ${(1.8 * (data.main.temp_max - 273) + 32).toFixed(1)} °F`;
  }
}

export default displayData;
