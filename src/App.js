import { useEffect,useState } from 'react'
import './styles/themes/theme.scss'
import { Switch, Route } from 'react-router-dom'
import  RouteWithLayout  from './Components/HOC/RouteWithLayout'
import { connect } from 'react-redux'
import { wheatherActions } from './APIControllers/actions/wheatherActions'
import { imagesActions } from './APIControllers/actions/imagesActions'
// components
import Home from './Pages/Home'
import Daily from './Pages/Daily'
import FiveDays from './Pages/FiveDays'
import Minutely from './Pages/Minutely'
import Hourly from './Pages/Hourly'
import Alerts from './Pages/Alerts'
import WheatherMap from './Pages/WheatherMap'
import Todo from './Pages/Todo'
const App = (props) => {  

  const [isLoad,setIsLoad] = useState(false)
  const { handleRandomizeImage } = props
  const { image } = props.images


  useEffect(()=>{
    if(!isLoad){
      handleRandomizeImage()
      setIsLoad(true)
    }else{
      let fiveMinutes = 5000 * 60
      setInterval(()=>{
        handleRandomizeImage()
      },fiveMinutes)
    }
    
  },[isLoad])
  return (
   
    <div className="app"  style={{backgroundImage:`url(${image})`}}>
      <Switch>
        <RouteWithLayout exact path="/" component={Home}/>
        <RouteWithLayout exact path="/daily" component={Daily}/>
        <RouteWithLayout exact path="/fivedays" component={FiveDays}/>
        <RouteWithLayout exact path="/minutely" component={Minutely}/>
        <RouteWithLayout exact path="/hourly" component={Hourly}/>
        <RouteWithLayout exact path="/alerts" component={Alerts}/>
        <RouteWithLayout exact path="/wheathermap" component={WheatherMap}/>
        <RouteWithLayout exact path="/todo" component={Todo}/>
      </Switch>
    </div>
  );
}

const mapStateToProps = state =>({
  ...state
})

const actions  = Object.assign({},wheatherActions,imagesActions)

export default connect(mapStateToProps,actions)(App);
