import _ from 'lodash';
import moment from 'moment';
import { MrResource } from 'masterrt';
import { default as $intl } from './intl.services';
import mu from 'mzmu';
import $theme from '../theme';
import { IChartBasic } from './csi.chartBasic';

class $tools extends IChartBasic {
    constructor() {
        super();
    }

    /**
     * 递归取半值
     */
    getHalfValue = (val: number, start: number) => {
        if (start < 11) {
            let end = start + 1;
            if (val > start && val < end) {
                return start / 2;
            } else if (val > start + 2) {
                return this.getHalfValue(val, start + 2);
            } else {
                return val / 2;
            }
        } else {
            return val / 2;
        }
    };

    /**
     * 词云过滤方法
     */
    getWClouds = (wcloud: any, filters: any, wcType: any) => {
        let result = [];
        for (let obj of wcloud) {
            if ((_.isEmpty(filters) || !filters.some((f) => f === (obj.name || obj.word))) && (obj.name || obj.word).indexOf('@') === -1) {
                result.push({ name: obj.name || obj.word, value: obj.freq1 || obj.value || obj.wordFreq });
            }
        }
        return result;
    };

    /**
     * Venn图数据转换，多维数组并自定义颜色
     */
    getFansList = ($const: any, fans: any, starsInfo: any) => {
        let list = { fansColor: {}, fansList: {} };
        let fansColor = {};
        let fansList = {};
        const { showName, compareColors } = $const;

        _.forEach(starsInfo, (c, i) => {
            _.forEach(fans, (fan) => {
                let index = _.findIndex(fan, (o) => o.celebrity === c.celebrity);
                if (index !== -1) {
                    fan[index].color = fan[index].weiboFansScore ? compareColors[i] : '#D3D3D3';
                }
            });
        });
        _.forEach(starsInfo, (c) => {
            fansColor[c.celebrity] = [];
            fansList[c.celebrity] = [];
            _.forEach(fans, (fan) => {
                let tmp = _.find(fan, (o) => o.celebrity === c.celebrity) || {};
                if (!_.isEmpty(tmp)) {
                    let venData = [],
                        venColor = [];
                    let index = _.findIndex(fan, (o) => o.celebrity === c.celebrity);
                    if (index !== 0) {
                        fan.reverse();
                    }
                    _.forEach(fan, (fa) => {
                        let obj: any = { sets: [] };
                        obj.sets.push(fa.celebrity);
                        obj.label = '';
                        obj.size = fa.weiboFansScore || (fan[0].weiboFansScore ? fan[0].weiboFansScore : 30000);
                        obj.values = `${fa.celebrity}: ${fa.weiboFansScore ? mu.format(fa.weiboFansScore) : 'no data'}`;
                        obj.colorValues = fa.weiboFansScore;
                        venData.push(obj);
                        venColor.push(fa.color);
                    });
                    let lastObj: any = { sets: [] };
                    lastObj.sets.push(fan[0].celebrity, fan[1].celebrity);
                    lastObj.size = fan[0].coincidenceNum || 0;
                    if (fan[1].coincidence) {
                        lastObj.values = `${fan[0].celebrity}: ${Math.round(fan[0].coincidence * 100)}%<br/>${fan[1].celebrity}: ${Math.round(fan[1].coincidence * 100)}%`;
                    } else {
                        lastObj.values = `${fan[0].celebrity}: no data<br/>${fan[1].celebrity}: no data`;
                    }

                    venData.push(lastObj);
                    venColor.push(fan[1].color);
                    fansList[c.celebrity].push(venData);
                    fansColor[c.celebrity].push(venColor);
                }
            });
        });
        list.fansColor = fansColor;
        list.fansList = fansList;
        return list;
    };

    /**
     * 获取url的日期
     */
    getDateOfUrl = (str: string) => {
        let paramsArr = str.slice(1).split('&'),
            date;
        _.forEach(paramsArr, (item) => {
            let arr = item.split('=');
            if (['quarter', 'month', 'halfyear', 'year'].indexOf(arr[0]) !== -1) {
                date = { type: arr[0], value: arr[1] };
            }
        });
        return date;
    };

