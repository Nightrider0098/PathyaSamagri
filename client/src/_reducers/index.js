import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { books } from './book.reducer';
import { notification } from './notification.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  books,
  notification
});

export default rootReducer;