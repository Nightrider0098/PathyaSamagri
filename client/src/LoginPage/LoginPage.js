import React from 'react';
import './style.css'
import image from './signin-image1.jpg';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            submitted: false,
            Logging: 0

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ Logging: 1 })
        var option = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: this.state.username, password: this.state.password })
        }
        fetch('/api/authentication', option).then(ret => {
            this.setState({ Logging: 0 })
            return ret.json()
        }).then(ret => {
            localStorage.setItem('authToken', ret.token)
            document.getElementById('loginFormClose').click()
            this.props.isLogged()
        }).catch(err => { alert("Login Fail"); console.log(err); })
    }

    render() {

        return (

            <div class="modal fade" id="LoginModal" tabindex="-1" role="dialog" aria-labelledby="LoginModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="LoginModalLabel">Login From</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="loginFormClose" >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className="container">
                                <div className="signin-content">
                                    <div className="signin-image">
                                        <figure><img src={image} alt="Signup " /></figure>
                                        <a id="link-to-signup" href="/signup" className="signup-image-link">Create an account</a>
                                    </div>

                                    <div className="signin-form">
                                        <h2 className="form-title">Sign in</h2>
                                        <form className="register-form" id="login-form" onSubmit={this.handleSubmit}>
                                            <div className={'form-group' + (this.state.submitted && !this.state.username ? ' has-error' : '')}>
                                                <input type="text" placeholder="Username" className="form-control" name="username" value={this.state.username} id='your_name' onChange={this.handleChange} />
                                                {this.state.submitted && !this.state.username &&
                                                    <div className="help-block">Username is required</div>
                                                }
                                            </div>

                                            <div className={'form-group' + (this.state.submitted && !this.state.password ? ' has-error' : '')}>
                                                {/* <label htmlFor="password">Password</label> */}
                                                <input type="password" placeholder="Password" className="form-control" id='your_pass' name="password" value={this.state.password} onChange={this.handleChange} />
                                                {this.state.submitted && !this.state.password &&
                                                    <div className="help-block">Password is required</div>
                                                }
                                            </div>

                                            <div className="form-group align-items-center " style={{ display: "flex" }}>
                                                <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                                                <label htmlFor="remember-me" className="label-agree-term">Remember
                                        me</label>
                                            </div>

                                            <div className="form-group">
                                                <button className="btn btn-primary">Login</button>
                                                {this.state.Logging &&
                                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="  alt="file not found"/>
                                                }
                                            </div>


                                        </form>
                                        <div className="social-login">
                                            <span className="social-label">Or login with</span>
                                            <ul className="socials">
                                                <li><a href="/#"><i className="display-flex-center zmdi zmdi-facebook"></i></a></li>
                                                <li><a href="/#"><i className="display-flex-center zmdi zmdi-twitter"></i></a></li>
                                                <li><a href="/#"><i className="display-flex-center zmdi zmdi-google"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default LoginPage; 