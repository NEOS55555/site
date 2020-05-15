import React, {Component} from 'react';
import { CloseOutlined, DeleteFilled } from '@ant-design/icons'
import Dialog from '@/commonComp/Dialog'
import {connect} from 'react-redux'
// import cookie from 'react-cookies';
// import url from '@/common/api'
import {
	NORMAL_CODE,
} from '@/common/constant'
import { UPDATE_DATA, getSiteList } from '@/store/actions'
import { editWebSite } from '@/components/AddWebSite/AddWebSite'


class EditIcon extends Component {
	constructor (props) {
		super(props);
		this.state = {

		}
	}

	showModel = () => {

		const { data, catalogList } = this.props;
		editWebSite.open({
	    catalogList,
			...data,
			handleOk: ctx.handleOk
		})
	}
	render () {
		// console.log(this.props)
		const { data } = this.props;

		const {status} = data;

		return (
			 <CloseOutlined onClick={this.showModel} />
		)
	}
}
const mapStateToProps = state => {
	const { siteList, siteTotal, pageIndex, pageSize, catalog, catalogList } = state.siteMng
  return {
  	siteList,
  	siteTotal,
  	pageIndex, pageSize, catalog,
  	catalogList
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
export default connect(mapStateToProps, mapDispatchToProps)(EditIcon);
