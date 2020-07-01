import React, {Component} from 'react';
// import {connect} from 'react-redux'
// import { Menu } from 'antd';
// import { Link } from "react-router-dom";
// import { withRouter } from "react-router";
// import { isSystemPage } from '@/common/common'
import { getNoticeList } from '@/store/actions'

// const { SubMenu } = Menu;

class Notice extends Component {
	constructor (props) {
		super(props);
		this.state = {
			data: {}
		}
	}
	componentDidMount () {
    getNoticeList({pageIndex: 1, pageSize: 1}).then(res => {

      this.setState({data: res.result.list[0] || {}})
    })
	}
	/*rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
  state = {
    openKeys: ['sub1'],
  };*/

  /*onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };*/
	render () {
		const { data: { content, create_time } } = this.state;
		// console.log(match.params.catalog)
    // const isSystem = isSystemPage(match)
		return (
      !!content && <div className="top-notice">
        <div className="title">最新公告 </div>
        <span className="time" >发布时间： {create_time}</span>
  			<div>
          <span className="time">内容：</span>{content}
        </div>
      </div>
		)
	}
}


export default Notice;
