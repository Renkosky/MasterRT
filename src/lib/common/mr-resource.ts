import * as mu from 'mzmu';
import MrRequest from './mr-request';
import MrServices from './mr.services';

class MrResource {



    /**
     * URL to REST_URL
     * @param url
     * @param params
     * @param isReplace | true : 是否将不存在的占位符转为''(空)
     */
    private restful(url: string, params: any, isReplace: boolean = true): any {
        let fullUrl: string;

        url = url || '';
        let sp: any = mu.clone(params || {});
        const restParams: any = {};

        url = url.replace(/\{(.+?)\}/g, (m: string, key: string) => {
            return mu.run(sp[key], (v: string) => {
                restParams[key] = v;
                sp = mu.remove(sp, key);
                return v;
            }) || (isReplace ? '' : m);
        });

        url = url.replace(/\/$/, '');

        mu.run(sp, () => {
            let arr: any = mu.map(sp, (o, key) => {
                return [key, o]
            }, []);

            let searchStr = new URLSearchParams(arr).toString();

            if(url.indexOf('?') > -1){
                fullUrl = url + '&' + searchStr;
            } else {
                fullUrl = url + '?' + searchStr;
            }
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
        const rest = this.restful(url, search);
        let fullUrl = rest.fullUrl;

        options = mu.extend(true, {
            method: 'get',
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

        const rest = this.restful(url, search, false);
        let headers: any = MrServices.getHeaders();
        // const restdata = this.restful(rest.url, data, true);

        options = mu.extend(true, {
            method: 'post',
            body: JSON.stringify(data)
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

        const rest = this.restful(url, search, false);
        const restdata = this.restful(rest.url, data, true);

        options = mu.extend(true, {
            method: 'patch',
            body: JSON.stringify(data)
        }, options || {});

        return MrRequest(restdata.fullUrl, options);
    }

    delete(url: string, search?: any, options?: any) {
        const rest = this.restful(url, search);
        url = rest.url;
        options = mu.extend(true, {
            method: 'delete'
        }, options || {});
        return MrRequest(url, options);
    }

    pool(url: string) {
        const vm = this;
        return {
            get(search?: any, options?: any) {
                return vm.get(url, search, options);
            },

            post(search?: any, data?: any, options?: any) {
                const args: any = Array.from(arguments);
                args.unshift(url);
                return vm.post.apply(vm, args);
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

            save(search?: any, data?: any, options?: any) {
                const primaryKey = (search || data || {}).__primary__;
                const method = (search || data || {})[primaryKey] ? 'patch' : 'post';
                const args: any = Array.from(arguments);
                args.unshift(url);
                return vm[method].apply(vm, args);
            },

            download(search: any, options?: any) {
                const args: any = Array.from(arguments);
                args.unshift(url);
                vm.get.apply(vm, args).then((rst) => {
                    MrServices.download(rst, search.downloadName);
                });
            },

            mrdown(search: any = {}, data?: any, options?: any) {
                search['directDownload'] = true;
                const args: any = Array.from(arguments);
                args.unshift(url);
                vm.post.apply(vm, args).then((rst) => {
                    MrServices.download(rst, search.downloadName);
                });
            }
        }
    }

}

export default new MrResource();