import React, { Component } from 'react';
import logo from '../_images/logo.png'
import './nav.css'

class header extends Component {
    constructor(props) {
        super(props);
        this.logoutHandler = this.logoutHandler.bind(this)
        this.loginLogoutLink = this.loginLogoutLink.bind(this)
        this.renderProfile = this.renderProfile.bind(this)
    }


    logoutHandler() {
        fetch("/api/Logout").then(ret => { return ret.json() }).then(ret => {

            if (ret['sucess'] !== undefined) {
                localStorage.removeItem('authToken')
                this.props.checkLogged()
                console.log('1 code executed')
            }
        }).catch(err => {
            alert("problem in logout activity")
        })
    }

    loginLogoutLink() {
        if (this.props.isLogged === false) {
            return <div><button type="button" id="btnSignupModal" class="btn btn-primary" data-toggle="modal" data-target="#SignupModal">Singup</button>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#LoginModal"><i className="fas fa-sign-out-alt dropdown-list-item"></i>Login</button></div>;
        }
        else
            return <a href="/#" onClick={this.logoutHandler} > <i className="fas fa-sign-out-alt dropdown-list-item"></i>logout</a>
    }
    renderProfile() {
        if (this.props.isLogged === true) {
            return <a href={'/profile'}><i className="fas fa-id-badge dropdown-list-item "></i>Profile</a>;
        }
        else return <div style={{ 'display': 'none' }}></div>
    }
    componentDidMount() {
        this.setState({ route: this.props.env })
    }
    render() {

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a href="/#"  to={'/'}> <img className="nav-logo-img" alt="file never uploaded" src={logo} style={{ width: '316px' }} /></a>

                <div className="dropdown">
                    <button className="dropbtn " ><i style={{ color: 'black' }} className="fas fa-user-circle fa-2x ml-0"></i>
                    </button>
                    <div className="dropdown-content">
                        {this.loginLogoutLink()}
                        <a href={'/'}><i className="fas fa-home dropdown-list-item"></i>Home</a>

                        {this.renderProfile()}
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#bookEntryModal"><i className="fas fa-sign-out-alt dropdown-list-item"></i>Donae</button>

                    </div>
                </div>
            </nav>
        )

    }
}




export default header
// export default header
