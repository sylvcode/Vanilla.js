function formatDate(timestamp) {
  // calculate the date  return day and time
  let date = new Date(timestamp)
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    ' Friday',
    'Saturday',
  ]
  let day = days[date.getDay()]
  return `${day} ${hours}:${minutes}`
}

function displayTemperature(response) {
  console.log(response.data)
  let temperatureElement = document.querySelector('#temperature')
  let cityElement = document.querySelector('#city')
  let descriptionElement = document.querySelector('#description')
  let humidityElement = document.querySelector('#humidity')
  let windElement = document.querySelector('#wind')
  let dateElement = document.querySelector('#date')
  let iconElement = document.querySelector('#icon')

  // Inner HTML stuff
  descriptionElement.innerHTML = response.data.weather[0].description
  cityElement.innerHTML = response.data.name
  temperatureElement.innerHTML = Math.round(response.data.main.temp)
  humidityElement.innerHTML = response.data.main.humidity
  windElement.innerHTML = Math.round(response.data.wind.speed)
  // get the current date and time
  dateElement.innerHTML = formatDate(response.data.dt * 1000)
  iconElement.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
  )
  iconElement.setAttribute('alt', response.data.weather[0].description)
}

// To get current weather information
let apiKey = '43700ee73704d4a7a92f7aa11e986149'
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Frankfurt&appid=${apiKey}&units=metric`

console.log(apiUrl)
axios.get(apiUrl).then(displayTemperature)
