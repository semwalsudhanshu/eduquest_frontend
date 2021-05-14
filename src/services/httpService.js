import axios from 'axios';
import { call } from 'redux-saga/effects';

export const addRequestHeader = (request = {}) => {
    const header = {};
    request.header = { ...request(request.header || {}), ...header };
    return request;
}
const BASE_URL = `localhost:5000`;

export const HttpService = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    timeout: 30000,
    headers: {
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json"
    }
})
HttpService.interceptors.request.use(request => {
    return request;
})
HttpService.interceptors.response.use(response => {
    return response;
})
function* doApiCall(method, url, request, successCallBack, errorCallBack, opts) {
    const { parseResponse = false, timeout = 5000, baseURL } = opts;
    const axiosOptions = { baseURL, timeout };
    try {
        let res;
        switch (method) {
            case 'GET':
                res = yield call(() => HttpService.get(url, axiosOptions), null);
                break;
            case 'POST':
                res = yield call(() => HttpService.post(url, request, axiosOptions), null);
                break;
            case 'PUT':
            case 'DELETE':
            default:
                console.log('LOG_DEBUG: function*doApiCall -> incorrect use of doApiCall');
                break;
        }
        const response = parseResponse ? res.data.payload : res;
        yield successCallBack(response);
    } catch (error) {
        console.warn('LOG_DEBUG: error', error);
        if (errorCallBack) yield errorCallBack(error.message);
    }
}
export function* doGet(url, successCallBack, errorCallBack, opts) {
    yield doApiCall('GET', url, null, successCallBack, errorCallBack, opts);
}
export function* doPost(url, request, successCallBack, errorCallBack, opts = {}) {
    yield doApiCall('POST', url, request, successCallBack, errorCallBack, opts);
}