import React, { Component } from 'react'
import { connect } from 'react-redux';
// import './_advance/style.css'
import './_advance/doublesidebar.css'
import './_advance/imported_css.css'
import './_advance/main.css'
import './_advance/style.css'
import './_advance/util.css'
import { bookActions } from '../_actions'
class AdvanceTab extends Component {
    constructor(props) {
        super(props)

        this.state = {
            book_title: "",
            donation_from: "",
            available_now: "",
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
        frm.append('index',0);
        const { dispatch } = this.props
        dispatch(bookActions.getBooksAdvance(0, this.props.user.user_id, frm))

    }
    render() {
        return (
            <div className="collapse" id="collapseExample">
                <div className="main " style={{ padding: "20px", marginTop: "50px", backgroundColor: "#8083c9" }} >
                    <div className="sign-in" style={{ padding: "0px" }}>
                        <div className="container" style={{ padding: "0px" }}>
                            <div className="signin-content" style={{ paddingTop: "20px" }}>
                                <form id='frm-book-data' style={{ width: "90%" }}>


                                    <div className="indiv-data-holder ">
                                        <label className="container-label">
                                            <input type="checkbox" />
                                            <span className="checkmark"></span>
                                        </label>
                                        <p className="keys-text">Book Title like</p>
                                        <input className="text-input" name="book_title" value={this.state.book_title} onChange={this.handleInputChange} type='text' />
                                    </div>

                                    <div className="indiv-data-holder ">
                                        <label className="container-label">
                                            <input type="checkbox" />
                                            <span className="checkmark"></span>
                                        </label>
                                        <p className="keys-text">donation_from</p>
                                        <input className="text-input" name="donation_from" value={this.state.donation_from} onChange={this.handleInputChange} type='date' data-date-inline-picker="true" />
                                    </div>


                                    <div className="indiv-data-holder ">
                                        <label className="container-label">
                                            <input type="checkbox" />
                                            <span className="checkmark"></span>
                                        </label>
                                        <p className="keys-text">Availibility</p>
                                        <input className="text-input" value={this.state.available_now} onChange={this.handleInputChange} name="available_now" list="Availibility_option" />
                                        <datalist id="Availibility_option" >
                                            <option value="availible" defaultValue />
                                            <option value="not availible" />
                                            <option value="Both" />
                                        </datalist>
                                    </div>



                                    <div className="indiv-data-holder ">
                                        <label className="container-label">
                                            <input type="checkbox" />
                                            <span className="checkmark"></span>
                                        </label>
                                        <p className="keys-text">owner_id</p>
                                        <input className="text-input" value={this.state.owner} onChange={this.handleInputChange} name="owner" type='text' />
                                    </div>

                                    <div className="indiv-data-holder ">
                                        <label className="container-label">
                                            <input type="checkbox" />
                                            <span className="checkmark"></span>
                                        </label>
                                        <p className="keys-text">subject</p>
                                        <input name="subject" className="text-input" value={this.state.subject} onChange={this.handleInputChange} list="subjects" size="5" />
                                        <datalist id="subjects">

                                        </datalist>
                                    </div>


                                    <div className="indiv-data-holder ">
                                        <label className="container-label">
                                            <input type="checkbox" />
                                            <span className="checkmark"></span>
                                        </label>
                                        <p className="keys-text">Lower Limit</p>
                                        <input type="input" name="lower" value={this.state.lower} tabIndex="0" onChange={this.handleInputChange} max="100" min="0" step="1" />
                                    </div>


                                    <div className="indiv-data-holder ">
                                        <label className="container-label">
                                            <input type="checkbox" />
                                            <span className="checkmark"></span>
                                        </label>
                                        <p className="keys-text">Upper Limit</p>
                                        <input type="input" name="upper" value={this.state.upper} tabIndex="0" onChange={this.handleInputChange} max="100" min="0" step="1" />
                                    </div>



                                    <div className="indiv-data-holder ">
                                        <label className="container-label">
                                            <input type="checkbox" />
                                            <span className="checkmark"></span>
                                        </label>
                                        <p className="keys-text" value={this.state.publisher} style={{ width: '228px', marginLeft: '25px' }}>Publisher</p>
                                        <input className="text-input" style={{ width: '50%', marginLeft: '130px' }} onChange={this.handleInputChange} name="publisher" type='text' />
                                    </div>

                                    <div style={{ width: '100%' }}>
                                        <button className="btn btn-outline-dark btn-lg btn-radius advbtn" type="button" onClick={this.submit}
                                            style={{ margin: '45px calc(50% - 69px)' }} id="search-book">Find Book</button>
                                    </div>
                                </form>
                            </div>
                        </div>


                    </div>
                </div >
            </div>
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
