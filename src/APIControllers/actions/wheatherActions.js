import { REWRITE_POSITION, SET_POSITION, HANDLE_LON_LAT, FETCH_BY_CITY_NAME, FETCH_BY_NAME_5_DAYS, FETCH_MINUTELY, FETCH_HOURLY, FETCH_DAILY, FETCH_ALERTS, WHEATHER_MAP } from '../actions/types'

import axios from 'axios'
import rateLimit from 'axios-rate-limit';

const http = rateLimit(axios.create(), { maxRequests: 2, perMilliseconds: 10000, maxRPS: 2 })

const handleMap = (layer, z, x, y) => async dispatch => {
    axios.get(`https://tile.openweathermap.org/map/${layer}/${z}/${x}/${y}.png?+d355aaa337c3ed0e0876c199a8060479`)
        .then(res => {
            console.log(res.data)
            dispatch({
                type: WHEATHER_MAP,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

const rewritePosition = (position) => dispatch => {
    dispatch({
        type: REWRITE_POSITION,
        payload: position
    })
}

const handlePosition = () => async dispatch => {
    axios.get('https://extreme-ip-lookup.com/json/')
        .then(res => {
            let city
            if (res.data.city === '') {
                city = 'Warsaw'
            } else {
                city = res.data.city
            }
            dispatch({
                type: SET_POSITION,
                payload: city
            })
        })
        .catch(err => console.log(err))
}
const handleLonLat = (cityName) => async dispatch => {
    const data = await http.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: cityName,
            appid: 'd355aaa337c3ed0e0876c199a8060479'
        }
    })
    if (data.data.hasOwnProperty('coord')) {
        var pos = {
            lon: data.data.coord.lon,
            lat: data.data.coord.lat
        }
    }
    if (data.data.hasOwnProperty('city')) {
        var pos = {
            lon: data.data.city.coord.lon,
            lat: data.data.city.coord.lat
        }
    }
    dispatch({
        type: HANDLE_LON_LAT,
        payload: pos
    })
}
const handleFetchWheather = (cityName) => async dispatch => {
    const data = await http.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: cityName,
            appid: 'd355aaa337c3ed0e0876c199a8060479'
        }
    })
    dispatch({
        type: FETCH_BY_CITY_NAME,
        payload: data
    })
}

const handleFetchOneCall = (type, place) => async dispatch => {
    const { lon, lat } = place
    console.log('fetch', place)
    const data = await http.get('https://api.openweathermap.org/data/2.5/onecall', {
        params: {
            lat: lat,
            lon: lon,
            exclude: type,
            appid: 'd355aaa337c3ed0e0876c199a8060479'
        }
    })
    switch (type) {
        case 'minutely':
            dispatch({
                type: FETCH_MINUTELY,
                payload: data
            })
            break
        case 'hourly':
            dispatch({
                type: FETCH_HOURLY,
                payload: data
            })
            break
        case 'daily':
            dispatch({
                type: FETCH_DAILY,
                payload: data
            })
            break
        case 'alerts':
            dispatch({
                type: FETCH_ALERTS,
                payload: data
            })
            break
        default:
            return
    }

}
const handleFetchWheather5Days = (cityName) => async dispatch => {
    const data = await http.get('https://api.openweathermap.org/data/2.5/forecast', {
        params: {
            q: cityName,
            appid: 'd355aaa337c3ed0e0876c199a8060479'
        }
    })
    dispatch({
        type: FETCH_BY_NAME_5_DAYS,
        payload: data
    })
}
const handleMapURI_AND_TYPE = (layer, zoom, x, y, date) => async dispatch => {
    let uri = ''
    if (date) {
        uri = `http://maps.openweathermap.org/maps/2.0/weather/${layer}/${zoom}/${x}/${y}?date=${date}&appid=d355aaa337c3ed0e0876c199a8060479`
    } else {
        uri = `http://maps.openweathermap.org/maps/2.0/weather/${layer}/${zoom}/${x}/${y}?appid=d355aaa337c3ed0e0876c199a8060479`
    }
    dispatch({
        type: WHEATHER_MAP,
        payload: uri
    })
}


export const wheatherActions = {
    handleMap,
    rewritePosition,
    handlePosition,
    handleLonLat,
    handleFetchWheather,
    handleFetchWheather5Days,
    handleFetchOneCall,
    handleMapURI_AND_TYPE
}