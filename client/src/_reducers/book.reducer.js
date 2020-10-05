import { bookConstants } from '../_constants';

const initialState = {
    bookDetails: {},
    bookLoading: false,
    index: 0,
    userBookFound: false,
    userBookIndex: 0,
    bookId_to_issue: null,
    booked: null,
    book_serch_query: 0,
    current_query: "",
    isAdvance: 1,
    userIssuedBookIndex:0,
    userIssuedBooks:{}
};

export function books(state = initialState, action) {
    switch (action.type) {
        case bookConstants.SET_QUERY:
            return {
                ...state,
                index: action.index,
                current_query: action.query,
                isAdvance: action.isAdvance
            }

        case bookConstants.ISSUINNG_REQUEST:
            return {
                bookLoading: true,
                bookId_to_issue: action.bookId,
                booked: false

            };
        case bookConstants.ISSUING_SUCCESS:
            return {
                bookLoading: false,
                ownerDetails: action.ownerDetails,
                bookId_to_issue: null,
                booked: true

            };
        case bookConstants.ISSUING_FAILED:
            return {
                bookLoading: false,
                ownerDetails: null,
                bookId_to_issue: null,
                booked: false
            };

        case bookConstants.BOOK_EDIT_REQUEST:
            return {
                bookEditing: true,
                bookEdited: false
            };

        case bookConstants.BOOK_EDIT_SUCCESS:
            return {
                bookEditing: false,
                bookEdited: true
            };

        case bookConstants.BOOK_EDIT_FAILED:
            return {
                bookEditing: false,
                bookEdited: false
            };

        case bookConstants.BOOK_FIND_REQUEST:
            return {
                ...state,
                bookSearching: true,
                bookFound: false,
                index: action.index,
                book_serch_query: 0
            };

        case bookConstants.BOOK_FIND_SUCCESS:
            return {
                ...state,
                bookSearching: false,
                bookFound: true,
                bookDetails: action.bookDetails,

                book_serch_query: 1
            };

        case bookConstants.BOOK_FIND_FAILED:
            return {
                ...state,
                bookSearching: false,
                bookFound: false,

            };


        case bookConstants.BOOK_FIND_ADVANCE_REQUEST:
            return {
                ...state,
                bookSearching: true,
                bookFound: false,
                filter: action.filter,
                index: action.index,
                isAdvance: 1
            };

        case bookConstants.BOOK_FIND_ADVANCE_SUCCESS:
            return {
                ...state,
                bookSearching: false,
                bookFound: true,
                bookDetails: action.bookDetails
            };

        case bookConstants.BOOK_FIND_ADVANCE_FAILED:
            return {
                ...state,
                bookSearching: false,
                bookFound: false
            };

        case bookConstants.BOOK_FIND_HINT_REQUEST:
            return {
                ...state,
                bookSearching: true,
                bookFound: false
            };

        case bookConstants.BOOK_FIND_HINT_SUCCESS:
            return {
                ...state,
                bookSearching: false,
                bookFound: true,
                bookNames: action.booksNames
            };

        case bookConstants.BOOK_FIND_HINT_FAILED:
            return {
                ...state,
                bookSearching: false,
                bookFound: false,
            };
        case bookConstants.SET_USER_BOOK_QUERY:
            return {
                ...state,
                bookLoading: true,
                bookSearching: true,
                userBookFound: false,
                userBookIndex: action.UserBookindex
            };
        case bookConstants.USER_BOOK_FIND_SUCCESS:
            return {
                ...state,
                bookLoading: false,
                bookSearching: false,
                userBookFound: true,
                userBooks: action.bookDetails
            };
        case bookConstants.USER_BOOK_FIND_FAILED:
            return {
                ...state,
                bookLoading: false,
                bookSearching: false,
                userBookFound: false
            };

        case bookConstants.SET_USER_BOOK_ISSED_QUERY:
            return {
                ...state,
                // ...
                bookLoading: true,
                bookSearching: true,
                userIssuedBookFound: false,
                userIssuedBookIndex: action.UserBookindex
            };
        case bookConstants.USER_BOOK_ISSED_FIND_SUCCESS:
            return {
                ...state,
                bookLoading: false,
                bookSearching: false,
                userIssuedBookFound: true,
                userIssuedBooks: action.bookDetails
            };
        case bookConstants.USER_BOOK_ISSED_FIND_FAILED:
            return {
                ...state,
                bookLoading: false,
                bookSearching: false,
                userIssuedBookFound: false
            };
        default:
            return state
    }
}