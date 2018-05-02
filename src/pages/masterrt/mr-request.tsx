import * as React from 'react';
import * as mu from 'mzmu';
import * as _ from 'lodash';
import MrPanel from '../../lib/mr-panel/mr-panel.component';
import MrCode from '../../lib/mr-code/mr-code.component';

interface MrsMrRequestProps {
}

export default class MrsMrRequest extends React.Component<MrsMrRequestProps, {}> {

    render() {
        return (
            <article className="mrs-article">
                <header>MrRequest <small>Ajax服务</small></header>
                <ins className="block">基于Fetch, 做了一层简单的封装，支持拦截器，错误处理等</ins>
                <ins className="block">https://github.com/github/fetch</ins>

                <aside className="mt-16">
                    <MrPanel title="Fetch::MrRequest(url, options, setting) | https://github.github.io/fetch/">
                        <table>
                            <tbody>
                                <tr>
                                    <td>url: string</td>
                                    <td>api 接口</td>
                                </tr>
                                <tr>
                                    <td>options?: string</td>
                                    <td>@https://github.github.io/fetch/#options</td>
                                </tr>
                                <tr>
                                    <td>setting?: any</td>
                                    <td>
                                        @同MrService.setInterceptor setting
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </MrPanel>
                </aside>

                <main>
<MrCode code={`
    MrRequest 是在fetch做了一层简单的封装，使其post请求只支持提交JSON(payload)
    Response 默认返回JSON数据格式，若要支持其他，虚在header中做参数配置提交
    并对整个请求过程做了全局拦截器设置，并在MrService中配置使用

    // 设置拦截器
    MrService.setInterceptor(setting: any, type: string)

    // 拦截器设置参数
    setting = {

        // 是否使用Masterrt预定义的预加载配置（如 预定义header, 预定义 loading 等）
        preRequest: true,

        // 是否使用Masterrt预设定错误提示
        preError: true,

        // 设置请求头
        header: (header) => {
            return header;
        }

        // request
        request: (url, options) => {

            // 即 before request
            return [url, options];

            // 若无返回值，则拦截失效
        },

        // get response handler success
        success: (response) => {

            // 处理后返回
            return response;

            // 处理后抛错
            return Promise.reject(response || object)

            // 若没有返回值，则拦截失效
        },

        // catch error
        error: (error) => {

            return Promise.reject(error);

            // 若没有返回值，则单独请求调用错误得不到准确的错误信息
        }
    }

    // 拦截器设置类型
    type = 'extend'  默认值，继承已有拦截器配置 || 'replace' 替换已有的拦截器配置


`}></MrCode>
                </main>

            </article>
        );
    }
}