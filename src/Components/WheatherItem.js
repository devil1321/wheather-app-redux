import React from 'react'

const WheatherItem = ({icon,name,temp,feels_like,pressure,humidity,visibility,wind_speed,rain,description,clouds,handleDescMain}) => {
    return (
        <div className="wheatherItem__main-item sm"  id="main-item-sm">
        <div className="wheatherItem__main-item-head">
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`}/>
            <div className="wheatherItem__main-item-header sm">
                <h2>{name}</h2>
                <div className="wheatherItem__wheather">
                    <h3>Temp {(temp - 273.15).toFixed(2)} °C</h3>
                </div>
            </div>
        </div>
        <div className="wheatherItem__wheather-info">
            <p>{handleDescMain(description)}</p>
            <p>Feels Like {(feels_like - 273.15).toFixed(2)} °C</p>
            <p>Pressure {pressure} hPa</p>
            <p>Humidity {humidity} %</p>
            {visibility ? <p>Visibility {visibility}</p> : null}
            {rain || !clouds || clouds
            ? <React.Fragment>
                {rain ? <p className="wheatherItem__fix">Rain {rain}</p> : <p className="wheatherItem__fix">Clouds {clouds} %</p>}
              </React.Fragment> 
            : null}
            <p>Wind Speed {wind_speed} km/h</p>
        </div>
    </div>
    )
}

export default WheatherItem
