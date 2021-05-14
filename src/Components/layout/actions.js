import * as types from './constants';

export const filterList = (payload) => {
    return {
        type: types.FILTER,
        payload
    }
}
export const courseList = (payload) => {
    return {
        type: types.COURSE_LIST,
        payload
    }
}

export const courseListSuccess = (payload) => {
    return {
        type: types.COURSE_LIST_SUCCESS,
        payload
    }
}

export const courseListFailure = (payload) => {
    return {
        type: types.COURSE_LIST_FAILURE,
        payload
    }
}
export const loggedIn = (payload) =>{
    return{
        type:types.LOGGED_IN,
        payload
    }
}
export const setFilterOptions = (payload) =>{
    return{
        type:types.FILTER_OPTIONS,
        payload
    }
}