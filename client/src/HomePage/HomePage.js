import React from 'react';
import { AdvanceTab } from '../_components/advanceTab';
import { authHeader } from '../_helpers/auth-header'
import Paginations from '../Pagenation/Pagenation'
import SearchBar from '../SearchBar/SearchBar';
import CardHolder from '../CardHolder/CardHolder';
import Header from "../_components/header"
import BookEntryPage from '../BookEntry/BookEntryPage';
class HomePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            bookList: [],
            searchBookHint: [],
            isAnom: 0,
            availableOnly: 0,
            loading: 0,
            index: 0,
            bookName: '',
            pageCount: 5,
            isLogged: 0,
            advanceTab: false

        }

        this.fetchBook = this.fetchBook.bind(this)
        this.indexHandler = this.indexHandler.bind(this)
        this.bookNameHandler = this.bookNameHandler.bind(this)
        this.availibilityHandler = this.availibilityHandler.bind(this)
        this.isLogged = this.isLogged.bind(this)

    }

    componentDidMount() {
        this.fetchBook();
        this.isLogged();
    }

    fetchBook() {
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        }
        let params = {
            "title": this.state.bookName,
            "user_Id": this.props.userId,
            "limit": this.state.index * 12,
            "availible": this.state.availableOnly
        };
        let query = Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');
        let url = '/api/book?' + query

        return fetch(url, requestOptions).then(ret => { return ret.json() }).then(ret => {
            this.setState({ bookList: ret['data'] })
        }).catch(err => { alert(err) })
    }

    isLogged() {
        var options = {
            method: 'GET',
            headers: authHeader()
        }
        fetch('/api/isLogged', options).then(ret => { return ret.json() }).then(ret => {
            if (ret['isLogged']) {
                this.setState({ isLogged: ret['isLogged'] })
            }
            else {
                this.setState({ isLogged: false })
            }
        }).catch(err => { alert(err) })

    }

    indexHandler(value) {
        this.setState({ index: value }, () => { this.fetchBook() })

    }
    bookNameHandler(value) {
        this.setState({ bookName: value })
    }
    availibilityHandler() {
        if (this.state.availableOnly === 0)
            this.setState({ availableOnly: 1 })
        else if (this.state.availableOnly === 1)
            this.setState({ availableOnly: 2 })
        else
            this.setState({ availableOnly: 1 })
    }

    render() {

        return (
            <div style={{ minHeight: '429px' }} >
                <SearchBar advanceTab={this.state.advanceTab} setAdvanceTab={(q) => { this.setState({ advanceTab: q }) }} fetchBook={this.fetchBook} bookName={this.state.bookName} indexhandler={this.indexHandler} bookNameHandler={this.bookNameHandler} availibilityHandler={this.availibilityHandler} route={this.props.route}
                    user={this.props.user} setUser={this.props.usetUser} />
                <AdvanceTab advanceTab={this.state.advanceTab} route={this.props.route} />
                <CardHolder bookList={this.state.bookList} bookingHandler={this.bookingHandler} route={this.props.route} />
                <Paginations indexHandler={this.indexHandler} fetchBook={this.fetchBook} pageCount={this.state.pageCount} route={this.props.route} />
            </div>
        );
    }
}



export default HomePage;