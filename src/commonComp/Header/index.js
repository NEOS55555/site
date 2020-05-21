import React, { Component } from 'react';
import { Button } from 'antd';
// import { checkMail } from '@/common/common'
import { setUsername, UPDATE_DATA } from '@/store/actions'
import {connect} from 'react-redux'
import Register from '@/commonComp/popup/Register'
import Login from '@/commonComp/popup/Login'
import { addWebSite } from '@/components/AddWebSite/AddWebSite'
import AddCatalog from '@/components/AddWebSite/AddCatalog'
// import imgUrl from '@/common/api'
import cookie from 'react-cookies'
import { withRouter } from "react-router";
import { getSiteList } from '@/store/actions'
import {
  Link
} from "react-router-dom";

const COUNT_DOWN = 10;

class Header extends Component {
  constructor (props) {
    super(props)
    // console.log(this.props)
    this.state = {
      catalog: parseInt(props.match.params.catalog) || -1
    }
  }

  componentDidMount () {
    console.log('Header did mount')
  }

	render() {
    const { catalog } = this.state;
		const { user_name, history, catalogList, pageIndex, pageSize, status } = this.props
    const { getSiteList, setUsername } = this.props;
    return (
      <div>

    	{
        user_name 
        ? (<div style={{color: '#fff'}} >{user_name} 
        
            <Link to="/system">管理</Link>
            <Button onClick={() => {
          		cookie.remove('user_id')
          		cookie.remove('user_token')
          		cookie.remove('user_name')
          		setUsername('')
              history.replace('/')
              
        	  }}>退出</Button>
            <Button type="primary" onClick={() => {
              addWebSite.open({
                catalogList,
                handleOk () {
                  getSiteList({ catalog, status, pageIndex, pageSize, isTotal: true, is_edit: true });
                }
              });
            }}>新增网站</Button>
            <AddCatalog  />
          </div>) 
        : (<div><Login /><Register /></div>)
      }
        
      </div>
	  );
	}
}


const mapStateToProps = state => {
	const { user_name } = state.com
  const { pageIndex, pageSize, catalogList, status } = state.siteMng
  return {
  	user_name,
    pageIndex, pageSize, catalogList, status
  };
};


const mapDispatchToProps = dispatch => {
  return {
  	setUsername (name) {
			return dispatch(setUsername(name))
  	},
    updateDate (data) {
      return dispatch({type: UPDATE_DATA, data})
    },
    getSiteList (params) {
      return dispatch(getSiteList(params))
    },
  };
};
Header = connect(mapStateToProps, mapDispatchToProps)(Header)
export default withRouter(Header);
