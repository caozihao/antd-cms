import React,{ Component } from "react";
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button,Icon,Select} from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Users.less';
import "../Common/Common.less";
import UserModal from './UserModal';

const Option = Select.Option;
class Users extends Component{

  state = {
    selectedRowKeys: []
  };

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  //批量删除
  deleteHandlerByIds(){
    const delArr = this.state.selectedRowKeys;
    console.log("delArr------->",delArr);
  }

  //切换每页显示的数量
  handleChange(value){
    const { dispatch} = this.props;
    this.state.selectedPage = value;
    dispatch(routerRedux.push({
      pathname: '/users',
      query:{
        "pg": 1,
        "pg_size":value
      }
    }));

  }

  //分页
  pageChangeHandler(page) {
    const { dispatch } = this.props;
    const pageSize = this.props.pageSize;
    dispatch(routerRedux.push({
      pathname: '/users',
      query: {
        "pg": page,
        "pg_size":pageSize
      }
    }));
  }

  //编辑
  editHandler(id,values) {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/patch',
      payload: { id, values }
    });
  }

  //删除
  deleteHandler(id){
    const { dispatch } = this.props;
    dispatch({
      type: 'users/remove',
      payload: id
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
    let { list : dataSource,loading,totalPage,curPage,pageSize} = this.props;
    totalPage = parseInt(totalPage);
    curPage = parseInt(curPage);
    pageSize = parseInt(pageSize);

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [{
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          this.setState({ selectedRowKeys: newSelectedRowKeys });
        }
      }, {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          this.setState({ selectedRowKeys: newSelectedRowKeys });
        }
      }],
      onSelection: this.onSelection
    };


    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:void(0)">{text}</a>
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
        key: 'operation1',
        className:"text-center",
        render: (text, record) => (
          <span className={styles.operation}>

            <UserModal record={ record } onOk={ this.editHandler.bind(this,record.id)} title={ "编辑" }>
              <Icon type="edit" className="button-bar-icon" />
            </UserModal>

            <Popconfirm title="是否要删除该条信息?" onConfirm={ this.deleteHandler.bind(this,record.id) }>
              <Icon type="delete" className="button-bar-icon"/>
            </Popconfirm>

          </span>
        )
      }
    ];

    return (
      <div className={styles.normal}>

        <div>
          <div className="table-operations">

          <Select className="mg-r-10" value ={ pageSize.toString() } style={{ width: 60 }} onChange={this.handleChange.bind(this)}>
            <Option value="3">3</Option>
            <Option value="5">5</Option>
            <Option value="6">6</Option>
            <Option value="10">10</Option>
            <Option value="100">100</Option>
          </Select>

          <UserModal  record={{}} onOk={ this.createHandler.bind(this) } title={"添加" }>
              <Button className="mg-r-10" type="ant-btn ant-btn-primary">添加</Button>
          </UserModal>

          <Popconfirm title="Confirm to delete?" onConfirm={ this.deleteHandlerByIds.bind(this) }>
              <Button className="mg-r-10"  type="ant-btn ant-btn-danger">批量刪除</Button>
          </Popconfirm>

          </div>

          <Table
            columns={ columns }
            rowSelection={ rowSelection }
            dataSource={ dataSource }
            loading={ loading }
            rowKey={ record => record.id }
            pagination={false}/>

          <Pagination
            className="ant-table-pagination"
            total={totalPage}
            current={curPage}
            pageSize={pageSize}
            onChange={ this.pageChangeHandler.bind(this) }/>
        </div>
      </div>
    );
  }

}

const mapStateToProps =(state) =>{
  const { list, totalPage, curPage,pageSize } = state.users;
  return {
    loading: state.loading.models.users,
    list,
    totalPage,
    curPage,
    pageSize
  };
}

export default connect(mapStateToProps)(Users);
