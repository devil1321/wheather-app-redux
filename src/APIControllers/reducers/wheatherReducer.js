import { REWRITE_POSITION, SET_POSITION, HANDLE_LON_LAT, FETCH_BY_CITY_NAME, FETCH_BY_NAME_5_DAYS, FETCH_MINUTELY, FETCH_HOURLY, FETCH_DAILY, FETCH_ALERTS, WHEATHER_MAP } from '../actions/types'

const mapTypes = [{
        type: 'Convective precipitation',
        code: 'PAC0',
        units: 'mm'
    },
    {
        type: 'Precipitation intensity',
        code: 'PR0',
        units: 'mm/s'
    },
    {
        type: 'Accumulated precipitation',
        code: 'PA0',
        units: 'mm'
    },
    {
        type: 'Accumulated precipitation - rain',
        code: 'PAR0',
        units: 'mm'
    },
    {
        type: 'Accumulated precipitation - snow',
        code: 'PAS0',
        units: 'mm'
    },
    {
        type: 'Depth of snow',
        code: 'SD0',
        units: 'm'
    },
    {
        type: 'Wind speed at an altitude of 10 meters',
        code: 'WS10',
        units: 'm/s'
    },
    {
        type: 'Joint display of speed wind (color) and wind direction (arrows), received by U and V components',
        code: 'WND',
        units: 'm/s'
    },
    {
        type: 'Atmospheric pressure on mean sea level',
        code: 'APM',
        units: 'hPa'
    },
    {
        type: 'TA2',
        code: 'Air temperature at a height of 2 meters',
        units: '°C'
    },
    {
        type: 'Temperature of a dew point',
        code: 'TD2',
        units: '°C'
    },
    {
        type: 'Soil temperature 0-10 сm',
        code: 'TS0',
        units: 'K'
    },
    {
        type: 'Soil temperature >10 сm',
        code: 'TS10',
        units: 'K'
    },
    {
        type: 'Relative humidity',
        code: 'HRD0',
        units: '%'
    },
    {
        type: 'Cloudiness',
        code: 'CL',
        units: '%'
    }
]

const initData = {
    position: null,
    lon: null,
    lat: null,
    current: null,
    days_5: null,
    minutely: null,
    hourly: null,
    daily: null,
    alerts: null,
    mapURI: null,
    mapTypes: mapTypes
}

export default (state = initData, action) => {
    switch (action.type) {
        case SET_POSITION:
            return {
                ...state,
                position: action.payload
            }
        case REWRITE_POSITION:
            return {
                ...state,
                position: action.payload
            }
        case HANDLE_LON_LAT:
            return {
                ...state,
                lon: action.payload.lon,
                lat: action.payload.lat
            }
        case FETCH_BY_CITY_NAME:
            return {
                ...state,
                current: action.payload
            }
        case FETCH_BY_NAME_5_DAYS:
            return {
                ...state,
                days_5: action.payload
            }
        case FETCH_MINUTELY:
            return {
                ...state,
                minutely: action.payload
            }
        case FETCH_HOURLY:
            return {
                ...state,
                hourly: action.payload
            }
        case FETCH_DAILY:
            return {
                ...state,
                daily: action.payload
            }
        case FETCH_ALERTS:
            return {
                ...state,
                alerts: action.payload
            }
        case WHEATHER_MAP:
            return {
                ...state,
                mapURI: action.payload
            }
        default:
            return {
                ...state
            }

    }
}