import React, { Component } from 'react'

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bookHintList: []
        }
        this.bookHintHandler = this.bookHintHandler.bind(this)
    }

    bookHintHandler(bName) {
        fetch( '/api/bookHint?title=' + bName).then(ret => { return ret.json() }).then(ret => {

            this.setState({ bookHintList: ret['data'] })
        })
    }
    render() {
        return (
            <section className="search_bar p-5 m-5 " >
                <div>
                    <div className="choices__inner">
                        <div className="input-search-div" >
                            <input style={{ margin: 'auto' }} type="text" name="title" id="search-book-title" list="data" className="searchTerm" value={this.props.bookName} onChange={(e) => { this.bookHintHandler(e.target.value); this.props.bookNameHandler(e.target.value); }} autoComplete="off" placeholder="Type your Book name here?" />
                            <a style={{ marginLeft: ' 10px' }} onClick={() => { this.props.indexhandler(0); }} href="/#" >
                                <i id="book_search-button" className="fab fa-searchengin fa-2x"></i></a>
                            <datalist id="data">
                                {
                                    this.state.bookHintList.map((item, key) =>
                                        <option key={key} value={item} />
                                    )}
                            </datalist>
                        </div>

                        <button type="button" className="btn btn-outline-dark btn-lg btn-radius advbtn" id="advance-button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"
                            style={{ margin: 'auto' }} >advance search</button>
                        <button type="button" onClick={this.props.availibilityHandler} className="btn btn-outline-dark btn-lg btn-radius advbtn" id="advance-button"
                            style={{ margin: 'auto' }} >Only Available</button>
                    </div>
                </div>
            </section >

        )
    }
}

export default SearchBar
