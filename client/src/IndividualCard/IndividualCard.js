import React, { Component } from 'react'

class IndividualCard extends Component {
    render() {
        if (this.props.bookDetails !== undefined)
            return (
                <div className="book-data shadow-box" key={this.props.bookDetails['book_id']} style={{ opacity: 1, display: 'flex', margin: " 20px auto", flexDirection: 'column', maxWidth: '300px', borderWidth: '1px', borderStyle: 'solid', borderColor: this.props.bookDetails['available_now'] ? 'white' : 'black' }} >
                    <img style={{ margin: '0 auto 10px auto', maxWidth: '180px' }} src={"/images/books/" + this.props.bookDetails['img_id']} alt='File dont exits' />
                    <h3>{this.props.bookDetails['book_id']}</h3>
                    <h4>{this.props.bookDetails['title']}</h4>
                    <h4 style={{ fontFamily: 'impact' }} >Price:- Rs   {this.props.bookDetails['book_pr']}</h4>
                    <h4>For:- {this.props.bookDetails['for_year']}  Year</h4>

                    <div className="card-footer">
                        <div className="container" style={{ maxWidth: '200px' }}>
                            <div className="interior">
                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#" + this.props.bookDetails['book_id']}>
                                    Expand</button>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id={this.props.bookDetails['book_id']} tabIndex="-1" role="dialog" aria-labelledby={"1" + this.props.bookDetails['book_id']} aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id={"0" + this.props.bookDetails['book_id']}>Modal title</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="data-flexbox">
                                    <div className="img-wrapper">
                                        <img style={{ maxWidth: "100%" }} src={"/images/books/" + this.props.bookDetails['img_id']} alt="never mine" />
                                    </div>
                                    <div className="text-data-container" >
                                        <div className="book-chr-holder">
                                            <h3 className="keys">Book Id</h3>
                                            <h3 className="values">{this.props.bookDetails['book_id']}</h3>
                                        </div>
                                        <div className="book-chr-holder">
                                            <h3 className="keys">Title</h3>
                                            <h3 className="values">{this.props.bookDetails['title']}</h3>
                                        </div>
                                        <div className="book-chr-holder">
                                            <h3 className="keys">Author</h3>
                                            <h3 className="values">{this.props.bookDetails['author']}</h3>
                                        </div>
                                        <div className="book-chr-holder">
                                            <h3 className="keys">Publisher</h3>
                                            <h3 className="values">{this.props.bookDetails['publisher']}</h3>
                                        </div>
                                        <div className="book-chr-holder">
                                            <h3 className="keys">Subject</h3>
                                            <h3 className="values">{this.props.bookDetails['subject']}</h3>
                                        </div>
                                        <div className="book-chr-holder">
                                            <h3 className="keys">For </h3>
                                            <h3 className="values">{this.props.bookDetails['for_year']} Year</h3>
                                        </div>
                                        <div className="book-chr-holder">
                                            <h3 className="keys">Price</h3>
                                            <h3 className="values">{this.props.bookDetails['book_pr']}</h3>
                                        </div>
                                        <div className="book-chr-holder">
                                            <h3 className="keys">Edition</h3>
                                            <h3 className="values">{this.props.bookDetails['edition']}</h3>
                                        </div>
                                        <div className="book-chr-holder">
                                            <h3 className="keys">Donated on</h3>
                                            <h3 className="values">{this.props.bookDetails['donated_on']}</h3>
                                        </div>
                                        <div className="book-chr-holder">
                                            <h3 className="keys">Available now</h3>
                                            <h3 className="values">{this.props.bookDetails['available_now'] ? "Yes" : "No"}</h3>
                                        </div>
                                        <div className='book-chr-holder'>
                                            <div className="button-holder">

                                                <form className="btn-frm" action='/api/book_booked' method="GET">
                                                    <label type="text" name="book_id" hidden value={this.props.bookDetails['book_id']} />
                                                    <button type="button" onClick={() => this.props.bookingHandler(this.props.bookDetails['book_id'])} className="learn-more new-btn btn-1">
                                                        <span className="circle" aria-hidden="true">
                                                            <span className="icon arrow">
                                                            </span>
                                                        </span>
                                                        <span className="button-text">Confirm</span>
                                                    </button>
                                                </form>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >)
        else {
            return <div style={{ 'display': 'none' }}></div>
        }
    }
}

export default IndividualCard
