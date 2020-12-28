import React, { useEffect, useState } from 'react'

const WeatherData = (props) => {
    const [temperature, setTemperature] = useState('');
    const [country, setCountry] = useState('');
    const [weather, setWeather] = useState('');
    const [humidity, setHumidity] = useState('');
    const [name, setName] = useState('');
    const [feels, setFeels] = useState('');
    const [loading, setLoading] = useState(false);

    const callToApi = (q) => {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=eafe6cead67b3e7d13aff2a9f8320f8b&units=metric`, {mode: 'cors'});
    }
   
    // Default location
    async function getDefaultLocation() {
        setLoading(true);
        const q = 'Belgrade';
        try {
            const response = await callToApi(q);
            if (!response.ok) {
                console.log('Could not get data');
                // throw new Error('Could not get data')
            }
            const data = await response.json();
            console.log(data);
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
            console.log(err.message);
        }
    }

    async function getCity(q) {
        setLoading(true);
        try {
            const response = await callToApi(q);
            if (!response.ok) {
                console.log('Could not get data');
                // throw new Error('Could not get data')
            }
            const data = await response.json();
            console.log(data);
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
            console.log(err.message);
        }
    }

    useEffect(() => {
        getDefaultLocation();
      }, []);
      
   return (
       <div>
            {loading ? 
                <div>Loading...</div> : 
                <div>
                    <h1>{ name }</h1>
                    <div>{ country } - { weather }</div>
                    <div>{ temperature }</div>
                    <div>{ humidity }</div>
                    <div>Feels like: { feels }</div>
                </div>
            } 
       </div>
   )
}

export default WeatherData
