import { createSelector } from "reselect";
import { INITIAL_STATE }  from "./reducer";

export const HomePage = state => state.HomePage || INITIAL_STATE;

export const getCourseList = () =>
createSelector(
    HomePage,
    state => state.courseList
)
export const isLoggedIn = () =>
createSelector(
    HomePage,
    state => state.isLoggedIn
)
export const getFilterOptions = () =>
createSelector(
    HomePage,
    state => state.filterOptions
)