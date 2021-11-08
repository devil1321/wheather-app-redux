import { RANDOMIZE_IMAGE } from '../actions/types'
import store from '../store'
const handleRandomizeImage = () => dispatch => {
    let date = new Date()
    let hours = date.getHours()
    let images = store.getState().images.images
    const { day, night } = images
    if (hours < 12) {
        let index = Math.random() * day.length
        index = index.toFixed(0)
        var image = day[index - 1]
    } else {
        let index = Math.random() * night.length
        index = index.toFixed(0)
        var image = night[index - 1]
    }
    if (image.src !== undefined) {
        dispatch({
            type: RANDOMIZE_IMAGE,
            payload: image.src
        })
    } else {
        if (hours < 12) {
            dispatch({
                type: RANDOMIZE_IMAGE,
                payload: '/images/day/day-1.jpg'
            })
        } else {
            dispatch({
                type: RANDOMIZE_IMAGE,
                payload: '/images/night/night-1.jpg'
            })
        }
    }
}

export const imagesActions = {
    handleRandomizeImage
}