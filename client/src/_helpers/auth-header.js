export function authHeader() {
    // return authorization header with jwt token
    if (localStorage.getItem('authToken') !== undefined) {

        let token = localStorage.getItem('authToken');

        if (token) {
            return { 'Authorization': 'Bearer ' + token };
        } else {
            return {};
        }
    }
    else {
        return {};
    }
}   