import * as React from 'react';
import * as mu from 'mzmu';

export interface MrEchartsDataViewProps {
    dataView: any[]
}

export class MrEchartsDataView extends React.Component<MrEchartsDataViewProps, {}> {
    render() {
        let {dataView: data} = this.props;
        return <section className="mr-echarts-dataView">
            <table>
                <tbody>
                    {data.map((item, inx)=> {
                        return <tr key={inx}>
                            {item.map((o, inx)=> {
                                return <td key={inx}>{mu.format(o) || '-'}</td>
                            })}
                        </tr>
                    })}
                </tbody>
            </table>
        </section>
    }
}