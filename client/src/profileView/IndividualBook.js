import React, { useEffect, useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
export default function IndividualBook(props) {
    const [show, setShow] = useState(false)
    const handleShow = () => { setShow(!show); }
    const handleClose = () => { setShow(false); }
    const Details = props.Details
    return (
        <>
            <Card style={{ width: '18rem', margin: "5px" }} className={Details['available_now'] ? '' : 'border border-warning'} key={Details['Book_id']} >
                <Card.Img variant="top" src={props.route + "/images/books/" + Details['img_id']} />
                <Card.Body >
                    <Card.Title>{Details['title']}</Card.Title>
                    <Card.Text>
                        {Details['author']}For:- {Details['for_year']}  Year</Card.Text>
                    <Button variant="warning" onClick={handleShow} data-toggle="modal" data-target={'#open-modal' + Details['Book_id']} ><strong>Details</strong></Button>
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
                                <img style={{ maxWidth: "100%" }} src={"http://locahost:5400/" + Details['book_anom'] ? "images/anom_user/" + Details['img_id'] : "images/books/" + Details['img_id']} alt="never mine" />
                            </div>
                        </div>
                        <div className="col-6"><div className="m-2">
                            <table>
                                <tbody>
                                    <tr>
                                        <td><strong>Title</strong></td>
                                        <td>{Details['title']}</td>
                                    </tr>

                                    <tr>
                                        <td><strong>Subject</strong></td>
                                        <td>{Details['subject']}</td>
                                    </tr>


                                    <tr>
                                        <td><strong>Author</strong></td>
                                        <td>{Details['author']}</td>
                                    </tr>


                                    <tr>
                                        <td><strong>Publisher</strong></td>
                                        <td>{Details['publisher']}</td>
                                    </tr>


                                    <tr>
                                        <td><strong>Edition</strong></td>
                                        <td>{Details['edition']}</td>
                                    </tr>
                                    <tr>
                                        <td className="keys">Price</td>
                                        <td className="values">{Details['book_pr']}</td>
                                    </tr>
                                    <tr>
                                        <td className="keys">Donated on</td>
                                        <td className="values">{Details['donated_on']}</td>
                                    </tr>
                                    <tr>
                                        <td className="keys">Donated on</td>
                                        <td className="values">{Details['donated_on']}</td>
                                    </tr>

                                    <tr>
                                        <td><strong>Available</strong></td>
                                        <td>{Details['available_now'] ? "Yes" : "No"}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div></div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Save for later</Button>
                    <Button variant="warning" type="button" onClick={() => this.bookingHandler(Details['Book_id'])}  ><strong>Get the book</strong></Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}
