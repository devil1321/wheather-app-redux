import React,{ useState , useEffect } from 'react'
import { unmountComponentAtNode, render } from "react-dom";
import { useLocation } from 'react-router-dom'
import cities from '../APIControllers/world-cities_json.json'
import { connect } from 'react-redux'
import { wheatherActions } from '../APIControllers/actions/wheatherActions'
import { imagesActions } from '../APIControllers/actions/imagesActions'
const Search = (props) => {
    const { handleFetchWheather, handleFetchWheather5Days, handleFetchOneCall, handleLonLat, rewritePosition } = props
    const [search, setSearch] = useState([])
    const [inputVal, setInputVal] = useState('')
    const [place,setPlace] = useState(null)
    const location = useLocation()
    const [isSet,setIsSet] = useState(false)
    const [isLoad,setIsLoad] = useState(false)
    const [isSearching, setIsSearching]  = useState(false)

    if(props.wheatherDATA.lon !== null && props.wheatherDATA.lat !== null){
        var { lat, lon } = props.wheatherDATA
        
    }
    
    const handleSearch = (searchText) =>{
        let matches = cities.filter(city=>{
        const regex = new RegExp(`^${searchText}`,'gi')
            return city.name.match(regex) 
        })
        setSearch(matches)
        setInputVal(searchText)
        if(searchText === ''){
            setSearch([])
        }
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

    const handleSubmit = (e) => {
        rewritePosition(inputVal)
        e.preventDefault()
        setIsSearching(true)
        handleFall()
        handleFetchWheather(inputVal)
        handleFetchWheather5Days(inputVal)
        let path = location.pathname
            switch(path){
                case '/minutely':
                    handleFetchOneCall('minutely',place)
                    setIsSet(false)
                    break
                case '/hourly':
                    handleFetchOneCall('hourly',place)
                    setIsSet(false)
                    break
                case '/daily':
                    handleFetchOneCall('daily',place)
                    setIsSet(false)
                    break
                case '/alerts':
                    handleFetchOneCall('minutely',place)
                    setIsSet(false)
                    break
                }
        
        let mainItem = document.querySelector('#main-item')
        if(mainItem){
            mainItem.classList.remove('active')
            setTimeout(()=>{
                mainItem.classList.add('active')
            },100)
        }
        setInputVal('')
    }
    useEffect(()=>{
        if(place === null && !isLoad){
            setPlace({
                lat:lat,
                lon:lon
            })
            setIsLoad(true)
        }
        if(place !== null && isSet){
            setPlace({
                lat:lat,
                lon:lon
            })
            setIsSet(false)
        }

    },[place,isSet])
    return (
        <div className="search">
            <form onSubmit={(e)=>{handleSubmit(e)}}>
            <div className="search__field">
                <input type="text" value={inputVal} className="search__input" placeholder="Search Wheather By City" onChange={(e)=>setInputVal(e.target.value)} onInput={(e)=>{handleSearch(e.target.value)}}/>
                <button type="submit">Search</button>
            </div>
            {search.length > 0 
                ? <div className="search__items">
                    {search.slice(0,50).map(city => <div onClick={(e)=>{
                        setInputVal(e.target.innerText)
                        handleLonLat(e.target.innerText)
                        setIsSet(true)
                        setSearch([])
                    }}  className="search__item">{city.name}</div>)}
                  </div>
                : null
            }
            </form>
        </div>
    )
}

const mapStateToProps = state =>({
  ...state
})

const actions  = Object.assign({},wheatherActions,imagesActions)

export default connect(mapStateToProps,actions)(Search)
