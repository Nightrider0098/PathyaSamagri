import React, { Component } from 'react'
import './styles.css'

class SignupPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newEmail: '',
            newPassword: '',
            newRePass: "",
            newUserName: "",
            TermsAgreed: "",

            Validation: false,

        }
        this.newUserNameHandler = this.newUserNameHandler.bind(this)
        this.newEmailHandler = this.newEmailHandler.bind(this)
        this.newPasswordHandler = this.newPasswordHandler.bind(this)
        this.newRePassHandler = this.newRePassHandler.bind(this)
        this.TermsHandler = this.TermsHandler.bind(this)
        this.formSubmitHandler = this.formSubmitHandler.bind(this)
    }

    newUserNameHandler(value) {
        this.setState({ newUserName: value })
    }

    newEmailHandler(value) {
        this.setState({ newEmail: value })
    }
    newPasswordHandler(value) {
        this.setState({ newPassword: value })
    }
    newRePassHandler(value) {
        this.setState({ newRePass: value })
        if (value === this.state.newPassword) {
            this.setState({ Validated: true })
        }
    }
    TermsHandler() {
        this.setState({ TermsAgreed: !this.state.TermsAgreed })
    }
    formSubmitHandler(e) {
        e.preventDefault()
        if (this.state.newPassword !== this.state.newRePass) {
            this.setState({ newPassword: "", newRePass: "", Validation: false })
            return;
        }
        else {
            this.setState({ Validation: true })
            let AllDetails = { 'username': this.state.newUserName, 'password': this.state.newPassword, 'email': this.state.newEmail }
            var option = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(AllDetails)
            }
            fetch( '/api/Signup', option).then(ret => { return ret.json() }).then(ret => {
                if (ret['sucess'] !== undefined) { alert('registered') 
            document.getElementById('a415').click()
            }
                else {
                    alert(ret['alert'])
                }
                
            })
        }

    }

    render() {


        return (

            <div class="modal fade" id="SignupModal" tabIndex="-1" role="dialog" aria-labelledby="SignupModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="SignupModalLabel">Modal title</h5>
                            <button type="button" id='a415' class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                        </div>
                        <div className="main" style={{ background: 'none', paddingTop: '50px', paddingBottom: '50px' }}>
                            <section className="signup" style={{ marginBottom: "50px" }}>
                                <div className="container">

                                    <div className="signup-content">
                                        <div className="signup-form">
                                            <h2 className="form-title">Sign up</h2>

                                            <form method="POST" onSubmit={this.formSubmitHandler} className="register-form" id="register-form">
                                                {alert.message &&
                                                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                                                }


                                                <div className="form-group">
                                                    <input type="text" className="form-control" required="required" name="username" id="username" value={this.state.newUserName} onChange={(e) => this.newUserNameHandler(e.target.value)}
                                                        placeholder="Your Name" />
                                                </div>
                                                <div className="form-group">
                                                    <input type="email" className="form-control" name="email" required="required" id="email" value={this.state.newEmail} onChange={(e) => this.newEmailHandler(e.target.value)}
                                                        placeholder="Your Email" />
                                                </div>


                                                <div className="form-group">
                                                    <input type="password" className="form-control" autoComplete="off" value={this.state.newPassword} onChange={(e) => this.newPasswordHandler(e.target.value)} name="password"
                                                        id="password" placeholder="Password" />

                                                </div>
                                                <div className="form-group">
                                                    <div >
                                                        <input type="password" value={this.state.newRePass} onChange={(e) => this.newRePassHandler(e.target.value)} autoComplete="off" id="re_pass" className="form-control"
                                                            placeholder="Repeat your password" />
                                                        <img id="re-pass-error" className="re-pass-error"
                                                            src="webfonts\re-pass-error.svg" alt="file not found" />
                                                    </div>
                                                </div>

                                                <div className="form-group d-flex align-items-center">
                                                    <input type="checkbox" required name="agree-term" id="agree-term" checked={this.state.TermsAgreed} onClick={this.TermsHandler} />
                                                    <a href="/#" className="term-service">Terms of service</a>
                                                </div>
                                                <div className="form-group form-button justify-content-center align-items-center" style={{ display: 'flex' }}>
                                                    <button type='submit' name="signup" id="signup"
                                                        className="form-submit-disabled"  >Submit</button>
                                                    <div className="spinner-border" style={{ marginLeft: '36px', marginTop: '23px', display: this.state.Validation ? "block" : "none" }} role="status">
                                                        <span className="sr-only">Validating...</span>
                                                    </div>

                                                </div>
                                            </form>

                                        </div>
                                        <div className="signup-image">
                                            <figure><img src="images/signup/signup-image.jpg" alt="not file ot upload" /></figure>
                                            <a id="link-to-login" className="signup-image-link" href="/login">I am already member</a>
                                        </div>

                                    </div>
                                </div>
                            </section>
                        </div >
                    </div>
                </div>
            </div>
        )
    }
}

export default SignupPage ;

