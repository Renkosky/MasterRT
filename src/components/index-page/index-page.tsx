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
import {Icon} from 'antd';
import AntdIcon from '@ant-design/icons-react';
import { AntDesignOutline, DashboardOutline, TwitterOutline } from '@ant-design/icons';

// @ts-ignore
import bbsSvg from '../../assets/bbs.svg';

console.debug(bbsSvg);

bbsSvg.width = '2em';
bbsSvg.height = '2em';



// console.dir(ReactIcon, BbsFill);
// import BbsSvg from 'src/common/svgs/svg/bbs.svg';

interface IndexPageProps {
}

interface IndexPageState {
}

export default class IndexPage extends React.Component<IndexPageProps, IndexPageState> {
    render(): JSX.Element {
        return (<div className="p-16 index-page">

            <header>
                IndexPage Component
            </header>

            <Icon type="step-forward"  />
            <Icon type="fast-backward" theme="outlined" />

            <Icon component={bbsSvg}></Icon>

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