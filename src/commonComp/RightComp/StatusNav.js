import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Menu } from 'antd';
// import { withRouter } from "react-router";
import { statusArr } from '@/common/constant'
import { getSiteList, updateSiteMngData } from '@/store/actions'

// const { SubMenu } = Menu;

class StatusNav extends Component {
	
  onSelect = (a, b, c) => {
    const { pageSize, catalog, search } = this.props;
    const { updateDate, getSiteList } = this.props;
    const status = parseInt(a.key)
    updateDate({
      status,
      pageIndex: 1
    })
    getSiteList({catalog, status, pageIndex: 1, pageSize, search, isTotal: true, is_edit: true});
    // console.log(a, b, c)
  }
	render () {
		const { status } = this.props;
		// console.log(match.params.catalog)
		return (
      <div className="nav-list status-nav">
        <div className="title">状态</div>
  			<Menu
          // mode="inline"
          // theme="dark"
          selectedKeys={[status+'']}
          // onOpenChange={this.onOpenChange}
          onSelect={this.onSelect}
          style={{ width: 256 }}
        >
        	{
        		[{id: -1, name: '全部'}, ...statusArr].map(({id, name}) => <Menu.Item key={id}>{name}</Menu.Item>)
        	}
          
        </Menu>
      </div>
		)
	}
}
const mapStateToProps = state => {
  const { pageSize, catalog, status, search } = state.siteMng
  return {
    pageSize, catalog, search,
    status,
  };
};


const mapDispatchToProps = dispatch => {
  return {
    updateDate (data) {
      return dispatch(updateSiteMngData(data))
    },
  	getSiteList (params) {
      return dispatch(getSiteList(params))
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StatusNav);
