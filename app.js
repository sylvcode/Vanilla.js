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

  celsiusTemperature = response.data.main.temp

  // Inner HTML stuff

  cityElement.innerHTML = response.data.name
  descriptionElement.innerHTML = response.data.weather[0].description
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

//function variables
// These are moved into one function to do an ajax call
function search(city) {
  // To get current weather information
  let apiKey = '43700ee73704d4a7a92f7aa11e986149'
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(displayTemperature)
}

// event listener, to prevent the page from reloading
function handleSubmit(event) {
  event.preventDefault()
  let cityInputElement = document.querySelector('#city-input')
  // when we submit the form
  search(cityInputElement.value)
}

function displayFahrenheitTemperature(event) {
  event.preventDefault()
  let temperatureElement = document.querySelector('#temperature')
  //remove the active class celsius
  celsiusLink.classList.remove('active')
  fahrenheitLink.classList.add('active')
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature)
}

function displayCelsiusTemperature(event) {
  event.preventDefault()
  celsiusLink.classList.add('active')
  fahrenheitLink.classList.remove('active')
  let temperatureElement = document.querySelector('#temperature')
  temperatureElement.innerHTML = Math.round(celsiusTemperature)
}
let celsiusTemperature = null
//Global variables
// Search formid til tess ad leita af city
let form = document.querySelector('#search-form')
form.addEventListener('submit', handleSubmit)

let fahrenheitLink = document.querySelector('#fahrenheit-link')
fahrenheitLink.addEventListener('click', displayFahrenheitTemperature)

let celsiusLink = document.querySelector('#celsius-link')
celsiusLink.addEventListener('click', displayCelsiusTemperature)
search('Frankfurt')
