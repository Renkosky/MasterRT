import React from 'react';
import {Route} from 'react-router';
import $theme from '.';
import $routeGuard from './route-guard.mri';
import * as mu from 'mzmu';
import {MrServices} from 'masterrt';
import * as _ from 'lodash';

export default (args) => {
    const {render, ...rest} = args;
    const {location} = rest;
    const {pathname} = location;
    const module = $theme.reRoutes()[pathname];

    // 为演示的时候用的，每个页面可能使用不同的 header
    // mu.run(_.get(module, 'src'), (src) => {
    //
    //     src = src.split('::')[0];
    //
    //     let map = {
    //         "test.loreal.visualmaster.com.cn/bpidesktop": "ba6d2888c546cdf10861871c908a46ea68a00075164a6eed38b16bfe9fff88",
    //         "test.new-socialx.visualmaster.com.cn": "d73f6724a5ee981587759b6854bf0364b660016c164c6360598164cb5c6198",
    //         "test.loreal.visualmaster.com.cn/csidashboard": "0cd4691cc77edb97ce2fa84aa10d512c9000015f164ac7e68e0164b1a4c4e0",
    //         "test.seipost.visualmaster.com.cn": "5ab540f1c4787f7fd33345191799d0e2c18002a4164a6eed38c16bfe9fff8c",
    //         "test.loreal.visualmaster.com.cn/ksidashboard": "c09332fed385bbd55a2cdc4b495e6e0bd0e002b1164a6eed39a16bfe9fff99",
    //         "test.loreal.visualmaster.com.cn/ciidashboard": "25d1e4632a9e2944f1f270ea4eb55e27c2e002be164c63d3212164cb638e12",
    //         "test.tseipost.visualmaster.com.cn": "9e7a7395a55f1b74077a97fccdad5202c16002d8164a6eed39a16bfe9fff9a",
    //         "test.one-system.visualmaster.com.cn": "ee4a09b16708aa1234d6e57b88c42f0ad140030c164a6eed39a16bfe9fff9a",
    //         "test.loreal.visualmaster.com.cn":"4b59bb049df4eb61d8ea721da191d2e84e0001a164a6eed38816bfe9fff87",
    //         "test.csi.visualmaster.com.cn": "0c0e83d658519ea6d4453bf050cdd65d9a000193164a7a4e69d164accb429d"
    //     };
    //
    //     let originMap = {
    //         'dbpi': 'test.loreal.visualmaster.com.cn/bpidesktop',
    //         'social': 'test.new-socialx.visualmaster.com.cn',
    //         'sei-post': 'test.seipost.visualmaster.com.cn',
    //         'ksi': 'test.loreal.visualmaster.com.cn/ksidashboard',
    //         'one-loreal-cii': 'test.loreal.visualmaster.com.cn/ciidashboard',
    //         'one-loreal': 'test.loreal.visualmaster.com.cn',
    //         'csi': 'test.loreal.visualmaster.com.cn/csidashboard',
    //         'csi-admaster': 'test.csi.visualmaster.com.cn',
    //     };
    //
    //     let origin = originMap[src];
    //
    //     MrServices.setHeaders({
    //         'X-TOKEN': map[origin],
    //         'X-ORIGIN': origin,
    //         'X-LANG': 'en',
    //     });
    // });

    return <Route {...rest} render={(props) => $routeGuard(module, props) ? render(props) : null} />;
}
