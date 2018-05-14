/**
 * mr-if
 *
 * @author mizi.lin
 *
 * @update v2.20180514
 * 1. 将 rules(权限值）判断从 MrIf 中移除
 * 2. 引进子元素为function的概念，子元素有且仅有一个为function, 执行该function
 * 3. 添加附属组件MrThen, 运行 condition === true 时的条件判断
 * 4. 重写对MrElse支持的条件判断
 * 5. 对全局的 gene(基因), 遗传(inheritance), transmit(显性遗传基因片段) 等概念进行重新梳理
 */

import * as React from 'react';
import * as mu from 'mzmu';
import MrElse from './mr-else.component';

export interface MrIfProps {
    condition?: any;
    rules?: string | string[];

    /**
     * // todo
     * transmit?: string | string[] = ['condition']
     * 显性基因传递信息
     */
    transmit?: string | string[];
    // 父组件传递给条件组件隐性基因信息
    _gene?: any;
}

export default class MrIf extends React.Component<MrIfProps, {}> {

    /**
     * 根据transmit遗传信息
     * 并且生成隐性基因传递
     * @return {any}
     */
    inheritance(): any {
        let {children, condition, _gene = {}, ...props} = this.props;

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
        if(typeof children === 'function'){
            return condition && (children as any)(condition, _gene);
        }

        /**
         * 遍历子元素，按规则遗传相应的基因信息
         */
        return React.Children.map(children as any, (child: any) => {
            let type: any, _props: any = {};

            if (!child) {
                return null;
            }

            type = child.type;

            if (type === MrElse) {
                _gene['condition'] = condition;
                _props['_gene'] = _gene;
                return React.cloneElement(child, {..._props, ...(child.props || {})});
            } else if (typeof type === 'function') {
                _props['condition'] = condition;
                _props['_gene'] = _gene;
                return condition ? React.cloneElement(child, {..._props, ...(child.props || {})}) : null;
            } else {
                return condition ? child : null;
            }
        });
    }

    render() {
        let children = this.inheritance();
        return <React.Fragment>{children}</React.Fragment>;
    }
}