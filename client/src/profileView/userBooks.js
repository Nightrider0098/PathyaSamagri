import React, { Component } from 'react'
import { bookActions } from "../_actions"
import { connect } from "react-redux"
class userBooks extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userBookList: [],
            userBookIndex: 0
        }
    }


    changeIndexHandler(ChangeIndexTo) {
        var newIndex = 0
        if (ChangeIndexTo < 0)
            newIndex = 0
        else {
            newIndex = ChangeIndexTo
        }
        this.props.dispatch(bookActions.getUserBooks("", newIndex, this.props.user.user_id));
        this.setState({ userBookList: this.props.books.userBooks })
    }


    navigator() {
        var pageIndexList = []
        if (this.props.books.userBookIndex < 1) {
            pageIndexList = [0, 1, 2]
        }
        else if (this.props.books.userBookIndex === 1)
            pageIndexList = [0, 1, 2]

        else if (this.props.books.userBookIndex === 2)
            pageIndexList = [1, 2, 3]
        else
            pageIndexList = [this.props.books.userBookIndex - 1, this.props.books.userBookIndex, this.props.books.userBookIndex + 1]

        return <nav aria-label="..." >

            <ul className="pagination justify-content-center pagination-lg" >
                <li className="page-item ">
                    <a href="/#" className={this.props.books.userBookIndex ? "page-link page-mover" : "page-link page-mover disabled"} onClick={() => this.changeIndexHandler(this.props.books.userBookIndex - 1)}> <i className="fas fa-arrow-circle-left fa-2x"></i></a>
                </li>
                <li className={this.props.books.userBookIndex === pageIndexList[0] ? "page-item active" : "page-item "}><a href="/#" className="page-link " style={{ height: '45px', lineHeight: 'inherit' }} onClick={() => this.changeIndexHandler(pageIndexList[0])} >{pageIndexList[0] + 1}{this.props.books.userBookIndex === pageIndexList[0] ? <span className="sr-only">(current)</span> : ""}</a></li>
                <li className={this.props.books.userBookIndex === pageIndexList[1] ? "page-item active" : "page-item "}><a href="/#" className="page-link" onClick={() => this.changeIndexHandler(pageIndexList[1])} style={{ height: '45px', lineHeight: 'inherit' }}>{pageIndexList[1] + 1}{this.props.books.userBookIndex === pageIndexList[1] ? <span className="sr-only">(current)</span> : ""} </a></li>
                <li className={this.props.books.userBookIndex === pageIndexList[2] ? "page-item active" : "page-item "}><a href="/#" className="page-link" style={{ height: '45px', lineHeight: 'inherit' }} onClick={() => this.changeIndexHandler(pageIndexList[2])}>{pageIndexList[2] + 1}{this.props.books.userBookIndex === pageIndexList[2] ? <span className="sr-only">(current)</span> : ""}</a></li>
                <li className="page-item">
                    <a href="/#" className="page-link page-mover" onClick={() => this.changeIndexHandler(this.props.books.userBookIndex + 1)}><i className="fas fa-arrow-circle-right fa-2x"></i></a>
                </li>
            </ul>
        </nav>
    }




    componentDidMount() {
        this.props.dispatch(bookActions.getUserBooks("", 0, this.props.user));
        this.setState({ userBookList: this.props.books.userBooks })

    }

    componentDidUpdate() {
        if (this.props.books.userBookFound && this.props.books.userBooks !== this.state.userBookList)
            this.setState({ userBookList: this.props.books.userBooks })

    }

    BookCardGenerator(Details) {

        console.log(Details['book_anom'], "this is about anom or not", Details['book_anom'] === 0, Details['book_anom'] === 0 ? ('images/books/' + Details['img_id']) : ('images/anom_user/' + Details['img_id']))
        var book_card =
            <div className="book-data shadow-box" key={Details['Book_id']} style={Details['available_now'] ? { opacity: 1, borderColor: 'white', display: 'flex', flexDirection: 'column', maxWidth: '300px', borderWidth: '1px', borderStyle: 'solid' } : { opacity: 1, borderColor: 'black', display: 'flex', flexDirection: 'column', maxWidth: '300px', borderWidth: '1px', borderStyle: 'solid' }} >
                <img style={{ margin: '0 auto 10px auto', maxWidth: '180px' }} src={this.props.route + "/images/books/" + Details['img_id'] } alt="file not uploaded" />
                <h3>{Details['Book_id']}</h3>
                <h4>${Details['title']}</h4>
                <h4 style={{ fontFamily: 'impact' }} >Price:- Rs   {Details['book_pr']}</h4>
                <h4>For:- {Details['for_year']}  Year</h4>

                <div className="card-footer">
                    <div className="container" style={{ maxWidth: '200px' }}>
                        <div className="interior">
                            <a className="btn a-link" href={'#open-modal' + Details['Book_id']}>more details</a>
                        </div>
                    </div>
                </div>

            </div>
        if (this.state.availableOnly) { if (Details['available_now']) { return book_card } else { return null } } else return book_card
    }

    BookModalGenerator(Details) {
        var book_modal =
            <div className="bg-wrapper" key={'modal_' + Details['Book_id']} id={'open-modal' + Details['Book_id']}>
                <div className="wrapper" >
                    <div className="close-holder">
                        <a href={"#close-book" + Details['Book_id']} title="Close" className="modal-close a-link"><i className="fas fa-times" title="close">close</i></a>
                        
                    </div>
                    <div className="data-flexbox">
                        <div className="img-wrapper">
                            <img style={{ maxWidth: "100%" }} src={"http://locahost:5400/" + Details['book_anom'] ? "images/anom_user/" + Details['img_id'] : "images/books/" + Details['img_id']} alt="never mine" />
                        </div>
                        <div className="text-data-container" >
                            <div className="book-chr-holder">
                                <h3 className="keys">Book Id</h3>
                                <h3 className="values">{Details['Book_id']}</h3>
                            </div>
                            <div className="book-chr-holder">
                                <h3 className="keys">Title</h3>
                                <h3 className="values">{Details['title']}</h3>
                            </div>
                            <div className="book-chr-holder">
                                <h3 className="keys">Author</h3>
                                <h3 className="values">{Details['author']}</h3>
                            </div>
                            <div className="book-chr-holder">
                                <h3 className="keys">Publisher</h3>
                                <h3 className="values">{Details['publisher']}</h3>
                            </div>
                            <div className="book-chr-holder">
                                <h3 className="keys">Subject</h3>
                                <h3 className="values">{Details['subject']}</h3>
                            </div>
                            <div className="book-chr-holder">
                                <h3 className="keys">For </h3>
                                <h3 className="values">{Details['for_year']} Year</h3>
                            </div>
                            <div className="book-chr-holder">
                                <h3 className="keys">Price</h3>
                                <h3 className="values">{Details['book_pr']}</h3>
                            </div>
                            <div className="book-chr-holder">
                                <h3 className="keys">Edition</h3>
                                <h3 className="values">{Details['edition']}</h3>
                            </div>
                            <div className="book-chr-holder">
                                <h3 className="keys">Donated on</h3>
                                <h3 className="values">{Details['donated_on']}</h3>
                            </div>
                            <div className="book-chr-holder">
                                <h3 className="keys">Available now</h3>
                                <h3 className="values">{Details['available_now'] ? "Yes" : "No"}</h3>
                            </div>
                            <div className='book-chr-holder'>
                                <div className="button-holder">

                                    <form className="btn-frm" action='/api/book_booked' method="GET">
                                        <label type="text" name="book_id" hidden value={Details['Book_id']} />
                                        <button type="button" onClick={() => this.bookingHandler(Details['Book_id'])} className="learn-more new-btn btn-1">
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
        return book_modal
    }

    BookCardDeckGenerator(book_list) {
        if (book_list === undefined || book_list === [] || book_list[0] === undefined) {
            return <div>No books Donated</div>
        }
        var BookCardDeck = [this.BookCardGenerator(book_list[0])]
        for (let i = 1; i < book_list.length; i++) {
            BookCardDeck.push(this.BookCardGenerator(book_list[i]))
        }
        return BookCardDeck
    }

    BookModalGroupGenerator(book_list) {
        if (book_list === undefined || book_list === [] || book_list[0] === undefined) {
            return <div></div>
        }
        var BookModalGroup = [this.BookModalGenerator(book_list[0])]
        for (let i = 1; i < book_list.length; i++) {
            BookModalGroup.push(this.BookModalGenerator(book_list[i]))
        }
        return BookModalGroup
    }

    render() {
        return (
            <div>
                <div className="card-deck m-3">{this.BookCardDeckGenerator(this.state.userBookList)}</div>
                {this.BookModalGroupGenerator(this.state.userBookList)}
                {this.navigator()}
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


const connectedUserBooks = connect(mapStateToProps)(userBooks);
export { connectedUserBooks as UserBooks };

