import React, { Component } from 'react';
import Content from '../Content/Content'

// import Dialog from '@/commonComp/Dialog'
import { connect } from 'react-redux'
// import './SystemComp.scss';
// import { Button } from 'antd'
import { LOG_OVERDUE_CODE } from '@/common/constant'
import { getSiteList, updateSiteMngData, setUsername, updateSiteList, collectSite } from '@/store/actions'
import { withRouter } from "react-router";

import CurContext from '@/provider/cur-context';
import eventBus from '@/common/eventBus'


class ComContent extends Component {
		
	getsys () {

		const { isSystem, status, match: { params: { catalog, tagName, search } } } = this.props;
		return {
			catalog: parseInt(catalog) || -1,
			status: isSystem ? status : 1,
			is_edit: !!isSystem,
			tag_name: tagName,
			search
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
		const { isSystem } = this.props;
		const { params: prevParams } = prevProps.match
		const { params: curParams } = this.props.match
		// console.log(prevParams, curParams)
		if (prevParams.catalog !== curParams.catalog || prevParams.tagName !== curParams.tagName || prevParams.search !== curParams.search) {
      // this.handleOk();
      this.props.updateSiteMngData({
      	catalog: parseInt(curParams.catalog) || -1,
      	isSystem,
      	// search: curParams.search
      })
      this.getListAndSet({pageIndex: 1, isTotal: true})
    }
	}
	componentDidMount () {
		const { isSystem, match: { params: { catalog } } } = this.props;
		// console.log('commonComp did mount ', isSystem)
    this.props.updateSiteMngData({
    	catalog: parseInt(catalog) || -1,
    	isSystem,
    	// search
    })
    this.getListAndSet({pageIndex: 1, isTotal: true})
    // console.log(this.props)
    eventBus.on('login#content', () => {
    	this.handleOk();
    })
	}

	handleOk = () => {
		const { pageIndex, pageSize } = this.props;
		/*const { pageIndex: tPageindex, pageSize } = this.props;
		const { siteTotal } = this.props;
		const max = Math.ceil((siteTotal-dels) / pageSize)
		const pageIndex = tPageindex > max ? max : tPageindex;
		console.log(pageIndex, max, dels, siteTotal, pageSize)*/
		this.props.getSiteList({ pageIndex, pageSize, isTotal: true, ...this.getsys() });
	}

	getListAndSet = (params) => {
		const { pageIndex: sPageIndex, pageSize: sPageSize, setUsername, history } = this.props;

		const { pageIndex=sPageIndex, pageSize=sPageSize, isTotal } = params;
		// console.log(catalog)
		this.props.updateSiteMngData({pageIndex, pageSize})
		this.props.getSiteList({
			pageIndex,
			pageSize, 
			// search,
			isTotal,
			...this.getsys()
		}).catch(res => {
      if (res.resultCode === LOG_OVERDUE_CODE) {
        setUsername('')
        history.replace('/')
      }
    })
	}
	
	onChange = pageIndex => {

		this.getListAndSet({pageIndex})
	}
  onShowSizeChange = (pageIndex, pageSize) => this.getListAndSet({pageIndex, pageSize})

  collectClick = _id => {
		const { siteList } = this.props;
		return collectSite({_id}).then(res => {
      this.props.updateSiteList(siteList.map(it => it._id === _id ? {...it, isCollected: !it.isCollected} : it))
    })
  }

	render () {
		const { handleOk, collectClick } = this;
		// const { catalog } = this.state;
		const { pageIndex, pageSize, siteList, siteTotal, isSystem } = this.props;

		// console.log(pageIndex, siteTotal)

	  return (
  		<CurContext.Provider value={{ handleOk }}>
	      {/*<AddWebSite handleOk={this.handleOk} />*/}
	      
		  		
			  	<Content 
			  		isSystem={isSystem}
			  		list={siteList} 
			  		collectClick={collectClick}
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
	const { siteList, siteTotal, pageIndex, pageSize, status } = state.siteMng
  return {
  	siteList,
  	siteTotal,
  	pageIndex, pageSize,
  	status,
  	// search
  };
};


const mapDispatchToProps = dispatch => {
  return {
  	updateSiteMngData (data) {
  		return dispatch(updateSiteMngData(data))
  	},
  	updateSiteList (list) {
  		return dispatch(updateSiteList({list}))
  	},
  	/*setCatalog (data) {
  		return dispatch(setCatalog(data))
  	},*/
  	getSiteList (params) {
			return dispatch(getSiteList(params))
  	},
  	setUsername (params) {
			return dispatch(setUsername(params))
  	},
  
  };
};
// export default ComContent;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ComContent));
