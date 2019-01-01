/**
 * MrResource
 * 基于restful的实现方案
 *
 * @create mizi.lin
 *
 * @update mizi.lin@v0.1.23.v20180522
 * ::=> fixed delete no search
 * ::=> 添加 upload 接口
 *
 * @update mizi.lin@0.1.27-b1.2018o6o6
 * ::=> clear UrlSearchParams
 * ::=> method.get 添加默认 ContentType
 *
 * @update mizi.lin@0.2.1-b10.2o18o621
 * ::=> fixed bugs: mrdown no download then add axios.options.responseType: blob
 */

import mu from 'mzmu';
import MrRequest from './mr-request';
import MrServices from './mr.services';
import * as _ from 'lodash';

// HTTP协议中请求的8中方法
//
// OPTIONS获取服务器支持的HTTP请求方法；
// HEAD跟get很像，但是不返回响应体信息，用于检查对象是否存在，并获取包含在响应消息头中的信息。
// GET向特定的资源发出请求，得到资源。
// POST向指定资源提交数据进行处理的请求，用于添加新的内容。
// PUT向指定资源位置上传其最新的内容，用于修改某个内容。
// DELETE请求服务器删除请求的URI所标识的资源，用于删除。
// TRACE回馈服务器收到的请求，用于远程诊断服务器。
// CONNECT用于代理进行传输，如使用ssl

class MrResource {

    private getParams(mapping: string = '', params: object = {}): any {
        let str: string = mapping.replace(/^{(.*)}$/, '$1');
        let [front, key, behind] = str.split(':');
        let value = params[key];
        if (mu.isExist(value)) {
            front = mu.ifnvl(front, '');
            behind = mu.ifnvl(behind, '');
            value = [front, value, behind].join('');
        }
        value = mu.ifnvl(value, '');

        return {
            key,
            value
        }
    }

    /**
     * URL to REST_URL
     * @param url
     * @param params
     * @param options
     */
    private restful(url: string, params: any = {}, options: any = {}): any {
        let fullUrl: string;

        url = url || '';
        let sp: any = mu.clone(params || {});
        const restParams: any = {};

        // support {/:id}
        let ms = url.match(/{(.*?)(:.+?)}/g);

        if (ms && ms.length) {
            mu.each(ms, (item) => {
                let mapping = this.getParams(item, params);
                if (mapping.key) {
                    options['holdParams'] || delete params[mapping.key];
                    url = url.replace(item, mapping.value);
                }
            })
        }

        // 向下兼容直接使用 {key} 来做替换数据
        // 0.2.22 以下
        url = url.replace(/\{(.+?)\}/g, (m: string, key: string) => {
            let value =  mu.run(sp[key], (v: string) => {
                restParams[key] = v;
                sp = mu.remove(sp, key);
                options['holdParams'] || delete params[key];
                return v;
            });

            return mu.ifnvl(value, '');
        });

        return {
            url: url,
            fullUrl: fullUrl || url,
            search: sp,
            params,
            restParams: restParams
        };
    }

    get(url: string, search?: any, options?: any) {
        const rest = this.restful(url, search, options);
        let fullUrl = rest.fullUrl;

        options = mu.extend(true, {
            method: 'get',
            params: search,
        }, options || {});

        return MrRequest(fullUrl, options);
    }

    post(url: string, search?: any, data?: any, options?: any) {

        switch (arguments.length) {
            case 1:
                data = {};
                search = {};
                options = {};
                break;
            case 2:
                data = arguments[1];
                search = {};
                options = {};
                break;
            case 3:
                options = {};
                break;
        }

        const rest = this.restful(url, search, options);
        let headers: any = MrServices.getHeaders();
        // const restdata = this.restful(rest.url, data, true);

        options = mu.extend(true, {
            method: 'post',
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json;',
                // 'Accept': 'application/json;'
            },
            // fetch
            // body: JSON.stringify(data)
            data,
            params: search
        }, options || {});

        return MrRequest(rest.fullUrl, options);
    }

    patch(url: string, search?: any, data?: any, options?: any) {
        switch (arguments.length) {
            case 1:
                search = {};
                data = {};
                options = {};
                break;
            case 2:
                search = {};
                data = arguments[1];
                options = {};
                break;
            case 3:
                options = {};
                break;
        }

        const rest = this.restful(url, search, options);
        const restdata = this.restful(rest.url, data, options);

        options = mu.extend(true, {
            method: 'patch',
            // body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json;'
            },
            data,
            params: search
        }, options || {});

        return MrRequest(restdata.fullUrl, options);
    }

    put(url: string, search?: any, data?: any, options?: any) {
        switch (arguments.length) {
            case 1:
                search = {};
                data = {};
                options = {};
                break;
            case 2:
                search = {};
                data = arguments[1];
                options = {};
                break;
            case 3:
                options = {};
                break;
        }

        const rest = this.restful(url, search, options);
        const restdata = this.restful(rest.url, data, options);

        options = mu.extend(true, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json;'
            },
            data,
            params: search
        }, options || {});

        return MrRequest(restdata.fullUrl, options);
    }

    delete(url: string, search?: any, options?: any) {

        const rest = this.restful(url, search, options);
        let fullUrl = rest.fullUrl;

        options = mu.extend(true, {
            method: 'delete',
            params: search,
        }, options || {});

        return MrRequest(fullUrl, options);
    }

    pool(url: string) {
        const vm = this;
        return {

            _url: url,

            // hack, 支持三参数 与 post 等模式调用方式一致
            // 提高判断method时，提交使用效率
            get(search?: any, params?: any, options?: any) {

                mu.run(params, () => {
                    search = mu.extend(true, search, params);
                });

                return vm.get(url, search, options);
            },

            post(search?: any, data?: any, options?: any) {
                const args: any = Array.from(arguments);
                args.unshift(url);
                return vm.post.apply(vm, args);
            },

            upload(search?: any, data?: any, options?: any) {
                options = options || {};
                _.set(options, 'headers.Content-Type', 'multipart/form-data;');
                return vm.post(url, search, data, options);
            },

            delete(search?: any, data?: any, options?: any) {
                const args: any = Array.from(arguments);
                args.unshift(url);
                return vm.delete.apply(vm, args);
            },

            patch(search?: any, data?: any, options?: any) {
                const args: any = Array.from(arguments);
                args.unshift(url);
                return vm.patch.apply(vm, args);
            },

            put(search?: any, data?: any, options?: any) {
                const args: any = Array.from(arguments);
                args.unshift(url);
                return vm.put.apply(vm, args);
            },

            save(search?: any, data?: any, options?: any) {
                const primaryKey = (search || data || {}).__primary__;
                const method = (search || data || {})[primaryKey] ? 'patch' : 'post';
                const args: any = Array.from(arguments);
                args.unshift(url);
                return vm[method].apply(vm, args);
            },

            download(search: any, options?: any) {
                const args: any = Array.from(arguments);
                options = options || {};
                options.responseType = 'blob';
                args.unshift(url);
                return vm.get(search, {}, options).then((rst) => {
                    MrServices.download(rst, search.downloadName);
                });
            },

            mrdown(search: any, data?: any, options?: any) {
                search = search || {};
                data = data || {};
                options = options || {};
                if (!search.downloadName) {
                    console.error('downloadName 未设置');
                    return false;
                }
                search['directDownload'] = true;
                options['responseType'] = 'blob';
                return vm.post(url, search, data, options).then((rst) => {
                    MrServices.download(rst, search.downloadName);
                });
            }
        }
    }

}

export default new MrResource();