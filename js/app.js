//key to fetch request
const apiWeatherKey = function(location) {
    return `http://api.weatherapi.com/v1/forecast.json?key=00182ca27e414d9f8c5163503212611&q=${location}&days=5`;
}

//function insert fetch data into weather bar
const insertWeather = function(data, bar) {
    let daysCounter = 0;
    const weatherBar = bar.querySelector('.weather');
    bar.querySelector('.city__name').innerText = data.location.name;
    bar.querySelector('.temperature__value').innerText = data.current.temp_c;
    bar.querySelector('.pressure__value').innerText = data.current.pressure_mb;
    bar.querySelector('.humidity__value').innerText = data.current.humidity;
    bar.querySelector('.wind-speed__value').innerText = data.current.wind_mph;
    const forecast = bar.querySelector('.weather__forecast');
    const forecastTemp = bar.querySelectorAll('.temperature__value');
    data.forecast.forecastday.forEach(forDay=> {
        forecastTemp[daysCounter].innerText = forDay.day.avgtemp_c;
        daysCounter++;   
    })
    
}

//weather for current location after page load
const weatherModule = document.querySelector('.module__weather');
const weatherMainBar = document.querySelector('.weather');

document.addEventListener('DOMContentLoaded', event=> {
    fetch(apiWeatherKey('auto:ip'))
        .then(response=>response.json())
        .then(data=> {
            document.querySelector('body').classList='';
            document.querySelector('.module__weather').hidden = false;
            insertWeather(data, weatherMainBar);
        })
        .catch(error=> console.error(error))
})

//add city form
const addCityBtn = document.querySelector('#add-city');
const searchForm = document.querySelector('.module__form');
const findCity = document.querySelector('.find-city');
const findCityInput = findCity.querySelector('input');
const findCityBtn = findCity.querySelector('button');

//display form
addCityBtn.addEventListener('click', event=> {
    searchForm.hidden = false;
})

//hidden form
searchForm.querySelector('.btn--close').addEventListener('click', e=> {
    searchForm.hidden = true;
})

//weather for type location
findCityBtn.addEventListener('click', event=> {
    event.preventDefault();
    const regex = new RegExp('^#?[a-zA-Z ]+$');
    const newSpan = document.createElement('span');
    if (!regex.test(findCityInput.value)) {
        newSpan.innerText = 'Formularz nie obsługuje polskich znaków';
        newSpan.style.color = 'red';
        findCity.appendChild(newSpan);
    } else {
        if (findCity.querySelector('span') !== null) {
        findCity.querySelector('span').innerText = '';
        }
        fetch(apiWeatherKey(findCityInput.value))
        .then(response=> response.json())
        .then(data=> {
            document.querySelector('body').classList='';
            document.querySelector('.module__weather').hidden = false;
            const newDiv = weatherModule.cloneNode(true);
            document.querySelector('#app').appendChild(newDiv);
            insertWeather(data, newDiv);
        }).catch(error=> console.log(error))
    }
})

//hidden weather module
weatherMainBar.previousElementSibling.addEventListener('click', e=> {
    e.preventDefault();
    weatherMainBar.parentElement.hidden = true;
})