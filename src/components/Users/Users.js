import React,{ Component } from "react";
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button,Icon } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Users.less';
import "../Common/Common.less";
import { PAGE_SIZE } from '../../constants';
import UserModal from './UserModal';

class Users extends Component{

  deleteHandler(i,id){
    const { dispatch} = this.props;
    dispatch({
      type: 'users/remove',
      payload: id
    });
  }

  pageChangeHandler(page) {
    const { dispatch } = this.props;
    dispatch(routerRedux.push({
      pathname: '/users',
      query: { page }
    }));
  }

  editHandler(id, values) {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/patch',
      payload: { id, values }
    });
  }

  createHandler(values) {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/create',
      payload: values
    });
  }

  render(){
    const dataSource = this.props.list;
    const loading = this.props.loading;
    const total = this.props.total;
    const current = this.props.page;
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="">{text}</a>
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
      },
      {
        title: 'Website',
        dataIndex: 'website',
        key: 'website'
      },
      {
        title: 'Operation',
        key: 'operation',
        render: (text, record) => (
          <span className={styles.operation}>
          <UserModal record={ record } onOk={ this.editHandler.bind(this,null,record.id)}>
            <Icon type="edit" className="button-bar-icon" />
          </UserModal>
          <Popconfirm title="Confirm to delete?" onConfirm={ this.deleteHandler.bind(this,null,record.id) }>
            <Icon type="delete" className="button-bar-icon"/>
          </Popconfirm>
        </span>
        )
      }
    ];

    return (
      <div className={styles.normal}>
        <div>
          <div className={styles.create}>
            <UserModal record={{}} onOk={ this.createHandler.bind(this) }>
              <Button type="primary">Create User</Button>
            </UserModal>
          </div>
          <Table
            columns={ columns }
            dataSource={ dataSource }
            loading={ loading }
            rowKey={ record => record.id }
            pagination={false}
          />
          <Pagination
            className="ant-table-pagination"
            total={total}
            current={current}
            pageSize={PAGE_SIZE}
            onChange={ this.pageChangeHandler.bind(this) }
          />
        </div>
      </div>
    );
  }

}

const mapStateToProps =(state) =>{
  const { list, total, page } = state.users;
  return {
    loading: state.loading.models.users,
    list,
    total,
    page
  };
}

export default connect(mapStateToProps)(Users);
