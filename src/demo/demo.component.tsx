import * as React from 'react';
import './demo.less';

export interface DemoComponentProps {
    style?: React.CSSProperties;
    className?: string;

    /**
     * 是否强制刷新
     * @default true
     */
    force?: boolean;
}

class DemoComponent extends React.Component<DemoComponentProps, {}> {

    getUserInfo() {
        return {};
    }

    render() {
        return (
            <section>
                <div className="demo">aaaa</div>
                {this.props.children}
            </section>
            
        )
    }
}

export {DemoComponent};
export default DemoComponent;
