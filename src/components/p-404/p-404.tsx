/**
 * Component of P404
 *
 * @author  mizi
 * @email   mizi.lin@admaster.com.cn
 * @createTime  2018/07/18 14:03:45
 * @weather 多云 东南风 阴晴之间，谨防紫外线侵扰
 */
import * as React from 'react';
import * as mu from 'mzmu';
import * as _ from 'lodash';
import $theme from '../../theme';
import {MrIf, MrElse, MrFill, MrCol, MrAutoBind, MrReq, MrPanel} from 'masterrt';
import {Button, Input, Icon} from 'antd';
import {$pool, $intl} from '../../services';
import './p-404.less';
import Link from 'umi/link';

interface P404Props {}
interface P404State {}

export default class P404 extends React.Component<P404Props, P404State> {

    state: any = {

    };

    // constructor() {}

    render () {
        return (<div className="p-32">
            <div className="mt-32">这是一个不存在的页面 404</div>
            <div>
                <Link to={'/'}>GO INDEX</Link>
            </div>
        </div>);
    }
}