import fetch from 'dva/fetch';
import MrServices from './mr.services';
import * as mu from 'mzmu';

function responseHandler(response) {
    let headers = response.headers;
    let contentType = headers.get('Content-Type').split(';')[0];

    if (contentType === 'application/json') {
        return response.json();
    } else if (contentType === 'text/html') {
        return response.text();
    } else {
        return response.blob();
    }
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error['response'] = response;
    throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function MrRequest(url, options: any = {}) {
    let headers: any = MrServices.getHeaders();
    options.headers = mu.extend(true, {headers}, options.headers);
    return fetch(url, options)
    .then(checkStatus)
    .then(responseHandler)
    .then(data => data.data || data)
    .catch(err => ({err}));
}
