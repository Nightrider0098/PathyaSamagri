import React, { Component, useEffect, useState } from 'react'
import { bookActions } from "../_actions"
import { connect } from "react-redux"
import IndividualBook from './IndividualBook'
import { Pagination } from 'react-bootstrap'
import { authHeader } from '../_helpers/auth-header'
export default (function UserBooks(props) {
    const [userDonatedBookList, setUserDonatedBookList] = useState([]);
    const [userReceivedBookList, setUserReceivedBookList] = useState([]);

    const [index1, setIndex1] = useState(0);
    const [index2, setIndex2] = useState(0);

    let indexList1 = [];
    let indexList2 = [];

    for (let number = 1; number <= 5; number++) {
        indexList1.push(
            <Pagination.Item key={number} active={number === index1}>
                {number}
            </Pagination.Item>,
        );
        indexList2.push(
            <Pagination.Item key={number} active={number === index1}>
                {number}
            </Pagination.Item>,
        );
    }

    useEffect(() => {
        fetch('/api/user_books?user_Id=' + props.user.user_id + '&index=0', {
            method: 'GET',
            type: 'cors',
            headers: authHeader()
        }).then(e => e.json()).then(e => {
            setUserDonatedBookList(e.user_books)
        })
    }, [index1])
    useEffect(() => { }, [index2])


    const BookCardDeckGenerator = () => {
        let book_list = userDonatedBookList;
        if (book_list === undefined || book_list === [] || book_list[0] === undefined) {
            return <div>No books Donated</div>
        }
        var BookCardDeck = [<IndividualBook Details={book_list[0]} />]
        for (let i = 1; i < book_list.length; i++) {
            BookCardDeck.push(<IndividualBook Details={book_list[i]} />)
        }
        return BookCardDeck
    }
    return (
        <div>
            {/* navigator */}
            <div className="p-5">
                <h2 style={{ textAlign: 'center', backgroundColor: 'white', padding: '5px', borderRadius: '5px' }}> Books and Stationary</h2>
                <div className="d-flex w-100 flex-wrap " style={{ justifyContent: "center" }}>
                    {BookCardDeckGenerator()}</div>
            </div>

            <Pagination>{indexList1}</Pagination>
            <Pagination>{indexList2}</Pagination>
        </div>
    )
})



// class userBooks extends Component {


//     // changeIndexHandler(ChangeIndexTo) {
//     //     var newIndex = 0
//     //     if (ChangeIndexTo < 0)
//     //         newIndex = 0
//     //     else {
//     //         newIndex = ChangeIndexTo
//     //     }
//     //     this.props.dispatch(bookActions.getUserBooks("", newIndex, this.props.user.user_id));
//     //     this.setState({ userBookList: this.props.books.userBooks })
//     // }




//     componentDidMount() {
//         this.props.dispatch(bookActions.getUserBooks("", 0, this.props.user));
//         this.setState({ userBookList: this.props.books.userBooks })

//     }

//     componentDidUpdate() {
//         if (this.props.books.userBookFound && this.props.books.userBooks !== this.state.userBookList)
//             this.setState({ userBookList: this.props.books.userBooks })

//     }




//     render() {
//         return (
//             <div>

//                 { this.navigator()}
//             </div >
//         )
//     }
// }

