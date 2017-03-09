import { Layout, Menu, Breadcrumb, Icon ,Switch } from 'antd';
const {Content, Footer, Sider,Header } = Layout;
import "./MainLayout.less";
import "../Common/Common.less";
import React, { Component } from 'react';
import logoPng from "../../assets/logo.png";
import myHeadPhoto from "../../assets/my_head.jpg";
import { BackTop } from 'antd';
import { Link } from 'dva/router'

class MainLayout extends Component{

      state = {
        collapsed: false,
        current: '1'
      };

      toggle(){
        this.setState({
          collapsed: !this.state.collapsed
        });
      };

      render() {
        let children = this.props.children ? this.props.children:"";
        let pathname = this.props.location  ? this.props.location.pathname : "";
        pathname = pathname == "/" ? "/users" : pathname;
        console.log("pathname",pathname);

        return (
          <Layout id="components-main-layout" >
            <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}>
              <div className="logo">
                <img src= { logoPng } />
              </div>

              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[pathname]}>

                <Menu.Item key="/users">
                  <Link to="/users">
                    <Icon type="team" />
                    <span className="nav-text">黑名单</span>
                  </Link>
                </Menu.Item>

                <Menu.Item key="/sensitive_words">
                  <Link to="/sensitive_words">
                    <Icon type="tag-o" />
                    <span className="nav-text">敏感词</span>
                  </Link>

                </Menu.Item>
                <Menu.Item key="/post">
                  <Link to="/post">
                    <Icon type="file-text" />
                    <span className="nav-text">帖子</span>
                  </Link>
                </Menu.Item>

              </Menu>
            </Sider>

            <Layout>

              <Header style={{ background: '#fff', padding: 0 }}>
                <div className="pull-left">
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle.bind(this)}/>
               </div>

                <div className="pull-right top-head-pos">
                  <img src= { myHeadPhoto } title="Skull" alt="Skull" />
                </div>

              </Header>

              <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 800 }}>
                { children }
              </Content>

            </Layout>
            <BackTop/>
           </Layout>
        );
      }
  }
export default MainLayout;
