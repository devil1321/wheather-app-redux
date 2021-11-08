import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux'
import { wheatherActions } from '../APIControllers/actions/wheatherActions'
import { imagesActions } from '../APIControllers/actions/imagesActions'
import WheatherMainItem from '../Components/WheatherMainItem'
import axios from 'axios'

const Home = (props) => {
    const [isSet,setIsSet] = useState(false)
    const [isLoad,setIsLoad] = useState(false)
    const [place,setPlace] = useState(null)
    const { handleFetchWheather, handleFetchOneCall, handlePosition, handleLonLat } = props
    const { position } = props.wheatherDATA

    if(props.wheatherDATA.current !== null){
        var { data } = props.wheatherDATA.current
        var { weather , visibility, wind,coord } = data
        var { temp ,feels_like, humidity, pressure,  temp } = data.main

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
            handlePosition()
            if(position !== null){
                handleFetchWheather(position)
                handleLonLat(position)
                setIsSet(true)
            }
        }
        if(place && !isLoad){
            handleFetchOneCall('minutely',place)
            setIsLoad(true)
        }
        
    },[isSet,isLoad,place,props.wheatherDATA])

    return (
        <div className="home">
        {props.wheatherDATA.current !== null 
            ? <WheatherMainItem 
                icon={weather[0].icon} 
                name={data.name}
                main={weather[0].main}
                temp={temp}
                feels_like={feels_like}
                pressure={pressure}
                humidity={humidity}
                visibility={visibility}
                wind_speed={wind.speed}
                handleDesc={handleDesc}
              />
            : null}
        </div>
    )
}

const mapStateToProps = state => ({
    ...state
})

const actions  = Object.assign({},wheatherActions,imagesActions)

export default connect(mapStateToProps,actions)(Home)
