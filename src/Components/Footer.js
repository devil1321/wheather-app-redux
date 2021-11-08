import React,{useEffect,useState} from 'react'
import axios from 'axios'
const Footer = () => {
    const [isSet,setIsSet] = useState(false)
    const [currentPOS,setCurrentPOS] = useState(null)

    const handlePosition = () =>{
        axios.get('https://extreme-ip-lookup.com/json/')
            .then(res => {
                setCurrentPOS(res.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(()=>{
        if(!isSet){
            handlePosition()
            setIsSet(true)
        }
    },[currentPOS])

    return (
        <React.Fragment>
        {currentPOS !== null
          ? <div className="footer active">
                <p><span>City:</span> {currentPOS.city === "" ? "Warsaw" : currentPOS.city }</p>
                <p><span>Continent:</span> {currentPOS.continent === "" ? "Europe" : currentPOS.continent}</p>
                <p><span>Country:</span> {currentPOS.country === "" ? "Poland" : currentPOS.country}</p>
                <p><span>ISP:</span> {currentPOS.isp === "" ? "Unrechable" : currentPOS.isp}</p>
            </div>
          : null}
        </React.Fragment>
    )
}

export default Footer
