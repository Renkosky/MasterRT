import * as React from 'react';
import { MrPanel, MrEcharts, MrEchartsPanel } from '../../lib';
import './masterrt.less';
import MrCode from '../../lib/mr-code/mr-code.component';
import { default as dataSource } from '../../services/data-source';
import * as mu from 'mzmu';

interface MrsMrEchartsProps {}

export default class MrsMrEcharts extends React.Component<MrsMrEchartsProps, {}> {
    data: any = {
        pie: [
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
        ]
    };

    cloud: any = [
        {
            id: 'bd2f198d53',
            name: '梦想家',
            name_en: 'Dreamer',
            ruleId: 78191,
            value: 57288
        },
        {
            id: '872561472f',
            name: '欧莱雅',
            name_en: 'Loreal',
            ruleId: 78191,
            value: 51359
        },
        {
            id: '969a1b1388',
            name: '[熊猫]',
            name_en: '[panda]',
            ruleId: 78191,
            value: 43426
        },
        {
            id: '2177ae3024',
            name: '态度',
            name_en: 'attitude',
            ruleId: 78191,
            value: 37431
        },
        {
            id: '2fda3d6ec6',
            name: '你们',
            name_en: 'You',
            ruleId: 78191,
            value: 34277
        },
        {
            id: 'e1d9813078',
            name: '丝绒',
            name_en: 'velvet',
            ruleId: 78191,
            value: 18206
        },
        {
            id: '2177c12258',
            name: '@妖精边儿',
            name_en: 'A goblin',
            ruleId: 78191,
            value: 17927
        },
        {
            id: 'f15c3fe1a3',
            name: '[心]',
            name_en: '[heart]',
            ruleId: 78191,
            value: 13303
        },
        {
            id: 'e5080ea61d',
            name: '欧莱雅口红',
            name_en: "L'OREAL lipstick",
            ruleId: 78191,
            value: 5978
        },
        {
            id: 'c5b3a9cddd',
            name: '[羞嗒嗒]',
            name_en: '[clatter]',
            ruleId: 78191,
            value: 5181
        },
        {
            id: '23a8c7fe86',
            name: '限量版',
            name_en: 'Limited Edition',
            ruleId: 78191,
            value: 4960
        },
        {
            id: '1fc1afc5c5',
            name: '继续',
            name_en: 'Continue',
            ruleId: 78191,
            value: 4303
        },
        {
            id: 'dda9ce94cd',
            name: '@巴黎欧莱雅',
            name_en: "@ Paris L'OREAL",
            ruleId: 78191,
            value: 3613
        },
        {
            id: 'fcc336051f',
            name: '甜蜜',
            name_en: 'Sweet',
            ruleId: 78191,
            value: 3531
        },
        {
            id: 'b631a889f9',
            name: '照顾',
            name_en: 'look after',
            ruleId: 78191,
            value: 3161
        },
        {
            id: '27e787eaf3',
            name: '唇膏',
            name_en: 'Lipstick',
            ruleId: 78191,
            value: 2939
        },
        {
            id: '4aff495540',
            name: '洗面奶',
            name_en: 'Wash milk',
            ruleId: 78191,
            value: 2701
        },
        {
            id: '5293c64edc',
            name: '低至',
            name_en: 'Low to',
            ruleId: 78191,
            value: 2381
        },
        {
            id: '896a78742a',
            name: '努力',
            name_en: 'Strive',
            ruleId: 78191,
            value: 41726
        },
        {
            id: 'a49f6a222b',
            name: '来说',
            name_en: 'For example',
            ruleId: 78191,
            value: 34187
        },
        {
            id: '4cc322c8d0',
            name: '推出',
            name_en: 'Introduction',
            ruleId: 78191,
            value: 23757
        },
        {
            id: 'c0ee1c1e8c',
            name: '限量',
            name_en: 'Limited quantity',
            ruleId: 78191,
            value: 18633
        },
        {
            id: 'c62d4162f7',
            name: '外壳',
            name_en: 'Shell',
            ruleId: 78191,
            value: 18329
        },
        {
            id: '2e1297474d',
            name: '理念',
            name_en: 'Idea',
            ruleId: 78191,
            value: 17927
        },
        {
            id: 'c2b7e69b90',
            name: 'loreal',
            name_en: 'LOREAL',
            ruleId: 78191,
            value: 9476
        },
        {
            id: '6c5522ca8a',
            name: 'it',
            name_en: 'It',
            ruleId: 78191,
            value: 9189
        },
        {
            id: '3a6febc6e1',
            name: '@bobbi_j',
            name_en: '@bobbi_j',
            ruleId: 78191,
            value: 7678
        },
        {
            id: 'de2f618abd',
            name: '@aniho-',
            name_en: '@aniho-',
            ruleId: 78191,
            value: 5962
        },
        {
            id: 'f5b0759b4c',
            name: '美的',
            name_en: 'Beautiful',
            ruleId: 78191,
            value: 4993
        },
        {
            id: 'fd0cb5d212',
            name: '小仙女',
            name_en: 'Fairy maiden',
            ruleId: 78191,
            value: 4451
        },
        {
            id: 'c875605bfd',
            name: '值得',
            name_en: 'Worth',
            ruleId: 78191,
            value: 4336
        },
        {
            id: 'b4f617f5c7',
            name: '[二哈]',
            name_en: '[two HA]',
            ruleId: 78191,
            value: 3720
        },
        {
            id: '88dcbf0eb8',
            name: '[赞]',
            name_en: '[praise]',
            ruleId: 78191,
            value: 3564
        },
        {
            id: '5cc1bd4d93',
            name: '面膜',
            name_en: 'Facial mask',
            ruleId: 78191,
            value: 3498
        },
        {
            id: 'dd9fc2c0a1',
            name: '工作',
            name_en: 'work',
            ruleId: 78191,
            value: 3210
        },
        {
            id: '9c7fd1442d',
            name: '漂亮',
            name_en: 'Well done!',
            ruleId: 78191,
            value: 2480
        },
        {
            id: '4a7e09793f',
            name: '大声',
            name_en: 'loud',
            ruleId: 78191,
            value: 2381
        },
        {
            id: '5335f7db42',
            name: '表白日',
            name_en: 'Expressing Love Day',
            ruleId: 78191,
            value: 2381
        },
        {
            id: '1c573d9110',
            name: '宣言',
            name_en: 'declaration',
            ruleId: 78191,
            value: 37340
        },
        {
            id: '6748d5a954',
            name: '@保护我方董阿又',
            name_en: '@ protect my Dong Ayou',
            ruleId: 78191,
            value: 34458
        },
        {
            id: '03a329e6a2',
            name: '永远',
            name_en: 'forever',
            ruleId: 78191,
            value: 18518
        },
        {
            id: '935f99034b',
            name: '打造',
            name_en: 'make',
            ruleId: 78191,
            value: 18206
        },
        {
            id: '6e7cbefc8e',
            name: '一抹',
            name_en: 'faint trace of something',
            ruleId: 78191,
            value: 17927
        },
        {
            id: '3964450f8c',
            name: '[微风]',
            name_en: '[breeze]',
            ruleId: 78191,
            value: 9271
        },
        {
            id: '5729a610f4',
            name: '#董又霖#',
            name_en: 'Dong He Lin',
            ruleId: 78191,
            value: 8277
        },
        {
            id: 'bfa23313cf',
            name: '性价比',
            name_en: 'Cost performance',
            ruleId: 78191,
            value: 5674
        },
        {
            id: '56e00434ba',
            name: '不错',
            name_en: 'Pretty good',
            ruleId: 78191,
            value: 4081
        },
        {
            id: '60aba8d10a',
            name: '男士',
            name_en: 'Man',
            ruleId: 78191,
            value: 3367
        },
        {
            id: '31e49e1906',
            name: 'jelly',
            name_en: 'Jelly',
            ruleId: 78191,
            value: 3087
        },
        {
            id: '6c4c092664',
            name: '表白',
            name_en: 'Confession',
            ruleId: 78191,
            value: 2751
        },
        {
            id: 'b48f5ba684',
            name: '出来',
            name_en: 'come out',
            ruleId: 78191,
            value: 2611
        },
        {
            id: '1fb2468360',
            name: '就要',
            name_en: 'Be going to',
            ruleId: 78191,
            value: 2406
        },
        {
            id: '222ffd7281',
            name: '一起来',
            name_en: 'Come along',
            ruleId: 78191,
            value: 2381
        },
        {
            id: 'ba92340735',
            name: '来袭',
            name_en: 'Attack',
            ruleId: 78191,
            value: 2381
        },
        {
            id: 'e89f24f8be',
            name: '[鲜花]',
            name_en: '[flowers]',
            ruleId: 78191,
            value: 2348
        },
        {
            id: '86c8717ce1',
            name: '最好',
            name_en: 'Best',
            ruleId: 78191,
            value: 45397
        },
        {
            id: '1f9eff0603',
            name: '你值得拥有',
            name_en: 'You deserve it',
            ruleId: 78191,
            value: 41709
        },
        {
            id: '774df0bc26',
            name: '口红',
            name_en: 'Lipstick',
            ruleId: 78191,
            value: 34269
        },
        {
            id: 'd83b27a2a3',
            name: '戛纳',
            name_en: 'Cannes',
            ruleId: 78191,
            value: 25646
        },
        {
            id: 'a7945e75ca',
            name: '携手',
            name_en: 'hand in hand',
            ruleId: 78191,
            value: 18781
        },
        {
            id: '1964504422',
            name: '绝对',
            name_en: 'Absolutely',
            ruleId: 78191,
            value: 18222
        },
        {
            id: 'a1f781dae9',
            name: '尤其',
            name_en: 'especially',
            ruleId: 78191,
            value: 18124
        },
        {
            id: 'bb21d6f6f4',
            name: '夺目',
            name_en: 'Dazzling',
            ruleId: 78191,
            value: 17927
        },
        {
            id: 'c5918b6659',
            name: 'worth',
            name_en: 'Worth',
            ruleId: 78191,
            value: 9189
        },
        {
            id: 'bcf00e3ed5',
            name: '真的',
            name_en: 'True',
            ruleId: 78191,
            value: 6545
        },
        {
            id: 'a2617f9bf8',
            name: '@宝兔330',
            name_en: '@ Bao rabbit 330',
            ruleId: 78191,
            value: 5633
        },
        {
            id: '3a85181e8e',
            name: '一起',
            name_en: 'together',
            ruleId: 78191,
            value: 5280
        },
        {
            id: '4d45f90234',
            name: '巴黎',
            name_en: 'Paris',
            ruleId: 78191,
            value: 5099
        },
        {
            id: '3a6d3bda71',
            name: '不能',
            name_en: 'cannot',
            ruleId: 78191,
            value: 4500
        },
        {
            id: '61ee5be171',
            name: '@莉娜丫头',
            name_en: '@ Lena',
            ruleId: 78191,
            value: 4442
        },
        {
            id: 'c9cc18e801',
            name: '@你的笑那么美好w',
            name_en: '@ your smile is so good w',
            ruleId: 78191,
            value: 3867
        },
        {
            id: '0121f11690',
            name: '拥有',
            name_en: 'Have',
            ruleId: 78191,
            value: 3605
        },
        {
            id: '8bf2c38b0e',
            name: '[鼓掌]',
            name_en: '[Applause]',
            ruleId: 78191,
            value: 3514
        },
        {
            id: 'fc1f266bc8',
            name: '美好',
            name_en: 'fine',
            ruleId: 78191,
            value: 3079
        },
        {
            id: '3d96750f46',
            name: '邀请',
            name_en: 'Invitation',
            ruleId: 78191,
            value: 2463
        },
        {
            id: 'cf9942df10',
            name: '部分',
            name_en: 'Part',
            ruleId: 78191,
            value: 2389
        },
        {
            id: 'df9390f829',
            name: '小小',
            name_en: 'Small',
            ruleId: 78191,
            value: 50841
        },
        {
            id: 'a843c03095',
            name: '#欧莱雅值得说#',
            name_en: "L'OREAL is worth saying",
            ruleId: 78191,
            value: 25810
        },
        {
            id: '8ef4886033',
            name: '颜色',
            name_en: 'colour',
            ruleId: 78191,
            value: 22238
        },
        {
            id: 'ce5bf5e0c4',
            name: '@m三层肉',
            name_en: '@m three layers of meat',
            ruleId: 78191,
            value: 18337
        },
        {
            id: 'acd3384a13',
            name: '化妆包',
            name_en: 'Cosmetic Bag',
            ruleId: 78191,
            value: 17927
        },
        {
            id: '4c89b501c4',
            name: '女孩子',
            name_en: 'Girl',
            ruleId: 78191,
            value: 17927
        },
        {
            id: '5c20176649',
            name: '好看',
            name_en: 'Good-looking',
            ruleId: 78191,
            value: 6389
        },
        {
            id: '28aa475a79',
            name: '喜欢',
            name_en: 'like',
            ruleId: 78191,
            value: 6208
        },
        {
            id: 'e9b58f9ec4',
            name: '超高',
            name_en: 'super high',
            ruleId: 78191,
            value: 4656
        },
        {
            id: '2c27a0b056',
            name: '听说',
            name_en: 'hear',
            ruleId: 78191,
            value: 4459
        },
        {
            id: '033c067dab',
            name: '忙着',
            name_en: 'be busy',
            ruleId: 78191,
            value: 3153
        },
        {
            id: 'dff55d7c4b',
            name: '洁面膏',
            name_en: 'Cleansing Cream',
            ruleId: 78191,
            value: 2956
        },
        {
            id: '81ba0a3b3a',
            name: '美妆',
            name_en: 'Beauty make-up',
            ruleId: 78191,
            value: 2389
        }
    ];

