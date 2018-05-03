import React from 'react';
import Link from 'umi/link';
import Count from './components/Count';
import './index.less';
import MrAutoBind from '../../lib/common/mr-auto-bind';
import {MrFill, MrIf, MrCol, MrElse, MrPanel} from '../../lib';

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
                <MrPanel title="MRI::MasterRT Integrated development environment">
                    <div>MRI是一套集成开发环境</div>
                    <div>以 React + UMI + TypeScript + LESS 构成</div>
                    <div>以 Ant Design (React) 提供UI控件和设计风格</div>
                    <div>以 MasterRT补充部分UI和大部分的解决方案</div>
                    <div>以 THEME配置集成开发的前端研发项目</div>
                </MrPanel>
            </div>
        );
    }
}

