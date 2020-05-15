import React, { Component } from 'react';
import { Button } from 'antd';
// import { checkMail } from '@/common/common'
import { setUsername } from '@/store/actions'
import {connect} from 'react-redux'
import Register from '@/commonComp/popup/Register'
import Login from '@/commonComp/popup/Login'
// import imgUrl from '@/common/api'
import cookie from 'react-cookies'
import { withRouter } from "react-router";
import {
  Link
} from "react-router-dom";

const COUNT_DOWN = 10;

class Header extends Component {
  
	render() {
		const { user_name, history } = this.props
    return (
    	user_name ? (<div style={{color: '#fff'}} >{user_name} 
        
        <Link to="/system" >管理</Link>
        <Button onClick={() => {
      		cookie.remove('user_id')
      		cookie.remove('user_token')
      		cookie.remove('user_name')
      		this.props.setUsername('')
          history.replace('./')
    	}}>退出</Button></div>) : (<div><Login /><Register /></div>)
	  );
	}
}


const mapStateToProps = state => {
	const { user_name } = state.com
  return {
  	user_name
  };
};


const mapDispatchToProps = dispatch => {
  return {
  	setUsername (name) {
			return dispatch(setUsername(name))
  	},
  };
};
Header = connect(mapStateToProps, mapDispatchToProps)(Header)
export default withRouter(Header);
