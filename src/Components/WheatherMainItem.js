import React from 'react'

const WheatherMainItem = ({icon, name,main,temp,feels_like,pressure,humidity,visibility,wind_speed,description,handleDesc}) => {
    return (
        <div className="WheatherMainItem">
            <div className="wheatherMainItem__main-item active" id="main-item">
                <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`}/>
                <h1>{name}</h1>
                <div className="wheatherMainItem__wheather">
                    <h3>{main}</h3>
                    <h3>/</h3>
                    <h3>Temp {(temp - 273.15).toFixed(2)} °C</h3>
                </div>
                <div className="wheatherMainItem__wheather-info">
                    <p>{handleDesc(description)}</p>
                    <p>Feels Like {(feels_like - 273.15).toFixed(2)} °C</p>
                    <p>Pressure {pressure} hPa</p>
                    <p>Humidity {humidity} %</p>
                    <p>Visibility {visibility}</p>
                    <p>Wind Speed {wind_speed} km/h</p>
                </div>
            </div>
        </div>
    )
}

export default WheatherMainItem
