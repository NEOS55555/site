import React, { Component, Fragment } from 'react';
import { CloseOutlined } from '@ant-design/icons'
import Dialog from '@/commonComp/Dialog'
// import {connect} from 'react-redux'
import { message, Checkbox } from 'antd';
// import cookie from 'react-cookies';
// import url from '@/common/api'
import { delNotice } from '@/store/actions'


class CloseIcon extends Component {
	
	checked = true;
	checkChange = e => this.checked = e.target.checked
	showModel = () => {
		const that = this;
		const { data, handleOk } = this.props;
		const { _id, content, commit_id } = data;

		Dialog.open({
			title: '删除公告',
			content: <Fragment>
				<span>确定删除“<span style={{color: '#F55'}}>{content}</span>”该公告吗？</span>
				<br/>
				{commit_id !== undefined && <Checkbox defaultChecked={that.checked} onChange={this.checkChange} >是否同步到用户反馈？ </Checkbox>}
			</Fragment>,
			
			// footer: true,
			onOk () {
				Dialog.showLoading();
				delNotice({_id, isToCommit: that.checked ? 1 : 0}).then(res => {
		    	handleOk && handleOk()
					message.success('删除成功')
	      	Dialog.close();
		    }).catch(res => {
		    	Dialog.hideLoading();
		    })
			}
		});
		// closeClick
	}
	render () {

		return (
			<CloseOutlined title="删除" style={{color: '#fff'}} onClick={this.showModel} />
		)
	}
}

export default CloseIcon;