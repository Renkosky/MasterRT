import _ from 'lodash';
import { default as $intl } from './intl.services';

class IChartBasic {
    /**
     * 获取在showName中的翻译
     */
    getShowName = ($const: any, name: string) => {
        const { showName } = $const;
        let arr = name.split('-').map((item) => {
            return $intl.t(showName[item]) || item;
        });
        return arr.join('-');
    };

    getRadarCharts = ($const: any, basicRadarFields: any, params: any, data: any, bmData?: any) => {
        const { showName } = $const;
        let { date, celebrity } = params;
        let lastDate = _.last(date);
        let arr = [];
        _.forEach(basicRadarFields, (item) => {
            _.forEach(_.isArray(celebrity) ? celebrity : [celebrity], (c) => {
                let obj = { x: $intl.t(showName[item]) };
                let tmp = _.find(data, { celebrity: c, date: lastDate }) || {};
                obj['value'] = Math.round(tmp[item] || 0);
                obj['name'] = c;
                arr.push(obj);
            });
            if (bmData) {
                let obj = { x: $intl.t(showName[item]) };
                let tmpBm = _.find(bmData, (o) => o.date === lastDate) || {};
                obj['value'] = Math.round(tmpBm[item] || 0);
                obj['name'] = $intl.t('Benchmark');
                arr.push(obj);
            }
        });
        return arr;
    };

    getNormalCharts = ($const: any, names: any, params: any, data: any, bmData: any) => {
        let { date, celebrity } = params;
        let bmNameStr = '-benchmark';
        let arr = [];
        let isAddPrefix = false;

        let getChartData = (source: any, name: any, isAddPrefix: boolean, c?: any) => {
            let tmpKey = name.replace(bmNameStr, '');
            _.forEach(date, (d) => {
                let obj = { name: `${this.getShowName($const, name)}${!isAddPrefix ? '' : '-' + c}` };
                obj['x'] = d;
                let tmp = _.find(source, !c ? (o) => o.date === d : { celebrity: c, date: d }) || {};
                obj['value'] = Math.round(tmp[tmpKey] || 0);
                arr.push(obj);
            });
        };

        if (_.isArray(celebrity)) {
            isAddPrefix = true;
        } else {
            celebrity = [celebrity];
        }
        _.forEach(names, (name) => {
            if (name.indexOf(bmNameStr) !== -1) {
                getChartData(bmData, name, false);
                return;
            }
            _.forEach(celebrity, (c) => {
                getChartData(data, name, isAddPrefix, c);
            });
        });

        return arr;
    };
    /**
     * $const  object  常量
     * data    []      数据源
     * names   []      显示字段obj{name:XX, value:XX}
     * params  object  图例数组--brands，图例字段--xName
     */
    getCommonCharts = (data: any, names: any, params: any) => {
        let { brands, xName } = params;
        let arr = [];
        if (!_.isEmpty(brands)) {
            _.forEach(brands, (c) => {
                let tmp = _.find(data, (o) => o[xName] === c) || {};
                _.forEach(names, (nameObj: any) => {
                    let obj = { name: c };
                    obj['value'] = Math.round(tmp[nameObj.value] || 0);
                    obj['x'] = nameObj.name;
                    arr.push(obj);
                });
            });
        } else {
            _.forEach(names, (nameObj: any) => {
                let obj = {};
                obj['value'] = 0;
                obj['x'] = nameObj.name;
                arr.push(obj);
            });
        }

        return arr;
    };

    getBarCharts = (data: any, key: string): any => {
        return data.map((item) => {
            return { x: item.celebrity, name: item.celebrity, value: Math.round(item[key] || 0) };
        });
    };
}
export { IChartBasic };
export default new IChartBasic();
