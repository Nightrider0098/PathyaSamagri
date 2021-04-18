import React, { Component } from 'react'
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch
} from "@fortawesome/free-solid-svg-icons";
class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bookHintList: []
        }
        this.bookHintHandler = this.bookHintHandler.bind(this)
    }
    bookHintHandler(bName) {
        fetch('/api/bookHint?title=' + bName).then(ret => { return ret.json() }).then(ret => {
            this.setState({ bookHintList: ret['data'] })
        })
    }


    render() {
        return (
            <div className="mt-5">
                <div className="row" >
                    <div className="col-lg-6 offset-lg-2 ">
                        {/* <input style={{ margin: 'auto' }} type="text" name="title" id="search-book-title" list="data" className="searchTerm" value={this.props.bookName} onChange={(e) => { this.bookHintHandler(e.target.value); this.props.bookNameHandler(e.target.value); }} autoComplete="off" placeholder="Type your Book name here?" /> */}

                        <InputGroup className="m-1">
                            <FormControl
                                placeholder="Book title"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                list="data"
                                value={this.props.bookName}
                                onChange={(e) => { this.bookHintHandler(e.target.value); this.props.bookNameHandler(e.target.value); }}
                                autoComplete="off"
                            />
                            <datalist id="data">
                                {
                                    this.state.bookHintList.map((item, key) =>
                                        <option key={key} value={item} />
                                    )}
                            </datalist>
                            <InputGroup.Append  >
                                <Button style={{
                                    color: "#212529",
                                    backgroundColor: "#ffc107",
                                    borderColor: "#ffc107",
                                }} variant="outline-secondary" onClick={() => { this.props.indexhandler(0); }}>
                                    <FontAwesomeIcon icon={faSearch} size="lg"
                                        style={{
                                            color: "#212529",
                                            backgroundColor: "#ffc107",
                                            borderColor: "#ffc107",
                                        }} />
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>

                    </div>
                    <div className="col-lg-4 ">
                        <div className="m-lg-2" style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button id="advance-button" className="mr-1" variant="warning" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"
                                onClick={() => { this.props.setAdvanceTab(!this.props.advanceTab) }} ><strong>Advance search</strong></Button>

                            <Button id="advance-button" variant="warning" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"
                                onClick={this.props.availibilityHandler}  ><strong>Only Available</strong></Button>
                        </div>
                    </div>

                </div >
            </div>

        )
    }
}

export default SearchBar
