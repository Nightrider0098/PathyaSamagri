import React, { Component } from 'react'
import { authHeader } from '../_helpers/auth-header'

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
route:''
        }
        this.fileChangedHandler = this.fileChangedHandler.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.submit = this.submit.bind(this)
    }
    submit(e) {
        e.preventDefault()
        var fd = new FormData();
        // if (this.state.imagePreviewUrl !== null) 
        fd.append('book_image', this.state.selectedFile, this.state.selectedFile.name);
        fd.append('title', this.state.title);
        fd.append('author', this.state.author);
        fd.append("publisher", this.state.publisher)
        fd.append("edition", this.state.edition)
        fd.append("for_year", this.state.for_year)
        fd.append("subject", this.state.subject)
        fd.append("book_pr", this.state.book_pr)
        fd.append("user_id", "")
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
            <div className="modal fade" id="bookEntryModal" tabindex="-1" role="dialog" aria-labelledby="bookEntryModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="bookEntryModalLabel">Insert New Book</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" id="loginFormClose" >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <div className="container">
                                <div className="signin-content" style={{ display: "inline-block", width: "100%" }}>
                                    <h2 className="form-title" style={{ textAlign: "center" }}>Book Entry</h2>
                                    <form className="register-form" id="login-form" >
                                        <div className="signin-image" style={{ margin: "auto", maxWidth: "250px" }}>
                                            <figure>
                                                <input type="file" name="book_image" style={{ margin: "auto", marginBottom: "5px" }} onChange={this.fileChangedHandler} />
                                                {$imagePreview}
                                            </figure>
                                        </div>
                                        <div className="signin-form">
                                            <div className="form-group">
                                                <label for="book_title"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                                <input type="text" required="required" name="title" id="book_title" value={this.state.title} onChange={this.handleInputChange}
                                                    placeholder="Book Title" />
                                            </div>
                                            <div className="form-group">
                                                <label for="author"><i className="zmdi zmdi-lock"></i></label>
                                                <input type="text" name="author" required="required" id="book-author" value={this.state.author} onChange={this.handleInputChange}
                                                    placeholder="Author" />
                                            </div>

                                            <div className="form-group">
                                                <label for="Publisher"><i className="zmdi zmdi-lock"></i></label>
                                                <input type="text" name="publisher" id="book-publisher" placeholder="Publisher" value={this.state.publisher} onChange={this.handleInputChange} />
                                            </div>

                                            <div className="form-group">
                                                <label for="edition"><i className="zmdi zmdi-lock"></i></label>
                                                <input type="number" name="edition" id="book-edition" max="15" min="1" value={this.state.edition} onChange={this.handleInputChange}
                                                    placeholder="Edition" />
                                            </div>

                                            <div className="form-group">
                                                <label for="year"><i className="zmdi zmdi-lock"></i></label>
                                                <input type="text" name="for_year" list="year_list" id="book-ref-year" value={this.state.for_year} onChange={this.handleInputChange}
                                                    placeholder="For year" />
                                            </div>
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
                                            <div className="form-group">
                                                <label for="subject"><i className="zmdi zmdi-lock"></i></label>
                                                <input name="subject" required="required" list="subjects" id="book-subject" value={this.state.subject} onChange={this.handleInputChange}
                                                    placeholder="Subject" />


                                                <datalist id="subjects">
                                                    \ </datalist>


                                            </div>
                                            <div className="form-group">
                                                <label for="book_pr"><i className="zmdi zmdi-lock"></i></label>
                                                <input type="number" name="book_pr" id="book-pr" value={this.state.book_pr} onChange={this.handleInputChange}
                                                    placeholder="Price in Rs" />
                                            </div>
                                            <div className="form-group form-button">
                                                <button type="submit" name="signin" id="upload" className="form-submit" onClick={this.submit}
                                                    value="Donate">Donate</button>
                                            </div>



                                        </div>
                                    </form>

                                </div>
                            </div >


                        </div></div></div>

            </div>
        )
    }
}


export default BookEntryPage;

