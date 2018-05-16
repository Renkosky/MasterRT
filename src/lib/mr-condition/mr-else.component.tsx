/**
 * MrElse
 *
 * @creator mizi.lin
 *
 * @uodate v2.20180514 重写MrIf实现方式，继而影响MrElse使用方式
 */

import * as React from 'react';
import * as _ from 'lodash';
import * as mu from 'mzmu';

interface MrElseProps {
    condition?: boolean | any
    _gene?: any
}

export default class MrElse extends React.Component<MrElseProps, {}> {

    /**
     * 根据transmit遗传信息
     * 并且生成隐性基因传递
     * @return {any}
     */
    inheritance(): any {
        let {children, condition, _gene = {}, ...props} = this.props;

        condition = !_gene['condition'] && mu.ifnvl(condition, true);

        /**
         * 若子元素不存在
         * 则返回null
         */
        if(mu.isNotExist(children)) {
            return null;
        }

        /**
         * 若子元素有且仅有一个function
         */
        if(condition && typeof children === 'function'){
            return (children as any)(condition, _gene);
        }

        /**
         * 遍历子元素，按规则遗传相应的基因信息
         */
        return React.Children.map(children as any, (child: any) => {
            let type: any, _props: any = {};

            if (!child) {
                return null;
            }

            if(!condition) {
                return null;
            }

            type = child.type;

            if (typeof type === 'function') {
                _gene['condition'] = condition;
                _props['_gene'] = _gene;
                return React.cloneElement(child, {..._props, ...(child.props || {})});
            } else {
                return child;
            }
        });
    }

    render() {
        let children = this.inheritance();
        return <React.Fragment>{children}</React.Fragment>;
    }
}