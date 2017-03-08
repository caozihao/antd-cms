import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const {Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
import "./MainLayout.less";
import Headers from "./Header";
import React, { Component } from 'react';
import logoPng from "../../assets/logo.png";

class MainLayout extends Component{
      constructor(props) {
        super(props);
        //antd的局部属性设置
          this.state = {
            collapsed: false,
            mode: 'inline'
          }
        }

      toggle(){
        this.setState({
          collapsed: !this.state.collapsed
        });
      };

      onCollapse (collapsed){
        console.log(collapsed);
        this.setState({
          collapsed,
          mode: collapsed ? 'vertical' : 'inline'
        });
      };

      render() {
        const position = this.props.position;
        const children = this.props.children;

        return (
          <Layout id="components-main-layout">
            <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
            >
              <div className="logo">
                <img src= { logoPng } />
              </div>
              <Menu theme="dark" mode={this.state.mode} defaultSelectedKeys={['6']}>
                <SubMenu
                  key="sub1"
                  title={<span><Icon type="user" /><span className="nav-text">User</span></span>}
                >
                  <Menu.Item key="1">Tom</Menu.Item>
                  <Menu.Item key="2">Bill</Menu.Item>
                  <Menu.Item key="3">Alex</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  title={<span><Icon type="team" /><span className="nav-text">Team</span></span>}
                >
                  <Menu.Item key="4">Team 1</Menu.Item>
                  <Menu.Item key="5">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="6">
                  <span>
                    <Icon type="file" />
                    <span className="nav-text">File</span>
                  </span>
                </Menu.Item>
              </Menu>
            </Sider>


            <Layout>
              <Headers location = { location }/>
              <Content>
                <div style={{ padding: 24, background: '#fff', minHeight: "800px" }}>
                  { children }
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2016 Created by Ant UED
              </Footer>
            </Layout>
           </Layout>
        );
      }
  }
export default MainLayout;
