import * as React from 'react';
import * as mu from 'mzmu';
import * as _ from 'lodash';
import {Table} from 'antd';
import {MrServices} from '..';

interface MrAntdTableProps {
    nodata: React.Component;
    [propName: string]: any
}

export default class MrAntdTable extends React.Component<any, {}> {
    render() {
        let {nodata, children, ...props} = this.props;
        mu.run(nodata || MrServices.getNoDataComponent(), (nodata) => {
            _.set(props, 'locale.emptyText', nodata)
        });
        return <Table {...props}>{children}</Table>;
    }
}