    cloud1: any = [
        {
            id: 'bd2f198d53',
            name: '梦想家222',
            name_en: 'Dreamer',
            ruleId: 78191,
            value: 57288
        },
        {
            id: '872561472f',
            name: '欧莱雅',
            name_en: 'Loreal',
            ruleId: 78191,
            value: 51359
        },
        {
            id: '969a1b1388',
            name: '[熊猫]',
            name_en: '[panda]',
            ruleId: 78191,
            value: 43426
        },
        {
            id: '2177ae3024',
            name: '态度',
            name_en: 'attitude',
            ruleId: 78191,
            value: 37431
        },
        {
            id: '2fda3d6ec6',
            name: '你们',
            name_en: 'You',
            ruleId: 78191,
            value: 34277
        },
        {
            id: 'e1d9813078',
            name: '丝绒',
            name_en: 'velvet',
            ruleId: 78191,
            value: 18206
        },
        {
            id: '2177c12258',
            name: '@妖精边儿',
            name_en: 'A goblin',
            ruleId: 78191,
            value: 17927
        },
        {
            id: 'f15c3fe1a3',
            name: '[心]',
            name_en: '[heart]',
            ruleId: 78191,
            value: 13303
        },
        {
            id: 'e5080ea61d',
            name: '欧莱雅口红',
            name_en: "L'OREAL lipstick",
            ruleId: 78191,
            value: 5978
        },
        {
            id: 'c5b3a9cddd',
            name: '[羞嗒嗒]',
            name_en: '[clatter]',
            ruleId: 78191,
            value: 5181
        },
        {
            id: '23a8c7fe86',
            name: '限量版',
            name_en: 'Limited Edition',
            ruleId: 78191,
            value: 4960
        },
        {
            id: '1fc1afc5c5',
            name: '继续',
            name_en: 'Continue',
            ruleId: 78191,
            value: 4303
        },
        {
            id: 'dda9ce94cd',
            name: '@巴黎欧莱雅',
            name_en: "@ Paris L'OREAL",
            ruleId: 78191,
            value: 3613
        },
        {
            id: 'fcc336051f',
            name: '甜蜜',
            name_en: 'Sweet',
            ruleId: 78191,
            value: 3531
        },
        {
            id: 'b631a889f9',
            name: '照顾',
            name_en: 'look after',
            ruleId: 78191,
            value: 3161
        },
        {
            id: '27e787eaf3',
            name: '唇膏',
            name_en: 'Lipstick',
            ruleId: 78191,
            value: 2939
        },
        {
            id: '4aff495540',
            name: '洗面奶',
            name_en: 'Wash milk',
            ruleId: 78191,
            value: 2701
        },
        {
            id: '5293c64edc',
            name: '低至',
            name_en: 'Low to',
            ruleId: 78191,
            value: 2381
        },
        {
            id: '896a78742a',
            name: '努力',
            name_en: 'Strive',
            ruleId: 78191,
            value: 41726
        },
        {
            id: 'a49f6a222b',
            name: '来说',
            name_en: 'For example',
            ruleId: 78191,
            value: 34187
        },
        {
            id: '4cc322c8d0',
            name: '推出',
            name_en: 'Introduction',
            ruleId: 78191,
            value: 23757
        },
        {
            id: 'c0ee1c1e8c',
            name: '限量',
            name_en: 'Limited quantity',
            ruleId: 78191,
            value: 18633
        },
        {
            id: 'c62d4162f7',
            name: '外壳',
            name_en: 'Shell',
            ruleId: 78191,
            value: 18329
        },
        {
            id: '2e1297474d',
            name: '理念',
            name_en: 'Idea',
            ruleId: 78191,
            value: 17927
        },
        {
            id: 'c2b7e69b90',
            name: 'loreal',
            name_en: 'LOREAL',
            ruleId: 78191,
            value: 9476
        },
        {
            id: '6c5522ca8a',
            name: 'it',
            name_en: 'It',
            ruleId: 78191,
            value: 9189
        },
        {
            id: '3a6febc6e1',
            name: '@bobbi_j',
            name_en: '@bobbi_j',
            ruleId: 78191,
            value: 7678
        },
        {
            id: 'de2f618abd',
            name: '@aniho-',
            name_en: '@aniho-',
            ruleId: 78191,
            value: 5962
        },
        {
            id: 'f5b0759b4c',
            name: '美的',
            name_en: 'Beautiful',
            ruleId: 78191,
            value: 4993
        },
        {
            id: 'fd0cb5d212',
            name: '小仙女',
            name_en: 'Fairy maiden',
            ruleId: 78191,
            value: 4451
        },
        {
            id: 'c875605bfd',
            name: '值得',
            name_en: 'Worth',
            ruleId: 78191,
            value: 4336
        },
        {
            id: 'b4f617f5c7',
            name: '[二哈]',
            name_en: '[two HA]',
            ruleId: 78191,
            value: 3720
        },
        {
            id: '88dcbf0eb8',
            name: '[赞]',
            name_en: '[praise]',
            ruleId: 78191,
            value: 3564
        },
        {
            id: '5cc1bd4d93',
            name: '面膜',
            name_en: 'Facial mask',
            ruleId: 78191,
            value: 3498
        },
        {
            id: 'dd9fc2c0a1',
            name: '工作',
            name_en: 'work',
            ruleId: 78191,
            value: 3210
        },
        {
            id: '9c7fd1442d',
            name: '漂亮',
            name_en: 'Well done!',
            ruleId: 78191,
            value: 2480
        },
        {
            id: '4a7e09793f',
            name: '大声',
            name_en: 'loud',
            ruleId: 78191,
            value: 2381
        },
        {
            id: '5335f7db42',
            name: '表白日',
            name_en: 'Expressing Love Day',
            ruleId: 78191,
            value: 2381
        },
        {
            id: '1c573d9110',
            name: '宣言',
            name_en: 'declaration',
            ruleId: 78191,
            value: 37340
        },
        {
            id: '6748d5a954',
            name: '@保护我方董阿又',
            name_en: '@ protect my Dong Ayou',
            ruleId: 78191,
            value: 34458
        },
        {
            id: '03a329e6a2',
            name: '永远',
            name_en: 'forever',
            ruleId: 78191,
            value: 18518
        },
        {
            id: '935f99034b',
            name: '打造',
            name_en: 'make',
            ruleId: 78191,
            value: 18206
        },
        {
            id: '6e7cbefc8e',
            name: '一抹',
            name_en: 'faint trace of something',
            ruleId: 78191,
            value: 17927
        },
        {
            id: '3964450f8c',
            name: '[微风]',
            name_en: '[breeze]',
            ruleId: 78191,
            value: 9271
        },
        {
            id: '5729a610f4',
            name: '#董又霖#',
            name_en: 'Dong He Lin',
            ruleId: 78191,
            value: 8277
        },
        {
            id: 'bfa23313cf',
            name: '性价比',
            name_en: 'Cost performance',
            ruleId: 78191,
            value: 5674
        },
        {
            id: '56e00434ba',
            name: '不错',
            name_en: 'Pretty good',
            ruleId: 78191,
            value: 4081
        },
        {
            id: '60aba8d10a',
            name: '男士',
            name_en: 'Man',
            ruleId: 78191,
            value: 3367
        },
        {
            id: '31e49e1906',
            name: 'jelly',
            name_en: 'Jelly',
            ruleId: 78191,
            value: 3087
        },
        {
            id: '6c4c092664',
            name: '表白',
            name_en: 'Confession',
            ruleId: 78191,
            value: 2751
        },
        {
            id: 'b48f5ba684',
            name: '出来',
            name_en: 'come out',
            ruleId: 78191,
            value: 2611
        },
        {
            id: '1fb2468360',
            name: '就要',
            name_en: 'Be going to',
            ruleId: 78191,
            value: 2406
        },
        {
            id: '222ffd7281',
            name: '一起来',
            name_en: 'Come along',
            ruleId: 78191,
            value: 2381
        },
        {
            id: 'ba92340735',
            name: '来袭',
            name_en: 'Attack',
            ruleId: 78191,
            value: 2381
        },
        {
            id: 'e89f24f8be',
            name: '[鲜花]',
            name_en: '[flowers]',
            ruleId: 78191,
            value: 2348
        },
        {
            id: '86c8717ce1',
            name: '最好',
            name_en: 'Best',
            ruleId: 78191,
            value: 45397
        },
        {
            id: '1f9eff0603',
            name: '你值得拥有',
            name_en: 'You deserve it',
            ruleId: 78191,
            value: 41709
        },
        {
            id: '774df0bc26',
            name: '口红',
            name_en: 'Lipstick',
            ruleId: 78191,
            value: 34269
        },
        {
            id: 'd83b27a2a3',
            name: '戛纳',
            name_en: 'Cannes',
            ruleId: 78191,
            value: 25646
        },
        {
            id: 'a7945e75ca',
            name: '携手',
            name_en: 'hand in hand',
            ruleId: 78191,
            value: 18781
        },
        {
            id: '1964504422',
            name: '绝对',
            name_en: 'Absolutely',
            ruleId: 78191,
            value: 18222
        },
        {
            id: 'a1f781dae9',
            name: '尤其',
            name_en: 'especially',
            ruleId: 78191,
            value: 18124
        },
        {
            id: 'bb21d6f6f4',
            name: '夺目',
            name_en: 'Dazzling',
            ruleId: 78191,
            value: 17927
        },
        {
            id: 'c5918b6659',
            name: 'worth',
            name_en: 'Worth',
            ruleId: 78191,
            value: 9189
        },
        {
            id: 'bcf00e3ed5',
            name: '真的',
            name_en: 'True',
            ruleId: 78191,
            value: 6545
        },
        {
            id: 'a2617f9bf8',
            name: '@宝兔330',
            name_en: '@ Bao rabbit 330',
            ruleId: 78191,
            value: 5633
        },
        {
            id: '3a85181e8e',
            name: '一起',
            name_en: 'together',
            ruleId: 78191,
            value: 5280
        },
        {
            id: '4d45f90234',
            name: '巴黎',
            name_en: 'Paris',
            ruleId: 78191,
            value: 5099
        },
        {
            id: '3a6d3bda71',
            name: '不能',
            name_en: 'cannot',
            ruleId: 78191,
            value: 4500
        },
        {
            id: '61ee5be171',
            name: '@莉娜丫头',
            name_en: '@ Lena',
            ruleId: 78191,
            value: 4442
        },
        {
            id: 'c9cc18e801',
            name: '@你的笑那么美好w',
            name_en: '@ your smile is so good w',
            ruleId: 78191,
            value: 3867
        },
        {
            id: '0121f11690',
            name: '拥有',
            name_en: 'Have',
            ruleId: 78191,
            value: 3605
        },
        {
            id: '8bf2c38b0e',
            name: '[鼓掌]',
            name_en: '[Applause]',
            ruleId: 78191,
            value: 3514
        },
        {
            id: 'fc1f266bc8',
            name: '美好',
            name_en: 'fine',
            ruleId: 78191,
            value: 3079
        },
        {
            id: '3d96750f46',
            name: '邀请',
            name_en: 'Invitation',
            ruleId: 78191,
            value: 2463
        },
        {
            id: 'cf9942df10',
            name: '部分',
            name_en: 'Part',
            ruleId: 78191,
            value: 2389
        },
        {
            id: 'df9390f829',
            name: '小小',
            name_en: 'Small',
            ruleId: 78191,
            value: 50841
        },
        {
            id: 'a843c03095',
            name: '#欧莱雅值得说#',
            name_en: "L'OREAL is worth saying",
            ruleId: 78191,
            value: 25810
        },
        {
            id: '8ef4886033',
            name: '颜色',
            name_en: 'colour',
            ruleId: 78191,
            value: 22238
        },
        {
            id: 'ce5bf5e0c4',
            name: '@m三层肉',
            name_en: '@m three layers of meat',
            ruleId: 78191,
            value: 18337
        },
        {
            id: 'acd3384a13',
            name: '化妆包',
            name_en: 'Cosmetic Bag',
            ruleId: 78191,
            value: 17927
        },
        {
            id: '4c89b501c4',
            name: '女孩子',
            name_en: 'Girl',
            ruleId: 78191,
            value: 17927
        },
        {
            id: '5c20176649',
            name: '好看',
            name_en: 'Good-looking',
            ruleId: 78191,
            value: 6389
        },
        {
            id: '28aa475a79',
            name: '喜欢',
            name_en: 'like',
            ruleId: 78191,
            value: 6208
        },
        {
            id: 'e9b58f9ec4',
            name: '超高',
            name_en: 'super high',
            ruleId: 78191,
            value: 4656
        },
        {
            id: '2c27a0b056',
            name: '听说',
            name_en: 'hear',
            ruleId: 78191,
            value: 4459
        },
        {
            id: '033c067dab',
            name: '忙着',
            name_en: 'be busy',
            ruleId: 78191,
            value: 3153
        },
        {
            id: 'dff55d7c4b',
            name: '洁面膏',
            name_en: 'Cleansing Cream',
            ruleId: 78191,
            value: 2956
        },
        {
            id: '81ba0a3b3a',
            name: '美妆',
            name_en: 'Beauty make-up',
            ruleId: 78191,
            value: 2389
        }
    ];

