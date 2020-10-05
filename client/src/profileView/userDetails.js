import React, { Component } from 'react'
import { connect } from 'react-redux';
import './styles.css'



class UserDetails extends Component {
    render() {
        const { user } = this.props
        return (
            <div>
                <div className='user-detail-container'>
                    <div className="user-detail-flex">
                        <div style={{
                            padding: '10px', margin: 'auto 10px',  width: '250px', display: ' flex'
                        }}>
                            <img src={this.props.route + "/images/user/" + user['prof_img_id']} alt="never mind" style={{ width: '100%' }} />
                        </div>
                        <div className="user-text-details">
                            <div className="indv-detail">
                                <h4 className="profile-keys">Books donated:</h4>
                                <h5 className="profile-values"> {user['book_donated']}</h5>
                            </div>

                            <div className="indv-detail">
                                <h4 className="profile-keys">Books borrowed this year:</h4>
                                <h5 className="profile-values">{user['book_issued']}</h5>
                            </div>

                            <div className="indv-detail">
                                <h4 className="profile-keys">username:</h4>
                                <h5 className="profile-values">{user['username']}</h5>
                            </div>
                            <div className="indv-detail">
                                <h4 className="profile-keys">Email:</h4>
                                <h5 className="profile-values">{user['email']}</h5>
                            </div>
                            <div className="indv-detail">
                                <h4 className="profile-keys">Address:</h4>
                                <h5 className="profile-values">{user['address']}</h5>
                            </div>
                            <div className="indv-detail">
                                <h4 className="profile-keys">Phone no:</h4>
                                <h5 className="profile-values">{user['phone_no']}</h5>
                            </div>
                            <div className="indv-detail">
                                <a href="/profileEdit">
                                    <button className="btn btn-outline-dark btn-lg btn-radius advbtn" type="button"
                                        style={{ margin: '15px auto' }}>Edit Your Profile</button>

                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



function mapStateToProps(state) {
    const { user } = state.authentication;

    return {
        user
    };
}

const connecteduserDetails = connect(mapStateToProps)(UserDetails);
export { connecteduserDetails as UserDetails }; 