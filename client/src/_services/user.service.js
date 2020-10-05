import { authHeader } from '../_helpers';
export const userServices = {
    login,
    logout,
    getAll,
    Signup,
    checkConection
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`/api/authentication`, requestOptions)
        .then(handleLoginResponse)
        .then(function (response) {
            return response.json()
        })
        .then(user => {
            if (user['token']) {
                localStorage.setItem('user', JSON.stringify(user));

                return user;
            }
        })
}

function checkConection() {
    const requestOptions = {
        method: 'GET',
        type: 'cors',
        headers:  authHeader()
    };
    // console.log(document.cookie)
    return fetch(`/api/refresh`,requestOptions)
        .then(function (response) {
            return response.json()
        })
        .then(user => {
           return user
        })
}

function Signup(AllDetails) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: AllDetails['username'], password: AllDetails['password'], email: AllDetails['email'], 'agree-term': 'on', signup: 'Register' })
    };
    console.log("requestOoptions", requestOptions)
    return fetch(`/api/Signup`, requestOptions)
        .then(handleSignupResponse)
        .then(message => {
            return message;
        })
}

function logout(AllDetails) {
    localStorage.removeItem('user');
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: AllDetails['user_id'], token: AllDetails['token'] })
    };
    console.log("requestOoptions", requestOptions)
    return fetch(`/api/Logout`, requestOptions)
        .then(handleSignupResponse)
        .then(message => {
            console.log(message)
            return message;
        })
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        type: "cors",
        headers: authHeader()
    };

    return fetch(`/api/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return response.json()
    }
    else
        if (response.status === 400)
            return Promise.reject("Failed to Logout");
        else
            return Promise.reject("Unknnown error check Dev tools");

}

function handleSignupResponse(response) {
    return new Promise((resolve, reject) => {

        if (response.ok) {
            if (response.status === 200) {
                resolve("sucess")
                console.log('resolve')
            }
        }
        else if (response.status === 406) {
            reject("Username Or Email Already Used")
            console.log('rejected')
        }
        else if (response.status === 400)
            reject("Fail to Register Try later or change Paramerters")

    })
}

function handleLoginResponse(response) {
    return new Promise((resolve, rejects) => {
        if (response.ok) {
            resolve(response)
        }
        alert(response.statusText);
        rejects(response.statusText)
    })
}

