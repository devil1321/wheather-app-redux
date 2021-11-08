import React from 'react'
import { Route, Switch, Redirect } from "react-router-dom";
import Sidebar from '../Sidebar'
import Search from '../Search'
import Footer from '../Footer'
const RouteWithLayout = ({ component: Component, ...rest }) => {  
    return (
      <Route {...rest} render={props => (
        <div className="container">
          <Sidebar />
          <div className="container-inner">
            <Search />
            <Component {...props} />
            <Footer />
          </div>
        </div>
      )} />
    );
  };
  
export default RouteWithLayout