/**
 * mr-if
 *
 * @author mizi.lin
 *
 * @update v0.1.19.20180514
 * 1. 将 rules(权限值）判断从 MrIf 中移除
 * 2. 引进子元素为function的概念，子元素有且仅有一个为function, 执行该function
 * 3. 添加附属组件MrThen, 运行 condition === true 时的条件判断
 * 4. 重写对MrElse支持的条件判断
 * 5. 对全局的 gene(基因), 遗传(inheritance), transmit(显性遗传基因片段) 等概念进行重新梳理
 */

import * as React from 'react';
import * as mu from 'mzmu';
import MrElse from './mr-else.component';
import MrThen from './mr-then.component';

export interface MrIfProps extends MrInterface {
    /**
     * condition: any
     * 执行条件
     * 可以是任意值
     */
    condition?: any;

    /**
     * falseType?: string = 'if'
     * 假值类型
     *
     * @author mizi.lin
     * 我认为, 在JS的世界里没有绝对的"真 true"和"假 false"（也许真实的世界也是如此）
     * 我对某一种特性进行区分其真假值
     *
     * 1. exist: 存在为真，不存在为假
     * ::=> 即在 null, undefined 为 false, 其他情况为真
     * 2. if 使用 if 运算符判断的假为 false, 其他为真
     * ::=> if(condition) 或 !condition 或 三元
     * 3. empty: 所有我们认为空或没有都未false
     * ::=> [] 空数组，{} 空对象，noop 空函数，0，' ' 空字符串， undefined, null
     */
    falseType?: string;
}

export default class MrIf extends React.Component<MrIfProps, {}> {

    /**
     * 根据transmit遗传信息
     * 并且生成隐性基因传递
     * @return {any}
     */
    inheritance(): any {
        let {children, condition, falseType, _gene = {}, ...props} = this.props;

        switch (falseType) {
            case 'if':
                condition = !!condition;
                break;
            case 'empty':
                condition = mu.isNotEmpty(condition);
                break;
            case 'exist':
                condition = mu.isNotExist(condition);
                break;
        }

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
            return condition ? (children as any)(condition, _gene) : null;
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

            if (type === MrElse || type === MrThen) {
                _gene['condition'] = condition;
                _props['_gene'] = _gene;
                return React.cloneElement(child, {..._props, ...(child.props || {})});
            } else {
                return condition ? child : null;
            }
        });
    }

    static defaultProps: any = {
        falseType: 'if'
    };

    render() {
        // console.debug(this.props);
        let children = this.inheritance();
        return <React.Fragment>{children}</React.Fragment>;
    }
}