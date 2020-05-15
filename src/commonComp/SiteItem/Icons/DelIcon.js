import React, {Component} from 'react';
import { CloseOutlined, DeleteFilled } from '@ant-design/icons'
import Dialog from '@/commonComp/Dialog'
import {connect} from 'react-redux'
// import cookie from 'react-cookies';
// import url from '@/common/api'
import {
	NORMAL_CODE,
} from '@/common/constant'
import { delSite, UPDATE_DATA, getSiteList } from '@/store/actions'


class CloseIcon extends Component {
	constructor (props) {
		super(props);
		this.state = {

		}
	}

	showModel = () => {
		const { data, handleOk, updateDate, pageIndex: tPageindex, siteTotal, pageSize, catalog, getSiteList } = this.props;
		const maxPages = Math.ceil((siteTotal-1) / pageSize)
		const pageIndex = tPageindex > maxPages ? maxPages : tPageindex;

		const {_id, status} = data;
		const txt = status === NORMAL_CODE ? '下架' : '删除'

		Dialog.open({
			title: txt,
			content: `确定${txt}该网站吗？`,
			// footer: true,
			onOk () {
				Dialog.showLoading();
				delSite({_id, status }).then(res => {
		    	// handleOk && handleOk(1)
		    	updateDate({ pageIndex })
					getSiteList({catalog, status, pageIndex, pageSize, isTotal: true});
		      Dialog.close();
		    })
			}
		});
		// closeClick
	}
	render () {
		// console.log(this.props)
		const { data } = this.props;

		const {status} = data;

		return (
				status === NORMAL_CODE
				? <DeleteFilled onClick={this.showModel} />
				: <CloseOutlined style={{color: 'red'}} onClick={this.showModel} />
		)
	}
}
const mapStateToProps = state => {
	const { siteList, siteTotal, pageIndex, pageSize, catalog } = state.siteMng
  return {
  	siteList,
  	siteTotal,
  	pageIndex, pageSize, catalog,
  };
};


const mapDispatchToProps = dispatch => {
  return {
  	updateDate (data) {
  		return dispatch({type: UPDATE_DATA, data})
  	},
  	getSiteList (params) {
			return dispatch(getSiteList(params))
  	},
  };
};
// export default ComContent;
export default connect(mapStateToProps, mapDispatchToProps)(CloseIcon);
// export default CloseIcon;