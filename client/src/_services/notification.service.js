import { authHeader } from '../_helpers';

export const notificationServices = {
    fetch1
}


function fetch1() {
    const requestOptions = {
        method: 'GET',
        type: 'cors',
        headers: authHeader()
    };
    return fetch(`/api/notification`, requestOptions)
        .then(handleResponse)
        .then(function (response) {
            // console.log("here is the response",response.json())
         
            return response.json()
           })
        .then(noti => {
            // console.log("initial response ",noti['doner'])
            return noti
        }).catch(err=>{console.log(err)})
}


function handleResponse(response) {
    if (response.ok) {
        return response
    }
    else
        if (response.status === 400)
            return Promise.reject("Failed to fetch");
        else
            return Promise.reject("Unknnown error check Dev tools");

}