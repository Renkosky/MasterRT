import * as React from 'react';
import * as mu from 'mzmu';
import * as _ from 'lodash';
import MrReq from '../../lib/mr-req/mr-req.component';
import MrResource from '../../lib/common/mr-resource';
import {MrAutoBind, MrEcharts} from '../../lib';

interface MrsReqProps {
}

@MrAutoBind
export default class MrsReq extends React.Component<MrsReqProps, {}> {

    state: any = {
        data: []
    };

    data: any;

    result(data) {

        this.data = data;

        console.log(22222);

        // this.setState({data});
    }

    render() {

        // MrResource.pool()

        console.log(111111111);

        let {data = {}} = this.state;

        return (<div style={{height: 300}}>
            <MrReq req={{
                resource: MrResource.pool('/assets/test.json'),
                method: 'get'
            }} h100={true} result={this.result}>

                <MrEcharts
                    data={this.data}
                    chartTypes={'pie::ring::rose'}
                ></MrEcharts>

            </MrReq>
        </div>);
    }
}
