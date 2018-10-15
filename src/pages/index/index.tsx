import React from 'react';
import './index.less';
import MrAutoBind from '../../lib/mr-common/mr-auto-bind';
import {MrIf, MrPanel, MrEcharts} from '../../lib';
import {DatePicker} from 'antd';

const WeekPicker = DatePicker.WeekPicker;

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

        let chatData = [
            {
                'daigou_this_word': '水润',
                'daigou_this_word_frequency_ranking': 8,
                'growth_rate': -0.2260869565,
                'hot': true,
                'kol_this_word': '水润',
                'kol_this_word_frequency_ranking': 2,
                'last_seeker': 'Competitor',
                'last_share': 0.0039088391,
                'last_type': 'EFFICACY',
                'last_word': '水润',
                'last_word_frequency': 230,
                'last_word_frequency_ranking': 1,
                'share_change': -0.0007973862,
                'this_seeker': 'KOL',
                'this_share': 0.0031114529,
                'this_type': 'EFFICACY',
                'this_word': '水润',
                'this_word_frequency': 178,
                'this_word_frequency_ranking': 1,
                'this_word_frequency_rankingshift': 0,
                'this_word_frequency_valueshift': 52,
                'this_word_frequency_valueshift_percentage': 0.2260869565,
                'total_this_word': '水润',
                'total_this_word_frequency_ranking': 1
            },
            {
                'growth_rate': 0.0239130435,
                'hot': true,
                'kol_this_word': '浪漫',
                'kol_this_word_frequency_ranking': 1,
                'last_word_frequency_ranking': 2,
                'this_seeker': 'KOL',
                'this_share': 0.0018354076,
                'this_type': 'OTHER',
                'this_word': '浪漫',
                'this_word_frequency': 105,
                'this_word_frequency_ranking': 2,
                'this_word_frequency_rankingshift': 'new',
                'this_word_frequency_valueshift': -105,
                'this_word_frequency_valueshift_percentage': 'N/A',
                'total_this_word': '浪漫',
                'total_this_word_frequency_ranking': 2
            }, {
                'growth_rate': 0.0239130435,
                'hot': true,
                'last_word_frequency_ranking': 2,
                'this_seeker': 'Daigou',
                'this_share': 0.0016431268,
                'this_type': 'OTHER',
                'this_word': '专柜',
                'this_word_frequency': 94,
                'this_word_frequency_ranking': 3,
                'this_word_frequency_rankingshift': 'new',
                'this_word_frequency_valueshift': -94,
                'this_word_frequency_valueshift_percentage': 'N/A',
                'total_this_word': '专柜',
                'total_this_word_frequency_ranking': 3
            }, {
                'competitor_this_word': '元素',
                'competitor_this_word_frequency_ranking': 52,
                'growth_rate': 0.0239130435,
                'hot': true,
                'last_word_frequency_ranking': 2,
                'this_seeker': 'Competitor',
                'this_share': 0.0015032863,
                'this_type': 'INGREDIENT',
                'this_word': '元素',
                'this_word_frequency': 86,
                'this_word_frequency_ranking': 4,
                'this_word_frequency_rankingshift': 'new',
                'this_word_frequency_valueshift': -86,
                'this_word_frequency_valueshift_percentage': 'N/A',
                'total_this_word': '元素',
                'total_this_word_frequency_ranking': 4
            }, {
                'competitor_this_word': '模特',
                'competitor_this_word_frequency_ranking': 23,
                'growth_rate': 0.0239130435,
                'last_word_frequency_ranking': 2,
                'this_seeker': 'Competitor',
                'this_share': 0.0013984058,
                'this_type': 'OTHER',
                'this_word': '模特',
                'this_word_frequency': 80,
                'this_word_frequency_ranking': 5,
                'this_word_frequency_rankingshift': 'new',
                'this_word_frequency_valueshift': -80,
                'this_word_frequency_valueshift_percentage': 'N/A',
                'total_this_word': '模特',
                'total_this_word_frequency_ranking': 5
            }, {
                'growth_rate': 0.0239130435,
                'last_word_frequency_ranking': 2,
                'this_seeker': 'Competitor',
                'this_share': 0.0013634457,
                'this_type': 'OTHER',
                'this_word': '#国际时装周#',
                'this_word_frequency': 78,
                'this_word_frequency_ranking': 6,
                'this_word_frequency_rankingshift': 'new',
                'this_word_frequency_valueshift': -78,
                'this_word_frequency_valueshift_percentage': 'N/A',
                'total_this_word': '#国际时装周#',
                'total_this_word_frequency_ranking': 6
            }, {
                'daigou_this_word': 'CPB',
                'daigou_this_word_frequency_ranking': 6,
                'growth_rate': 0.0239130435,
                'hot': true,
                'last_word_frequency_ranking': 2,
                'this_seeker': 'Daigou',
                'this_share': 0.0013459656,
                'this_type': 'BRAND',
                'this_word': 'CPB',
                'this_word_frequency': 77,
                'this_word_frequency_ranking': 7,
                'this_word_frequency_rankingshift': 'new',
                'this_word_frequency_valueshift': -77,
                'this_word_frequency_valueshift_percentage': 'N/A',
                'total_this_word': 'CPB',
                'total_this_word_frequency_ranking': 7
            }, {
                'growth_rate': 0.0239130435,
                'last_word_frequency_ranking': 2,
                'this_seeker': 'Daigou',
                'this_share': 0.0013459656,
                'this_type': 'CATEGORY',
                'this_word': '防晒霜',
                'this_word_frequency': 77,
                'this_word_frequency_ranking': 7,
                'this_word_frequency_rankingshift': 'new',
                'this_word_frequency_valueshift': -77,
                'this_word_frequency_valueshift_percentage': 'N/A',
                'total_this_word': '防晒霜',
                'total_this_word_frequency_ranking': 7
            }, {
                'growth_rate': 0.0239130435,
                'last_word_frequency_ranking': 2,
                'this_seeker': 'Daigou',
                'this_share': 0.0013284855,
                'this_type': 'CATEGORY',
                'this_word': '染唇液',
                'this_word_frequency': 76,
                'this_word_frequency_ranking': 9,
                'this_word_frequency_rankingshift': 'new',
                'this_word_frequency_valueshift': -76,
                'this_word_frequency_valueshift_percentage': 'N/A',
                'total_this_word': '染唇液',
                'total_this_word_frequency_ranking': 9
            }, {
                'daigou_this_word': '蚕丝',
                'daigou_this_word_frequency_ranking': 2,
                'growth_rate': 0.0239130435,
                'last_word_frequency_ranking': 2,
                'this_seeker': 'Daigou',
                'this_share': 0.0013284855,
                'this_type': 'INGREDIENT',
                'this_word': '蚕丝',
                'this_word_frequency': 76,
                'this_word_frequency_ranking': 9,
                'this_word_frequency_rankingshift': 'new',
                'this_word_frequency_valueshift': -76,
                'this_word_frequency_valueshift_percentage': 'N/A',
                'total_this_word': '蚕丝',
                'total_this_word_frequency_ranking': 9
            }, {
                'growth_rate': 0.0239130435,
                'last_word_frequency_ranking': 2,
                'this_seeker': 'KOL',
                'this_share': 0.0013110055,
                'this_type': 'OTHER',
                'this_word': '设计师',
                'this_word_frequency': 75,
                'this_word_frequency_ranking': 11,
                'this_word_frequency_rankingshift': 'new',
                'this_word_frequency_valueshift': -75,
                'this_word_frequency_valueshift_percentage': 'N/A',
                'total_this_word': '设计师',
                'total_this_word_frequency_ranking': 11
            }, {
                'daigou_this_word': '痘痘',
                'daigou_this_word_frequency_ranking': 22,
                'growth_rate': 0.0239130435,
                'hot': true,
                'kol_this_word': '痘痘',
                'kol_this_word_frequency_ranking': 20,
                'last_word_frequency_ranking': 2,
                'this_seeker': 'KOL',
                'this_share': 0.0012760453,
                'this_type': 'OTHER',
                'this_word': '痘痘',
                'this_word_frequency': 73,
                'this_word_frequency_ranking': 12,
                'this_word_frequency_rankingshift': 'new',
                'this_word_frequency_valueshift': -73,
                'this_word_frequency_valueshift_percentage': 'N/A',
                'total_this_word': '痘痘',
                'total_this_word_frequency_ranking': 12
            }, {
                'growth_rate': 0.0239130435,
                'last_word_frequency_ranking': 2,
                'this_seeker': 'Daigou',
                'this_share': 0.0012585652,
                'this_type': 'OTHER',
                'this_word': 'jm',
                'this_word_frequency': 72,
                'this_word_frequency_ranking': 13,
                'this_word_frequency_rankingshift': 'new',
                'this_word_frequency_valueshift': -72,
                'this_word_frequency_valueshift_percentage': 'N/A',
                'total_this_word': 'jm',
                'total_this_word_frequency_ranking': 13
            }, {
                'daigou_this_word': '贝德玛',
                'daigou_this_word_frequency_ranking': 4,
                'growth_rate': 0.0239130435,
                'last_word_frequency_ranking': 2,
                'this_seeker': 'Daigou',
                'this_share': 0.0012410852,
                'this_type': 'BRAND',
                'this_word': '贝德玛',
                'this_word_frequency': 71,
                'this_word_frequency_ranking': 14,
                'this_word_frequency_rankingshift': 'new',
                'this_word_frequency_valueshift': -71,
                'this_word_frequency_valueshift_percentage': 'N/A',
                'total_this_word': '贝德玛',
                'total_this_word_frequency_ranking': 14
            }, {
                'growth_rate': 0.0239130435,
                'last_word_frequency_ranking': 2,
                'this_seeker': 'Daigou',
                'this_share': 0.0012410852,
                'this_type': 'OTHER',
                'this_word': '特价',
                'this_word_frequency': 71,
                'this_word_frequency_ranking': 14,
                'this_word_frequency_rankingshift': 'new',
                'this_word_frequency_valueshift': -71,
                'this_word_frequency_valueshift_percentage': 'N/A',
                'total_this_word': '特价',
                'total_this_word_frequency_ranking': 14
            }
        ];

        return (
            <div className={'mrs-index'}>

                {/*{ true? null : this.state[name].name }*/}

                {/*<If condition={true}>*/} {/*aaaaaa*/} {/*</If>*/}

                <DatePicker />

                <WeekPicker />

                <div style={{
                    height: 400,
                    paddingLeft: 100
                }}>
                    <MrEcharts data={chatData}
                               chartTypes={'scatter'}
                               setting={{
                                   'grid': {
                                       left: 60
                                   }
                               }}
                               transform={[
                                   {
                                       '@convert': {
                                           x: 'this_share',
                                           value: 'growth_rate',
                                           name: 'this_word'
                                       }
                                   }
                               ]} />
                </div>

                <MrIf condition={false}>
                    {() => <span>{this.state[name].name}</span>}
                </MrIf>

                <MrPanel title="MRI::MasterRT Integrated development environment" className="mt-32">
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
