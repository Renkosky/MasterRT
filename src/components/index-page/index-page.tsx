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
import './index-page.less';
import Link from 'umi/link';
import $theme from '../../theme';
import router from 'umi/router';
import {withRouter} from 'react-router';

interface IndexPageProps {
}

interface IndexPageState {
}

export default class IndexPage extends React.Component<IndexPageProps, IndexPageState> {
    render() {
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