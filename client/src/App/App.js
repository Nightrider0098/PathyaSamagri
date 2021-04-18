import React, { useState, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from '../_helpers';
import HomePage from '../HomePage/HomePage';
import Footer from '../_components/footer'
import Header from '../_components/header'
import { ProfilePage } from '../profileView'
import ProfileEdit from '../profileEdit/profileEdit'
import './App.css'



export default function () {
    const route = "http://localhost:5400/";
    const [user, setUser] = useState({})
    const [isLogged, setIsLogged] = useState(false);

    return (
        <div>
            <Router history={history}>
                <>
                    <Header isLogged={isLogged} setLogged={setIsLogged} checkLogged={isLogged} user={user} setUser={setUser} route={route} />

                    <Switch>
                        <Route exact path="/" component={() => <HomePage route={route} />} />
                        <Route path="/profile" component={() => <ProfilePage route={route} user={user} setUser={setUser} />} />
                        <Route path="/profileEdit" component={() => <ProfileEdit route={route} user={user} setUser={setUser} />} />
                    </Switch>
                </>
            </Router>
            <Footer />
        </div>

    )
}


