import 'dotenv/config'

const form = document.querySelector('form')

const APIKey = process.env.APIKey

const getWeather = async (city) => {
    const latLon = await (await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}`)).json()
    const { name, lat, lon } = latLon[0]
    const res = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`)).json()
    const { main, weather } = res
    let infos = {
        cityName: name,
        temperature: (main.temp - 273.15).toFixed(0),
        weather: weather[0].main,
        sprite: ''
    }

    switch (infos.weather) {
        case 'Clouds':
            infos.sprite = `url('src/icons/nuvens.png')`
            break;
        case 'Clear':
            infos.sprite = `url('src/icons/ceu-limpo.png')`
            break;
        case 'Rain':
            infos.sprite = `url('src/icons/chuva-leve.png')`
            break

        default:
            break;
    }

    console.log(infos)
    return infos
}

const ShowCity = (infos) => {
    let city = document.createElement('li')
    let name = document.createElement('span')
    let temperature = document.createElement('span')
    let sprite = document.createElement('span')
    let weather = document.createElement('span')

    city.classList.add('city')

    name.classList.add('cityName')
    name.textContent = infos.cityName

    temperature.classList.add('temperature')
    temperature.textContent = `${infos.temperature}°C`

    sprite.classList.add('sprite')
    sprite.style.backgroundImage = infos.sprite

    weather.classList.add('weather')
    weather.textContent = infos.weather

    city.appendChild(name)
    city.appendChild(temperature)
    city.appendChild(sprite)
    city.appendChild(weather)

    return city
}

const messageError = (error) => {
    const field = document.querySelector('fieldset')
    const errorLabel = document.createElement('span')
    errorLabel.classList.add('error')
    errorLabel.textContent = error
    field.appendChild(errorLabel)
    setTimeout(() => {
        field.lastChild.remove()
    }, 3000);
}

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const cities = document.querySelector('.cities')
    const cityName = document.querySelector('#text1')
    let citySearched = false

    try {

        if (cityName.value === '') {
            throw new Error("Insert a valid City...");   
        }

        const infos = await getWeather(cityName.value)

        console.log(cities.childElementCount)

        if (cities.childElementCount !== 0) {
            Object.keys(cities).forEach(e => {
                alert('cheguei')
                console.log(e)
            });
        }

        !citySearched ? cities.appendChild(ShowCity(infos)) : null
    } catch (error) {
        messageError(error)
        console.log(error)
    }

    cityName.value = ''
    cityName.focus()
})