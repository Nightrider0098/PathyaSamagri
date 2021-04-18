import React, { Component } from 'react'
import IndividualCard from '../IndividualCard/IndividualCard'
import EmptyCard from '../EmptyCard/EmptyCard'
import { CardDeck } from 'react-bootstrap'
class CardHolder extends Component {

    card_generator(dataList) {
        var ret_Data = []
        for (var i in dataList) {
            ret_Data.push(<IndividualCard bookDetails={dataList[i]} bookingHandler={this.props.bookingHandler} route={this.props.route} />)
        }
        if (dataList === undefined)
            ret_Data.push(<EmptyCard bookDetails={[]} />)
        return ret_Data;
    }
    render() {
        return (
            <div className="p-5">
                <h2 style={{ textAlign: 'center', backgroundColor: 'white', padding: '5px', borderRadius: '5px' }}> Books and Stationary</h2>
                <div className="d-flex w-100 flex-wrap " style={{ justifyContent: "center" }}>
                    {this.card_generator(this.props.bookList)}
                </div>
            </div >
        )
    }
}

export default CardHolder
