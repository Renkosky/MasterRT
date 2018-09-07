/**
 * Component of BaseLayout
 *
 * @author  mizi
 * @email   mizi.lin@admaster.com.cn
 * @createTime  2018/07/11 16:02:03
 * @weather 多云 东南风 阴晴之间，谨防紫外线侵扰
 */
import * as React from 'react';
import $theme from '../../../theme';
import * as mu from 'mzmu';
import * as _ from 'lodash';
import {MrIf, MrElse, MrFill, MrCol, MrAutoBind, MrReq, MrPanel} from 'masterrt';
import {Button, Input, Icon} from 'antd';
import {$pool, $intl} from '../../../services';
import './base-layout.less';

interface BaseLayoutProps {}
interface BaseLayoutState {}

export default class BaseLayout extends React.Component<BaseLayoutProps, BaseLayoutState> {

    $const: any = $theme.getProviders('$const');

    render () {
        return (
            <article>
                <header>{$theme.theme} HEADER {this.$const.THEME}</header>
                <section>
                    <main>{this.props.children}</main>
                </section>
            </article>
        );
    }
}