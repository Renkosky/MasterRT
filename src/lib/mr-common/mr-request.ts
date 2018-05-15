import * as fetch from 'dva/fetch';
import MrServices from './mr.services';
import * as mu from 'mzmu';
// https://www.cnblogs.com/huilixieqi/p/6494380.html

// @todo 封装成类 

function responseHandler(response) {

    return mu.run(MrServices.reqResponse, (handler) => {
        return handler(response);
    }, () => {
        let headers = response.headers;
        let contentType = headers.get('Content-Type') || 'text/html';
        contentType = contentType.split(';')[0];
        contentType = mu.trim(contentType);

        if (mu.or(contentType, 'application/json', 'application/hal+json', 'text/json')) {
            return response.json();
        } else if (contentType === 'text/html') {
            return response.text();
        } else {
            return response.blob();
        }
    });
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    return Promise.reject(response);
}

function preErrorHandler(response) {
    // 设置reject, 表示该 catch 后，不再接受 then

    let error: any = {};
    let {headers, status, statusText, ok} = response;

    let _response = responseHandler(response);
    _response.then((response) => {
        error.response = response;
    });

    error.headers = headers;
    error.status = status;
    error.statusText = statusText;
    error.ok = ok;
    error._response = _response;

    let self = MrServices._reqCatch;

    if(self) {
        // todo
        self(error);
    } else {
        // system handler

        // mu.run(MrServices.setExtendCatch, (ex) => {
        //     let a = ex(error);
        // });
    }

    return Promise.reject(error);
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

 // @todo 接收option自定义值，配置可接受参数，控制报错流程
export default function MrRequest(url, options: any = {}) {
    let headers: any = MrServices.getHeaders();
    options.headers = mu.extend(true, headers, options.headers);
    return fetch(url, options)
    .then(checkStatus)
    .then(responseHandler)
    .then(data => data)
    .catch(preErrorHandler)
}