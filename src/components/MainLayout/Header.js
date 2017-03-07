import React, { Component } from 'react';
import { Menu, Icon ,Layout} from 'antd';
import { Link } from 'dva/router';
import "./Header.less";

class Headers extends Component {
  render(){
    const position = this.props.position;
    return (
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        defaultSelectedKeys={["1"]}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="/">
          <Link to="/"><Icon type="home"/>首页</Link>
        </Menu.Item>

        <Menu.Item key="/users">
          <Link to="/users"><Icon type="bars"/>用户</Link>
        </Menu.Item>

        <Menu.Item key="/none">
          <Link to="/none"><Icon type="frown-circle" />404</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Headers;
