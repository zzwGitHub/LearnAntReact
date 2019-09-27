import { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import Link from 'umi/link';

// 引入子菜单组件
const SubMenu = Menu.SubMenu;

export default class BasicLayout extends Component {

  state = {
    openKeys: ['sub1'],
  };

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    this.setState({
      openKeys: latestOpenKey ? [latestOpenKey] : [],
    });
  };

  render() {
    return (
      <Layout>
        <Sider width={256} style={{ minHeight: '100vh' }} collapsed={false}>
          <div style={{ height: '32px', background: 'rgba(255,255,255)', margin: '16px', textAlign: 'center'}}>
            <p >测试项目</p>
          </div>
          <Menu 
            theme="dark" 
            mode="inline" 
            defaultSelectedKeys={['1']}
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
          >
            <Menu.Item key="1">
              <Link to="/helloworld">
                <Icon type="pie-chart" />
                <span>Helloworld</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="dashboard" /><span>Dashboard</span></span>}
            >
               <Menu.Item key="2"><Link to="/dashboard/analysis">分析页</Link></Menu.Item>
               <Menu.Item key="3"><Link to="/dashboard/monitor">监控页</Link></Menu.Item>
               <Menu.Item key="4"><Link to="/dashboard/workplace">工作台</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="edit" theme="twoTone" /><span>学习一</span></span>}
            >
               <Menu.Item key="21"><Link to="/learn1/typography">排版</Link></Menu.Item>
               <Menu.Item key="22"><Link to="/learn1/cardrequest">card/后台</Link></Menu.Item>
               <Menu.Item key="23"><Link to="/learn1/booktable">书籍表格</Link></Menu.Item>
               <Menu.Item key="24"><Link to="/learn1/form">表单提交</Link></Menu.Item>
               <Menu.Item key="25"><Link to="/learn1/login">登录表单</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={<span><Icon type="edit" theme="twoTone" /><span>数据录入</span></span>}
            >
               <Menu.Item key="31"><Link to="/datainput/datepickerpage">时间选择器</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout >
          <Header style={{ background: '#1890ff', textAlign: 'center', padding: 0 }}>Header</Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}