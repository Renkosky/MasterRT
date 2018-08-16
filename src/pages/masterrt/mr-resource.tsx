import * as React from 'react';
import MrPanel from '../../lib/mr-panel/mr-panel.component';
import MrCode from '../../lib/mr-code/mr-code.component';
import {MrResource} from '../../lib'

interface MrsMrResourcesProps {
}

export default class MrsMrResources extends React.Component<MrsMrResourcesProps, {}> {

    componentWillMount() {
        // let a = MrResource.pool('/abc{/:id}{/:name}{/:key}');
        //
        let b = MrResource.pool('/bbb');

        b.post();

        //
        // a.get({
        //     id: 2222,
        //     name: 'jiang'
        // }, {
        //     a: 111,
        //     key: '江山如此多娇'
        // }, {holdParams: false}).then(() => {
        //     console.debug(1111111);
        // });
        //
        // b.post({
        //     id: 2222,
        //     name: 'jiang'
        // }, {
        //     a: 111,
        //     b: '江山如此多娇'
        // }, {holdParams: true}).then(() => {
        //     console.debug(1111111);
        // });
    }

    down() {
        let a = MrResource.pool('/services/select-templates/cii_basedata_select/')

        // a.mrdown({
        //     downloadName: 'CII_20180621.xlsx',
        //     directDownload: true
        // }, {
        //     "paramMap": {
        //         "datetype": "quarter",
        //         "thisDate": "2018Q1",
        //         "categorys": [],
        //         "types": [],
        //         "brands": [],
        //         "nasty": []
        //     }
        // }, {
        //     headers: {
        //         'X-TOKEN': '0fbb709f8dbab4b8fa92ea3876821fa6c2e002be16420f9da5416426203654',
        //         'X-ORIGIN': 'test.loreal.visualmaster.com.cn/ciidashboard'
        //     },
        //
        //     // responseType: 'blob'
        // })
    }

    render() {
        return (
            <article className="mrs-article">
                <header onClick={this.down.bind(this)}>MrResource <small>RESUful</small></header>
                <ins className="block">基于MrRequest的RESEful接口请求协议</ins>

                <aside className="mt-16">
                    <MrPanel title="MrResource">
                        <table>
                            <tbody>
                                <tr>
                                    <td>pool: function(url)</td>
                                    <td>返回对象，拥有 get, post, delete, patch, mrdown, down 等方法</td>
                                </tr>
                            </tbody>
                        </table>
                    </MrPanel>
                </aside>

                <main>
                    <MrCode code={`
    let pool = MrResource.pool(api: string);

    /**
     * 使用get方法向服务器请求api资源
     * @params search: any: api 请求参数
     * @params extraSearch: any: 额外请求参数，合并至 search
     * @params options: MrRequestOptions fetch 请求options
     * @return Promise
     */

    // pool.get(search)
    // pool.get(search, extraSearch, options) 若要使用options, 请补全所有参数
    pool.get(search: any, extraSearch?: any, options?: any): Promise;

    /**
     * 使用post方法向服务器请求api资源
     * @params search: any: api 请求参数
     * @params payload: any: body request payload
     * @params options: MrRequestOptions fetch 请求options
     * @return Promise
     */

    // pool.post(payload) 若只有一个参数，该参数默认为payload(data)
    // pool.post(search, payload)
    // 若要使用options, 请补全所有参数
    pool.post(search: any, payload: any, options?: any): Promise;

    /**
     * mrdown, 向服务器器请求二进制资源，并按照 search.downloadName 设置的文件类型下载文件
     * MRI 默认下载配置，默认post请求，并添加相应配置参数，若其他请使用 download
     * @params search: any: api 请求参数（其中 downloadName 为必填）
     * @params payload: any: body request payload
     * @params options: MrRequestOptions fetch 请求options
     * @return Promise
     */
    pool.mrdown(search: any, payload: any, options?: any): Promise;




`}></MrCode>
                </main>

            </article>
        );
    }
}

