import { bookConstants } from '../_constants';
import { bookServices } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';
// strong use of thunkMiddleware since all action are coverted into function performing multiple actions

export const bookActions = {
    issueBook,
    getBooks,
    getBooksHints,
    getBooksAdvance,
    setQuery,
    getUserBooks,
    getUserIssuedBooks
};

function issueBook(bookId, userId) {
    return dispatch => {
        dispatch(request({ bookId }));

        bookServices.bookIssue(bookId, userId)
            .then(
                ownerDetails => {
                    dispatch(success(ownerDetails));
                    history.push('/confirmationPage');

                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(bookId) { return { type: bookConstants.ISSUING_REQUEST, bookId } }
    function success(ownerDetails) { return { type: bookConstants.ISSUING_SUCCESS, ownerDetails } }
    function failure(error) { return { type: bookConstants.ISSUING_FAILED, error } }
}

function getBooks(name, index, userId) {
    return dispatch => {
        dispatch(querySetting(index))
        bookServices.bookFind(name, index, userId)
            .then(
                bookDetails => {
                    dispatch(success(bookDetails['book_find']));

                }).catch(
                    error => {

                        dispatch(failure(error));
                        // dispatch(alertActions.error(error));
                    }
                );

    };
    function querySetting(index) { return { type: bookConstants.SET_QUERY, index: index, isAdvance: 0 } }
    function success(bookDetails) { return { type: bookConstants.BOOK_FIND_SUCCESS, bookDetails } }
    function failure(error) { return { type: bookConstants.BOOK_FIND_FAILED, error } }

}

function getBooksHints(name, userId) {
    return dispatch => {
        dispatch(request({ name }));

        bookServices.bookHint(name, userId)
            .then(
                booksNames => {
                    dispatch(success(booksNames));

                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(name) { return { type: bookConstants.BOOK_FIND_HINT_REQUEST, name } }
    function success(booksNames) { return { type: bookConstants.BOOK_FIND_HINT_SUCCESS, booksNames } }
    function failure(error) { return { type: bookConstants.BOOK_FIND_HINT_FAILED, error } }

}

function getBooksAdvance(index, userId, filter) {
    return dispatch => {
        filter['index'] = index * 12;
        dispatch(request(index, filter));
        bookServices.bookAdvance(index, userId, filter).then(
            booksDetails => {
                dispatch(success(booksDetails['book_find']));
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
        );
    };

    function request(index, filter) { return { type: bookConstants.BOOK_FIND_ADVANCE_REQUEST, index: index, filter: filter, isAdvance: 1 } }
    function success(booksDetails) { return { type: bookConstants.BOOK_FIND_ADVANCE_SUCCESS, bookDetails: booksDetails } }
    function failure(error) { return { type: bookConstants.BOOK_FIND_ADVANCE_FAILED, error } }

}

function setQuery(query) {
    return { type: bookConstants.SET_QUERY, query }
}


function getUserBooks(name = "", userBookIndex, userID) {

    return dispatch => {

        dispatch(querySetting(userBookIndex))
        bookServices.userBookFind(name, userBookIndex, "")
            .then(
                bookDetails => {
                    dispatch(success(bookDetails['user_books']));

                }).catch(
                    error => {

                        dispatch(failure(error));
                        dispatch(alertActions.error(error));
                    }
                );

    };
    function querySetting(userBookIndex) { return { type: bookConstants.SET_USER_BOOK_QUERY, UserBookindex: userBookIndex } }
    function success(bookDetails) { return { type: bookConstants.USER_BOOK_FIND_SUCCESS, bookDetails } }
    function failure(error) { return { type: bookConstants.USER_BOOK_FIND_FAILED, error } }

}


function getUserIssuedBooks(name = "", userBookIndex, userID) {

    return dispatch => {

        dispatch(querySetting(userBookIndex))
        bookServices.userBookIssuedFind(name, userBookIndex, "")
            .then(
                bookDetails => {
                    dispatch(success(bookDetails['issued_books']));

                }).catch(
                    error => {

                        dispatch(failure(error));
                        dispatch(alertActions.error(error));
                    }
                );

    };
    function querySetting(userBookIndex) { return { type: bookConstants.SET_USER_BOOK_ISSED_QUERY, UserBookindex: userBookIndex } }
    function success(bookDetails) { return { type: bookConstants.USER_BOOK_ISSED_FIND_SUCCESS, bookDetails } }
    function failure(error) { return { type: bookConstants.USER_BOOK_ISSED_FIND_FAILED, error } }

}
