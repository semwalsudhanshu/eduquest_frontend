import * as types from './constants';

export const userAuthenticated = (payload) =>({
    type:types.USER_AUTHENTICATED,
    payload
})