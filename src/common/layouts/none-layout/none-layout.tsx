/**
 *  of NoneLayout
 *
 * @author      mizi
 * @email       mizi.lin@admaster.com.cn
 * @create_time 2018/07/11 13:49:58
 * @weather     多云 东南风 阴晴之间，谨防紫外线侵扰
 */
import * as React from 'react';
import * as mu from 'mzmu';
import * as _ from 'lodash';
import {MrIf, MrElse, MrFill, MrCol, MrAutoBind, MrReq, MrPanel} from 'masterrt';
import {Button, Input, Icon} from 'antd';
import {$pool, $intl} from '../../../services';
import './none-layout.less';

interface NoneLayoutProps {}
interface NoneLayoutState {}

export default class NoneLayout extends React.Component<NoneLayoutProps, NoneLayoutState> {
    render () {
        return this.props.children;
    }
}