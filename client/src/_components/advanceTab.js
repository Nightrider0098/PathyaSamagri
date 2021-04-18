import React, { Component } from 'react'
import { connect } from 'react-redux';
// import { DoubleRangeSlider } from '../_components/_advance/doubleSlider'
import { Form, Button, Row, Col } from 'react-bootstrap'

import { bookActions } from '../_actions'
class AdvanceTab extends Component {
    constructor(props) {
        super(props)

        this.state = {
            book_title: "",
            donation_from: "",
            available_now: "availible",
            owner: "",
            subject: "",
            lower: '1',
            upper: '12',
            publisher: ""


        }
        this.submit = this.submit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    // 

    submit(e) {
        console.log(this.props)
        e.preventDefault()

        let frm = new FormData();
        frm.append("book_title", this.state.book_title);
        frm.append("donation_from", this.state.donation_from);
        frm.append('available_now', this.state.available_now);
        frm.append('owner', this.state.owner);
        frm.append('subject', this.state.subject);
        frm.append('lower', this.state.lower);
        frm.append('upper', this.state.upper);
        frm.append('publisher', this.state.publisher);
        frm.append('index', 0);
        const { dispatch } = this.props
        dispatch(bookActions.getBooksAdvance(0, "", this.state))

    }
    componentDidUpdate() {
        console.log(this.state)
    }
    render() {
        return (
            <>
                <div className="p-5 m-5 rounded" style={{
                    backgroundColor: "white", display: this.props.advanceTab ? "none" : "block"
                }} >
                    <h4 className="mb-3" style={{ textAlign: "center" }}>Advance Search</h4>
                    <Form>
                        < Form.Group as={Row} controlId="formBasicEmail">
                            <Form.Label column sm="2" >Title</Form.Label>
                            <Col sm="10">
                                <Form.Control name="book_title" type="text" placeholder="Name of the book like." value={this.state.book_title} onChange={this.handleInputChange} />
                            </Col>
                        </Form.Group>

                        < Form.Group as={Row} controlId="formBasicEmail">
                            <Form.Label column sm="2" >Donation From</Form.Label>
                            <Col sm="10">
                                <Form.Control type="date" value={this.state.donation_from} onChange={this.handleInputChange} name="donation_from" placeholder="Book donated after." />
                            </Col>
                        </Form.Group>


                        < Form.Group as={Row} controlId="formBasicEmail">
                            <Form.Label column sm="2" >Availibility</Form.Label>
                            <Col sm="10">
                                <Form.Control as="select" value={this.state.available_now} onChange={this.handleInputChange} name="available_now" >
                                    <option value="availible">availible</option>
                                    <option value="not availible">not availible</option>
                                    <option value="Both">Both</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>



                        < Form.Group as={Row} controlId="formBasicEmail">
                            <Form.Label column sm="2" >Subject</Form.Label>
                            <Col sm="10">
                                <input name="subject" autocomplete="off" className="form-control" value={this.state.subject} onChange={this.handleInputChange} list="subjects" size="5" />
                                <datalist id="subjects">
                                    <option value="Computer"></option>
                                    <option value="Electrical"></option>
                                    <option value="Electronics"></option>
                                    <option value="Mechanical"></option>
                                    <option value="Civil"></option>

                                </datalist>
                            </Col>
                        </Form.Group>


                        {/* <DoubleRangeSlider ></DoubleRangeSlider> */}


                        < Form.Group as={Row} controlId="formBasicEmail">
                            <Form.Label column sm="2" >Owner Id</Form.Label>
                            <Col sm="10">
                                <Form.Control name="owner" type="text" value={this.state.owner} onChange={this.handleInputChange} >
                                </Form.Control>
                            </Col>
                        </Form.Group>


                        < Form.Group as={Row} controlId="formBasicEmail">
                            <Form.Label column sm="2" >Publisher</Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" name="publisher" value={this.state.publisher} onChange={this.handleInputChange} >
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <div style={{ textAlign: 'center' }}>
                            <Button variant="warning" type="submit" onClick={this.submit}>Find Book</Button>
                        </div>
                    </Form>
                </div >


            </>
        )
    }
}



function mapStateToProps(state) {
    const { authentication, books } = state;
    const { user } = authentication;
    return {
        user,
        books
    };
}

const connectedAdvanceTab = connect(mapStateToProps)(AdvanceTab);
export { connectedAdvanceTab as AdvanceTab };