    /**
     * 获取真实日期在日期接口中之前的日期列表
     * date Object
     */
    getPrevDates = (date: any, actual: any, len: number) => {
        let arr = [];
        let dateArr = actual[date.type].split(',');
        for (let i = 0; i < dateArr.length; i++) {
            if (date.value === dateArr[i]) {
                let start = i - len + 1;
                arr = dateArr.slice(start > 0 ? start : 0, i + 1);
                break;
            }
        }
        return arr;
    };

    /**
     * csi-mobile方法,获取日期组件的日期范围
     * @param allDate
     */
    getDatePeriod = (allDate: any) => {
        if (_.isNull(allDate.Yearly)) {
            return [];
        }
        let datePeriod = [];
        let yearArr = allDate.Yearly.split(',');
        let date = {};
        _.forEach(['Monthly', 'Quarterly', 'Half-yearly'], (key) => {
            let arr = allDate[key].split(',');
            let obj = {};
            _.forEach(yearArr, (year) => {
                obj[year] = [];
            });
            _.forEach(arr, (str) => {
                let val = str.substr(-2, 2);
                _.forEach(yearArr, (year) => {
                    if (str.indexOf(year) !== -1) {
                        obj[year].push({ label: val, value: val });
                    }
                });
            });
            date[key] = obj;
        });
        _.forEach(['Monthly', 'Quarterly', 'Half-yearly', 'Yearly'], (key) => {
            let obj: any = { value: key, label: key };
            obj.children = [];
            _.forEach(yearArr, (year) => {
                let yearObj: any = { value: year, label: year };
                if (date[key]) {
                    yearObj.children = date[key][year];
                }
                obj.children.push(yearObj);
            });
            datePeriod.push(obj);
        });

        return datePeriod;
    };

    /**
     * 日期格式转换，对象转字符串
     */
    getDate = (date: any) => {
        let dateValue, str, dateArr;
        switch (date.type) {
            case 'quarter':
                str = 'Quarterly';
                dateValue = str + ',' + date.value.substr(0, 4) + ',' + date.value.substr(4, 2);
                break;
            case 'halfyear':
                str = 'Half-yearly';
                dateValue = str + ',' + date.value.substr(0, 4) + ',' + date.value.substr(4, 2);
                break;
            case 'year':
                str = 'Yearly';
                dateValue = str + ',' + date.value;
                break;
            default:
                str = 'Monthly';
                dateArr = date.value.split('-');
                dateValue = str + ',' + dateArr[0] + ',' + dateArr[1];
                break;
        }
        return dateValue;
    };

    /**
     * 日期格式转换，数组转对象
     */
    dateChange = (value: any) => {
        let date: any = {};
        switch (value[0]) {
            case 'Monthly':
                date.value = value[1] + '-' + value[2];
                date.type = 'month';
                break;
            case 'Quarterly':
                date.type = 'quarter';
                date.value = value[1] + value[2];
                break;
            case 'Half-yearly':
                date.type = 'halfyear';
                date.value = value[1] + value[2];
                break;
            case 'Yearly':
                date.type = 'year';
                date.value = value[1];
                break;
        }
        return date;
    };

    isExists = (arr: any, obj: any) => {
        return _.findIndex(arr, (o) => o.id === obj.id) !== -1;
    };

    /**
     * 字符串拆分后转数组
     */
    transShowName = ($const: any, str: any, key?: any) => {
        const { showName } = $const;
        if (!str) {
            return '-';
        } else if (_.isNumber(str)) {
            return mu.format(str);
        }
        let arr = _.trim(str).split(/[、，；;,]/);

        arr = arr.filter((_item) => {
            if (_item) {
                return _item;
            }
        });

        arr = arr.map((_item) => {
            _item = _.trim(_item);
            return $intl.t(showName[_item]) || _item;
        });

        return arr.join($intl.t(', '));
    };

    /**
     * 字符串转数组
     */
    getListBody = (params: any) => {
        let _params = mu.map(params, (val, key) => {
            if (val) {
                return _.isArray(val) || key === 'celebrity' ? val : [val];
            } else {
                return '__remove_map__';
            }
        });

        return _params;
    };

