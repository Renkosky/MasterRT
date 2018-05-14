import React from 'react';
import './index.less';
import MrAutoBind from '../../lib/mr-common/mr-auto-bind';
import {MrIf, MrPanel} from '../../lib';

interface IndexProps {
}

/**
 *
 *
 *



 $MrIf(condition).then().else();

 function MrIf() {

        return {
            then: function() {
               return
            },

            else: function() {
            }


        }

  }

 *
 *
 *
 *
 */

@MrAutoBind
export default class MrsIndex extends React.Component<IndexProps, {}> {

    // constructor(props, context?: any, private a: string) {
    //     super(props, context);
    // }

    static defaultProps: any = {};

    state: any = {
        lily: {
            name: 'Lily Xu',
            age: 28,
            school: {
                address: 'NingBo',
                name: 'NingBo 大学'
            }
        },

        yuki: {
            name: 'yuki Li',
            age: 32,
            school: {
                address: 'Shanghai',
                name: 'Shanghai 大学'
            }
        }
    };

    componentWillMount() {
    }

    componentWillReceiveProps() {
    }

    componentWillUnmount() {
    }

    componentDidMount() {
    }

    render() {
        let name;

        return (
            <div className={'mrs-index'}>

                {/*{ true? null : this.state[name].name }*/}

                {/*<If condition={true}>*/} {/*aaaaaa*/} {/*</If>*/}

                <MrIf condition={false}>
                    {() => <span>{this.state[name].name}</span>}
                </MrIf>

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