    state = {
        d: 1
    };

    a() {
        this.cloud = this.cloud1;
        this.setState({
            d: +new Date()
        });
    }

    render() {
        let _data = JSON.stringify(this.data.pie).replace(/}\,/g, '},\n');

        console.debug(this.state.d);

        return (
            <article className="mrs-article mrs-MrFill">
                <header>
                    MrEcharts <small>v0.1.26-b4</small>
                </header>
                <ins>由data直接快速生成echarts图表，并有setting进行精细控制</ins>
                {/* <section
                    style={{
                        height: 300,
                        width: '100%'
                    }}>
                    <MrEcharts
                        chartTypes="bar::polar"
                        data={dataSource.polar}
                        transform={[
                            {
                                '@convert': {
                                    value: 'volume',
                                    x: 'category',
                                    name: 'ingredient'
                                }
                            }
                        ]}
                    />
                </section> */}
                <section
                    style={{
                        height: 300,
                        width: '100%'
                    }}>
                    <MrEcharts
                        chartTypes="scatter"
                        data={[
                            { brand: 'BBDC-Benz', date: 500730, name: 'BBDC-Benz', value: '[]', x: 500730 },
                            { brand: 'BJ-Hyundai', date: 229913, name: 'BJ-Hyundai', value: '{}', x: 229913 },
                            { brand: 'Brilliance-BMW', date: 616780, name: 'Brilliance-BMW', value: 'NaN', x: 616780 },
                            { brand: 'Buick', date: 209163, name: 'Buick', value: [], x: 209163 },
                            { brand: 'BYD', date: 222692, name: 'BYD', value: {}, x: 222692 },
                            { brand: 'CA-Mazda', date: 40400, name: 'CA-Mazda', value: NaN, x: 40400 },
                            { brand: 'Cadillac', date: 65633, name: 'Cadillac', value: '83.7', x: 65633 },
                            { brand: 'Chery', date: 105680, name: 'Chery', value: '76.8', x: 105680 },
                            { brand: 'Citroen', date: 78272, name: 'Citroen', value: '76.7', x: 78272 },
                            { brand: 'DF-Honda', date: 286180, name: 'DF-Honda', value: '69.9', x: 286180 },
                            { brand: 'DF-Nissan', date: 262018, name: 'DF-Nissan', value: '52.0', x: 262018 },
                            { brand: 'DF-Peugeot', date: 140791, name: 'DF-Peugeot', value: '89.3', x: 140791 },
                            { brand: 'FAW-Audi', date: 772129, name: 'FAW-Audi', value: '98.1', x: 772129 },
                            { brand: 'FAW-Mazda', date: 49971, name: 'FAW-Mazda', value: '31.7', x: 49971 },
                            { brand: 'FAW-Toyota', date: 215860, name: 'FAW-Toyota', value: '62.7', x: 215860 },
                            { brand: 'FAW-VW', date: 210096, name: 'FAW-VW', value: '69.2', x: 210096 },
                            { brand: 'Ford', date: 166006, name: 'Ford', value: '77.5', x: 166006 },
                            { brand: 'Geely', date: 385134, name: 'Geely', value: '86.9', x: 385134 },
                            { brand: 'GZ-Honda', date: 188251, name: 'GZ-Honda', value: '75.9', x: 188251 },
                            { brand: 'GZ-Toyota', date: 202900, name: 'GZ-Toyota', value: '86.0', x: 202900 },
                            { brand: 'Haval', date: 180569, name: 'Haval', value: '93.0', x: 180569 },
                            { brand: 'Kia', date: 158788, name: 'Kia', value: '88.0', x: 158788 },
                            { brand: 'Roewe', date: 75695, name: 'Roewe', value: '88.5', x: 75695 },
                            { brand: 'SGM-Chevrolet', date: 153938, name: 'SGM-Chevrolet', value: '74.1', x: 153938 },
                            { brand: 'SVW-Skoda', date: 137045, name: 'SVW-Skoda', value: '80.6', x: 137045 },
                            { brand: 'SVW-VW', date: 428940, name: 'SVW-VW', value: '73.6', x: 428940 }
                        ]}
                    />
                </section>
                {/* <section
                    style={{
                        height: 300,
                        width: '100%'
                    }}>
                    <MrEchartsPanel data={this.cloud} chartTypes="wordCloud::random" chartClick={this.a.bind(this)} />
                </section> */}
                {/*<details className="mt-16">*/} {/*<summary>雷达图</summary>*/} {/*<MrCode code={`*/}{' '}
                {/*<MrEcharts chartTypes="radar" data="{dataSource.radar}/">*/} {/*`}></MrCode>*/} {/*</details>*/}
                <aside className="mt-16">
                    <table>
                        <tbody>
                            <tr>
                                <td>data?: any[]</td>
                                <td>
                                    主数据(dataSource)，基于数组对象[
                                    {'{}, {}, {}'}] <br />
                                    data, options 二者存其一，不可同时存在
                                </td>
                            </tr>
                            <tr>
                                <td>dataType?: string</td>
                                <td>数据类型, dataSource, dateSet(echarts 4 support)</td>
                            </tr>
                            <tr>
                                <td>dataModel?: string</td>
                                <td>
                                    数据模型（处理数据方式）
                                    <br />
                                    single: 用于简单的二维数据 <br />
                                    group: 需要对数据进行分组解析
                                </td>
                            </tr>
                            <tr>
                                <td>chartTypes?: string</td>
                                <td>
                                    需要显示的图表类型 <br />
                                    chartTypes 由主次图表类型组成，如 pie::rose::ring <br />
                                    其中 pie 表示图表的主类型（echarts type), rose, ring表示pie的辅助显示功能 <br />
                                    rose, ring 其实是一组 setting 配置的集合
                                </td>
                            </tr>
                            <tr>
                                <td>options?: EchartsOptions</td>
                                <td>Echarts 可渲染的 Options</td>
                            </tr>
                            <tr>
                                <td>setting?: object | array</td>
                                <td>
                                    data会通过一系列的机制转为EchartOptions, <br />
                                    而setting设置最后规则对options进行构建，产生最终options <br />
                                    <br />
                                    setting = {`{[key]: value}`}
                                    <br />
                                    其中 key 为 options 扁平化key值, 如 aAxis.axisLabel.normal.style
                                    <br />
                                    setting = [{'{}, {}, {}'}] <br />
                                    setting 运行原理是遍历 setting 后者会覆盖前者的值，若setting配置涉及顺序问题，请使用数组配置
                                </td>
                            </tr>
                            <tr>
                                <td>theme?: string</td>
                                <td>echarts 主题风格， 需要载入先关JS文件, 也可以通过MrSerives.setEchartsTheme进行设置</td>
                            </tr>

