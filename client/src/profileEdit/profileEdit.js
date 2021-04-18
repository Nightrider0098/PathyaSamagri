import React, { Component, useState } from 'react'
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { Form, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
export default withRouter(function ProfileEdit(props) {

    const [selectedFile, setSelectedFile] = useState(null)
    const [imagePreviewUrl, setimagePreviewUrl] = useState(props.route + "images/user/" + props.user.prof_img_id)
    const [address, setAddress] = useState(props.user.address)
    const [phone_no, setPhoneNo] = useState(props.user.phone_no)
    const [user_id, setUserId] = useState(props.user.user_id)
    const [username, setUsername] = useState(props.user.username)

    const submit = (e) => {
        e.preventDefault()
        var fd = new FormData();
        if (imagePreviewUrl !== null) { fd.append('file', selectedFile); }
        fd.append('user_id', props.user.user_id);
        fd.append('address', address);
        fd.append("phone_no", phone_no)
        const { history } = props
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState === 4 & this.status === 200) {
                alert('Saved!');
                userActions.Refresh()
                props.history.push('/profile')

            }
        };
        request.open("POST", "/api/update_user/", true);
        request.send(fd);
    }


    const fileChangedHandler = (event) => {
        setSelectedFile(event.target.files[0])

        let reader = new FileReader();

        reader.onloadend = () => {
            setimagePreviewUrl(reader.result)
        }

        reader.readAsDataURL(event.target.files[0])

    }
    return (
        <div className="mt-5 mb-5">

            <div className="p-5 rounded bg-light " style={{ maxWidth: '750px', margin: 'auto' }}>
                <h2 style={{ textAlign: 'center' }}><strong>Edit your Profile</strong></h2>
                <div className="mt-5">
                    <div className="row">
                        <div className="col-lg-6">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Profie Image</Form.Label>
                                <Form.Control type="file" name="book_image" onChange={fileChangedHandler} />
                                {(imagePreviewUrl.length == 0) ? <div className="previewText image-container">Please select an Image for Preview</div> :
                                    <div className="image-container" ><img name="book" src={imagePreviewUrl} alt="icon" style={{ width: "250px", height: "auto" }} /> </div>}

                            </Form.Group>

                        </div>
                        <div className="col-lg-6">

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Address</Form.Label>
                                <Form.Control name="address" onChange={e => setAddress(e.target.value)} type="text" value={address} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Phone no.</Form.Label>
                                <Form.Control name="phone_no" onChange={e => setPhoneNo(e.target.value)} type="text" value={phone_no} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Username</Form.Label>
                                <Form.Control name="username" readOnly type="text" value={username} />
                            </Form.Group>



                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>ID</Form.Label>
                                <Form.Control name="user_id" readOnly type="text" value={user_id} />
                            </Form.Group>



                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={submit}>Save</Button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
})