    /**
     * 分类
     */
    riskRevel = (risk: number) => {
        if (risk >= 0 && risk < 1) {
            return 0;
        } else if (risk >= 1 && risk < 4) {
            return 1;
        } else {
            return 2;
        }
    };

    /**
     * dbpi-mobile方法,获取日期组件的日期范围---通用方法
     * @param year
     */
    getYears = (year: any) => {
        let currentYear = moment().year();
        let yearArr = [];
        do {
            yearArr.push(currentYear + '');
            currentYear--;
        } while (year <= currentYear);
        return yearArr;
    };

    getQuarter = () => {
        let quarter = [];
        _.forEach([1, 2, 3, 4], (q) => {
            let obj = {
                label: `Quarter ${q}`,
                value: `Q${q}`
            };
            quarter.push(obj);
        });
        return quarter;
    };

    getMonth = () => {
        let month = [];
        for (let i = 1; i <= 12; i++) {
            let obj = {
                label: moment(`2018/${i}/1`, 'YYYY/MM/DD').format('MMMM'),
                value: moment(`2018/${i}/1`, 'YYYY/MM/DD').format('MM')
            };
            month.push(obj);
        }
        return month;
    };

    getComDatePeriod = (dateArr: any, year?: 2016) => {
        let datePeriod = [];
        let yearArr = this.getYears(year);

        let date = {};
        _.forEach(dateArr.slice(1), (d) => {
            let obj = {},
                arr = [];
            switch (d.label) {
                case 'Quarterly':
                    arr = this.getQuarter();
                    break;
                case 'Monthly':
                    arr = this.getMonth();
                    break;
            }
            _.forEach(yearArr, (year) => {
                !obj[year] && (obj[year] = []);
                obj[year] = arr;
            });
            date[d.label] = obj;
        });

        _.forEach(dateArr, (d) => {
            let obj: any = d;
            obj.children = [];
            _.forEach(yearArr, (year) => {
                let yearObj: any = { value: year, label: year };
                if (date[d.label]) {
                    yearObj.children = date[d.label][year];
                }
                obj.children.push(yearObj);
            });
            datePeriod.push(obj);
        });

        return datePeriod;
    };

    getDbpidate = (value: any) => {
        let date = [];
        let addZero = (i) => (i < 10 ? '0' : '') + i;
        const prevMonth = (year, m) => (m > 1 ? `${year}-${addZero(m - 1)}` : `${year - 1}-12`);
        let prevQuarter = (year, q) => {
            return q > 1 ? `${year}Q${q - 1}` : `${year - 1}Q4`;
        };

        switch (value[0]) {
            case 'month':
                date = [`${prevMonth(value[1] - 0, value[2] - 0)}-01`, `${value[1]}-${value[2]}-01`];
                break;
            case 'quarter':
                date = [`${prevQuarter(value[1] - 0, value[2].slice(1) - 0)}`, `${value[1]}${value[2]}`];
                break;
            case 'year':
                date = [`${parseInt(value[1], 10) - 1}`, value[1]];
                break;
        }

        return date;
    };

    getDbpidateFormat = (value: any) => {
        let dateValue;
        switch (value[0]) {
            case 'month':
                dateValue = moment(`${value[1]}/${value[2]}/1`, 'YYYY/MM/DD').format('YYYY MMMM');
                break;
            case 'quarter':
                dateValue = `${value[1]} Quarter ${value[2].slice(1)}`;
                break;
            case 'year':
                dateValue = value[1];
                break;
        }
        return dateValue;
    };

    isIncludeCsi = (theme: string) => {
        return mu.or(theme, 'csi', 'one-loreal-csi');
    };

    isIncludeKsi = (theme: string) => {
        return mu.or(theme, 'ksi', 'one-loreal-ksi');
    };

    getStarBrands = (brands: any, type: string) => {
        let obj = {};
        brands = brands.sort((a, b) => (a[type] - b[type] > 0 ? -1 : 1)); // 降序排列
        _.forEach(brands, (brand) => {
            !obj[brand.celebrity] && (obj[brand.celebrity] = []);
            obj[brand.celebrity].push(brand);
        });
        return obj;
    };
}

export { $tools };

export default new $tools();
