import {put, takeLatest} from "redux-saga/effects";
import {doPost} from "../../services/httpService";
import * as actions from "./actions";
import * as constants from "./constants";

function* getCourseList(action){
    let request = {

    };
    function* successHandler(response){
        if(response.status && response.status !==200){
            yield put(actions.courseListFailure(response));
        }else if( response ){
            yield put(actions.courseListSuccess(response));
        }else{
            yield put(actions.courseListFailure(response));
        }
    }
    function* errorHandler(error){
        yield put(actions.courseListFailure(error));
    }
    yield doPost(
        constants.GET_COURSE_LIST_URL,
        request,
        successHandler,
        errorHandler
    );
}
export default function* actionWatcher(){
    yield takeLatest(constants.COURSE_LIST, getCourseList);
}