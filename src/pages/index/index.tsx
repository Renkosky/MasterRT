import React from 'react';
import Link from 'umi/link';
import Count from './components/Count';
import './index.less';
import MrAutoBind from '../../lib/common/mr-auto-bind';
import {MrFill, MrIf, MrCol, MrElse} from '../../lib';

interface IndexProps {
}

@MrAutoBind
export default class MrsIndex extends React.Component<IndexProps, {}> {


    componentWillMount() {
        console.debug(111111);
    }

    componentWillReceiveProps() {
        console.debug('00000000000000');
    }

    componentWillUnmount() {
        console.debug(22222);
    }

    componentDidMount() {
        console.debug(3333333);
    }

    render() {
        return (
            <div className={'mrs-index'}>
                <MrFill gutter={16} style={{height: 300}}>
                    <MrIf>
                        <MrCol span={1}>
                            1
                        </MrCol>
                    </MrIf>

                    <MrCol span={1}>
                        2 ~
                    </MrCol>

                    <div>
                        <MrCol span={3}>
                            3
                        </MrCol>
                    </div>

                    <MrIf condition={true}>
                        <MrCol span={1}>
                            4
                        </MrCol>
                        <MrIf condition={true}>
                            <MrCol span={1}>
                                5
                            </MrCol>
                        </MrIf>
                        <MrElse condition={true}>
                            <MrCol span={1}>
                                6
                            </MrCol>
                        </MrElse>
                        <MrElse>
                            <MrCol span={1}>
                                7
                            </MrCol>
                        </MrElse>
                    </MrIf>

                    <MrIf condition={false}>
                        <MrCol span={1}>
                            8
                        </MrCol>
                    </MrIf>
                </MrFill>
            </div>
        );
    }
}

