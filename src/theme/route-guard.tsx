import React from 'react';
import {Route} from 'react-router';
import $theme from '.';
import $routeGuard from './route-guard.mri';

export default (props) => {
    const {location, children} = props;
    const {pathname} = location;
    const module = $theme.reRoutes()[pathname];

    // umi@1 的写法
    // return <Route {...rest} render={(props) => $routeGuard(module, props) ? render(props) : null} />;
    return $routeGuard(module, props) ? children : null;
}
