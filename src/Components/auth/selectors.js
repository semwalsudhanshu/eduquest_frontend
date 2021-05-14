import { createSelector } from "reselect";
import { INITIAL_STATE }  from "./reducer";

export const auth = state => state.auth || INITIAL_STATE;

export const isLoggedIn = () =>
createSelector(
    auth,
    state=>state.isLoggedIn
)
