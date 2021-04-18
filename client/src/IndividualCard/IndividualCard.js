import React, { useState } from 'react'
import { Card, Button, Modal } from 'react-bootstrap'
import { authHeader } from '../_helpers/auth-header'
export default function IndividualCard(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const bookingHandler = (book_id) => {
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        }
        fetch("/api/issueBook?" + encodeURI("book_id") + "=" + encodeURI(book_id), requestOptions).then(ret => { return ret.json() }).then(ret => {
            if (ret['alert'] === undefined) {
                alert(ret['sucess'])
            }
            else {
                alert(ret['alert'])
            }
        }).catch(err => { alert("error  while sending the request", err) })
    }

    return (<>{(props.bookDetails !== undefined) ? (
        <>
            <Card style={{ width: '18rem', margin: "5px" }}>
                <Card.Img variant="top" src={"/images/books/" + props.bookDetails['img_id']} />
                <Card.Body >
                    <Card.Title>{props.bookDetails['title']}</Card.Title>
                    <Card.Text>
                        {props.bookDetails['author']}
                    </Card.Text>
                    <Button variant="warning" onClick={handleShow} data-toggle="modal" data-target={"#" + props.bookDetails['book_id']} ><strong>Details</strong></Button>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Book Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-6">
                            <div className="m-2">
                                <img style={{ maxWidth: "100%" }} src={"/images/books/" + props.bookDetails['img_id']} alt="never mine" />
                            </div>
                        </div>
                        <div className="col-6"><div className="m-2">
                            <table>
                                <tbody>
                                    <tr>
                                        <td><strong>Title</strong></td>
                                        <td>{props.bookDetails['title']}</td>
                                    </tr>

                                    <tr>
                                        <td><strong>Subject</strong></td>
                                        <td>{props.bookDetails['subject']}</td>
                                    </tr>


                                    <tr>
                                        <td><strong>Author</strong></td>
                                        <td>{props.bookDetails['author']}</td>
                                    </tr>


                                    <tr>
                                        <td><strong>Publisher</strong></td>
                                        <td>{props.bookDetails['publisher']}</td>
                                    </tr>


                                    <tr>
                                        <td><strong>Edition</strong></td>
                                        <td>{props.bookDetails['edition']}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Available</strong></td>
                                        <td>{props.bookDetails['available_now'] ? "Yes" : "No"}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div></div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Save for later
      </Button>
                    <Button variant="warning" onClick={() => props.bookingHandler(props.bookDetails['book_id'])} >
                        <strong>Get the book</strong>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>) : (<div style={{ 'display': 'none' }} ></div>)}</>)
}

