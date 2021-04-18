import { userConstants } from '../_constants';
import { userServices } from '../_services';
import { alertActions } from './index';
import { history } from '../_helpers';


export const userActions = {
    login,
    logout,
    getAll,
    logout_final,
    Signup,
    Refresh   
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));
        userServices.login(username, password).then(user => {
            dispatch(success(user));
            history.push('/');
            return "sucesss"
        }).catch(error => {
            dispatch(failure(error));
        }
        );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}



function Signup(AllDetails) {
    return dispatch => {
        dispatch(request(AllDetails['username']));
        console.log("sent from inside action")

        userServices.Signup(AllDetails).then(user => {
            dispatch(success());
            history.push('/login');
            console.log("Account Created")
        }).catch(message => {
            dispatch(failure(message));
            dispatch(alertActions.error(message))
            // console.log(message)     
        }
        );
    };

    function request(username) { return { type: userConstants.SIGNUP_REQUEST, username } }
    function success() { return { type: userConstants.SIGNUP_SUCCESS } }
    function failure(message) { return { type: userConstants.SIGNUP_FAILURE, message } }
}

function logout(AllDetails) {
    userServices.logout(AllDetails);
    return { type: userConstants.LOGOUT };
}

function logout_final(AllDetails) {
    userServices.logout(AllDetails);
    history.push("/");
    return { type: userConstants.LOGOUT };

}

function Refresh() {
  userServices.checkConection().then(data=>{
    console.log(data)  
    localStorage.setItem('user',JSON.stringify(data))
    
    return {type: userConstants.USER_REFRESH , details: data}
  })
//   }).catch((err)=> {
//       alert("Failed to refresh");
//       console.log(err)})
}


function getAll() {
    return dispatch => {
       

        userServices.authenticate()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

