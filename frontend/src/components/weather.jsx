import React, {useState, useEffect} from 'react'

const Weather = () => {
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [locationError, setLocationError] = useState(null)
    const [err, setError] = useState('')
    const [date, setDate] = useState([])
    const [weath, setWeather] = useState([])
    let emoji = []

    useEffect(() => {
        if (!navigator.geolocation){
            setLocationError(`Location not supported.`)
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) =>{
                setLatitude(position.coords.latitude)
                // console.log(position.coords.latitude)
                setLongitude(position.coords.longitude)
                // console.log(position.coords.longitude)
            },
        (error) => {
            setLocationError('Something went wrong', error)
        }
        )
    }, [])

    useEffect(() =>{
        const doFetch = async () => {
            // console.log(latitude, longitude)
            try{
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude.toFixed(2)}&longitude=${longitude.toFixed(2)}&daily=temperature_2m_max&hourly=temperature_2m&models=icon_seamless&current=temperature_2m&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`)
            const data = await response.json();
            setDate(data.daily.time)
            setWeather(data.daily.temperature_2m_max)
            console.log(data.daily.temperature_2m_max, data.daily.time)
            } catch (err) {
                setError('Failed')
                console.log(err)
            }
        }
    doFetch()
    }, [latitude, longitude])

    const change = () => {

        for (let i=0; i < weath.length; i++){
            if (weath[i] < 35 && weath[i] > 49){
                emoji.push('❆')
            } else if (weath[i] < 65 && weath[i] > 50){
                emoji.push('༄')
            } else{
                emoji.push('☀︎')
            }
        }
        console.log(emoji)
    }
    change()

    return (
        <div className='forecast-list'> 
        <h1>7 Day Weather:</h1>
        <p>{locationError}</p>
        <div className="weather-row">
            {date && weath.map((item, i) => (
                <div className="weather-card" key={i}>
                <div className="weather-icon">{emoji[i]}</div>
                <div className="weather-temp">{item}°</div>
                <div className="weather-date">{date[i]}</div>
        </div>
        ))}
        </div>
        </div>
    )
}

export default Weather;