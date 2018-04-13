import React from 'react';
import router from 'umi/router';
import styles from './page.less';
import {MrCol, MrDownload, MrEcharts, MrEchartsPanel, MrFill, MrIf, MrPanel, MrResource} from '../../lib';
import Button from 'antd/lib/button/button';
// import {MrEcharts} from 'masterrt';

console.log(':::::::::');

export default () => {
    let dataPie = [
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
    ].sort((a, b) => (a.value > b.value ? -1 : 1));

    let dataWordCloud = [
        {
            brand: 'Olay',
            en_word: 'OLAY',
            name: 'olay',
            value: 21636,
            word: 'olay'
        },
        {
            brand: 'Olay',
            en_word: '# Victoria Song #',
            name: '#宋茜#',
            value: 17169,
            word: '#宋茜#'
        },
        {
            brand: 'Olay',
            en_word: '@ Victoria Song',
            name: '@宋茜',
            value: 16802,
            word: '@宋茜'
        },
        {
            brand: 'Olay',
            en_word: 'Victoria Song # blood hip-hop group #',
            name: '#宋茜热血街舞团#',
            value: 15748,
            word: '#宋茜热血街舞团#'
        },
        {
            brand: 'Olay',
            en_word: '# Victoria Song endorsement silk Yun #',
            name: '#宋茜代言丝蕴#',
            value: 13799,
            word: '#宋茜代言丝蕴#'
        },
        {
            brand: 'Olay',
            en_word: '@olay',
            name: '@olay',
            value: 10696,
            word: '@olay'
        },
        {
            brand: 'Olay',
            en_word: 'Victoria Song # blood convener #',
            name: '#宋茜热血召集人#',
            value: 7788,
            word: '#宋茜热血召集人#'
        },
        {
            brand: 'Olay',
            en_word: 'Ankang',
            name: '安康',
            value: 6322,
            word: '安康'
        },
        {
            brand: 'Olay',
            en_word: 'Happy',
            name: '喜乐',
            value: 6322,
            word: '喜乐'
        },
        {
            brand: 'Olay',
            en_word: 'Victoria Song # Pippi #',
            name: '#宋茜关皮皮#',
            value: 6160,
            word: '#宋茜关皮皮#'
        },
        {
            brand: 'Olay',
            en_word: '# Victoria Song endorsement 100 # alcohol',
            name: '#宋茜代言百醇#',
            value: 5752,
            word: '#宋茜代言百醇#'
        },
        {
            brand: 'Olay',
            en_word: '# Victoria Song blasted into # plume',
            name: '#宋茜闻人羽#',
            value: 5738,
            word: '#宋茜闻人羽#'
        },
        {
            brand: 'Olay',
            en_word: 'White bottle',
            name: '小白瓶',
            value: 4715,
            word: '小白瓶'
        },
        {
            brand: 'Olay',
            en_word: 'OLAY',
            name: '玉兰油',
            value: 4064,
            word: '玉兰油'
        },
        {
            brand: 'Olay',
            en_word: 'Essence',
            name: '精华',
            value: 3524,
            word: '精华'
        },
        {
            brand: 'Olay',
            en_word: 'Skin and flesh',
            name: '肌肤',
            value: 3228,
            word: '肌肤'
        },
        {
            brand: 'Olay',
            en_word: 'Prox',
            name: 'prox',
            value: 3159,
            word: 'prox'
        },
        {
            brand: 'Olay',
            en_word: 'like',
            name: '喜欢',
            value: 2854,
            word: '喜欢'
        },
        {
            brand: 'Olay',
            en_word: 'Game',
            name: '游戏',
            value: 2845,
            word: '游戏'
        },
        {
            brand: 'Olay',
            en_word: 'Age',
            name: '年龄',
            value: 2432,
            word: '年龄'
        },
        {
            brand: 'Olay',
            en_word: 'Skin whitening',
            name: '美白',
            value: 2383,
            word: '美白'
        },
        {
            brand: 'Olay',
            en_word: '# without fear of age #',
            name: '#无惧年龄#',
            value: 2299,
            word: '#无惧年龄#'
        },
        {
            brand: 'Olay',
            en_word: 'Effect',
            name: '效果',
            value: 2184,
            word: '效果'
        },
        {
            brand: 'Olay',
            en_word: 'Cream',
            name: '面霜',
            value: 2052,
            word: '面霜'
        },
        {
            brand: 'Olay',
            en_word: 'product',
            name: '产品',
            value: 1864,
            word: '产品'
        },
        {
            brand: 'Olay',
            en_word: 'Love',
            name: '爱情',
            value: 1824,
            word: '爱情'
        },
        {
            brand: 'Olay',
            en_word: 'Good',
            name: '好用',
            value: 1749,
            word: '好用'
        },
        {
            brand: 'Olay',
            en_word: 'Girl student',
            name: '女生',
            value: 1695,
            word: '女生'
        },
        {
            brand: 'Olay',
            en_word: 'Moisture',
            name: '保湿',
            value: 1678,
            word: '保湿'
        },
        {
            brand: 'Olay',
            en_word: 'skin',
            name: '皮肤',
            value: 1589,
            word: '皮肤'
        },
        {
            brand: 'Olay',
            en_word: 'Bang Bang',
            name: '棒棒',
            value: 1485,
            word: '棒棒'
        },
        {
            brand: 'Olay',
            en_word: 'Facial mask',
            name: '面膜',
            value: 1483,
            word: '面膜'
        },
        {
            brand: 'Olay',
            en_word: 'I love you',
            name: '我爱你',
            value: 1366,
            word: '我爱你'
        },
        {
            brand: 'Olay',
            en_word: 'Zai',
            name: '崽崽',
            value: 1366,
            word: '崽崽'
        },
        {
            brand: 'Olay',
            en_word: 'Use',
            name: '使用',
            value: 1335,
            word: '使用'
        },
        {
            brand: 'Olay',
            en_word: 'Break up',
            name: '分手',
            value: 1255,
            word: '分手'
        },
        {
            brand: 'Olay',
            en_word: 'Cheek',
            name: '脸蛋子',
            value: 1239,
            word: '脸蛋子'
        },
        {
            brand: 'Olay',
            en_word: 'Fast thin',
            name: '快瘦',
            value: 1238,
            word: '快瘦'
        },
        {
            brand: 'Olay',
            en_word: '# fashion Victoria Song #',
            name: '#时尚演绎者宋茜#',
            value: 1218,
            word: '#时尚演绎者宋茜#'
        },
        {
            brand: 'Olay',
            en_word: 'Apple muscle',
            name: '苹果肌',
            value: 1170,
            word: '苹果肌'
        },
        {
            brand: 'Olay',
            en_word: 'Moist',
            name: '滋润',
            value: 1149,
            word: '滋润'
        },
        {
            brand: 'Olay',
            en_word: 'Break up',
            name: '分手吧',
            value: 1085,
            word: '分手吧'
        },
        {
            brand: 'Olay',
            en_word: 'Grow grass',
            name: '种草',
            value: 1055,
            word: '种草'
        },
        {
            brand: 'Olay',
            en_word: 'Eye cream',
            name: '眼霜',
            value: 1046,
            word: '眼霜'
        },
        {
            brand: 'Olay',
            en_word: 'nicotinamide',
            name: '烟酰胺',
            value: 1011,
            word: '烟酰胺'
        },
        {
            brand: 'Olay',
            en_word: 'Rest',
            name: '休息',
            value: 1009,
            word: '休息'
        },
        {
            brand: 'Olay',
            en_word: '@ Victoria Song daily Propaganda Group',
            name: '@宋茜日宣小组',
            value: 1006,
            word: '@宋茜日宣小组'
        },
        {
            brand: 'Olay',
            en_word: 'compromise',
            name: '妥协',
            value: 1005,
            word: '妥协'
        },
        {
            brand: 'Olay',
            en_word: 'Replenishment',
            name: '补水',
            value: 981,
            word: '补水'
        },
        {
            brand: 'Olay',
            en_word: 'Red bottle',
            name: '红瓶',
            value: 964,
            word: '红瓶'
        },
        {
            brand: 'Olay',
            en_word: 'Micro film',
            name: '微电影',
            value: 940,
            word: '微电影'
        },
        {
            brand: 'Olay',
            en_word: 'Light',
            name: '光感',
            value: 935,
            word: '光感'
        },
        {
            brand: 'Olay',
            en_word: 'Victoria Song # cocoon town # romance',
            name: '#宋茜茧镇奇缘#',
            value: 929,
            word: '#宋茜茧镇奇缘#'
        },
        {
            brand: 'Olay',
            en_word: 'Victoria Song # Chunxiao Du #',
            name: '#宋茜杜春晓#',
            value: 927,
            word: '#宋茜杜春晓#'
        },
        {
            brand: 'Olay',
            en_word: 'miss you',
            name: '想你',
            value: 918,
            word: '想你'
        },
        {
            brand: 'Olay',
            en_word: 'Love between brothers and sisters',
            name: '姐弟恋',
            value: 893,
            word: '姐弟恋'
        },
        {
            brand: 'Olay',
            en_word: 'Recommend',
            name: '推荐',
            value: 828,
            word: '推荐'
        },
        {
            brand: 'Olay',
            en_word: 'Schoolboy',
            name: '男生',
            value: 821,
            word: '男生'
        },
        {
            brand: 'Olay',
            en_word: 'happiness',
            name: '幸福',
            value: 808,
            word: '幸福'
        },
        {
            brand: 'Olay',
            en_word: 'Bright red',
            name: '大红',
            value: 807,
            word: '大红'
        },
        {
            brand: 'Olay',
            en_word: 'compact',
            name: '紧致',
            value: 789,
            word: '紧致'
        },
        {
            brand: 'Olay',
            en_word: 'Answer',
            name: '答案',
            value: 778,
            word: '答案'
        },
        {
            brand: 'Olay',
            en_word: 'vote',
            name: '投票',
            value: 777,
            word: '投票'
        },
        {
            brand: 'Olay',
            en_word: 'Young',
            name: '年轻',
            value: 777,
            word: '年轻'
        },
        {
            brand: 'Olay',
            en_word: 'hope',
            name: '希望',
            value: 751,
            word: '希望'
        },
        {
            brand: 'Olay',
            en_word: 'absorb',
            name: '吸收',
            value: 742,
            word: '吸收'
        },
        {
            brand: 'Olay',
            en_word: 'component',
            name: '成分',
            value: 730,
            word: '成分'
        },
        {
            brand: 'Olay',
            en_word: 'Face',
            name: '小脸',
            value: 719,
            word: '小脸'
        },
        {
            brand: 'Olay',
            en_word: 'Brave',
            name: '勇敢',
            value: 710,
            word: '勇敢'
        },
        {
            brand: 'Olay',
            en_word: 'Good',
            name: '好感',
            value: 708,
            word: '好感'
        },
        {
            brand: 'Olay',
            en_word: 'Insist',
            name: '坚持',
            value: 707,
            word: '坚持'
        },
        {
            brand: 'Olay',
            en_word: 'time',
            name: '时光',
            value: 706,
            word: '时光'
        },
        {
            brand: 'Olay',
            en_word: 'Pursuit',
            name: '追求',
            value: 698,
            word: '追求'
        },
        {
            brand: 'Olay',
            en_word: 'China',
            name: '中国',
            value: 692,
            word: '中国'
        },
        {
            brand: 'Olay',
            en_word: 'overwhelmed',
            name: '爆棚',
            value: 688,
            word: '爆棚'
        },
        {
            brand: 'Olay',
            en_word: 'texture',
            name: '质地',
            value: 681,
            word: '质地'
        },
        {
            brand: 'Olay',
            en_word: 'buy-back',
            name: '回购',
            value: 680,
            word: '回购'
        },
        {
            brand: 'Olay',
            en_word: 'Skin care',
            name: '护肤',
            value: 639,
            word: '护肤'
        },
        {
            brand: 'Olay',
            en_word: 'newborn',
            name: '新生',
            value: 633,
            word: '新生'
        },
        {
            brand: 'Olay',
            en_word: 'Moisturizing Cream',
            name: '滋润霜',
            value: 620,
            word: '滋润霜'
        },
        {
            brand: 'Olay',
            en_word: 'The whitening essence',
            name: '美白精华',
            value: 614,
            word: '美白精华'
        },
        {
            brand: 'Olay',
            en_word: '@prox Bo study poetry',
            name: '@prox博研诗',
            value: 607,
            word: '@prox博研诗'
        },
        {
            brand: 'Olay',
            en_word: 'Body Lotion',
            name: '润肤霜',
            value: 590,
            word: '润肤霜'
        },
        {
            brand: 'Olay',
            en_word: 'burden',
            name: '负担',
            value: 589,
            word: '负担'
        },
        {
            brand: 'Olay',
            en_word: 'Skin care products',
            name: '护肤品',
            value: 573,
            word: '护肤品'
        },
        {
            brand: 'Olay',
            en_word: 'Fine lines',
            name: '细纹',
            value: 519,
            word: '细纹'
        },
        {
            brand: 'Olay',
            en_word: 'Pale spot',
            name: '淡斑',
            value: 516,
            word: '淡斑'
        },
        {
            brand: 'Olay',
            en_word: 'no fear',
            name: '无惧',
            value: 506,
            word: '无惧'
        },
        {
            brand: 'Olay',
            en_word: 'Female sex',
            name: '女性',
            value: 481,
            word: '女性'
        },
        {
            brand: 'Olay',
            en_word: 'brand',
            name: '品牌',
            value: 473,
            word: '品牌'
        },
        {
            brand: 'Olay',
            en_word: 'Choice',
            name: '选择',
            value: 472,
            word: '选择'
        },
        {
            brand: 'Olay',
            en_word: 'India',
            name: '痘印',
            value: 468,
            word: '痘印'
        },
        {
            brand: 'Olay',
            en_word: 'Victoria Song',
            name: '宋茜',
            value: 467,
            word: '宋茜'
        },
        {
            brand: 'Olay',
            en_word: 'Advertisement',
            name: '广告',
            value: 462,
            word: '广告'
        },
        {
            brand: 'Olay',
            en_word: 'Skin colour',
            name: '肤色',
            value: 460,
            word: '肤色'
        },
        {
            brand: 'Olay',
            en_word: 'time',
            name: '时间',
            value: 454,
            word: '时间'
        },
        {
            brand: 'Olay',
            en_word: 'Come on',
            name: '加油',
            value: 443,
            word: '加油'
        },
        {
            brand: 'Olay',
            en_word: 'Sunscreen',
            name: '防晒',
            value: 426,
            word: '防晒'
        },
        {
            brand: 'Olay',
            en_word: 'Film',
            name: '电影',
            value: 406,
            word: '电影'
        },
        {
            brand: 'Olay',
            en_word: 'Phone',
            name: '打电话',
            value: 399,
            word: '打电话'
        },
        {
            brand: 'Olay',
            en_word: 'Story',
            name: '故事',
            value: 396,
            word: '故事'
        },
        {
            brand: 'Olay',
            en_word: 'attitude',
            name: '态度',
            value: 384,
            word: '态度'
        }
    ];

    let ladder = [
        {
            brand: 'Braun',
            date: '2017-12-16',
            name: 'Braun',
            value: 48,
            x: '2017-12-16'
        },
        {
            brand: 'Braun',
            date: '2017-12-17',
            name: 'Braun',
            value: 88,
            x: '2017-12-17'
        },
        {
            brand: 'Braun',
            date: '2017-12-18',
            name: 'Braun',
            value: 747,
            x: '2017-12-18'
        },
        {
            brand: 'Braun',
            date: '2017-12-19',
            name: 'Braun',
            value: 536,
            x: '2017-12-19'
        },
        {
            brand: 'Braun',
            date: '2017-12-20',
            name: 'Braun',
            value: 42,
            x: '2017-12-20'
        },
        {
            brand: 'Braun',
            date: '2017-12-21',
            name: 'Braun',
            value: 1147,
            x: '2017-12-21'
        },
        {
            brand: 'Braun',
            date: '2017-12-22',
            name: 'Braun',
            value: 347,
            x: '2017-12-22'
        },
        {
            brand: 'Braun',
            date: '2017-12-23',
            name: 'Braun',
            value: 64,
            x: '2017-12-23'
        },
        {
            brand: 'Braun',
            date: '2017-12-24',
            name: 'Braun',
            value: 72,
            x: '2017-12-24'
        },
        {
            brand: 'Braun',
            date: '2017-12-25',
            name: 'Braun',
            value: 62,
            x: '2017-12-25'
        },
        {
            brand: 'Braun',
            date: '2017-12-26',
            name: 'Braun',
            value: 78,
            x: '2017-12-26'
        },
        {
            brand: 'Braun',
            date: '2017-12-27',
            name: 'Braun',
            value: 88,
            x: '2017-12-27'
        },
        {
            brand: 'Braun',
            date: '2017-12-28',
            name: 'Braun',
            value: 43,
            x: '2017-12-28'
        },
        {
            brand: 'Braun',
            date: '2017-12-29',
            name: 'Braun',
            value: 45,
            x: '2017-12-29'
        },
        {
            brand: 'Braun',
            date: '2017-12-30',
            name: 'Braun',
            value: 308,
            x: '2017-12-30'
        },
        {
            brand: 'Braun',
            date: '2017-12-31',
            name: 'Braun',
            value: 728,
            x: '2017-12-31'
        },
        {
            brand: 'Braun',
            date: '2018-01-01',
            name: 'Braun',
            value: 157,
            x: '2018-01-01'
        },
        {
            brand: 'Braun',
            date: '2018-01-02',
            name: 'Braun',
            value: 130,
            x: '2018-01-02'
        }
    ];

    let trend = [
            {
                "brand": "Rejoice",
                "date": "2017-12-16",
                "name": "Rejoice",
                "totalVolume": 80,
                "value": 80,
                "x": "2017-12-16"
            },
            {
                "brand": "Pantene",
                "date": "2017-12-16",
                "name": "Pantene",
                "totalVolume": 54,
                "value": 54,
                "x": "2017-12-16"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2017-12-16",
                "name": "Loreal Paris Men",
                "totalVolume": 421,
                "value": 421,
                "x": "2017-12-16"
            },
            {
                "brand": "Loreal Paris",
                "date": "2017-12-16",
                "name": "Loreal Paris",
                "totalVolume": 85,
                "value": 85,
                "x": "2017-12-16"
            },
            {
                "brand": "VS",
                "date": "2017-12-16",
                "name": "VS",
                "totalVolume": 173,
                "value": 173,
                "x": "2017-12-16"
            },
            {
                "brand": "Kerastase",
                "date": "2017-12-16",
                "name": "Kerastase",
                "totalVolume": 450,
                "value": 450,
                "x": "2017-12-16"
            },
            {
                "brand": "Tsubaki",
                "date": "2017-12-16",
                "name": "Tsubaki",
                "totalVolume": 9,
                "value": 9,
                "x": "2017-12-16"
            },
            {
                "brand": "HNS",
                "date": "2017-12-16",
                "name": "HNS",
                "totalVolume": 31,
                "value": 31,
                "x": "2017-12-16"
            },
            {
                "brand": "Syoss",
                "date": "2017-12-16",
                "name": "Syoss",
                "totalVolume": 132,
                "value": 132,
                "x": "2017-12-16"
            },
            {
                "brand": "Clear",
                "date": "2017-12-16",
                "name": "Clear",
                "totalVolume": 7,
                "value": 7,
                "x": "2017-12-16"
            },
            {
                "brand": "Seeyoung",
                "date": "2017-12-16",
                "name": "Seeyoung",
                "totalVolume": 232,
                "value": 232,
                "x": "2017-12-16"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2017-12-16",
                "name": "Schwarzkopf",
                "totalVolume": 1129,
                "value": 1129,
                "x": "2017-12-16"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2017-12-17",
                "name": "Schwarzkopf",
                "totalVolume": 1054,
                "value": 1054,
                "x": "2017-12-17"
            },
            {
                "brand": "Rejoice",
                "date": "2017-12-17",
                "name": "Rejoice",
                "totalVolume": 99,
                "value": 99,
                "x": "2017-12-17"
            },
            {
                "brand": "Pantene",
                "date": "2017-12-17",
                "name": "Pantene",
                "totalVolume": 79,
                "value": 79,
                "x": "2017-12-17"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2017-12-17",
                "name": "Loreal Paris Men",
                "totalVolume": 575,
                "value": 575,
                "x": "2017-12-17"
            },
            {
                "brand": "Loreal Paris",
                "date": "2017-12-17",
                "name": "Loreal Paris",
                "totalVolume": 54,
                "value": 54,
                "x": "2017-12-17"
            },
            {
                "brand": "VS",
                "date": "2017-12-17",
                "name": "VS",
                "totalVolume": 157,
                "value": 157,
                "x": "2017-12-17"
            },
            {
                "brand": "Kerastase",
                "date": "2017-12-17",
                "name": "Kerastase",
                "totalVolume": 426,
                "value": 426,
                "x": "2017-12-17"
            },
            {
                "brand": "Tsubaki",
                "date": "2017-12-17",
                "name": "Tsubaki",
                "totalVolume": 41,
                "value": 41,
                "x": "2017-12-17"
            },
            {
                "brand": "HNS",
                "date": "2017-12-17",
                "name": "HNS",
                "totalVolume": 24,
                "value": 24,
                "x": "2017-12-17"
            },
            {
                "brand": "Syoss",
                "date": "2017-12-17",
                "name": "Syoss",
                "totalVolume": 42,
                "value": 42,
                "x": "2017-12-17"
            },
            {
                "brand": "Clear",
                "date": "2017-12-17",
                "name": "Clear",
                "totalVolume": 8,
                "value": 8,
                "x": "2017-12-17"
            },
            {
                "brand": "Seeyoung",
                "date": "2017-12-17",
                "name": "Seeyoung",
                "totalVolume": 26,
                "value": 26,
                "x": "2017-12-17"
            },
            {
                "brand": "Clear",
                "date": "2017-12-18",
                "name": "Clear",
                "totalVolume": 1,
                "value": 1,
                "x": "2017-12-18"
            },
            {
                "brand": "Seeyoung",
                "date": "2017-12-18",
                "name": "Seeyoung",
                "totalVolume": 24,
                "value": 24,
                "x": "2017-12-18"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2017-12-18",
                "name": "Schwarzkopf",
                "totalVolume": 1045,
                "value": 1045,
                "x": "2017-12-18"
            },
            {
                "brand": "Rejoice",
                "date": "2017-12-18",
                "name": "Rejoice",
                "totalVolume": 211,
                "value": 211,
                "x": "2017-12-18"
            },
            {
                "brand": "Pantene",
                "date": "2017-12-18",
                "name": "Pantene",
                "totalVolume": 63,
                "value": 63,
                "x": "2017-12-18"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2017-12-18",
                "name": "Loreal Paris Men",
                "totalVolume": 679,
                "value": 679,
                "x": "2017-12-18"
            },
            {
                "brand": "Loreal Paris",
                "date": "2017-12-18",
                "name": "Loreal Paris",
                "totalVolume": 68,
                "value": 68,
                "x": "2017-12-18"
            },
            {
                "brand": "VS",
                "date": "2017-12-18",
                "name": "VS",
                "totalVolume": 229,
                "value": 229,
                "x": "2017-12-18"
            },
            {
                "brand": "Kerastase",
                "date": "2017-12-18",
                "name": "Kerastase",
                "totalVolume": 161,
                "value": 161,
                "x": "2017-12-18"
            },
            {
                "brand": "Tsubaki",
                "date": "2017-12-18",
                "name": "Tsubaki",
                "totalVolume": 131,
                "value": 131,
                "x": "2017-12-18"
            },
            {
                "brand": "HNS",
                "date": "2017-12-18",
                "name": "HNS",
                "totalVolume": 33,
                "value": 33,
                "x": "2017-12-18"
            },
            {
                "brand": "Syoss",
                "date": "2017-12-18",
                "name": "Syoss",
                "totalVolume": 87,
                "value": 87,
                "x": "2017-12-18"
            },
            {
                "brand": "HNS",
                "date": "2017-12-19",
                "name": "HNS",
                "totalVolume": 36,
                "value": 36,
                "x": "2017-12-19"
            },
            {
                "brand": "Syoss",
                "date": "2017-12-19",
                "name": "Syoss",
                "totalVolume": 29,
                "value": 29,
                "x": "2017-12-19"
            },
            {
                "brand": "Clear",
                "date": "2017-12-19",
                "name": "Clear",
                "totalVolume": 122,
                "value": 122,
                "x": "2017-12-19"
            },
            {
                "brand": "Seeyoung",
                "date": "2017-12-19",
                "name": "Seeyoung",
                "totalVolume": 143,
                "value": 143,
                "x": "2017-12-19"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2017-12-19",
                "name": "Schwarzkopf",
                "totalVolume": 799,
                "value": 799,
                "x": "2017-12-19"
            },
            {
                "brand": "Rejoice",
                "date": "2017-12-19",
                "name": "Rejoice",
                "totalVolume": 120,
                "value": 120,
                "x": "2017-12-19"
            },
            {
                "brand": "Pantene",
                "date": "2017-12-19",
                "name": "Pantene",
                "totalVolume": 1350,
                "value": 1350,
                "x": "2017-12-19"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2017-12-19",
                "name": "Loreal Paris Men",
                "totalVolume": 227,
                "value": 227,
                "x": "2017-12-19"
            },
            {
                "brand": "Loreal Paris",
                "date": "2017-12-19",
                "name": "Loreal Paris",
                "totalVolume": 59,
                "value": 59,
                "x": "2017-12-19"
            },
            {
                "brand": "VS",
                "date": "2017-12-19",
                "name": "VS",
                "totalVolume": 169,
                "value": 169,
                "x": "2017-12-19"
            },
            {
                "brand": "Kerastase",
                "date": "2017-12-19",
                "name": "Kerastase",
                "totalVolume": 121,
                "value": 121,
                "x": "2017-12-19"
            },
            {
                "brand": "Tsubaki",
                "date": "2017-12-19",
                "name": "Tsubaki",
                "totalVolume": 62,
                "value": 62,
                "x": "2017-12-19"
            },
            {
                "brand": "Tsubaki",
                "date": "2017-12-20",
                "name": "Tsubaki",
                "totalVolume": 54,
                "value": 54,
                "x": "2017-12-20"
            },
            {
                "brand": "Kerastase",
                "date": "2017-12-20",
                "name": "Kerastase",
                "totalVolume": 140,
                "value": 140,
                "x": "2017-12-20"
            },
            {
                "brand": "HNS",
                "date": "2017-12-20",
                "name": "HNS",
                "totalVolume": 95,
                "value": 95,
                "x": "2017-12-20"
            },
            {
                "brand": "Syoss",
                "date": "2017-12-20",
                "name": "Syoss",
                "totalVolume": 25,
                "value": 25,
                "x": "2017-12-20"
            },
            {
                "brand": "Clear",
                "date": "2017-12-20",
                "name": "Clear",
                "totalVolume": 194,
                "value": 194,
                "x": "2017-12-20"
            },
            {
                "brand": "Seeyoung",
                "date": "2017-12-20",
                "name": "Seeyoung",
                "totalVolume": 84,
                "value": 84,
                "x": "2017-12-20"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2017-12-20",
                "name": "Schwarzkopf",
                "totalVolume": 1385,
                "value": 1385,
                "x": "2017-12-20"
            },
            {
                "brand": "Rejoice",
                "date": "2017-12-20",
                "name": "Rejoice",
                "totalVolume": 85,
                "value": 85,
                "x": "2017-12-20"
            },
            {
                "brand": "Pantene",
                "date": "2017-12-20",
                "name": "Pantene",
                "totalVolume": 4517,
                "value": 4517,
                "x": "2017-12-20"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2017-12-20",
                "name": "Loreal Paris Men",
                "totalVolume": 109,
                "value": 109,
                "x": "2017-12-20"
            },
            {
                "brand": "Loreal Paris",
                "date": "2017-12-20",
                "name": "Loreal Paris",
                "totalVolume": 40,
                "value": 40,
                "x": "2017-12-20"
            },
            {
                "brand": "VS",
                "date": "2017-12-20",
                "name": "VS",
                "totalVolume": 260,
                "value": 260,
                "x": "2017-12-20"
            },
            {
                "brand": "Loreal Paris",
                "date": "2017-12-21",
                "name": "Loreal Paris",
                "totalVolume": 60,
                "value": 60,
                "x": "2017-12-21"
            },
            {
                "brand": "VS",
                "date": "2017-12-21",
                "name": "VS",
                "totalVolume": 176,
                "value": 176,
                "x": "2017-12-21"
            },
            {
                "brand": "Tsubaki",
                "date": "2017-12-21",
                "name": "Tsubaki",
                "totalVolume": 102,
                "value": 102,
                "x": "2017-12-21"
            },
            {
                "brand": "Kerastase",
                "date": "2017-12-21",
                "name": "Kerastase",
                "totalVolume": 89,
                "value": 89,
                "x": "2017-12-21"
            },
            {
                "brand": "HNS",
                "date": "2017-12-21",
                "name": "HNS",
                "totalVolume": 72,
                "value": 72,
                "x": "2017-12-21"
            },
            {
                "brand": "Syoss",
                "date": "2017-12-21",
                "name": "Syoss",
                "totalVolume": 41,
                "value": 41,
                "x": "2017-12-21"
            },
            {
                "brand": "Clear",
                "date": "2017-12-21",
                "name": "Clear",
                "totalVolume": 11,
                "value": 11,
                "x": "2017-12-21"
            },
            {
                "brand": "Seeyoung",
                "date": "2017-12-21",
                "name": "Seeyoung",
                "totalVolume": 307,
                "value": 307,
                "x": "2017-12-21"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2017-12-21",
                "name": "Schwarzkopf",
                "totalVolume": 460,
                "value": 460,
                "x": "2017-12-21"
            },
            {
                "brand": "Rejoice",
                "date": "2017-12-21",
                "name": "Rejoice",
                "totalVolume": 71,
                "value": 71,
                "x": "2017-12-21"
            },
            {
                "brand": "Pantene",
                "date": "2017-12-21",
                "name": "Pantene",
                "totalVolume": 6160,
                "value": 6160,
                "x": "2017-12-21"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2017-12-21",
                "name": "Loreal Paris Men",
                "totalVolume": 618,
                "value": 618,
                "x": "2017-12-21"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2017-12-22",
                "name": "Loreal Paris Men",
                "totalVolume": 211,
                "value": 211,
                "x": "2017-12-22"
            },
            {
                "brand": "Loreal Paris",
                "date": "2017-12-22",
                "name": "Loreal Paris",
                "totalVolume": 39,
                "value": 39,
                "x": "2017-12-22"
            },
            {
                "brand": "VS",
                "date": "2017-12-22",
                "name": "VS",
                "totalVolume": 218,
                "value": 218,
                "x": "2017-12-22"
            },
            {
                "brand": "Tsubaki",
                "date": "2017-12-22",
                "name": "Tsubaki",
                "totalVolume": 178,
                "value": 178,
                "x": "2017-12-22"
            },
            {
                "brand": "Kerastase",
                "date": "2017-12-22",
                "name": "Kerastase",
                "totalVolume": 150,
                "value": 150,
                "x": "2017-12-22"
            },
            {
                "brand": "HNS",
                "date": "2017-12-22",
                "name": "HNS",
                "totalVolume": 27,
                "value": 27,
                "x": "2017-12-22"
            },
            {
                "brand": "Syoss",
                "date": "2017-12-22",
                "name": "Syoss",
                "totalVolume": 93,
                "value": 93,
                "x": "2017-12-22"
            },
            {
                "brand": "Clear",
                "date": "2017-12-22",
                "name": "Clear",
                "totalVolume": 8,
                "value": 8,
                "x": "2017-12-22"
            },
            {
                "brand": "Seeyoung",
                "date": "2017-12-22",
                "name": "Seeyoung",
                "totalVolume": 321,
                "value": 321,
                "x": "2017-12-22"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2017-12-22",
                "name": "Schwarzkopf",
                "totalVolume": 1176,
                "value": 1176,
                "x": "2017-12-22"
            },
            {
                "brand": "Rejoice",
                "date": "2017-12-22",
                "name": "Rejoice",
                "totalVolume": 75,
                "value": 75,
                "x": "2017-12-22"
            },
            {
                "brand": "Pantene",
                "date": "2017-12-22",
                "name": "Pantene",
                "totalVolume": 402,
                "value": 402,
                "x": "2017-12-22"
            },
            {
                "brand": "Pantene",
                "date": "2017-12-23",
                "name": "Pantene",
                "totalVolume": 131,
                "value": 131,
                "x": "2017-12-23"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2017-12-23",
                "name": "Loreal Paris Men",
                "totalVolume": 125,
                "value": 125,
                "x": "2017-12-23"
            },
            {
                "brand": "Loreal Paris",
                "date": "2017-12-23",
                "name": "Loreal Paris",
                "totalVolume": 63,
                "value": 63,
                "x": "2017-12-23"
            },
            {
                "brand": "VS",
                "date": "2017-12-23",
                "name": "VS",
                "totalVolume": 195,
                "value": 195,
                "x": "2017-12-23"
            },
            {
                "brand": "Tsubaki",
                "date": "2017-12-23",
                "name": "Tsubaki",
                "totalVolume": 52,
                "value": 52,
                "x": "2017-12-23"
            },
            {
                "brand": "Kerastase",
                "date": "2017-12-23",
                "name": "Kerastase",
                "totalVolume": 134,
                "value": 134,
                "x": "2017-12-23"
            },
            {
                "brand": "HNS",
                "date": "2017-12-23",
                "name": "HNS",
                "totalVolume": 51,
                "value": 51,
                "x": "2017-12-23"
            },
            {
                "brand": "Syoss",
                "date": "2017-12-23",
                "name": "Syoss",
                "totalVolume": 268,
                "value": 268,
                "x": "2017-12-23"
            },
            {
                "brand": "Clear",
                "date": "2017-12-23",
                "name": "Clear",
                "totalVolume": 78,
                "value": 78,
                "x": "2017-12-23"
            },
            {
                "brand": "Seeyoung",
                "date": "2017-12-23",
                "name": "Seeyoung",
                "totalVolume": 80,
                "value": 80,
                "x": "2017-12-23"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2017-12-23",
                "name": "Schwarzkopf",
                "totalVolume": 704,
                "value": 704,
                "x": "2017-12-23"
            },
            {
                "brand": "Rejoice",
                "date": "2017-12-23",
                "name": "Rejoice",
                "totalVolume": 77,
                "value": 77,
                "x": "2017-12-23"
            },
            {
                "brand": "Rejoice",
                "date": "2017-12-24",
                "name": "Rejoice",
                "totalVolume": 102,
                "value": 102,
                "x": "2017-12-24"
            },
            {
                "brand": "Pantene",
                "date": "2017-12-24",
                "name": "Pantene",
                "totalVolume": 97,
                "value": 97,
                "x": "2017-12-24"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2017-12-24",
                "name": "Loreal Paris Men",
                "totalVolume": 119,
                "value": 119,
                "x": "2017-12-24"
            },
            {
                "brand": "Loreal Paris",
                "date": "2017-12-24",
                "name": "Loreal Paris",
                "totalVolume": 53,
                "value": 53,
                "x": "2017-12-24"
            },
            {
                "brand": "VS",
                "date": "2017-12-24",
                "name": "VS",
                "totalVolume": 192,
                "value": 192,
                "x": "2017-12-24"
            },
            {
                "brand": "Tsubaki",
                "date": "2017-12-24",
                "name": "Tsubaki",
                "totalVolume": 36,
                "value": 36,
                "x": "2017-12-24"
            },
            {
                "brand": "Kerastase",
                "date": "2017-12-24",
                "name": "Kerastase",
                "totalVolume": 89,
                "value": 89,
                "x": "2017-12-24"
            },
            {
                "brand": "HNS",
                "date": "2017-12-24",
                "name": "HNS",
                "totalVolume": 51,
                "value": 51,
                "x": "2017-12-24"
            },
            {
                "brand": "Syoss",
                "date": "2017-12-24",
                "name": "Syoss",
                "totalVolume": 195,
                "value": 195,
                "x": "2017-12-24"
            },
            {
                "brand": "Clear",
                "date": "2017-12-24",
                "name": "Clear",
                "totalVolume": 16,
                "value": 16,
                "x": "2017-12-24"
            },
            {
                "brand": "Seeyoung",
                "date": "2017-12-24",
                "name": "Seeyoung",
                "totalVolume": 33,
                "value": 33,
                "x": "2017-12-24"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2017-12-24",
                "name": "Schwarzkopf",
                "totalVolume": 587,
                "value": 587,
                "x": "2017-12-24"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2017-12-25",
                "name": "Schwarzkopf",
                "totalVolume": 570,
                "value": 570,
                "x": "2017-12-25"
            },
            {
                "brand": "Rejoice",
                "date": "2017-12-25",
                "name": "Rejoice",
                "totalVolume": 70,
                "value": 70,
                "x": "2017-12-25"
            },
            {
                "brand": "Pantene",
                "date": "2017-12-25",
                "name": "Pantene",
                "totalVolume": 301,
                "value": 301,
                "x": "2017-12-25"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2017-12-25",
                "name": "Loreal Paris Men",
                "totalVolume": 852,
                "value": 852,
                "x": "2017-12-25"
            },
            {
                "brand": "Loreal Paris",
                "date": "2017-12-25",
                "name": "Loreal Paris",
                "totalVolume": 51,
                "value": 51,
                "x": "2017-12-25"
            },
            {
                "brand": "VS",
                "date": "2017-12-25",
                "name": "VS",
                "totalVolume": 131,
                "value": 131,
                "x": "2017-12-25"
            },
            {
                "brand": "Tsubaki",
                "date": "2017-12-25",
                "name": "Tsubaki",
                "totalVolume": 28,
                "value": 28,
                "x": "2017-12-25"
            },
            {
                "brand": "Kerastase",
                "date": "2017-12-25",
                "name": "Kerastase",
                "totalVolume": 86,
                "value": 86,
                "x": "2017-12-25"
            },
            {
                "brand": "HNS",
                "date": "2017-12-25",
                "name": "HNS",
                "totalVolume": 52,
                "value": 52,
                "x": "2017-12-25"
            },
            {
                "brand": "Syoss",
                "date": "2017-12-25",
                "name": "Syoss",
                "totalVolume": 159,
                "value": 159,
                "x": "2017-12-25"
            },
            {
                "brand": "Clear",
                "date": "2017-12-25",
                "name": "Clear",
                "totalVolume": 28,
                "value": 28,
                "x": "2017-12-25"
            },
            {
                "brand": "Seeyoung",
                "date": "2017-12-25",
                "name": "Seeyoung",
                "totalVolume": 19,
                "value": 19,
                "x": "2017-12-25"
            },
            {
                "brand": "Clear",
                "date": "2017-12-26",
                "name": "Clear",
                "totalVolume": 19,
                "value": 19,
                "x": "2017-12-26"
            },
            {
                "brand": "Seeyoung",
                "date": "2017-12-26",
                "name": "Seeyoung",
                "totalVolume": 27,
                "value": 27,
                "x": "2017-12-26"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2017-12-26",
                "name": "Schwarzkopf",
                "totalVolume": 482,
                "value": 482,
                "x": "2017-12-26"
            },
            {
                "brand": "Rejoice",
                "date": "2017-12-26",
                "name": "Rejoice",
                "totalVolume": 214,
                "value": 214,
                "x": "2017-12-26"
            },
            {
                "brand": "Pantene",
                "date": "2017-12-26",
                "name": "Pantene",
                "totalVolume": 90,
                "value": 90,
                "x": "2017-12-26"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2017-12-26",
                "name": "Loreal Paris Men",
                "totalVolume": 235,
                "value": 235,
                "x": "2017-12-26"
            },
            {
                "brand": "Loreal Paris",
                "date": "2017-12-26",
                "name": "Loreal Paris",
                "totalVolume": 192,
                "value": 192,
                "x": "2017-12-26"
            },
            {
                "brand": "VS",
                "date": "2017-12-26",
                "name": "VS",
                "totalVolume": 155,
                "value": 155,
                "x": "2017-12-26"
            },
            {
                "brand": "Tsubaki",
                "date": "2017-12-26",
                "name": "Tsubaki",
                "totalVolume": 27,
                "value": 27,
                "x": "2017-12-26"
            },
            {
                "brand": "Kerastase",
                "date": "2017-12-26",
                "name": "Kerastase",
                "totalVolume": 103,
                "value": 103,
                "x": "2017-12-26"
            },
            {
                "brand": "HNS",
                "date": "2017-12-26",
                "name": "HNS",
                "totalVolume": 44,
                "value": 44,
                "x": "2017-12-26"
            },
            {
                "brand": "Syoss",
                "date": "2017-12-26",
                "name": "Syoss",
                "totalVolume": 143,
                "value": 143,
                "x": "2017-12-26"
            },
            {
                "brand": "HNS",
                "date": "2017-12-27",
                "name": "HNS",
                "totalVolume": 45,
                "value": 45,
                "x": "2017-12-27"
            },
            {
                "brand": "Syoss",
                "date": "2017-12-27",
                "name": "Syoss",
                "totalVolume": 1087,
                "value": 1087,
                "x": "2017-12-27"
            },
            {
                "brand": "Clear",
                "date": "2017-12-27",
                "name": "Clear",
                "totalVolume": 27,
                "value": 27,
                "x": "2017-12-27"
            },
            {
                "brand": "Seeyoung",
                "date": "2017-12-27",
                "name": "Seeyoung",
                "totalVolume": 208,
                "value": 208,
                "x": "2017-12-27"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2017-12-27",
                "name": "Schwarzkopf",
                "totalVolume": 323,
                "value": 323,
                "x": "2017-12-27"
            },
            {
                "brand": "Rejoice",
                "date": "2017-12-27",
                "name": "Rejoice",
                "totalVolume": 78,
                "value": 78,
                "x": "2017-12-27"
            },
            {
                "brand": "Pantene",
                "date": "2017-12-27",
                "name": "Pantene",
                "totalVolume": 145,
                "value": 145,
                "x": "2017-12-27"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2017-12-27",
                "name": "Loreal Paris Men",
                "totalVolume": 147,
                "value": 147,
                "x": "2017-12-27"
            },
            {
                "brand": "Loreal Paris",
                "date": "2017-12-27",
                "name": "Loreal Paris",
                "totalVolume": 56,
                "value": 56,
                "x": "2017-12-27"
            },
            {
                "brand": "VS",
                "date": "2017-12-27",
                "name": "VS",
                "totalVolume": 213,
                "value": 213,
                "x": "2017-12-27"
            },
            {
                "brand": "Tsubaki",
                "date": "2017-12-27",
                "name": "Tsubaki",
                "totalVolume": 32,
                "value": 32,
                "x": "2017-12-27"
            },
            {
                "brand": "Kerastase",
                "date": "2017-12-27",
                "name": "Kerastase",
                "totalVolume": 100,
                "value": 100,
                "x": "2017-12-27"
            },
            {
                "brand": "Tsubaki",
                "date": "2017-12-28",
                "name": "Tsubaki",
                "totalVolume": 42,
                "value": 42,
                "x": "2017-12-28"
            },
            {
                "brand": "Kerastase",
                "date": "2017-12-28",
                "name": "Kerastase",
                "totalVolume": 98,
                "value": 98,
                "x": "2017-12-28"
            },
            {
                "brand": "HNS",
                "date": "2017-12-28",
                "name": "HNS",
                "totalVolume": 54,
                "value": 54,
                "x": "2017-12-28"
            },
            {
                "brand": "Syoss",
                "date": "2017-12-28",
                "name": "Syoss",
                "totalVolume": 1533,
                "value": 1533,
                "x": "2017-12-28"
            },
            {
                "brand": "Clear",
                "date": "2017-12-28",
                "name": "Clear",
                "totalVolume": 27,
                "value": 27,
                "x": "2017-12-28"
            },
            {
                "brand": "Seeyoung",
                "date": "2017-12-28",
                "name": "Seeyoung",
                "totalVolume": 106,
                "value": 106,
                "x": "2017-12-28"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2017-12-28",
                "name": "Schwarzkopf",
                "totalVolume": 469,
                "value": 469,
                "x": "2017-12-28"
            },
            {
                "brand": "Rejoice",
                "date": "2017-12-28",
                "name": "Rejoice",
                "totalVolume": 72,
                "value": 72,
                "x": "2017-12-28"
            },
            {
                "brand": "Pantene",
                "date": "2017-12-28",
                "name": "Pantene",
                "totalVolume": 310,
                "value": 310,
                "x": "2017-12-28"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2017-12-28",
                "name": "Loreal Paris Men",
                "totalVolume": 127,
                "value": 127,
                "x": "2017-12-28"
            },
            {
                "brand": "Loreal Paris",
                "date": "2017-12-28",
                "name": "Loreal Paris",
                "totalVolume": 33,
                "value": 33,
                "x": "2017-12-28"
            },
            {
                "brand": "VS",
                "date": "2017-12-28",
                "name": "VS",
                "totalVolume": 236,
                "value": 236,
                "x": "2017-12-28"
            },
            {
                "brand": "Loreal Paris",
                "date": "2017-12-29",
                "name": "Loreal Paris",
                "totalVolume": 50,
                "value": 50,
                "x": "2017-12-29"
            },
            {
                "brand": "VS",
                "date": "2017-12-29",
                "name": "VS",
                "totalVolume": 209,
                "value": 209,
                "x": "2017-12-29"
            },
            {
                "brand": "Tsubaki",
                "date": "2017-12-29",
                "name": "Tsubaki",
                "totalVolume": 31,
                "value": 31,
                "x": "2017-12-29"
            },
            {
                "brand": "Kerastase",
                "date": "2017-12-29",
                "name": "Kerastase",
                "totalVolume": 59,
                "value": 59,
                "x": "2017-12-29"
            },
            {
                "brand": "HNS",
                "date": "2017-12-29",
                "name": "HNS",
                "totalVolume": 76,
                "value": 76,
                "x": "2017-12-29"
            },
            {
                "brand": "Syoss",
                "date": "2017-12-29",
                "name": "Syoss",
                "totalVolume": 385,
                "value": 385,
                "x": "2017-12-29"
            },
            {
                "brand": "Clear",
                "date": "2017-12-29",
                "name": "Clear",
                "totalVolume": 124,
                "value": 124,
                "x": "2017-12-29"
            },
            {
                "brand": "Seeyoung",
                "date": "2017-12-29",
                "name": "Seeyoung",
                "totalVolume": 28,
                "value": 28,
                "x": "2017-12-29"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2017-12-29",
                "name": "Schwarzkopf",
                "totalVolume": 464,
                "value": 464,
                "x": "2017-12-29"
            },
            {
                "brand": "Rejoice",
                "date": "2017-12-29",
                "name": "Rejoice",
                "totalVolume": 110,
                "value": 110,
                "x": "2017-12-29"
            },
            {
                "brand": "Pantene",
                "date": "2017-12-29",
                "name": "Pantene",
                "totalVolume": 124,
                "value": 124,
                "x": "2017-12-29"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2017-12-29",
                "name": "Loreal Paris Men",
                "totalVolume": 146,
                "value": 146,
                "x": "2017-12-29"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2017-12-30",
                "name": "Loreal Paris Men",
                "totalVolume": 93,
                "value": 93,
                "x": "2017-12-30"
            },
            {
                "brand": "Loreal Paris",
                "date": "2017-12-30",
                "name": "Loreal Paris",
                "totalVolume": 56,
                "value": 56,
                "x": "2017-12-30"
            },
            {
                "brand": "VS",
                "date": "2017-12-30",
                "name": "VS",
                "totalVolume": 1504,
                "value": 1504,
                "x": "2017-12-30"
            },
            {
                "brand": "Tsubaki",
                "date": "2017-12-30",
                "name": "Tsubaki",
                "totalVolume": 15,
                "value": 15,
                "x": "2017-12-30"
            },
            {
                "brand": "Kerastase",
                "date": "2017-12-30",
                "name": "Kerastase",
                "totalVolume": 45,
                "value": 45,
                "x": "2017-12-30"
            },
            {
                "brand": "HNS",
                "date": "2017-12-30",
                "name": "HNS",
                "totalVolume": 69,
                "value": 69,
                "x": "2017-12-30"
            },
            {
                "brand": "Syoss",
                "date": "2017-12-30",
                "name": "Syoss",
                "totalVolume": 267,
                "value": 267,
                "x": "2017-12-30"
            },
            {
                "brand": "Clear",
                "date": "2017-12-30",
                "name": "Clear",
                "totalVolume": 34,
                "value": 34,
                "x": "2017-12-30"
            },
            {
                "brand": "Seeyoung",
                "date": "2017-12-30",
                "name": "Seeyoung",
                "totalVolume": 18,
                "value": 18,
                "x": "2017-12-30"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2017-12-30",
                "name": "Schwarzkopf",
                "totalVolume": 394,
                "value": 394,
                "x": "2017-12-30"
            },
            {
                "brand": "Rejoice",
                "date": "2017-12-30",
                "name": "Rejoice",
                "totalVolume": 365,
                "value": 365,
                "x": "2017-12-30"
            },
            {
                "brand": "Pantene",
                "date": "2017-12-30",
                "name": "Pantene",
                "totalVolume": 1129,
                "value": 1129,
                "x": "2017-12-30"
            },
            {
                "brand": "Pantene",
                "date": "2017-12-31",
                "name": "Pantene",
                "totalVolume": 833,
                "value": 833,
                "x": "2017-12-31"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2017-12-31",
                "name": "Loreal Paris Men",
                "totalVolume": 483,
                "value": 483,
                "x": "2017-12-31"
            },
            {
                "brand": "Loreal Paris",
                "date": "2017-12-31",
                "name": "Loreal Paris",
                "totalVolume": 40,
                "value": 40,
                "x": "2017-12-31"
            },
            {
                "brand": "VS",
                "date": "2017-12-31",
                "name": "VS",
                "totalVolume": 277,
                "value": 277,
                "x": "2017-12-31"
            },
            {
                "brand": "Tsubaki",
                "date": "2017-12-31",
                "name": "Tsubaki",
                "totalVolume": 9,
                "value": 9,
                "x": "2017-12-31"
            },
            {
                "brand": "Kerastase",
                "date": "2017-12-31",
                "name": "Kerastase",
                "totalVolume": 160,
                "value": 160,
                "x": "2017-12-31"
            },
            {
                "brand": "HNS",
                "date": "2017-12-31",
                "name": "HNS",
                "totalVolume": 43,
                "value": 43,
                "x": "2017-12-31"
            },
            {
                "brand": "Syoss",
                "date": "2017-12-31",
                "name": "Syoss",
                "totalVolume": 246,
                "value": 246,
                "x": "2017-12-31"
            },
            {
                "brand": "Clear",
                "date": "2017-12-31",
                "name": "Clear",
                "totalVolume": 35,
                "value": 35,
                "x": "2017-12-31"
            },
            {
                "brand": "Seeyoung",
                "date": "2017-12-31",
                "name": "Seeyoung",
                "totalVolume": 15,
                "value": 15,
                "x": "2017-12-31"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2017-12-31",
                "name": "Schwarzkopf",
                "totalVolume": 390,
                "value": 390,
                "x": "2017-12-31"
            },
            {
                "brand": "Rejoice",
                "date": "2017-12-31",
                "name": "Rejoice",
                "totalVolume": 119,
                "value": 119,
                "x": "2017-12-31"
            },
            {
                "brand": "Rejoice",
                "date": "2018-01-01",
                "name": "Rejoice",
                "totalVolume": 65,
                "value": 65,
                "x": "2018-01-01"
            },
            {
                "brand": "Pantene",
                "date": "2018-01-01",
                "name": "Pantene",
                "totalVolume": 316,
                "value": 316,
                "x": "2018-01-01"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2018-01-01",
                "name": "Loreal Paris Men",
                "totalVolume": 11371,
                "value": 11371,
                "x": "2018-01-01"
            },
            {
                "brand": "Loreal Paris",
                "date": "2018-01-01",
                "name": "Loreal Paris",
                "totalVolume": 31,
                "value": 31,
                "x": "2018-01-01"
            },
            {
                "brand": "VS",
                "date": "2018-01-01",
                "name": "VS",
                "totalVolume": 192,
                "value": 192,
                "x": "2018-01-01"
            },
            {
                "brand": "Tsubaki",
                "date": "2018-01-01",
                "name": "Tsubaki",
                "totalVolume": 9,
                "value": 9,
                "x": "2018-01-01"
            },
            {
                "brand": "Kerastase",
                "date": "2018-01-01",
                "name": "Kerastase",
                "totalVolume": 72,
                "value": 72,
                "x": "2018-01-01"
            },
            {
                "brand": "HNS",
                "date": "2018-01-01",
                "name": "HNS",
                "totalVolume": 28,
                "value": 28,
                "x": "2018-01-01"
            },
            {
                "brand": "Syoss",
                "date": "2018-01-01",
                "name": "Syoss",
                "totalVolume": 959,
                "value": 959,
                "x": "2018-01-01"
            },
            {
                "brand": "Clear",
                "date": "2018-01-01",
                "name": "Clear",
                "totalVolume": 11,
                "value": 11,
                "x": "2018-01-01"
            },
            {
                "brand": "Seeyoung",
                "date": "2018-01-01",
                "name": "Seeyoung",
                "totalVolume": 16,
                "value": 16,
                "x": "2018-01-01"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2018-01-01",
                "name": "Schwarzkopf",
                "totalVolume": 393,
                "value": 393,
                "x": "2018-01-01"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2018-01-02",
                "name": "Schwarzkopf",
                "totalVolume": 398,
                "value": 398,
                "x": "2018-01-02"
            },
            {
                "brand": "Rejoice",
                "date": "2018-01-02",
                "name": "Rejoice",
                "totalVolume": 242,
                "value": 242,
                "x": "2018-01-02"
            },
            {
                "brand": "Pantene",
                "date": "2018-01-02",
                "name": "Pantene",
                "totalVolume": 782,
                "value": 782,
                "x": "2018-01-02"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2018-01-02",
                "name": "Loreal Paris Men",
                "totalVolume": 2086,
                "value": 2086,
                "x": "2018-01-02"
            },
            {
                "brand": "Loreal Paris",
                "date": "2018-01-02",
                "name": "Loreal Paris",
                "totalVolume": 40,
                "value": 40,
                "x": "2018-01-02"
            },
            {
                "brand": "VS",
                "date": "2018-01-02",
                "name": "VS",
                "totalVolume": 143,
                "value": 143,
                "x": "2018-01-02"
            },
            {
                "brand": "Tsubaki",
                "date": "2018-01-02",
                "name": "Tsubaki",
                "totalVolume": 11,
                "value": 11,
                "x": "2018-01-02"
            },
            {
                "brand": "Kerastase",
                "date": "2018-01-02",
                "name": "Kerastase",
                "totalVolume": 135,
                "value": 135,
                "x": "2018-01-02"
            },
            {
                "brand": "HNS",
                "date": "2018-01-02",
                "name": "HNS",
                "totalVolume": 29,
                "value": 29,
                "x": "2018-01-02"
            },
            {
                "brand": "Syoss",
                "date": "2018-01-02",
                "name": "Syoss",
                "totalVolume": 108,
                "value": 108,
                "x": "2018-01-02"
            },
            {
                "brand": "Clear",
                "date": "2018-01-02",
                "name": "Clear",
                "totalVolume": 13,
                "value": 13,
                "x": "2018-01-02"
            },
            {
                "brand": "Seeyoung",
                "date": "2018-01-02",
                "name": "Seeyoung",
                "totalVolume": 7,
                "value": 7,
                "x": "2018-01-02"
            },
            {
                "brand": "Clear",
                "date": "2018-01-03",
                "name": "Clear",
                "totalVolume": 11,
                "value": 11,
                "x": "2018-01-03"
            },
            {
                "brand": "Seeyoung",
                "date": "2018-01-03",
                "name": "Seeyoung",
                "totalVolume": 93,
                "value": 93,
                "x": "2018-01-03"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2018-01-03",
                "name": "Schwarzkopf",
                "totalVolume": 445,
                "value": 445,
                "x": "2018-01-03"
            },
            {
                "brand": "Rejoice",
                "date": "2018-01-03",
                "name": "Rejoice",
                "totalVolume": 60,
                "value": 60,
                "x": "2018-01-03"
            },
            {
                "brand": "Pantene",
                "date": "2018-01-03",
                "name": "Pantene",
                "totalVolume": 66,
                "value": 66,
                "x": "2018-01-03"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2018-01-03",
                "name": "Loreal Paris Men",
                "totalVolume": 1156,
                "value": 1156,
                "x": "2018-01-03"
            },
            {
                "brand": "Loreal Paris",
                "date": "2018-01-03",
                "name": "Loreal Paris",
                "totalVolume": 57,
                "value": 57,
                "x": "2018-01-03"
            },
            {
                "brand": "VS",
                "date": "2018-01-03",
                "name": "VS",
                "totalVolume": 167,
                "value": 167,
                "x": "2018-01-03"
            },
            {
                "brand": "Tsubaki",
                "date": "2018-01-03",
                "name": "Tsubaki",
                "totalVolume": 20,
                "value": 20,
                "x": "2018-01-03"
            },
            {
                "brand": "Kerastase",
                "date": "2018-01-03",
                "name": "Kerastase",
                "totalVolume": 146,
                "value": 146,
                "x": "2018-01-03"
            },
            {
                "brand": "HNS",
                "date": "2018-01-03",
                "name": "HNS",
                "totalVolume": 34,
                "value": 34,
                "x": "2018-01-03"
            },
            {
                "brand": "Syoss",
                "date": "2018-01-03",
                "name": "Syoss",
                "totalVolume": 195,
                "value": 195,
                "x": "2018-01-03"
            },
            {
                "brand": "HNS",
                "date": "2018-01-04",
                "name": "HNS",
                "totalVolume": 31,
                "value": 31,
                "x": "2018-01-04"
            },
            {
                "brand": "Syoss",
                "date": "2018-01-04",
                "name": "Syoss",
                "totalVolume": 395,
                "value": 395,
                "x": "2018-01-04"
            },
            {
                "brand": "Clear",
                "date": "2018-01-04",
                "name": "Clear",
                "totalVolume": 13,
                "value": 13,
                "x": "2018-01-04"
            },
            {
                "brand": "Seeyoung",
                "date": "2018-01-04",
                "name": "Seeyoung",
                "totalVolume": 64,
                "value": 64,
                "x": "2018-01-04"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2018-01-04",
                "name": "Schwarzkopf",
                "totalVolume": 428,
                "value": 428,
                "x": "2018-01-04"
            },
            {
                "brand": "Rejoice",
                "date": "2018-01-04",
                "name": "Rejoice",
                "totalVolume": 88,
                "value": 88,
                "x": "2018-01-04"
            },
            {
                "brand": "Pantene",
                "date": "2018-01-04",
                "name": "Pantene",
                "totalVolume": 101,
                "value": 101,
                "x": "2018-01-04"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2018-01-04",
                "name": "Loreal Paris Men",
                "totalVolume": 447,
                "value": 447,
                "x": "2018-01-04"
            },
            {
                "brand": "Loreal Paris",
                "date": "2018-01-04",
                "name": "Loreal Paris",
                "totalVolume": 41,
                "value": 41,
                "x": "2018-01-04"
            },
            {
                "brand": "VS",
                "date": "2018-01-04",
                "name": "VS",
                "totalVolume": 170,
                "value": 170,
                "x": "2018-01-04"
            },
            {
                "brand": "Tsubaki",
                "date": "2018-01-04",
                "name": "Tsubaki",
                "totalVolume": 16,
                "value": 16,
                "x": "2018-01-04"
            },
            {
                "brand": "Kerastase",
                "date": "2018-01-04",
                "name": "Kerastase",
                "totalVolume": 118,
                "value": 118,
                "x": "2018-01-04"
            },
            {
                "brand": "Tsubaki",
                "date": "2018-01-05",
                "name": "Tsubaki",
                "totalVolume": 34,
                "value": 34,
                "x": "2018-01-05"
            },
            {
                "brand": "Kerastase",
                "date": "2018-01-05",
                "name": "Kerastase",
                "totalVolume": 80,
                "value": 80,
                "x": "2018-01-05"
            },
            {
                "brand": "HNS",
                "date": "2018-01-05",
                "name": "HNS",
                "totalVolume": 29,
                "value": 29,
                "x": "2018-01-05"
            },
            {
                "brand": "Syoss",
                "date": "2018-01-05",
                "name": "Syoss",
                "totalVolume": 556,
                "value": 556,
                "x": "2018-01-05"
            },
            {
                "brand": "Clear",
                "date": "2018-01-05",
                "name": "Clear",
                "totalVolume": 8,
                "value": 8,
                "x": "2018-01-05"
            },
            {
                "brand": "Seeyoung",
                "date": "2018-01-05",
                "name": "Seeyoung",
                "totalVolume": 473,
                "value": 473,
                "x": "2018-01-05"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2018-01-05",
                "name": "Schwarzkopf",
                "totalVolume": 339,
                "value": 339,
                "x": "2018-01-05"
            },
            {
                "brand": "Rejoice",
                "date": "2018-01-05",
                "name": "Rejoice",
                "totalVolume": 70,
                "value": 70,
                "x": "2018-01-05"
            },
            {
                "brand": "Pantene",
                "date": "2018-01-05",
                "name": "Pantene",
                "totalVolume": 1307,
                "value": 1307,
                "x": "2018-01-05"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2018-01-05",
                "name": "Loreal Paris Men",
                "totalVolume": 642,
                "value": 642,
                "x": "2018-01-05"
            },
            {
                "brand": "Loreal Paris",
                "date": "2018-01-05",
                "name": "Loreal Paris",
                "totalVolume": 47,
                "value": 47,
                "x": "2018-01-05"
            },
            {
                "brand": "VS",
                "date": "2018-01-05",
                "name": "VS",
                "totalVolume": 198,
                "value": 198,
                "x": "2018-01-05"
            },
            {
                "brand": "Loreal Paris",
                "date": "2018-01-06",
                "name": "Loreal Paris",
                "totalVolume": 46,
                "value": 46,
                "x": "2018-01-06"
            },
            {
                "brand": "VS",
                "date": "2018-01-06",
                "name": "VS",
                "totalVolume": 162,
                "value": 162,
                "x": "2018-01-06"
            },
            {
                "brand": "Tsubaki",
                "date": "2018-01-06",
                "name": "Tsubaki",
                "totalVolume": 21,
                "value": 21,
                "x": "2018-01-06"
            },
            {
                "brand": "Kerastase",
                "date": "2018-01-06",
                "name": "Kerastase",
                "totalVolume": 74,
                "value": 74,
                "x": "2018-01-06"
            },
            {
                "brand": "HNS",
                "date": "2018-01-06",
                "name": "HNS",
                "totalVolume": 41,
                "value": 41,
                "x": "2018-01-06"
            },
            {
                "brand": "Syoss",
                "date": "2018-01-06",
                "name": "Syoss",
                "totalVolume": 579,
                "value": 579,
                "x": "2018-01-06"
            },
            {
                "brand": "Clear",
                "date": "2018-01-06",
                "name": "Clear",
                "totalVolume": 24,
                "value": 24,
                "x": "2018-01-06"
            },
            {
                "brand": "Seeyoung",
                "date": "2018-01-06",
                "name": "Seeyoung",
                "totalVolume": 170,
                "value": 170,
                "x": "2018-01-06"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2018-01-06",
                "name": "Schwarzkopf",
                "totalVolume": 270,
                "value": 270,
                "x": "2018-01-06"
            },
            {
                "brand": "Rejoice",
                "date": "2018-01-06",
                "name": "Rejoice",
                "totalVolume": 63,
                "value": 63,
                "x": "2018-01-06"
            },
            {
                "brand": "Pantene",
                "date": "2018-01-06",
                "name": "Pantene",
                "totalVolume": 26,
                "value": 26,
                "x": "2018-01-06"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2018-01-06",
                "name": "Loreal Paris Men",
                "totalVolume": 447,
                "value": 447,
                "x": "2018-01-06"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2018-01-07",
                "name": "Loreal Paris Men",
                "totalVolume": 272,
                "value": 272,
                "x": "2018-01-07"
            },
            {
                "brand": "Loreal Paris",
                "date": "2018-01-07",
                "name": "Loreal Paris",
                "totalVolume": 35,
                "value": 35,
                "x": "2018-01-07"
            },
            {
                "brand": "VS",
                "date": "2018-01-07",
                "name": "VS",
                "totalVolume": 116,
                "value": 116,
                "x": "2018-01-07"
            },
            {
                "brand": "Tsubaki",
                "date": "2018-01-07",
                "name": "Tsubaki",
                "totalVolume": 17,
                "value": 17,
                "x": "2018-01-07"
            },
            {
                "brand": "Kerastase",
                "date": "2018-01-07",
                "name": "Kerastase",
                "totalVolume": 78,
                "value": 78,
                "x": "2018-01-07"
            },
            {
                "brand": "HNS",
                "date": "2018-01-07",
                "name": "HNS",
                "totalVolume": 181,
                "value": 181,
                "x": "2018-01-07"
            },
            {
                "brand": "Syoss",
                "date": "2018-01-07",
                "name": "Syoss",
                "totalVolume": 64,
                "value": 64,
                "x": "2018-01-07"
            },
            {
                "brand": "Clear",
                "date": "2018-01-07",
                "name": "Clear",
                "totalVolume": 26,
                "value": 26,
                "x": "2018-01-07"
            },
            {
                "brand": "Seeyoung",
                "date": "2018-01-07",
                "name": "Seeyoung",
                "totalVolume": 29,
                "value": 29,
                "x": "2018-01-07"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2018-01-07",
                "name": "Schwarzkopf",
                "totalVolume": 83,
                "value": 83,
                "x": "2018-01-07"
            },
            {
                "brand": "Rejoice",
                "date": "2018-01-07",
                "name": "Rejoice",
                "totalVolume": 70,
                "value": 70,
                "x": "2018-01-07"
            },
            {
                "brand": "Pantene",
                "date": "2018-01-07",
                "name": "Pantene",
                "totalVolume": 61,
                "value": 61,
                "x": "2018-01-07"
            },
            {
                "brand": "Pantene",
                "date": "2018-01-08",
                "name": "Pantene",
                "totalVolume": 40,
                "value": 40,
                "x": "2018-01-08"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2018-01-08",
                "name": "Loreal Paris Men",
                "totalVolume": 1621,
                "value": 1621,
                "x": "2018-01-08"
            },
            {
                "brand": "Loreal Paris",
                "date": "2018-01-08",
                "name": "Loreal Paris",
                "totalVolume": 51,
                "value": 51,
                "x": "2018-01-08"
            },
            {
                "brand": "VS",
                "date": "2018-01-08",
                "name": "VS",
                "totalVolume": 135,
                "value": 135,
                "x": "2018-01-08"
            },
            {
                "brand": "Tsubaki",
                "date": "2018-01-08",
                "name": "Tsubaki",
                "totalVolume": 18,
                "value": 18,
                "x": "2018-01-08"
            },
            {
                "brand": "Kerastase",
                "date": "2018-01-08",
                "name": "Kerastase",
                "totalVolume": 56,
                "value": 56,
                "x": "2018-01-08"
            },
            {
                "brand": "HNS",
                "date": "2018-01-08",
                "name": "HNS",
                "totalVolume": 70,
                "value": 70,
                "x": "2018-01-08"
            },
            {
                "brand": "Syoss",
                "date": "2018-01-08",
                "name": "Syoss",
                "totalVolume": 58,
                "value": 58,
                "x": "2018-01-08"
            },
            {
                "brand": "Clear",
                "date": "2018-01-08",
                "name": "Clear",
                "totalVolume": 38,
                "value": 38,
                "x": "2018-01-08"
            },
            {
                "brand": "Seeyoung",
                "date": "2018-01-08",
                "name": "Seeyoung",
                "totalVolume": 56,
                "value": 56,
                "x": "2018-01-08"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2018-01-08",
                "name": "Schwarzkopf",
                "totalVolume": 103,
                "value": 103,
                "x": "2018-01-08"
            },
            {
                "brand": "Rejoice",
                "date": "2018-01-08",
                "name": "Rejoice",
                "totalVolume": 160,
                "value": 160,
                "x": "2018-01-08"
            },
            {
                "brand": "Rejoice",
                "date": "2018-01-09",
                "name": "Rejoice",
                "totalVolume": 189,
                "value": 189,
                "x": "2018-01-09"
            },
            {
                "brand": "Pantene",
                "date": "2018-01-09",
                "name": "Pantene",
                "totalVolume": 69,
                "value": 69,
                "x": "2018-01-09"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2018-01-09",
                "name": "Loreal Paris Men",
                "totalVolume": 2822,
                "value": 2822,
                "x": "2018-01-09"
            },
            {
                "brand": "Loreal Paris",
                "date": "2018-01-09",
                "name": "Loreal Paris",
                "totalVolume": 38,
                "value": 38,
                "x": "2018-01-09"
            },
            {
                "brand": "VS",
                "date": "2018-01-09",
                "name": "VS",
                "totalVolume": 331,
                "value": 331,
                "x": "2018-01-09"
            },
            {
                "brand": "Tsubaki",
                "date": "2018-01-09",
                "name": "Tsubaki",
                "totalVolume": 11,
                "value": 11,
                "x": "2018-01-09"
            },
            {
                "brand": "Kerastase",
                "date": "2018-01-09",
                "name": "Kerastase",
                "totalVolume": 69,
                "value": 69,
                "x": "2018-01-09"
            },
            {
                "brand": "HNS",
                "date": "2018-01-09",
                "name": "HNS",
                "totalVolume": 189,
                "value": 189,
                "x": "2018-01-09"
            },
            {
                "brand": "Syoss",
                "date": "2018-01-09",
                "name": "Syoss",
                "totalVolume": 949,
                "value": 949,
                "x": "2018-01-09"
            },
            {
                "brand": "Clear",
                "date": "2018-01-09",
                "name": "Clear",
                "totalVolume": 23,
                "value": 23,
                "x": "2018-01-09"
            },
            {
                "brand": "Seeyoung",
                "date": "2018-01-09",
                "name": "Seeyoung",
                "totalVolume": 50,
                "value": 50,
                "x": "2018-01-09"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2018-01-09",
                "name": "Schwarzkopf",
                "totalVolume": 268,
                "value": 268,
                "x": "2018-01-09"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2018-01-10",
                "name": "Schwarzkopf",
                "totalVolume": 116,
                "value": 116,
                "x": "2018-01-10"
            },
            {
                "brand": "Rejoice",
                "date": "2018-01-10",
                "name": "Rejoice",
                "totalVolume": 89,
                "value": 89,
                "x": "2018-01-10"
            },
            {
                "brand": "Pantene",
                "date": "2018-01-10",
                "name": "Pantene",
                "totalVolume": 360,
                "value": 360,
                "x": "2018-01-10"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2018-01-10",
                "name": "Loreal Paris Men",
                "totalVolume": 2387,
                "value": 2387,
                "x": "2018-01-10"
            },
            {
                "brand": "Loreal Paris",
                "date": "2018-01-10",
                "name": "Loreal Paris",
                "totalVolume": 59,
                "value": 59,
                "x": "2018-01-10"
            },
            {
                "brand": "VS",
                "date": "2018-01-10",
                "name": "VS",
                "totalVolume": 281,
                "value": 281,
                "x": "2018-01-10"
            },
            {
                "brand": "Kerastase",
                "date": "2018-01-10",
                "name": "Kerastase",
                "totalVolume": 56,
                "value": 56,
                "x": "2018-01-10"
            },
            {
                "brand": "Tsubaki",
                "date": "2018-01-10",
                "name": "Tsubaki",
                "totalVolume": 31,
                "value": 31,
                "x": "2018-01-10"
            },
            {
                "brand": "HNS",
                "date": "2018-01-10",
                "name": "HNS",
                "totalVolume": 106,
                "value": 106,
                "x": "2018-01-10"
            },
            {
                "brand": "Syoss",
                "date": "2018-01-10",
                "name": "Syoss",
                "totalVolume": 64,
                "value": 64,
                "x": "2018-01-10"
            },
            {
                "brand": "Clear",
                "date": "2018-01-10",
                "name": "Clear",
                "totalVolume": 15,
                "value": 15,
                "x": "2018-01-10"
            },
            {
                "brand": "Seeyoung",
                "date": "2018-01-10",
                "name": "Seeyoung",
                "totalVolume": 366,
                "value": 366,
                "x": "2018-01-10"
            },
            {
                "brand": "Clear",
                "date": "2018-01-11",
                "name": "Clear",
                "totalVolume": 31,
                "value": 31,
                "x": "2018-01-11"
            },
            {
                "brand": "Seeyoung",
                "date": "2018-01-11",
                "name": "Seeyoung",
                "totalVolume": 80,
                "value": 80,
                "x": "2018-01-11"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2018-01-11",
                "name": "Schwarzkopf",
                "totalVolume": 100,
                "value": 100,
                "x": "2018-01-11"
            },
            {
                "brand": "Rejoice",
                "date": "2018-01-11",
                "name": "Rejoice",
                "totalVolume": 105,
                "value": 105,
                "x": "2018-01-11"
            },
            {
                "brand": "Pantene",
                "date": "2018-01-11",
                "name": "Pantene",
                "totalVolume": 1760,
                "value": 1760,
                "x": "2018-01-11"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2018-01-11",
                "name": "Loreal Paris Men",
                "totalVolume": 391,
                "value": 391,
                "x": "2018-01-11"
            },
            {
                "brand": "Loreal Paris",
                "date": "2018-01-11",
                "name": "Loreal Paris",
                "totalVolume": 41,
                "value": 41,
                "x": "2018-01-11"
            },
            {
                "brand": "VS",
                "date": "2018-01-11",
                "name": "VS",
                "totalVolume": 148,
                "value": 148,
                "x": "2018-01-11"
            },
            {
                "brand": "Kerastase",
                "date": "2018-01-11",
                "name": "Kerastase",
                "totalVolume": 62,
                "value": 62,
                "x": "2018-01-11"
            },
            {
                "brand": "Tsubaki",
                "date": "2018-01-11",
                "name": "Tsubaki",
                "totalVolume": 18,
                "value": 18,
                "x": "2018-01-11"
            },
            {
                "brand": "HNS",
                "date": "2018-01-11",
                "name": "HNS",
                "totalVolume": 87,
                "value": 87,
                "x": "2018-01-11"
            },
            {
                "brand": "Syoss",
                "date": "2018-01-11",
                "name": "Syoss",
                "totalVolume": 496,
                "value": 496,
                "x": "2018-01-11"
            },
            {
                "brand": "HNS",
                "date": "2018-01-12",
                "name": "HNS",
                "totalVolume": 62,
                "value": 62,
                "x": "2018-01-12"
            },
            {
                "brand": "Syoss",
                "date": "2018-01-12",
                "name": "Syoss",
                "totalVolume": 275,
                "value": 275,
                "x": "2018-01-12"
            },
            {
                "brand": "Clear",
                "date": "2018-01-12",
                "name": "Clear",
                "totalVolume": 16,
                "value": 16,
                "x": "2018-01-12"
            },
            {
                "brand": "Seeyoung",
                "date": "2018-01-12",
                "name": "Seeyoung",
                "totalVolume": 38,
                "value": 38,
                "x": "2018-01-12"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2018-01-12",
                "name": "Schwarzkopf",
                "totalVolume": 456,
                "value": 456,
                "x": "2018-01-12"
            },
            {
                "brand": "Rejoice",
                "date": "2018-01-12",
                "name": "Rejoice",
                "totalVolume": 97,
                "value": 97,
                "x": "2018-01-12"
            },
            {
                "brand": "Pantene",
                "date": "2018-01-12",
                "name": "Pantene",
                "totalVolume": 1013,
                "value": 1013,
                "x": "2018-01-12"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2018-01-12",
                "name": "Loreal Paris Men",
                "totalVolume": 215,
                "value": 215,
                "x": "2018-01-12"
            },
            {
                "brand": "Loreal Paris",
                "date": "2018-01-12",
                "name": "Loreal Paris",
                "totalVolume": 30,
                "value": 30,
                "x": "2018-01-12"
            },
            {
                "brand": "VS",
                "date": "2018-01-12",
                "name": "VS",
                "totalVolume": 161,
                "value": 161,
                "x": "2018-01-12"
            },
            {
                "brand": "Kerastase",
                "date": "2018-01-12",
                "name": "Kerastase",
                "totalVolume": 75,
                "value": 75,
                "x": "2018-01-12"
            },
            {
                "brand": "Tsubaki",
                "date": "2018-01-12",
                "name": "Tsubaki",
                "totalVolume": 33,
                "value": 33,
                "x": "2018-01-12"
            },
            {
                "brand": "Kerastase",
                "date": "2018-01-13",
                "name": "Kerastase",
                "totalVolume": 58,
                "value": 58,
                "x": "2018-01-13"
            },
            {
                "brand": "Tsubaki",
                "date": "2018-01-13",
                "name": "Tsubaki",
                "totalVolume": 25,
                "value": 25,
                "x": "2018-01-13"
            },
            {
                "brand": "HNS",
                "date": "2018-01-13",
                "name": "HNS",
                "totalVolume": 339,
                "value": 339,
                "x": "2018-01-13"
            },
            {
                "brand": "Syoss",
                "date": "2018-01-13",
                "name": "Syoss",
                "totalVolume": 632,
                "value": 632,
                "x": "2018-01-13"
            },
            {
                "brand": "Clear",
                "date": "2018-01-13",
                "name": "Clear",
                "totalVolume": 664,
                "value": 664,
                "x": "2018-01-13"
            },
            {
                "brand": "Seeyoung",
                "date": "2018-01-13",
                "name": "Seeyoung",
                "totalVolume": 22,
                "value": 22,
                "x": "2018-01-13"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2018-01-13",
                "name": "Schwarzkopf",
                "totalVolume": 541,
                "value": 541,
                "x": "2018-01-13"
            },
            {
                "brand": "Rejoice",
                "date": "2018-01-13",
                "name": "Rejoice",
                "totalVolume": 51,
                "value": 51,
                "x": "2018-01-13"
            },
            {
                "brand": "Pantene",
                "date": "2018-01-13",
                "name": "Pantene",
                "totalVolume": 1849,
                "value": 1849,
                "x": "2018-01-13"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2018-01-13",
                "name": "Loreal Paris Men",
                "totalVolume": 180,
                "value": 180,
                "x": "2018-01-13"
            },
            {
                "brand": "Loreal Paris",
                "date": "2018-01-13",
                "name": "Loreal Paris",
                "totalVolume": 35,
                "value": 35,
                "x": "2018-01-13"
            },
            {
                "brand": "VS",
                "date": "2018-01-13",
                "name": "VS",
                "totalVolume": 143,
                "value": 143,
                "x": "2018-01-13"
            },
            {
                "brand": "Loreal Paris",
                "date": "2018-01-14",
                "name": "Loreal Paris",
                "totalVolume": 43,
                "value": 43,
                "x": "2018-01-14"
            },
            {
                "brand": "VS",
                "date": "2018-01-14",
                "name": "VS",
                "totalVolume": 209,
                "value": 209,
                "x": "2018-01-14"
            },
            {
                "brand": "Kerastase",
                "date": "2018-01-14",
                "name": "Kerastase",
                "totalVolume": 107,
                "value": 107,
                "x": "2018-01-14"
            },
            {
                "brand": "Tsubaki",
                "date": "2018-01-14",
                "name": "Tsubaki",
                "totalVolume": 25,
                "value": 25,
                "x": "2018-01-14"
            },
            {
                "brand": "HNS",
                "date": "2018-01-14",
                "name": "HNS",
                "totalVolume": 232,
                "value": 232,
                "x": "2018-01-14"
            },
            {
                "brand": "Syoss",
                "date": "2018-01-14",
                "name": "Syoss",
                "totalVolume": 657,
                "value": 657,
                "x": "2018-01-14"
            },
            {
                "brand": "Clear",
                "date": "2018-01-14",
                "name": "Clear",
                "totalVolume": 41,
                "value": 41,
                "x": "2018-01-14"
            },
            {
                "brand": "Seeyoung",
                "date": "2018-01-14",
                "name": "Seeyoung",
                "totalVolume": 10,
                "value": 10,
                "x": "2018-01-14"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2018-01-14",
                "name": "Schwarzkopf",
                "totalVolume": 870,
                "value": 870,
                "x": "2018-01-14"
            },
            {
                "brand": "Rejoice",
                "date": "2018-01-14",
                "name": "Rejoice",
                "totalVolume": 106,
                "value": 106,
                "x": "2018-01-14"
            },
            {
                "brand": "Pantene",
                "date": "2018-01-14",
                "name": "Pantene",
                "totalVolume": 342,
                "value": 342,
                "x": "2018-01-14"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2018-01-14",
                "name": "Loreal Paris Men",
                "totalVolume": 132,
                "value": 132,
                "x": "2018-01-14"
            },
            {
                "brand": "Loreal Paris Men",
                "date": "2018-01-15",
                "name": "Loreal Paris Men",
                "totalVolume": 955,
                "value": 955,
                "x": "2018-01-15"
            },
            {
                "brand": "Loreal Paris",
                "date": "2018-01-15",
                "name": "Loreal Paris",
                "totalVolume": 105,
                "value": 105,
                "x": "2018-01-15"
            },
            {
                "brand": "VS",
                "date": "2018-01-15",
                "name": "VS",
                "totalVolume": 185,
                "value": 185,
                "x": "2018-01-15"
            },
            {
                "brand": "Kerastase",
                "date": "2018-01-15",
                "name": "Kerastase",
                "totalVolume": 73,
                "value": 73,
                "x": "2018-01-15"
            },
            {
                "brand": "Tsubaki",
                "date": "2018-01-15",
                "name": "Tsubaki",
                "totalVolume": 51,
                "value": 51,
                "x": "2018-01-15"
            },
            {
                "brand": "HNS",
                "date": "2018-01-15",
                "name": "HNS",
                "totalVolume": 300,
                "value": 300,
                "x": "2018-01-15"
            },
            {
                "brand": "Syoss",
                "date": "2018-01-15",
                "name": "Syoss",
                "totalVolume": 1499,
                "value": 1499,
                "x": "2018-01-15"
            },
            {
                "brand": "Clear",
                "date": "2018-01-15",
                "name": "Clear",
                "totalVolume": 30,
                "value": 30,
                "x": "2018-01-15"
            },
            {
                "brand": "Seeyoung",
                "date": "2018-01-15",
                "name": "Seeyoung",
                "totalVolume": 191,
                "value": 191,
                "x": "2018-01-15"
            },
            {
                "brand": "Schwarzkopf",
                "date": "2018-01-15",
                "name": "Schwarzkopf",
                "totalVolume": 1274,
                "value": 1274,
                "x": "2018-01-15"
            },
            {
                "brand": "Rejoice",
                "date": "2018-01-15",
                "name": "Rejoice",
                "totalVolume": 124,
                "value": 124,
                "x": "2018-01-15"
            },
            {
                "brand": "Pantene",
                "date": "2018-01-15",
                "name": "Pantene",
                "totalVolume": 298,
                "value": 298,
                "x": "2018-01-15"
            }
        ];

    let R = MrResource.pool('./assets/{file}');

    let testAjax = () => {

        // MrRequest('./assets/baidu.xlsx', {
        //     headers: {
        //         responseType: 'blob'
        //     }
        // });

        R.download({
            file: 'baidu.xlsx',
            downloadName: '江山如此.xlsx'
        }, {
            headers: {
                responseType: 'blob'
            }
        });

        return 'aaa';
    };

    return (
        <div className={styles.normal}>

            <MrIf condition={true}>
                <h2>List Page</h2>
            </MrIf>

            <div>
                <MrDownload url="http://localhost:8000/assets/b.txt">我要下载</MrDownload> http://localhost:8000/assets/b.txt
            </div>

            <div>
                <MrDownload url="http://localhost:8000/assets/baidu.xlsx">我要下载</MrDownload> http://localhost:8000/assets/baidu.xlsx
            </div>

            <div>
                <MrDownload url="http://localhost:8000/assets/bbs.svg">我要下载</MrDownload> http://localhost:8000/assets/bbs.svg
            </div>

            <div>
                <MrDownload url="http://localhost:8000/assets/bht.pdf">我要下载</MrDownload> http://localhost:8000/assets/bht.pdf
            </div>

            <div>
                <MrDownload url="http://localhost:8000/assets/gbk.rar">我要下载</MrDownload> http://localhost:8000/assets/gbk.rar
            </div>

            <div>
                <MrDownload url="http://localhost:8000/assets/icon.zip">我要下载</MrDownload> http://localhost:8000/assets/icon.zip
            </div>

            <div>
                <MrDownload url="http://localhost:8000/assets/olay.csv">我要下载</MrDownload> http://localhost:8000/assets/olay.csv
            </div>

            <div>
                <MrDownload url="http://localhost:8000/assets/王丹.docx">我要下载</MrDownload> http://localhost:8000/assets/王丹.docx
            </div>

            <div>
                <MrDownload url="http://localhost:8000/assets/林政.jpg">我要下载</MrDownload> http://localhost:8000/assets/林政.jpg
            </div>

            <Button onClick={testAjax.bind(this)}>Ajax</Button>

            <div
                onClick={() => {
                    router.goBack();
                }}
            >
                Back
            </div>

            <MrIf rules={[
                'list.rose.ring',
                'list.word.cloud'
            ]}> <MrIf rules={'list.rose.ring'}>
                <div style={{height: 300}}>
                    <MrEcharts// 数据源
                        data={dataPie}// ? sourceType // 数据源类型 => dataSet, dataSource
                        dataType={'dataSource'}// ? dataModel // 数据处理类型 => group, single
                        dataModel={''}// chartTypes // 图表类型以及衍生类型， // 如 pie::ring(饼图::环形), pie::rose(饼图::南丁格尔) // 如 bar::stack(柱形堆叠图), line:area(线x形::面积图)
                        chartTypes={'pie::ring::rose'}// ? setting // 额外配置项 // 可使用options路径直接配置 // {'series[0].center': [0, 75%]}
                        setting={[
                            {'legend.show': true},
                            {'legend.orient': 'vertical'},
                            {'legend.right': '20%'}
                        ]}// ? options 直接调用 // 图表的options配置，直接获得图表
                        options={null}// ? theme // 图表的主体配色
                        theme={''}// ? renderType, // 图表绘图类型 'svg', 'canvas'
                        renderType={'svg'}
                    />
                </div>
            </MrIf>

                <MrIf rules={'list.word.cloud'}>
                    <section style={{height: 300}}>
                        <h4>wordCloud</h4>
                        <MrEcharts data={dataWordCloud} chartTypes={'wordCloud::random'} />
                    </section>
                </MrIf> </MrIf>

            <h4>bar::stack</h4>
            <section style={{height: 300}}>
                <MrEcharts
                    data={ladder} // no use stack // {bar::stack=false}
                    chartTypes={'bar::stack::ladder'}
                />
            </section>

            <MrPanel title="静夜思::李白"> 床前明月光
                <br />
                疑似地上霜
                <br />
                举头望明月
                <br />
                低头思故乡
                <br />
            </MrPanel>

            <MrEchartsPanel
                style={{height: 300}}
                title="MrEcharts Panel::bar-stack"
                data={trend} // no use stack // {bar::stack=false}
                chartTypes={'bar::stack'}
                setting={{'legend.show': false}}
            />

            <MrFill gutter={16} style={{height: 300}}>
                <MrCol span={2} scroll={true}>1</MrCol>
                <MrCol span={1}>2</MrCol>
                <MrCol span={3}>3</MrCol>
                <MrCol>4</MrCol>
            </MrFill>
        </div>
    );
};
