import * as React from 'react';
import  mu from 'mzmu';
import * as _ from 'lodash';
import MrPanel from '../../lib/mr-panel/mr-panel.component';
import MrCode from '../../lib/mr-code/mr-code.component';
import {MrServices} from '../../lib';

interface MrsMrServicesProps {
}

export default class MrsMrServices extends React.Component<MrsMrServicesProps, {}> {

    componentWillMount() {
    }

    download() {
        // MrServices.download('/assets/SocialX_秒针%20%20秒针_2018-06-01.xlsx')
        MrServices.download('/services/SocialX_秒针%20%20秒针_2018-06-01.xlsx')
    }

    render() {
        return (
            <article className="mrs-article">
                <header>MrServices <small>MasterRT配置服务</small></header>
                <ins className="block" onClick={this.download.bind(this)}>配置MasterRT各服务或组件初始化条件</ins>

                <aside className="mt-16">
                    <MrPanel title="MrServices">
                        <table>
                            <tbody>
                                <tr>
                                    <td>setResourcePool(pool: any)</td>
                                    <td>设置MrReq Pools</td>
                                </tr>
                                <tr>
                                    <td>setRules(rules: any)</td>
                                    <td>设置MrIf rules</td>
                                </tr>
                                <tr>
                                    <td>setHeaders(header: any)</td>
                                    <td>设置MrRequest Headers</td>
                                </tr>
                            </tbody>
                        </table>
                    </MrPanel>
                </aside>

                <main>
                </main>

            </article>
        );
    }
}