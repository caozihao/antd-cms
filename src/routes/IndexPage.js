import React,{ PropTypes,Component } from "react";
import { connect } from 'dva';
import MainLayout from '../components/MainLayout/MainLayout';

class IndexPage extends Component{
   render(){
     const position = this.props.position;
     const children = this.props.children;
     return (
       <MainLayout position = { position }>
         { children }
       </MainLayout>
     );
   }
 }

IndexPage.propTypes = {

};

export default connect()(IndexPage);
