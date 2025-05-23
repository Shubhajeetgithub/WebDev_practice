const apikey = "6e7e814772c84b58904121212252105";
const myLocation = "Kharagpur";
const date_element = document.querySelector('.date-and-time');
const main_temp = document.querySelector('.temperature');
const description = document.querySelector('.description');
const feels_temp = document.querySelector('.feels');
const weather_details = document.querySelector('.weather-details');
const image = document.querySelector('.weather-icon');
fetch(`http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${myLocation}&aqi=no`)
.then(response => response.json())
.then(data => {
    console.log(data);
    date_element.innerHTML = data.location.localtime;
    main_temp.innerHTML = `${data.current.temp_c}°<span class="unit">C</span>`;
    description.textContent = data.current.condition.text;
    feels_temp.textContent = `${data.current.feelslike_c}°C`;
    image.src = `https:${data.current.condition.icon}`;
    weather_details.innerHTML = `
    <ul>
        <li>Humidity: ${data.current.humidity}%</li>
        <li>Cloud cover: ${data.current.cloud}%</li>
        <li>Precip. (last hr.): ${data.current.precip_mm}mm</li>
        <li>Wind speed: ${data.current.wind_kph}kph <a href="wind_info.html">Means ?</a></li>
        <li>Visibility: ${data.current.vis_km}km</li>
      </ul>
    `;
})
.catch(error => console.error(error));