import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons"
import image from './signin-image1.jpg';
import { Modal, Button, Form, Spinner } from 'react-bootstrap'


export default function LoginPage(props) {
    const [username, setUsername] = useState('123@123');
    const [password, setPassword] = useState('123')
    const [loading, setLoading] = useState(0)

    const handleSubmit = () => {
        setLoading(1)
        var option = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "username": username, "password": password })
        }
        fetch('/api/authentication', option).then(ret => {
            setLoading(0)
            return ret.json()
        }).then(ret => {
            localStorage.setItem('authToken', ret.token)
            props.setShow(0)
            props.setLogged(true)
            console.log('done')
            props.setUser(ret)
            console.log('done') 
        }).catch(err => { alert("Login Fail"); console.log(err); })
    }

    return (
        <>
            <Modal show={true} onHide={() => props.setShow(0)} >

                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row p-5">
                        <div className="col-lg-6 " style={{ textAlign: 'center' }}><img src={image} /></div>
                        <div className=" offset-lg-1 col-lg-5 mt-3 ">
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" value={username} id='your_name' onChange={(e) => { setUsername(e.target.value) }} />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                </Form.Group>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Check me out" name='terms' />
                                </Form.Group>
                                <Button variant="warning" onClick={handleSubmit}>
                                    <strong>Submit</strong>
                                    {loading ?
                                        <Spinner animation="border" role="status" size='sm' style={{ margin: "0 0 0 6px  " }} /> : <></>
                                    }
                                </Button>

                            </Form>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary"><FontAwesomeIcon icon={faFacebook} size="lg" /> <FontAwesomeIcon icon={faGoogle} size="lg" />  Signup</Button>
                    <Button variant="primary" onClick={() => { props.setShow(2) }}>Signup</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
