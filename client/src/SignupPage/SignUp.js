import React, { Component } from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons"
import image from '../LoginPage/signin-image1.jpg';
import './modal.css'
import { Modal, Button, Form, Spinner } from 'react-bootstrap'
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
        this.setState({ newUserName: value.target.value })
    }

    newEmailHandler(value) {
        this.setState({ newEmail: value.target.value })
    }
    newPasswordHandler(value) {
        this.setState({ newPassword: value.target.value })
    }
    newRePassHandler(value) {
        this.setState({ newRePass: value.target.value })
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
            fetch('/api/Signup', option).then(ret => { return ret.json() }).then(ret => {
                if (ret['sucess'] !== undefined) {
                    alert('registered')
                    this.setState({
                        newEmail: '',
                        newPassword: '',
                        newRePass: "",
                        newUserName: "",
                        TermsAgreed: "",

                        Validation: false,
                    })
                    this.props.setShow(0);
                }
                else {
                    alert(ret['alert'])
                }

            })
        }

    }

    render() {


        return (
            <>
                <Modal show={true} onHide={() => { this.props.setShow(0) }} >

                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="row p-5" >
                            <div className="col-lg-6 " style={{ textAlign: 'center' }}><img src={image} /></div>
                            <div className=" offset-lg-1 col-lg-5 mt-3 ">
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" value={this.state.newEmail} id='your_name' onChange={this.newEmailHandler} />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>UserName</Form.Label>
                                        <Form.Control type="text" placeholder="It will be visible to all" name="username" value={this.state.newUserName} onChange={this.newUserNameHandler} />
                                    </Form.Group>


                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" name="password" value={this.state.newPassword} onChange={this.newPasswordHandler} />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type="password" placeholder="Confirm password" value={this.state.newRePass} onChange={this.newRePassHandler} />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Accept Terms and Conditions" value={this.state.TermsAgreed} onChange={this.TermsHandler} />
                                    </Form.Group>
                                    <Button variant="warning" type="submit" onClick={this.formSubmitHandler}>
                                        <strong>Submit</strong>
                                        {this.state.Logging ?
                                            <Spinner animation="border" role="status" size='sm' style={{ margin: "0 0 0 6px  " }} /> : <></>
                                        }
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary"><FontAwesomeIcon icon={faFacebook} size="lg" /> <FontAwesomeIcon icon={faGoogle} size="lg" />  Signup/Login</Button>
                        <Button variant="primary" onClick={() => { this.props.setShow(1) }}>Login</Button>
                    </Modal.Footer>

                </Modal>

            </>
        )
    }
}

export default SignupPage;

