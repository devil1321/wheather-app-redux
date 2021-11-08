import React,{useState,useEffect} from 'react'
import WheatherMainItem from '../Components/WheatherMainItem'
import WheatherItem from '../Components/WheatherItem'
import { connect } from 'react-redux'
import { wheatherActions } from '../APIControllers/actions/wheatherActions'
import { imagesActions } from '../APIControllers/actions/imagesActions'
import axios from 'axios'

const FiveDays = (props) => {
    const [sliced,setSliced] = useState([])
    const [isLoad,setIsLoad] = useState(false)
    const [isSet,setIsSet] = useState(false)
    const { handleFetchWheather5Days } = props
    const { position } = props.wheatherDATA

    if(props.wheatherDATA.days_5 !== null){
        var { data } = props.wheatherDATA.days_5
        var { list } = data
        var { name } = data.city
        var { visibility, wind } = list[0]
        var { weather } = data.list[0]
        var { temp ,feels_like, humidity, pressure, temp } = data.list[0].main
    }

    const handleDescMain = (word) =>{
        let charOne = word[0].toUpperCase()
        let rest = word.slice(1,word.length)
        var word = charOne + rest
        return word
    }
    const fixWidget = () =>{
        let toRemove = document.querySelectorAll('.wheatherItem__fix')
        toRemove.forEach(item => item.remove())
    }
    const handleSlice = () =>{
        let stepStart = 3
        let stepEnd = 4
        let tempSliced = []
        for(let i = 0; i < 25; i += 5){
            let part = list.slice(stepStart,stepEnd)
            tempSliced = [...part]
            stepStart += 3
            stepEnd += 4
        }
        setSliced([...tempSliced])
    }
    const handleDesc = () =>{
        // let charOne = list[0].weather[0].description[0].toUpperCase()
        // let rest = weather[0].description.slice(1,weather[0].description.length)
        // var word = charOne + rest
        // return word
    }
    const handleFall = () =>{
        let time = 0
        const items = document.querySelectorAll('.wheatherItem__main-item.sm')
        items.forEach(item => item.classList.remove('active'))
        setTimeout(()=>{
            items.forEach(item =>{
                setTimeout(()=>{
                    item.classList.add('active')
                },time)
                time+=200
            })
        },1000)
    }
   
    useEffect(()=>{
        if(!isSet){
            if(position !== null){
                handleFetchWheather5Days(position)
                setIsSet(true)
            }
        }
        if(isSet && !isLoad && list !== undefined){
            handleSlice()
            setIsLoad(true)
        }
        fixWidget()
        handleFall()
    },[isSet,isLoad,sliced,props.wheatherDATA])

    return (
        <div className="fiveDays">
            <div className="fiveDays__main">
            {props.wheatherDATA.days_5 !== null 
                ? <WheatherMainItem 
                    icon={weather[0].icon} 
                    name={name}
                    main={weather[0].main}
                    temp={temp}
                    feels_like={feels_like}
                    pressure={pressure}
                    humidity={humidity}
                    visibility={visibility}
                    wind_speed={wind.speed}
                    description = {weather[0].description}
                    handleDesc={handleDescMain}
                  />
                : null}
            </div>
            <div className="wheatherItem__items">
                {sliced.map(day => <WheatherItem 
                                        icon={list[0].weather[0].icon} 
                                        name={name} temp={temp} 
                                        feels_like={feels_like} 
                                        pressure={pressure}
                                        humidity={humidity}
                                        visibility={visibility}
                                        wind_speed={wind.speed}
                                        description = {day.weather[0].description}
                                        handleDescMain={handleDescMain}
                                    />)}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    ...state
})

const actions  = Object.assign({},wheatherActions,imagesActions)

export default connect(mapStateToProps,actions)(FiveDays)
