import React, { useEffect, useState } from 'react'
import WeatherData from '../data/WeatherData'

function Main() {
    const [userLocation, setUserLocation] = useState('');
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);

    function getUserLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
          const coordinates = [
            Math.round(position.coords.latitude),
            Math.round(position.coords.longitude),
          ];
          setUserLocation(coordinates);
        });
      }

      async function getData() {
        setLoading(true);

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${userLocation[0]}&lon=${userLocation[1]}&appid=eafe6cead67b3e7d13aff2a9f8320f8b&units=metric`);
            if (!response.ok) {
                console.log('Bad network request!')
            }
            const data = await response.json();
            setUserData(data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

      useEffect(() => {
        if (userLocation.length !== 0) {
          getData();
        }
      }, [userLocation]);

    return (
        <main>
            <div onClick={getUserLocation}>Get user location</div>
            { loading ? <div>Loading...</div> :
            <WeatherData data={userData} /> }
        </main>
    )
}

export default Main
