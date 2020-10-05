import React, { Component } from 'react'
import { connect } from 'react-redux';
import { userActions} from '../_actions';
class ProfileEdit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedFile: null,
            imagePreviewUrl: this.props.route + "/images/user/" + this.props.user.prof_img_id,
            address: this.props.user.address,
            phone_no: this.props.user.phone_no,
            user_id: this.props.user.user_id,
            username: this.props.user.username
        }

        this.fileChangedHandler = this.fileChangedHandler.bind(this)
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
    submit(e) {
        e.preventDefault()
        var fd = new FormData();
        if (this.state.imagePreviewUrl !== null) { fd.append('file', this.state.selectedFile); }
        fd.append('user_id', this.props.user.user_id);
        fd.append('address', this.state.address);
        fd.append("phone_no", this.state.phone_no)
        const { history } = this.props
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState === 4 & this.status === 200) {
                alert('Saved!');
                userActions.Refresh()
                history.push('/profile')

            }
        };
        request.open("POST", "/api/update_user/", true);
        request.send(fd);
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

    render() {
        let $imagePreview = (<div className="previewText image-container">Please select an Image for Preview</div>);
        if (this.state.imagePreviewUrl) {
            
            $imagePreview = (<div className="image-container" ><img name="book" src={this.state.imagePreviewUrl} alt="icon" style={{ width: "250px", height: "auto" }} /> </div>);
        }
        return (
            <div className="container">

                <div className="signin-content" style={{ width: "60%", margin: "auto " }}>
                    <h2 className="form-title" style={{ textAlign: "center" }}>Edit Profile</h2>

                    <form className="register-form" id="login-form" onSubmit={this.submit} enctype="multipart/form-data">

                        <div className="signin-image" style={{ margin: "auto", maxWidth: "350px" }}>
                            <input type="file" name="book_image" style={{ margin: "auto", marginBottom: "5px" }} onChange={this.fileChangedHandler} />
                            {$imagePreview}
                        </div>

                        <div className="signin-form" style={{ width: "60%" }}>


                            <div className="form-group">
                                <p>address</p><input name="address" onChange={this.handleInputChange} type="text" value={this.state.address} />

                            </div>

                            <div className="form-group">
                                <label for="author"><i className="zmdi zmdi-lock"></i></label>
                                <p>phone</p><input name="phone_no" onChange={this.handleInputChange} type="text" value={this.state.phone_no} />
                            </div>


                            <div className="form-group">
                                <label for="Publisher"><i className="zmdi zmdi-lock"></i></label>
                                <p>username</p><input name="username" readOnly type="text" value={this.state.username} />
                            </div>

                            <div className="form-group">
                                <label for="edition"><i className="zmdi zmdi-lock"></i></label>
                                <p>user id</p><input name="user_id" readOnly type="text" value={this.state.user_id} />
                            </div>

                            <div className="form-group form-button">
                                <button type="submit" className="btn btn-outline-dark btn-lg btn-radius advbtn" style={{ margin: "auto", display: "block", marginTop: "30px", marginLeft: "38px" }} >Save</button>
                            </div>

                        </div>

                    </form>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state.authentication;
    return {
        user
    };
}

const connectedProfileEdit = connect(mapStateToProps)(ProfileEdit);
export { connectedProfileEdit as ProfileEdit };

