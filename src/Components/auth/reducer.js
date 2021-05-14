import produce from "immer";
import * as Constants from "./constants";

export const INITIAL_STATE ={
    email:'',
    name:'',
    isLoggedIn:false,
  
};
const loginData = (state= INITIAL_STATE, action) =>
produce(state,draft=>{
    switch(action.type){
        case Constants.USER_AUTHENTICATED:
            draft.name = action.payload.name;
            draft.email = action.payload.email;
            draft.isLoggedIn =action.payload.success;
            break;
        default:
            break;
    }
})
export default loginData;