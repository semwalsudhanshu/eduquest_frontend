import produce from "immer";
import * as Constants from "./constants";

export const INITIAL_STATE ={
    filterText:"",
    isLoggedIn:false,
    courseList:[],
    filterOptions:[]
};
const homePageData = (state= INITIAL_STATE, action) =>
produce(state,draft=>{
    switch(action.type){
        case Constants.FILTER:
            draft.filterText = action.payload;
            break;
        case Constants.COURSE_LIST:
            break;
        case Constants.COURSE_LIST_SUCCESS:
            draft.courseList = action.payload;
            break;
        case Constants.LOGGED_IN:
            draft.isLoggedIn = action.payload;
            break;
        case Constants.FILTER_OPTIONS:
            draft.filterOptions=action.payload;
            break;
        default:
            break;
    }
})
export default homePageData;