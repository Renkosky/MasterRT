/**
 * mr-if
 *
 * @creator mizi.lin
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

export interface MrIfProps extends MrInterface {
    /**
     * condition: any
     * 执行条件
     * 可以是任意值
     */
    condition: any;

    /**
     * falseType?: string = 'if'
     * - 假值类型
     *
     * - 在JS的世界里没有绝对的"真 true"和"假 false"（也许真实的世界也是如此）
     * - 可以对某一种特性进行区分其真假值
     *
     * - 1. exist: 存在为真，不存在为假
     * - ::=> 即在 null, undefined 为 false, 其他情况为真
     *
     * - 2. if 使用 if 运算符判断的假为 false, 其他为真
     * - ::=> if(condition) 或 !condition 或 三元
     *
     * - 3. empty: 所有我们认为空或没有都未false
     * - ::=> [] 空数组，{} 空对象，noop 空函数，0，' ' 空字符串， undefined, null
     */
    falseType?: string;
}

class MrIf extends React.Component<MrIfProps, {}> {

    static defaultProps: any = {
        falseType: 'if'
    };

    static DISPLAY_NAME = 'MrIf';

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
        if (mu.isNotExist(children)) {
            return null;
        }

        /**
         * 若子元素有且仅有一个function
         */
        if (typeof children === 'function') {
            return condition ? (children as Function)(condition, _gene) : null;
        }

        /**
         * 遍历子元素，按规则遗传相应的基因信息
         */

        // !! docz 不支持使用 type === Component 来判断子元素是调用该 component
        // 所以使用在 Component 中添加static属性DISPLAY_NAME来标明该component
        // https://github.com/pedronauck/docz/issues/133

        let isThen = false;
        let elseCondition = false;
        let elseTrue: any = {
            index: void 0,
            time: 0,
            use: {}
        };

        /**
         * else 只能有一个true
         */

        children = React.Children.toArray(children);

        let _children =  mu.map(children, (child: React.ReactElement<Node>, index) => {

            let type: any, props: any;

            if (!child) {
                return null;
            }

            type = child.type;
            props = child.props || {};

            if(typeof type === 'string') {
                return condition ? child : null;
            }

            // MrThen 执行过，后续的 MrElse 失效
            if(isThen && mu.or(type.DISPLAY_NAME, 'MrElse')) {
                return null;
            }

            if(!isThen && mu.or(type.DISPLAY_NAME, 'MrElse')) {
                elseCondition = !condition && mu.ifnvl(mu.prop(child, 'props.condition'), true);
                elseTrue.use[index] = true;
                if(elseCondition) {
                    elseTrue.time += 1;
                    elseTrue.index = index;
                }
                return React.cloneElement(child, {...props, condition: elseCondition});
            }

            if(mu.or(type.DISPLAY_NAME, 'MrThen')) {
                isThen = true;
                return React.cloneElement(child, {...props, _gene: {condition: !condition && !elseCondition} });
            }

            return child;

        });

        if(elseTrue.time > 1) {
            _children = React.Children.map(_children, (child: React.ReactElement<Node>, index) => {
                return (elseTrue.use[index] && (elseTrue.index !== index)) ? null : child;
            });
        }

        return _children;

    }

    render() {
        // console.debug(this.props);
        let children = this.inheritance();
        return <React.Fragment>{children}</React.Fragment>;
    }
}

export default MrIf;