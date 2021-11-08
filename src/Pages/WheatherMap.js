import React,{ useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { wheatherActions } from '../APIControllers/actions/wheatherActions'
import { imagesActions } from '../APIControllers/actions/imagesActions'


const WheatherMap = (props) => {
    const [isSet,setIsSet] = useState(false)
    const [place,setPlace] = useState(null)
    const [isLoad,setIsLoad] = useState(false)
    const { handleFetchWheather,handleFetchWheather5Days ,handleFetchOneCall,handleMap, setContainerAndSidebar } = props
    
    if(props.wheatherDATA.current !== null){
        var { data } = props.wheatherDATA.current
        var { main, name, weather , visibility, wind,coord } = data
        var { temp ,feels_like, grnd_level, humidity, pressure, sea_level, temp, temp_max, temp_min } = data.main

    }

    const handleDesc = () =>{
        let charOne = weather[0].description[0].toUpperCase()
        let rest = weather[0].description.slice(1,weather[0].description.length)
        var word = charOne + rest
        return word
    }

 

    useEffect(()=>{
        setPlace(coord)
        if(!isSet){
            handleFetchWheather('Lillehammer')
            handleFetchWheather5Days('Lillehammer')
            setIsSet(true)
        }
        if(place !== null && place !== undefined){
            if(Object.keys(place).length > 0 && !isLoad){
                handleFetchOneCall('alerts',place)
                setIsLoad(true)
            }
        }
    },[isSet,isLoad,place,props.wheatherDATA])

    return (
        <div className="home">
        {props.wheatherDATA.current !== null 
            ? <div className="home__main-item active">
                <img src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}/>
                <h1>{name}</h1>
                <div className="home__wheather">
                    <h3>{weather[0].main}</h3>
                    <h3>/</h3>
                    <h3>Temp {(temp - 273.15).toFixed(2)} °C</h3>
                </div>
                <div className="home__wheather-info">
                    <p>{handleDesc()}</p>
                    <p>Feels Like {(feels_like - 273.15).toFixed(2)} °C</p>
                    <p>Pressure {pressure} hPa</p>
                    <p>Humidity {humidity} %</p>
                    <p>Visibility {visibility}</p>
                    <p>Wind Speed {wind.speed} km/h</p>
                </div>
            </div>
            : null}
        </div>
    )
}

const mapStateToProps = state => ({
    ...state
})

const actions  = Object.assign({},wheatherActions,imagesActions)

export default connect(mapStateToProps,actions)(WheatherMap)
