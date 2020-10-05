import { notificationConstants } from '../_constants';
let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { doner: [], reciever:[] } : {};

export function notification(state = initialState, action) {
  switch (action.type) {
    case notificationConstants.REQUEST:
      return {
        notification_fetching: true,
      };
    case notificationConstants.FOUND:
      return {
        notification_fetching: false,
        doner : action.data2['doner'],
        reciever : action.data2['reciever']
      };

    case notificationConstants.SEEN:
      return { 

        };

    case notificationConstants.DELETE:
      return {};

    default:
      return state
  }
}