import React from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Home from './components/Home'
import Nav from './components/nav/nav'
import PrivateRoutes from './PrivateRoutes'

const Routes = () =>(
    <Router>
        <Switch>
            <PrivateRoutes exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/nav" component={Nav} />
        </Switch>
    </Router>
);
export default Routes
