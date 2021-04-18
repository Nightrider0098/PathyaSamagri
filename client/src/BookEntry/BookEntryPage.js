import React, { Component } from 'react'
import { authHeader } from '../_helpers/auth-header'
import { Modal, Button, Form } from 'react-bootstrap'
class BookEntryPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedFile: "",
            imagePreviewUrl: "",
            title: "",
            author: "",
            publisher: "",
            edition: "",
            for_year: "",
            subject: "",
            book_pr: "",
            route: ''
        }
        this.fileChangedHandler = this.fileChangedHandler.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.submit = this.submit.bind(this)
    }
    submit(e) {
        e.preventDefault()
        var fd = new FormData();
        fd.append('book_image', this.state.selectedFile, this.state.selectedFile.name);
        fd.append('title', this.state.title);
        fd.append('author', this.state.author);
        fd.append("publisher", this.state.publisher)
        fd.append("edition", this.state.edition)
        fd.append("for_year", this.state.for_year)
        fd.append("subject", this.state.subject)
        fd.append("book_pr", this.state.book_pr)
        fd.append("user_id", this.props.user.user_id)
        var options = {
            method: 'POST',
            headers: {
                ...authHeader(),

            },
            body: fd
        }
        fetch('/api/book_entry', options).then(ret => { return ret.json() }).then(ret => {
            if (ret['sucess'] !== undefined) { alert(ret['sucess']) }
            else { alert("Problem in uploading book details") }
        })
    }
    fileChangedHandler(event) {
        this.setState({
            selectedFile: event.target.files[0]
        })

        let reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(event.target.files[0])

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render() {
        let $imagePreview = (<div className="previewText image-container">Please select an Image for Preview</div>);
        if (this.state.imagePreviewUrl) {
            $imagePreview = (<div className="image-container" ><img name="book_image" src={this.state.imagePreviewUrl} alt="icon" style={{ width: "180px", height: "270px" }} /> </div>);
        }

        return (
            <Modal
                show={true}
                onHide={() => this.props.setShow(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Donate a Book
          </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="m-1">
                        <div className="row">
                            <div className="col-lg-6">

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" required="required" name="title" id="book_title" value={this.state.title} onChange={this.handleInputChange}
                                        placeholder="Book Title" />

                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control type="text" name="author" required="required" id="book-author" value={this.state.author} onChange={this.handleInputChange}
                                        placeholder="Writer of the book" />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Publisher</Form.Label>
                                    <Form.Control type="text" name="publisher" id="book-publisher" placeholder="Publisher" value={this.state.publisher} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Edition</Form.Label>
                                    <Form.Control type="number" name="edition" id="book-edition" max="15" min="1" value={this.state.edition} onChange={this.handleInputChange}
                                        placeholder="Edition" />
                                </Form.Group>

                            </div>
                            <div className="col-lg-6">
                                <input type="file" name="book_image" style={{ margin: "auto", marginBottom: "5px" }} onChange={this.fileChangedHandler} />
                                {$imagePreview}</div>

                        </div>
                        <div className="row">
                            {/* <div className='m-3'> */}
                            <div className="col-lg-6">
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control name="subject" required="required" list="subjects" id="book-subject" value={this.state.subject} onChange={this.handleInputChange}
                                        placeholder="Subject" />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="number" name="book_pr" id="book-pr" value={this.state.book_pr} onChange={this.handleInputChange}
                                        placeholder="Price in Rs" />
                                </Form.Group>
                            </div>
                            <div className="col-lg-6">

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>For year</Form.Label>
                                    <Form.Control type="text" name="for_year" list="year_list" id="book-ref-year" value={this.state.for_year} onChange={this.handleInputChange}
                                        placeholder="For year" />
                                </Form.Group>

                                <datalist id="year_list">
                                    <option value="First"></option>

                                    <option value="Second"></option>
                                    <option value="Third"></option>
                                    <option value="Forth"></option>
                                    <option value="Fifth"></option>
                                    <option value="Masters"></option>
                                    <option value="PHD"></option>
                                    <option value="All"></option>

                                </datalist>




                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" required={true} label="Accept terms and conditions" />
                                </Form.Group>
                                <Button variant="primary" onClick={this.submit} value="Donate" >
                                    Donate</Button>
                            </div>
                        </div>

                    </div>
                </Modal.Body>
            </Modal >
        )
    }
}


export default BookEntryPage;

