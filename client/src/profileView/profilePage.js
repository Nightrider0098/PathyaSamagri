import React, { Component } from 'react'
import { UserDetails } from './userDetails'
import { notificationPanel as NotificationPanel } from './notificationPanel'
import { UserBooks } from './userBooks'

import { UserIssuedBooks } from './userIssuedBooks'
class ProfilePage extends Component {
    render() {
        return (
            <div>
                <UserDetails></UserDetails>
                <NotificationPanel></NotificationPanel>
                <UserBooks></UserBooks>
                <UserIssuedBooks></UserIssuedBooks>
            </div>
        )
    }
}

export { ProfilePage }
