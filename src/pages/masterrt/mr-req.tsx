import * as React from 'react';
import * as mu from 'mzmu';
import * as _ from 'lodash';
import MrReq from '../../lib/mr-req/mr-req.component';
import MrResource from '../../lib/common/mr-resource';
import {MrAutoBind, MrEcharts, MrPanel, MrIf} from '../../lib';
import {Button} from 'antd';

interface MrsReqProps {
}

@MrAutoBind
export default class MrsReq extends React.Component<MrsReqProps, {}> {

    req: any = {
        pie: {
            resource: MrResource.pool('/assets/pie.json'),
            method: 'get'
        },

        line: {
            resource: MrResource.pool('/assets/line.json'),
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
        }
    };

    chartTypes: any = {
        pie: 'pie::ring::rose',
        line: 'line',
    };

    result(data) {
        this.setState({data});
    }

    changeReq(type: string) {
        let req = this.req[type];
        let chartTypes = this.chartTypes[type];
        this.setState({req, chartTypes});
    }

    state: any = {
        data: [],
        req: this.req['pie'],
        chartTypes: this.chartTypes['pie']
    };

    shouldComponentUpdate(nextProps, nextStates) {
        return !_.isEqual(nextStates, this.state);
    }

    render() {

        let {data = {}, req, chartTypes} = this.state;


        return (<div style={{height: 400}}>

            <Button type={'primary'} onClick={this.changeReq.bind(this, 'pie')}> Pie </Button>
            <Button type={'primary'} onClick={this.changeReq.bind(this, 'line')} className="ml-8"> Line </Button>

            <MrPanel title="回调::通过setState进行重新渲染" bodyStyle={{height: 300}} className="mt-16">
                <MrReq req={req} h100={true} result={this.result}>
                    <MrEcharts
                        data={data}
                        chartTypes={chartTypes}
                    ></MrEcharts>
                </MrReq>
            </MrPanel>

            <MrPanel title="传递::通过transmit传递数据，无渲染" bodyStyle={{height: 300}} className="mt-16">
                <MrReq req={req} h100={true} transmit="data">
                    <MrIf condition={true}>
                    <MrEcharts
                        chartTypes={chartTypes}
                    ></MrEcharts>
                    </MrIf>
                </MrReq>
            </MrPanel>
        </div>);
    }
}
