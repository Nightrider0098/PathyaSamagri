import React, { Component } from 'react'
import UserDetails from './userDetails'
import { notificationPanel as NotificationPanel } from './notificationPanel'
import UserBooks from './userBooks'

import { UserIssuedBooks } from './userIssuedBooks'
class ProfilePage extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div>
                <UserDetails user={this.props.user} route={this.props.route} />
                {/* <NotificationPanel /> */}
                <UserBooks user={this.props.user} />
                <UserIssuedBooks />
            </div>
        )
    }
}

export { ProfilePage }
