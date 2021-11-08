import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    const handleNavbar = () =>{
        const sidebar = document.querySelector('.sidebar')
        if(sidebar.classList.contains('close') && window.innerWidth < 1366){
            sidebar.style.maxHeight = '1250px'
            sidebar.style.height = '1250px'
            sidebar.classList.remove('close')
            sidebar.classList.add('open')
        }
        else{
            sidebar.style.height = '80px'
            sidebar.classList.remove('open')
            sidebar.classList.add('close')
        }
    }
    return (
        <div className="sidebar close">
            <div className="sidebar__logo" onClick = {(e)=>{handleNavbar()}}>
                <img src='/images/logo.svg' />
            </div>
            <ul className="sidebar__nav-list">
                <Link to="/">
                    <li className="sidebar__nav-item">Current Weather Data <FontAwesomeIcon icon={faChevronRight} /></li>
                </Link>
                <Link to="/fivedays">
                    <li className="sidebar__nav-item">Wheather For 5 Days / 3 hour <FontAwesomeIcon icon={faChevronRight} /></li>
                </Link>
                    {/* coming soon in pro */}
                    {/* <li className="sidebar__nav-item">Daily Forecast 16 days <FontAwesomeIcon icon={faChevronRight} /></li> */}
                    {/* <li className="sidebar__nav-item">Climatic Forecast 30 days <FontAwesomeIcon icon={faChevronRight} /></li> */}
                    {/* <li className="sidebar__nav-item">Weather Maps 2.0 3-hour step <FontAwesomeIcon icon={faChevronRight} /></li> */}
                    {/* <li className="sidebar__nav-item">Weather Maps 2.0 1-hour step <FontAwesomeIcon icon={faChevronRight} /></li> */}
                <Link to="/minutely">
                    <li className="sidebar__nav-item">Minutely forecast <FontAwesomeIcon icon={faChevronRight} /></li>
                </Link>
                <Link to="/hourly">
                    <li className="sidebar__nav-item">Hourly forecast for 48 hours <FontAwesomeIcon icon={faChevronRight} /></li>
                </Link>
                <Link to="/daily">
                    <li className="sidebar__nav-item">Daily forecast for 7 days / 48h <FontAwesomeIcon icon={faChevronRight} /></li>
                </Link>
                    {/* res not return alerts */}
                <Link to="/alerts">
                    <li className="sidebar__nav-item">National weather alerts <FontAwesomeIcon icon={faChevronRight} /></li>
                </Link>
                <Link to="/todo">
                    <li className="sidebar__nav-item">Your Tasks <FontAwesomeIcon icon={faChevronRight} /></li>
                </Link>
                    {/* <li className="sidebar__nav-item">Historical weather data for the previous 5 days <FontAwesomeIcon icon={faChevronRight} /></li> */}\
                {/* map in pro version */}
                {/* <Link to="/wheathermap">
                    <li className="sidebar__nav-item">Weather Maps 1.0 <FontAwesomeIcon icon={faChevronRight} /></li>
                </Link> */}
            </ul>
        </div>
    )
}

export default Sidebar
