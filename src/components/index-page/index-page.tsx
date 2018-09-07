/**
 * Component of IndexPage
 *
 * @author  mizi
 * @email   mizi.lin@admaster.com.cn
 * @createTime  2018/07/11 16:22:58
 * @weather 多云 东南风 阴晴之间，谨防紫外线侵扰
 */
import * as React from 'react';
import * as mu from 'mzmu';
import * as _ from 'lodash';
import {MrIf, MrElse, MrFill, MrCol, MrAutoBind, MrReq, MrPanel} from 'masterrt';
import {Button, Input, Icon} from 'antd';
import {$pool, $intl} from '../../services';
import './index-page.less';
import Link from 'umi/link';
import $theme from '../../theme';

interface IndexPageProps {}
interface IndexPageState {}

export default class IndexPage extends React.Component<IndexPageProps, IndexPageState> {

    Test5Services = $theme.getProviders('Test5Services');

    render () {
        return (<div className="p-16 index-page">

            <header>
                IndexPage Component
            </header>


            <div>
                {
                    mu.map($theme.config.routes, (route, module) => {
                        return <div key={module}><Link to={route.path[0]}>{route.menu}</Link></div>;
                    }, [])
                }
            </div>
        </div>);
    }
}