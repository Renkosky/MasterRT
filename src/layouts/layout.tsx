import React from 'react';
import './layout.less';
import {Layout, Menu, Icon} from 'antd';
import _ from 'lodash';
import Link from 'umi/link';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const {Header, Footer, Sider, Content} = Layout;
import  mu from 'mzmu';

interface MrsLayoutProps {
    location: any;
}

export default class MrsLayout extends React.Component<MrsLayoutProps, {}> {

    state: any = {
        menu: 'mrfill',
        parent: 'masterrt'
    };

    ignoreLayout=['/login','/plan'];

    isIgnoreLayout() {
        let ignoreLayout: any= this.ignoreLayout;
        let pathname: string = _.get(this.props, 'location.pathname');
        return ignoreLayout && ignoreLayout.includes(pathname);
    }

    componentWillMount() {
        mu.run(this.props.location, (_location) => {
            let {pathname} = _location;
            let [root = '', parent = '', menu = ''] = pathname.split('/');
            menu = menu.replace(/-/g, '');
            this.setState({
                parent, menu
            });
        });
    }

    render() {
        let {menu, parent} = this.state;
        return (
            <div className="wrapper">
                { this.isIgnoreLayout() ? this.props.children
                    : <Layout className="mrs-layout">
                        <Header className="mrs-header">MasterRT Seed</Header>
                        <Layout>
                            <Sider className="mrs-sider">
                                <Menu
                                    style={{ width: '100%' }}
                                    defaultSelectedKeys={[menu]}
                                    defaultOpenKeys={[parent]}
                                    mode="inline"
                                >
                                    <SubMenu key="masterrt" title={<span><Icon type="appstore" /><span>MasterRT</span></span>}>
                                        <MenuItemGroup key="g1" title="UI">
                                            <Menu.Item key="mrfill">
                                                <Link to="/masterrt/mr-fill">MrFill</Link>
                                            </Menu.Item>
                                            <Menu.Item key="mrpanel">
                                                <Link to="/masterrt/mr-panel">MrPanel</Link>
                                            </Menu.Item>
                                            <Menu.Item key="mricon">
                                                <Link to="/masterrt/mr-icon">MrIcon</Link>
                                            </Menu.Item>
                                        </MenuItemGroup>
                                        <MenuItemGroup key="g2" title="解决方案">
                                            <Menu.Item key="mrif">
                                                <Link to="/masterrt/mr-if">MrIf</Link>
                                            </Menu.Item>
                                            <Menu.Item key="mrrules">
                                                <Link to="/masterrt/mr-rules">MrRules</Link>
                                            </Menu.Item>
                                            <Menu.Item key="mrreq">
                                                <Link to="/masterrt/mr-req">MrReq</Link>
                                            </Menu.Item>
                                            <Menu.Item key="mrecharts">
                                                <Link to="/masterrt/mr-echarts">MrEcharts</Link>
                                            </Menu.Item>
                                            <Menu.Item key="mrechartspanel">
                                                <Link to="/masterrt/mr-echarts-panel">MrEchartsPanel</Link>
                                            </Menu.Item>
                                        </MenuItemGroup>
                                        <MenuItemGroup key="g3" title="服务及配置">
                                            <Menu.Item key="mrrequest">
                                                <Link to="/masterrt/mr-request">MrRequest</Link>
                                            </Menu.Item>
                                            <Menu.Item key="mrresource">
                                                <Link to="/masterrt/mr-resource">MrResource</Link>

                                            </Menu.Item>
                                            <Menu.Item key="mrservices">
                                                <Link to="/masterrt/mr-services">MrServices</Link>
                                            </Menu.Item>
                                        </MenuItemGroup>
                                    </SubMenu>
                                    <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>代码规范</span></span>}>
                                        <Menu.Item key="standard">编程规范</Menu.Item>
                                        <Menu.Item key="practice">最佳实践</Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Mzmu</span></span>}>
                                        <Menu.Item key="murun">mu.run</Menu.Item>
                                        <Menu.Item key="muif">mu.if</Menu.Item>
                                        <Menu.Item key="mumap">mu.map</Menu.Item>
                                        <Menu.Item key="mudebounce">mu.debounce</Menu.Item>
                                    </SubMenu>
                                </Menu>
                            </Sider>
                            <Content className="mrs-content">
                                {this.props.children}
                            </Content>
                        </Layout>
                        <Footer>Footer</Footer>
                    </Layout>
                }
                </div>
        );
    }
}
