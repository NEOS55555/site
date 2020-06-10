import React, { Component, Fragment } from 'react';
// import { isSystemPage } from '@/common/common'
import { connect } from 'react-redux'
import Register from '@/commonComp/logReg/Register'
import Login from '@/commonComp/logReg/Login'
import { addWebSite } from '@/components/AddWebSite/AddWebSite'
// import imgUrl from '@/common/api'
// import cookie from 'react-cookies'
import { withRouter } from "react-router";
import { setUsername, updateSiteMngData, getSiteList, getCatalogList, getTop10SiteList, updateComData } from '@/store/actions'
import { Link } from "react-router-dom";
import { Dropdown, Menu, Input, Button } from 'antd'
import { removeLoginCookie } from '@/commonComp/logReg/loginCookie'
import './Header.scss'
import { AccountNavRoute } from '@/common/Routers'
import logo from '@/assets/images/logo.png'


class Header extends Component {

  componentDidMount () {
    this.props.getCatalogList()
    this.props.getTop10SiteList()
    console.log('header did mount')
    console.log(this.props)
  }
  
  logout = () => {
    const { setUsername } = this.props;
    removeLoginCookie();
    setUsername('')
    // history.replace('/')
  }
  addNewSite = () => {
    // const { catalog } = this.state;
    // const catalog = parseInt(this.props.match.params.catalog) || -1
    const { getSiteList, catalogList, pageIndex, pageSize, status, catalog } = this.props
    addWebSite.open({
      catalogList,
      handleOk () {
        getSiteList({ catalog, status, pageIndex, pageSize, isTotal: true, is_edit: true });
      }
    });
  }
  
  
  // 搜索框
  onSearch = value => {
    const { location, history, isSystem, catalog } = this.props;
  
    history.push((isSystem ? '/system' : '') + '/' + (catalog === -1 ? 0 : catalog) +'/'+value)
    /*const { updateSiteMngData } = this.props
    // const catalog = parseInt(match.params.catalog) || -1
    const { getSiteList, pageIndex, pageSize, status, catalog, isSystem } = this.props
    const search = value
    updateSiteMngData({
      search 
    })
    getSiteList({ catalog, status, pageIndex, pageSize, search, isTotal: true, is_edit: isSystem });*/
  }

  routerClick = () => {
    this.props.updateSiteMngData({
      isSystem: false
    })
  }

	render() {
    const { check_reply_num=0, isSystem, is_async } = this.props
    // const isSystem = isSystemPage(match);
    // const { checkReplyNum } = this.state;

    const menu = (
      <Menu className="user-setting-list">
        <Menu.Item><Link onClick={this.routerClick}  to={AccountNavRoute[0].path} >账号管理</Link></Menu.Item>
        <Menu.Item><Link to="/system/0">页面管理</Link></Menu.Item>
        {is_async && <Menu.Item><Link onClick={this.routerClick}  to="/catalogmng" >分类管理</Link></Menu.Item>}
        <Menu.Item><Link onClick={this.routerClick}  to="/replyme">回复我的({check_reply_num})</Link></Menu.Item>
        <Menu.Item><span className="link-a" onClick={this.logout}>退出</span></Menu.Item>
      </Menu>
    )
		const { user_name } = this.props
    return (
      <div className="header">
        <div className="max-container">
          <div className="logo-ctn">
            <Link to="/"><img src={logo} alt="首页"/></Link>

            <Input.Search placeholder="请输入关键词" onSearch={this.onSearch} style={{width: 200}}  enterButton />
          </div>
          <div className="user-ctn">
          	{
              user_name 
              ? (<Fragment>
                  {
                    isSystem && 
                      <Button type="link" onClick={this.addNewSite}>新增网站</Button>
                  }

                  <Dropdown overlay={menu} placement="bottomRight" >
                    <Button type="link" className="user-btn">{user_name}({check_reply_num})</Button>
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
	const { user_name, check_reply_num, is_async } = state.com
  const { pageIndex, pageSize, catalogList, status, catalog, isSystem } = state.siteMng
  return {
  	user_name, check_reply_num, is_async,
    pageIndex, pageSize, catalogList, status, catalog, isSystem
  };
};


const mapDispatchToProps = dispatch => {
  return {
  	setUsername (name) {
			return dispatch(setUsername(name))
  	},
    updateSiteMngData (data) {
      return dispatch(updateSiteMngData(data))
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
// Header = connect(mapStateToProps, mapDispatchToProps)(Header)
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
