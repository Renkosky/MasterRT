/**
 * MrRequest
 * 简单封装fetch
 *
 * @creator mizi.lin
 *
 * @update mizi.lin@v0.1.21.20180516
 * ::=> 修复 headers 不接受 function，不能获取最新值
 *
 * @update mizi.lin@v0.1.23,20180523
 * ::=> 移除 catch 时回调 responseHandler
 *
 * @update mizi.lin@v0.2.0.20180607
 * ::=> 使用 axios 替换 fetch （Loreal中国不知道为什么网关阻止 fetch.get 但允许 fetch.post)）
 * ::=> fetch@v0.1.27-b3
 *
 * @update mizi.lin@v0.2.0-b7.2o18o612
 * ::=> fixed bugs: catch error return value 没有判断是否为promise又外裹一层promise.reject
 */


import MrServices from './mr.services';
import * as mu from 'mzmu';
import axios, {AxiosResponse} from 'axios';

interface AxiosRequestConfig {
    resultType: string;
}

/**
 * responseHandler(response: AxiosResponse)
 * @todo 编写文档的时候注明可以根据不同的resultType返回不同的类型
 * @param {AxiosResponse} response
 * @return {Promise<any>}
 */
function responseHandler(response: AxiosResponse) {
    let {resultType} = response.config as AxiosRequestConfig;
    return Promise.resolve( resultType === 'response' ? response : response.data);
}

function errorHandler(err) {

    const {response} = err;

    // 设置reject, 表示该 catch 后，不再接受 then
    let {headers, status, statusText, data} = response;

    // 兼容fetch使用promise获得信息
    let $message: any = new Promise((resolve) => resolve(data));

    // 传递error信息
    let error: any = {
        headers, status, statusText, data, $message, response, error: err
    };


    let self = MrServices._reqCatch;

    if(self) {
        error = self(error);
    }

    return Object.prototype.toString.call(error) === '[object Promise]' ? error : Promise.reject(error);
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

    headers = mu.map(headers || {}, (item)=> {
        return typeof item === 'function' ? item() : item;
    });

    options.headers = mu.extend(true, headers, options.headers);
    options.url = url;

    return axios(options)
        .then(responseHandler)
        .catch(errorHandler)
}

