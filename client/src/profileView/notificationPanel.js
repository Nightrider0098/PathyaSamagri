import React, { Component } from 'react'
import { notificationActions } from '../_actions'
import { connect } from 'react-redux'
import { authHeader } from "../_helpers"

class notificationPanel extends Component {
    constructor(props) {
        super(props)
        const { dispatch} = this.props
        console.log(dispatch(notificationActions.fetch()))
        this.state = {
            doner_notification: [{ "message": "No Messages", "sent": "2020-04-01T04:11:06.457Z", "seen": "2021-04-01T04:11:06.457Z" }],
            reciever_notification: [{ "message": "No Messages", "sent": "2020-04-01T04:11:06.457Z", "seen": "2021-04-01T04:11:06.457Z" }]
        }

        this.notificatonSeenUpdater = this.notificatonSeenUpdater.bind(this)
    }

    componentDidUpdate() {
        if (!this.props.notification['notification_fetching']) {
            if (this.state.doner_notification !== this.props.notification['doner']) {
                this.setState({ doner_notification: this.props.notification['doner'] })
            }
            if (this.state.reciever_notification !== this.props.notification['reciever']) {
                this.setState({ reciever_notification: this.props.notification['reciever'] })
            }
        }
    }

    notficationBoxDoner(notifi) {

        if (notifi !== undefined) {
            this.notiUpdated = 1; this.notiExsit = 1;
            return <div className="alert alert-info alert-dismissible" >
                <button type="button" onClick={() => { this.notificationDeletion(notifi.messageID, 0) }} className="close" data-dismiss="alert">&times;</button>
                <strong>{notifi.message}</strong>
            </div>
        }
    }

    notficationBoxReciever(notifi) {
        // const message = notifi.message
        if (notifi !== undefined) {
            this.notiUpdated = 1; this.notiExsit = 1;
            return <div className="alert alert-success alert-dismissible">
                <button type="button" className="close" onClick={() => { this.notificationDeletion(notifi.messageID, 1) }} data-dismiss="alert">&times;</button>
                <strong>{notifi.message}</strong>
            </div>
        }
    }

    notificationGenerator1(Allnotification) {
        if (Allnotification !== undefined) {
            var notiResult = [this.notficationBoxDoner(Allnotification[0])]
            for (let i = 1; i < Allnotification.length; i++)
                notiResult.push(this.notficationBoxDoner(Allnotification[i]))

            return notiResult
        }

    }

    notificationGenerator2(Allnotification) {
        if (Allnotification !== undefined) {
            var notiResult = [this.notficationBoxReciever(Allnotification[0])]
            for (let i = 1; i < Allnotification.length; i++)
                notiResult.push(this.notficationBoxReciever(Allnotification[i]))

            return notiResult
        }

    }

    notificatonSeenUpdater() {
        if (this.notiUpdated) {
            const requestOptions = {
                method: 'GET',
                type: 'cors',
                headers: authHeader()
            };
            let params = {
                "notiSeenAt": Date()
            };

            let query = Object.keys(params)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&');

            let url = this.props.route + '/api/updatenoti?' + query;



            return fetch(url, requestOptions)
                .then(response => {
                    return response.json()
                })
                .then(respo => {
                    console.log("notiUpdated");
                    this.notiUpdated = 0;
                },
                    error => {
                        console.log(error)
                        alert(error.message)
                    });
        }
    }
    notificationDeletion(messageID, don_or_rec) {
        if (this.notiExsit) {
            const requestOptions = {
                method: 'GET',
                type: 'cors',
                headers: authHeader()
            };
            let params = {
                "messageID": messageID,
                "don_rec": don_or_rec
            };

            let query = Object.keys(params)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&');

            let url = this.props.route + '/api/Deletenoti?' + query;



            return fetch(url, requestOptions)
                .then(response => {
                    return response.json()
                })
                .then(respo => {
                    console.log("notiDelete");
                },
                    error => {
                        console.log(error)
                        alert(error.message)
                    });

        }
    }



    render() {
        return (

            <div id="noti_tab" className="noti-container" onMouseOver={this.notificatonSeenUpdater} style={{ backgroundColor: 'white', padding: "10px", paddingTop: "36px" }}>
                {this.notificationGenerator1(this.state.doner_notification)}
                {this.notificationGenerator2(this.state.reciever_notification)}
            </div >


        )
    }
}


function mapStateToProps(state) {
    const { user } = state.authentication;
    const { notification } = state;

    return {
        user,
        notification
    };
}

const connectedNotificationPanel = connect(mapStateToProps)(notificationPanel);
export { connectedNotificationPanel as notificationPanel }; 
