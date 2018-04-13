import React from 'react';
import {MrCol, MrFill} from 'masterrt';
import './layout.less';
import {Layout, Menu, Icon} from 'antd';
import Link from 'umi/link';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const {Header, Footer, Sider, Content} = Layout;

interface MrsLayoutProps {
}

export default class MrsLayout extends React.Component<MrsLayoutProps, {}> {
    render() {
        return (
            <Layout className="mrs-layout">
                <Header className="mrs-header">MasterRT Seed</Header>
                <Layout>
                    <Sider className="mrs-sider">
                        <Menu
                            style={{ width: '100%' }}
                            defaultSelectedKeys={['MrFill']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                        >
                            <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>MasterRT</span></span>}>
                                <MenuItemGroup key="g1" title="UI">
                                    <Menu.Item key="MrFill">
                                        <Link to="/masterrt/mr-fill">MrFill</Link>
                                    </Menu.Item>
                                    <Menu.Item key="12">
                                        <Link to="/masterrt/mr-panel">MrPanel</Link>
                                    </Menu.Item>
                                    <Menu.Item key="13">
                                        <Link to="/masterrt/mr-icon">MrIcon</Link>
                                    </Menu.Item>
                                </MenuItemGroup>
                                <MenuItemGroup key="g2" title="解决方案">
                                    <Menu.Item key="MrEcharts">
                                        <Link to="/masterrt/mr-echarts">MrEcharts</Link>
                                    </Menu.Item>
                                    <Menu.Item key="MrEchartsPanel">
                                        <Link to="/masterrt/mr-echarts-panel">MrEchartsPanel</Link>
                                    </Menu.Item>
                                    <Menu.Item key="MrDownload">
                                        <Link to="/masterrt/mr-download">MrDownload</Link>
                                    </Menu.Item>
                                    <Menu.Item key="MrIf">
                                        <Link to="/masterrt/mr-if">MrIf</Link>
                                    </Menu.Item>
                                </MenuItemGroup>
                                <MenuItemGroup key="g3" title="服务及配置">
                                    <Menu.Item key="MrService">
                                        MrService
                                    </Menu.Item>
                                    <Menu.Item key="MrRequest">
                                        MrRequest
                                    </Menu.Item>
                                    <Menu.Item key="MrResource">
                                        MrResource
                                    </Menu.Item>
                                </MenuItemGroup>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>代码规范</span></span>}>
                                <Menu.Item key="41">编程规范</Menu.Item>
                                <Menu.Item key="42">最佳实践</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Mzmu</span></span>}>
                                <Menu.Item key="51">mu.run</Menu.Item>
                                <Menu.Item key="52">mu.if</Menu.Item>
                                <Menu.Item key="53">mu.map</Menu.Item>
                                <Menu.Item key="54">mu.debounce</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content className="mrs-content">
                        {this.props.children}
                    </Content>
                </Layout>
                <Footer>Footer</Footer>
            </Layout>
        );
    }
}
