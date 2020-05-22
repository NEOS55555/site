import React, { Component } from 'react';
import Content from '../Content/Content'

// import Dialog from '@/commonComp/Dialog'
import { connect } from 'react-redux'
// import './SystemComp.scss';
// import { Button } from 'antd'
import { getSiteList, UPDATE_DATA } from '@/store/actions'
import { withRouter } from "react-router";

import CurContext from './cur-context';


class ComContent extends Component {
		
	getsys () {

		const { isSystem, status } = this.props;
		return {
			catalog: parseInt(this.props.match.params.catalog) || -1,
			status: isSystem ? status : 1,
			is_edit: !!isSystem,
			tag_name: this.props.match.params.tagName
		}
	}


	constructor (props) {
		super(props)
		// console.log(props)
		this.state = {
			list: [],
			// status: props.isSystem ? -1 : 1,
		}
	}
	componentDidUpdate (prevProps) {
		const { params: prevParams } = prevProps.match
		const { params: curParams } = this.props.match
		// console.log(prevParams, curParams)
		if (prevParams.catalog !== curParams.catalog || prevParams.tagName !== curParams.tagName) {
       // this.handleOk();
       this.getListAndSet({pageIndex: 1, isTotal: true})
     }
	}
	componentDidMount () {
    this.getListAndSet({pageIndex: 1, isTotal: true})
	}

	handleOk = () => {
		const { pageIndex, pageSize, search } = this.props;
		/*const { pageIndex: tPageindex, pageSize } = this.props;
		const { siteTotal } = this.props;
		const max = Math.ceil((siteTotal-dels) / pageSize)
		const pageIndex = tPageindex > max ? max : tPageindex;
		console.log(pageIndex, max, dels, siteTotal, pageSize)*/
		this.props.getSiteList({ pageIndex, pageSize, search, isTotal: true, ...this.getsys() });
	}

	getListAndSet = (params) => {
		const { pageIndex: sPageIndex, pageSize: sPageSize, search } = this.props;

		const { pageIndex=sPageIndex, pageSize=sPageSize, isTotal } = params;
		// console.log(catalog)
		this.props.updateDate({pageIndex, pageSize})
		this.props.getSiteList({
			pageIndex,
			pageSize, 
			search,
			isTotal,
			...this.getsys()
		})
	}
	
	onChange = pageIndex => {

		this.getListAndSet({pageIndex})
	}
  onShowSizeChange = (pageIndex, pageSize) => this.getListAndSet({pageIndex, pageSize})

	render () {
		const { handleOk } = this;
		// const { catalog } = this.state;
		const { pageIndex, pageSize, siteList, siteTotal, isSystem } = this.props;

		// console.log(pageIndex, siteTotal)

	  return (
  		<CurContext.Provider value={{ handleOk }}>
	      {/*<AddWebSite handleOk={this.handleOk} />*/}
	      
		  		
			  	<Content 
			  		isSystem={isSystem}
			  		list={siteList} 
			  		// handleOk={this.handleOk} 
			  		total={siteTotal} current={pageIndex} pageSize={pageSize}
				  	onChange={this.onChange} 
				  	onShowSizeChange={this.onShowSizeChange} 
			  	/>
				  	
	  	</CurContext.Provider>
	  )
	}
}
const mapStateToProps = state => {
	const { siteList, siteTotal, pageIndex, pageSize, status, search } = state.siteMng
  return {
  	siteList,
  	siteTotal,
  	pageIndex, pageSize,
  	status,
  	search
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
ComContent = connect(mapStateToProps, mapDispatchToProps)(ComContent);
export default withRouter(ComContent);
