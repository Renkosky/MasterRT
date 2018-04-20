import * as React from 'react';
import * as mu from 'mzmu';
import * as _ from 'lodash';
import MrEchartsPanel from '../../lib/mr-echarts/mr-echarts-panel.component';
import MrResource from '../../lib/common/mr-resource';

interface MrsEchartsPanelProps {
}

export default class MrsEchartsPanel extends React.Component<MrsEchartsPanelProps, {}> {

    req: any = {
        api: 'line',
        method: 'get',
        // 数据修改
        transform: (data) => {
            return mu.map(data, (o) => {
                o.name = o.type;
                o.x = o.date;
                o.value = o.volume;
                return o;
            });
        }
    };

    pie: any[] = [
        {
            value: 78499,
            name: 'A0'
        },
        {
            value: 131536,
            name: 'A Entry'
        },
        {
            value: 246050,
            name: 'A Main'
        },
        {
            value: 284390,
            name: 'A Plus'
        },
        {
            value: 394088,
            name: 'B'
        },
        {
            value: 35022,
            name: 'C'
        },
        {
            value: 316762,
            name: 'SUV'
        },
        {
            value: 34069,
            name: 'MPV'
        }
    ];

    render() {
        return (<div>

            <MrEchartsPanel
                title="Use Data"
                style={{height: 400}} chartTypes={'pie::ring::rose'} data={this.pie} />

            <MrEchartsPanel
                title="Use Req"
                style={{height: 400}} chartTypes={'line'} req={this.req} />

        </div>);
    }
}