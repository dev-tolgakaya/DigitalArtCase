import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {AuthProvider} from "../Contexts/AuthContext";
import PrivateRoute from "../Components/PrivateRoute";
import Dashboard from "../Pages/Dashboard";
import Signup from "../Pages/Singup";
import Login from "../Pages/Login";
import React from "react";


const AppRouter = () => {
    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <PrivateRoute exact path="/" component={Dashboard}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/login" component={Login}/>
                </Switch>
            </AuthProvider>
        </Router>
    )
}


export default AppRouter
