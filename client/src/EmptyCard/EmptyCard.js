import React, { Component } from 'react'

class EmptyCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ''
        }
    }

    render() {
        if (this.props.bookDetails !== undefined)
            return (<div key="IfEmpty" style={{ 'display': 'none' }}></div>)
        else
            return (<div key="IfNotEmpty" >No more books to show</div>)
    }
}

export default EmptyCard
