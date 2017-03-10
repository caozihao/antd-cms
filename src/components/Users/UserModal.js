import React, { Component } from 'react';
import { Modal, Form, Input,Checkbox} from 'antd';

const FormItem = Form.Item;
const defaultCheckedList = [];

class UserEditModal extends Component {
    //只存在于组件内的state
    state = {
      visible: false,
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false
    };

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false
    });
  };

  checkInput =(rule,value,callback) =>{
    const form = this.props.form;
    if(value && value !== form.getFieldValue("website")){
      callback(console.log("ok"));
    }else{
      callback(console.log("wrong"));
    }
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {

      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }

    });
  };

  render() {

    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { name, email, website } = this.props.record;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };

    return (
      <span>

        <span onClick={this.showModelHandler}>
          { children }
        </span>

        <Modal
          title= {this.props.title}
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}>

          <Form onSubmit={this.okHandler}>

            <FormItem
              {...formItemLayout}
              label="Name"
              hasFeedback>
              {
                getFieldDecorator('name', {
                  initialValue: name,
                  rules:[{
                    required:true,
                    message:"名称必填！"
                  }]
                })(<Input placeholder="请输入字符串"/>)
              }
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="Email"
              hasFeedback>
              {
                getFieldDecorator('email', {
                  initialValue: email,
                  rules:[{
                    type:"email",message:"请输入合法的邮箱地址！"
                  },{
                    required:true,message:"邮箱必填！"
                  }]
                })(<Input placeholder="请输入合法的邮箱地址"/>)
              }
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="Website"
              hasFeedback>
              {
                getFieldDecorator('website', {
                  initialValue: website,
                  rules:[{
                    required:true,message:"网站必填！"
                  },{
                    validator:this.checkInput
                  }]
                })(<Input placeholder="请输入正确的网站地址"/>)
              }
            </FormItem>

          </Form>
        </Modal>
      </span>
    );
  }
}


export default Form.create()(UserEditModal);
