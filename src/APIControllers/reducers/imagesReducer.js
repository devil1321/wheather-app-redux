import { RANDOMIZE_IMAGE } from '../actions/types'

const images = {
    day:[
        {
            src:'/images/day/day-1.jpg'
        },
        {
            src:'/images/day/day-2.jpg'
        },
        {
            src:'/images/day/day-3.jpg'
        },
        {
            src:'/images/day/day-4.jpg'
        },
        {
            src:'/images/day/day-5.jpg'
        },
        {
            src:'/images/day/day-6.jpg'
        }
    ],
    night:[
        {
            src:'/images/night/night-1.jpg'
        },
        {
            src:'/images/night/night-2.jpg'
        },
        {
            src:'/images/night/night-3.jpg'
        },
        {
            src:'/images/night/night-4.jpg'
        },
        {
            src:'/images/night/night-5.jpg'
        },
        {
            src:'/images/night/night-6.jpg'
        },
        {
            src:'/images/night/night-7.jpg'
        }
    ]
}

const initData = {
   images:images,
   image:{
       src:""
   }
}

export default (state = initData, action) =>{
    switch(action.type){
        case RANDOMIZE_IMAGE:
            return {
                ...state,
                image:action.payload
            }
        default:
            return {
                ...state
            }
        
    }
}