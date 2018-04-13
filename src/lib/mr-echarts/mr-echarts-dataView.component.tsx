import * as React from 'react';
import * as mu from 'mzmu';

interface MrEchartsDataViewProps {
    data: any[]
}

export class MrEchartsDataView extends React.Component<MrEchartsDataViewProps, {}> {
    render() {
        let {data} = this.props;
        return <section className="ms-echarts-dataView">
            <table>
                <tbody>
                    {data.map((item, inx)=> {
                        return <tr key={inx}>
                            {item.map((o, inx)=> {
                                return <td key={`${o}-${inx}`}>{mu.format(o)}</td>
                            })}
                        </tr>
                    })}
                </tbody>
            </table>
        </section>
    }
}