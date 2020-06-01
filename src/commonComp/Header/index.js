import React, { Component, Fragment } from 'react';
import { Button } from 'antd';
import { isSystemPage } from '@/common/common'
import { setUsername, UPDATE_DATA } from '@/store/actions'
import {connect} from 'react-redux'
import Register from '@/commonComp/logReg/Register'
import Login from '@/commonComp/logReg/Login'
import { addWebSite } from '@/components/AddWebSite/AddWebSite'
import AddCatalog from '@/components/AddWebSite/AddCatalog'
// import imgUrl from '@/common/api'
// import cookie from 'react-cookies'
import { withRouter } from "react-router";
import { getSiteList, getCatalogList, getTop10SiteList } from '@/store/actions'
import { Link } from "react-router-dom";
import { Dropdown, Menu, Input } from 'antd'
import { removeLoginCookie } from '@/commonComp/logReg/loginCookie'
import './Header.scss'


class Header extends Component {
  constructor (props) {
    super(props)
    // console.log(this.props)
    /*this.state = {
      catalog: parseInt(props.match.params.catalog) || -1
    }*/
  }

  componentDidMount () {
    this.props.getCatalogList()
    this.props.getTop10SiteList()
    // console.log('Header did mount')
  }
  
  logout = () => {
    const { setUsername, history } = this.props;
    removeLoginCookie();
    setUsername('')
    history.replace('/')
  }
  addNewSite = () => {
    // const { catalog } = this.state;
    const catalog = parseInt(this.props.match.params.catalog) || -1
    const { getSiteList, catalogList, pageIndex, pageSize, status } = this.props
    addWebSite.open({
      catalogList,
      handleOk () {
        getSiteList({ catalog, status, pageIndex, pageSize, isTotal: true, is_edit: true });
      }
    });
  }
  
  
  // 搜索框
  onSearch = value => {
    const { updateDate, match } = this.props
    const catalog = parseInt(match.params.catalog) || -1
    const { getSiteList, pageIndex, pageSize, status } = this.props
    const search = value
    updateDate({
      search 
    })
    getSiteList({ catalog, status, pageIndex, pageSize, search, isTotal: true, is_edit: isSystemPage(match) });
  }

	render() {
    const { match } = this.props
    const isSystem = isSystemPage(match);

    const menu = (
      <Menu className="user-setting-list">
        <Menu.Item><Link to="/system/0">页面管理</Link></Menu.Item>
        <Menu.Item><span className="link-a" onClick={this.logout}>退出</span></Menu.Item>
      </Menu>
    )
		const { user_name } = this.props
    return (
      <div className="header">
        <div className="max-container">
          <div>
            <Link to="/">首页</Link>
            <Input.Search placeholder="请输入关键词" onSearch={this.onSearch} style={{width: 200}}  enterButton />
          </div>
          <div className="user-ctn">
          	{
              user_name 
              ? (<Fragment>
                  {
                    isSystem && 
                      <Button type="primary" onClick={this.addNewSite}>新增网站</Button>
                  }

                  <Dropdown overlay={menu} placement="bottomRight" >
                    <Button type="link" className="user-btn">{user_name}</Button>
                  </Dropdown>
                </Fragment>) 
              : (<Fragment><Login /><Register /></Fragment>)
            }
          </div>
        </div>
        
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
    getCatalogList (params) {
      return dispatch(getCatalogList(params))
    },
    getTop10SiteList (params) {
      return dispatch(getTop10SiteList(params))
    },
  };
};
Header = connect(mapStateToProps, mapDispatchToProps)(Header)
export default withRouter(Header);
