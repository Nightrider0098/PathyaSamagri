import React, { Component } from 'react'
import IndividualCard from '../IndividualCard/IndividualCard'
import EmptyCard from '../EmptyCard/EmptyCard'
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
            <div className="card-deck m-auto" style={{ width: "95%" }}>
                {this.card_generator(this.props.bookList)}
            </div>
        )
    }
}

export default CardHolder
