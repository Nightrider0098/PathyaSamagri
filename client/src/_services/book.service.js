import { authHeader } from '../_helpers';
export const bookServices = {
    bookIssue,
    bookFind,
    bookHint,
    bookAdvance,
    bookRecent,
    userBookFind,
    userBookIssuedFind,

};

function bookIssue(bookId, userId) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId, userId })
    };
    // document.
    return fetch(`/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(ownerId => {

            return ownerId;
        },
            error => {
                alert(error.message)
            });
}

function bookRecent(name, index, userId) {
    const requestOptions = {
        method:
            'GET'
    }


    let params = {
        "name": name,
        "user_Id": userId,
        "index": index
    };

    let query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');

    let url = '/api/recent_books?' + query;



    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(bookDetails => {
            return { 'book_find': bookDetails["recent_books"] }
        },
            error => {
                console.log(error)
                alert(error.message)
            });
}

function bookFind(name, index, userId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }
    let params = {
        "title": name,
        "user_Id": userId,
        "limit": index * 12
    };

    let query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');

    let url = '/api/book?' + query;



    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(bookDetails => {
            return { 'book_find': bookDetails['book_find'] }
        },
            error => {
                console.log(error)
                alert(error.message)
            });
}

function userBookFind(name, userBookIndex, userId) {
    const requestOptions = {
        method: 'GET',
        type: 'cors',
        headers: authHeader()
    };
    let params = {
        "title": "",
        "user_Id": "",
        "index": userBookIndex * 12
    };

    let query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');

    let url = '/api/user_books?' + query;



    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(bookDetails => {
            return { 'user_books': bookDetails['user_books'] }
        },
            error => {
                console.log(error)
                alert(error.message)
            });
}

function userBookIssuedFind(name, userBookIssuedIndex, userId) {
    const requestOptions = {
        method: 'GET',
        type: 'cors',
        headers: authHeader()
    };
    let params = {
        "title": "",
        "user_Id": "",
        "index": userBookIssuedIndex * 12
    };

    let query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');

    let url = '/api/user_book_issued?' + query;



    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(bookDetails => {
            return { 'issued_books': bookDetails['issued_books'] }
        },
            error => {
                console.log(error)
                alert(error.message)
            });
}

function bookHint(name, userId) {
    const requestOptions = {
        method: 'GET'
    };


    let params = {
        "title": name,
        "user_Id": userId
    };

    let query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');

    let url = '/api/book/hint?' + query;


    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(booksDetails => {
            return booksDetails['hint_find'];
        },
            error => {
                alert(error.message)
                console.log(error, "error in fetch of hints")
            });
}

function bookAdvance(index, userId, data) {
    const data2 = new URLSearchParams();
    for (const a in Object.keys(data)) {
        data2.append(Object.keys(data)[a], data[Object.keys(data)[a]]);
    }
    return fetch('/api/advance_search', { method: 'POST', body: data2 }).then(res => res.json())
}

function handleResponse(response) {
    const text = response.json()
    const data = text;
    if (!response.ok) {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            // logout();
            alert("some error response of booking of book")
            // location.reload(true);
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    return data;

}