import React, { Component } from 'react';
import Content from '@/components/Content/Content'

// import Dialog from '@/commonComp/Dialog'
// import { connect } from 'react-redux'
// import './SystemComp.scss';
// import { Button } from 'antd'
import { getCollectList, collectSite } from '@/store/actions'
import { withRouter } from "react-router";


class MyCollections extends Component {
	
	state = {
		pageIndex: 1,
		list: [],
		total: 0,
	}

	componentDidMount () {
    this.getListAndSet({pageIndex: 1, isTotal: 1})
	}
	
	componentDidUpdate (prevProps) {
		const { isSystem } = this.props;
		const { params: prevParams } = prevProps.match
		const { params: curParams } = this.props.match
		// console.log(prevParams, curParams)
		if (prevParams.catalog !== curParams.catalog || prevParams.tagName !== curParams.tagName || prevParams.search !== curParams.search) {
      
      this.getListAndSet({pageIndex: 1, isTotal: 1})
    }
	}
	

	getListAndSet = (params) => {
		const { pageIndex: sPageIndex } = this.state;

		const { pageIndex=sPageIndex, isTotal } = params;
		const { match: { params: { catalog } } } = this.props;

		this.setState({
			pageIndex
		})
		
		getCollectList({
			catalog: parseInt(catalog) || -1,
			// search,
			pageIndex,
			// search,
			isTotal,
		}).then(res => {
			this.setState({
				...res.result
			})
		})
	}
	
	onChange = pageIndex => {
		this.getListAndSet({pageIndex})
	}
	collectClick = _id => {
		const { list } = this.state;
		return collectSite({_id}).then(res => {

      this.setState({
      	list: list.map(it => it._id === _id ? {...it, isCollected: !it.isCollected} : it)
      })
    })
  }
	render () {
		const { pageIndex, list, total } = this.state;

	  return (
	  	<Content 
	  		list={list} 
	  		total={total} 
	  		current={pageIndex} 
	  		collectClick={this.collectClick}
	  		pageSize={5}
		  	onChange={this.onChange} 
	  	/>
	  )
	}
}

export default withRouter(MyCollections);
