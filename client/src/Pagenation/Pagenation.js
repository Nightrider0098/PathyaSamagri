import React, { Component } from 'react'
import ReactPaginate from 'react-paginate';
import './pagenation.css'
window.React = React;
export default class Paginations extends Component {
    constructor(props) {
        super(props)
        this.handlePageClick = this.handlePageClick.bind(this)
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        selected = Math.ceil(selected);
        this.props.indexHandler(selected);
        

    };


    render() {
        return (
            <div id="react-paginate">
                <ReactPaginate
                    previousLabel={'< Previous'}
                    nextLabel={'Next >'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={this.props.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                /></div>
        );
    }
}