                            <tr>
                                <td>renderType?: string = 'canvas'</td>
                                <td>echarts渲染引擎 :: svg, canvas</td>
                            </tr>

                            <tr>
                                <td>result?: function(options, result)</td>
                                <td>Echarts 即将渲染前返回数据，包含 options, data, dataView</td>
                            </tr>
                            <tr>
                                <td>h100?:number = false</td>
                                <td>style.height = 100% !important</td>
                            </tr>
                        </tbody>
                    </table>
                </aside>
                <aside className="mt-16">
                    <MrPanel title={'setting配置指南'}>
                        {' '}
                        <MrCode
                            code={`
// setting 有一组 key/value 组成
setting = {
    'grid.top': 10,
    'series[0].axisTick.show': false,
    'series[1].axisLabel.show': false,
    'xAxis[0].splitLine.show': false,
    'tooltip.formatter': (rst) => {
        return rst.name
    },
    '**tooltip.formatter': (options, data) => {
        return ''
    },
    '$$series[*].symbol': 'circle',
    '@@xyExchange': true
}

// 这里的函数为 echart 配置函数
'tooltip.formatter': (rst) => {
    return rst.name
}

// 当 **，则函数则为 callback 函数，其中参数 options为当前options的值，data为当前key的值
'**tooltip.formatter': (options, data) => {
    return ''
}

// 当 $$ + [*] 同时出现 则遍历series所有项配置symbol
'$$series[*].symbol': 'circle'

// 当 @@, 则 xyExchange 为系统默认的处理方法, 其值为改方法函数的参数
'@@xyExchange': true
                        `}
                        />{' '}
                    </MrPanel>

                    <MrPanel title={'Echarts Theme 主题以及颜色配置'}>
                        {' '}
                        <MrCode
                            code={`

MrServices.setEchartsTheme(theme: string);

MrServices.setEchartsColors(colors: any = {
    base: string[],
    names: any = {[name: string]: color}
});

                        `}
                        />
                    </MrPanel>
                </aside>
            </article>
        );
    }
}
