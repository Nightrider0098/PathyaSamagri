import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from '../_helpers';
import HomePage from '../HomePage/HomePage';
import Footer from '../_components/footer'
import { ProfilePage } from '../profileView'
import { ProfileEdit } from '../profileEdit'



class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            route: 'http://localhost:5400'
        }
    }

    render() {
        return (
            <div>
                <Router history={history}>
                    <Switch>;
                        <Route exact path="/" component={() => <HomePage route={this.state.route} />} />
                        <Route path="/profile" component={() => <ProfilePage route={this.state.route} />} />
                        <Route path="/profileEdit" component={() => <ProfileEdit route={this.state.route} />} />
                    </Switch>
                </Router>
                <Footer />
            </div>
        );
    }
}


export default App; 