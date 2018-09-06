/**
 * Component of DemoIndex
 *
 * @author  mizi
 * @email   mizi.lin@admaster.com.cn
 * @createTime  2018/09/06 14:46:55
 * @weather 多云 南风 阴晴之间，谨防紫外线侵扰
 */
import * as React from 'react';
import * as mu from 'mzmu';
import * as _ from 'lodash';
import $theme from 'src/theme';
import {MrIf, MrElse, MrFill, MrCol, MrAutoBind, MrReq, MrPanel} from 'masterrt';
import {Button, Input, Icon} from 'antd';
import {$pool, $intl} from 'src/services';
import './demo-index.less';

interface DemoIndexProps {}
interface DemoIndexState {}

export default class DemoIndex extends React.Component<DemoIndexProps, DemoIndexState> {

    state: any = {

    };

    // constructor() {}

    render () {
        return (<div>DemoIndex Component</div>);
    }
}