import React, { useEffect, useState } from 'react'

const WeatherData = (props) => {

    const [temperature, setTemperature] = useState('');
    const [country, setCountry] = useState('');
    const [weather, setWeather] = useState('');
    const [humidity, setHumidity] = useState('');
    const [name, setName] = useState('');
    const [feels, setFeels] = useState('');
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState('');
    const [search, setSearch] = useState('');

    const [format, setFormat] = useState('°F');
    const [showFormat, setShowFormat] = useState('°C');
    
    let toggleFormat = () => {
        if (format === '°C') {
            setFormat('°F')
            setShowFormat('°C')
        } else {
            setFormat('°C')
            setShowFormat('°F')
        }
    }

    let calculateFarenhait = (t) => Math.round((t * 9) / 5) + 32;

    let handleSubmit = (e) => {
        e.preventDefault();
        let city = document.querySelector('#search').value;
        city !== '' ? setSearch(city) : setSearch('');
        
    }

    const callToApi = (q) => {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=eafe6cead67b3e7d13aff2a9f8320f8b&units=metric`, {mode: 'cors'});
    }

    const loadWeatherData = () => {
        setLoading(true)
        if (props.data.base !== undefined) {
            let feelsLike = Math.round(props.data.main.feels_like)
            let temp = Math.round(props.data.main.temp) 

            setTemperature(temp)
            setCountry(props.data.sys.country)
            setWeather(props.data.weather[0].description)
            setHumidity(props.data.main.humidity)
            setName(props.data.name)
            setFeels(feelsLike)
            setLoading(false)
        }else {
            setLoading(false);
            getDefaultLocation(search);
        }
    }

    // Default location
    async function getDefaultLocation(q) {
        setLoading(true);
        
        if (q === '') q = 'Belgrade';

        try {
            const response = await callToApi(q);
            if (!response.ok) {
                setError('Bad network request!')
            }
            const data = await response.json();
            // console.log(data);

            if (data.cod === '404') {
                setError('Make sure you entered correct data');
                setSearch('');
            }

            let feelsLike = Math.round(data.main.feels_like)
            let temp = Math.round(data.main.temp)

            setTemperature(temp)
            setCountry(data.sys.country)
            setWeather(data.weather[0].description)
            setHumidity(data.main.humidity)
            setName(data.name)
            setFeels(feelsLike)
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError('Make sure you entered correct data');
        }
    
    }

    useEffect(() => {
        setError('')
        loadWeatherData()
        getDefaultLocation(search)
      }, [search]);
      
   return (
       <div>
        <div>
            <header>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="search" id="search" />
                </form>
            </header>
        </div>
        <div>
                {loading ? 
                    <div>Loading...</div> : 
                    <div>
                        <h1>{ name } - { country } </h1>
                        <div>{ showFormat === '°C' ? temperature : 
                        calculateFarenhait(temperature) }{ showFormat }</div>
                        <div> { weather }</div>
                        <span>Humidity: { humidity }% | Feels like: { showFormat === '°C' ? feels : 
                        calculateFarenhait(feels) }{ showFormat }</span>
                    </div>
                } 
                <div onClick={toggleFormat}>Click to change to { format }</div>
        </div>
        <div>
            {error ? error : null}
        </div>
       </div>
   )
}

export default WeatherData
