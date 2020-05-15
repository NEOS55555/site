import React, {Component} from 'react';
import Content from '../Content/Content'

// import Dialog from '@/commonComp/Dialog'
import RightNav from '@/commonComp/RightNav'
import { addWebSite } from '../AddWebSite/AddWebSite'
import AddCatalog from '../AddWebSite/AddCatalog'
import { connect } from 'react-redux'
import './SystemComp.scss';
import { Button } from 'antd'
import { getSiteList, getCatalogList, UPDATE_DATA } from '@/store/actions'

import CurContext from './cur-context';


class ComContent extends Component {
		
	getsys () {

		const { isSystem } = this.props;
		return {
			status: isSystem ? -1 : 1,
			is_edit: !!isSystem
		}
	}

	constructor (props) {
		super(props)
		// console.log(props)
		this.state = {
			list: [],
			status: props.isSystem ? -1 : 1,
		}
	}
	
	componentDidMount () {
		const { status } = this.state;
		const { pageIndex, pageSize, catalog } = this.props;
		console.log(pageIndex)
		// console.log(status)
		this.props.getSiteList({catalog, status, pageIndex, pageSize, isTotal: true, ...this.getsys()});
		this.props.getCatalogList();

		/*getSiteList().then(res => {
			this.setState({
				list: res.data.result
			})
			console.log(res)
		})*/
	}

	handleOk = (dels=0) => {
		const { status } = this.state;
		const { pageIndex: tPageindex, pageSize, catalog } = this.props;
		const { siteTotal } = this.props;
		const max = Math.ceil((siteTotal-dels) / pageSize)
		const pageIndex = tPageindex > max ? max : tPageindex;
		console.log(pageIndex, max, dels, siteTotal, pageSize)
		this.props.getSiteList({catalog, status, pageIndex, pageSize, isTotal: true, ...this.getsys()});
	}

	getListAndSet = (params) => {
		const { status: sStatus } = this.state;
		const { catalog: sCatalog, pageIndex: sPageIndex, pageSize: sPageSize } = this.props;

		const {pageIndex=sPageIndex, pageSize=sPageSize, catalog=sCatalog, status=sStatus, isTotal } = params;
		console.log(catalog)
		this.props.updateDate({pageIndex, pageSize, catalog})
		this.props.getSiteList({
			isTotal,
			pageIndex,
			catalog,
			status,
			pageSize, ...this.getsys()
		})
	}
	
	onChange = pageIndex => {

		this.getListAndSet({pageIndex})
	}
  onShowSizeChange = (pageIndex, pageSize) => this.getListAndSet({pageIndex, pageSize})

	render () {
		const { handleOk } = this;
		// const { pageIndex, pageSize, catalog } = this.state;
		const { pageIndex, pageSize, catalog, siteList, siteTotal, catalogList, isSystem } = this.props;

		// console.log(pageIndex, siteTotal)

	  return (
	  	<div>
	  		<CurContext.Provider value={{catalogList, handleOk}}>
		      {/*<AddWebSite handleOk={this.handleOk} />*/}
		      <Button type="primary" onClick={() => {
		      	addWebSite.open({
		      		catalogList,
		      		handleOk
		      	});
		      }}>新增网站</Button>
		      <AddCatalog  />
			  	<div className="site-wrapper">
			  		{/*<RightNav defaultSelectedKeys={[catalog+'']} onSelect={a => {
			  			this.getListAndSet({
			  				pageIndex: 1,
			  				catalog: parseInt(a.key),
			  				isTotal: true,
			  			})

			  		}} />*/}
			  		
				  	<Content 
				  		isSystem={isSystem}
				  		list={siteList} 
				  		handleOk={this.handleOk} 
				  		total={siteTotal} current={pageIndex} pageSize={pageSize}
					  	onChange={this.onChange} 
					  	onShowSizeChange={this.onShowSizeChange} 
				  	/>
					  	
		  		</div>
		  	</CurContext.Provider>
	  	</div>
	  )
	}
}
const mapStateToProps = state => {
	const { siteList, siteTotal, catalogList, pageIndex, pageSize, catalog } = state.siteMng
  return {
  	siteList,
  	siteTotal,
  	pageIndex, pageSize, catalog,
  	catalogList: catalogList.slice(1),
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
  	getCatalogList (params) {
			return dispatch(getCatalogList(params))
  	},
  };
};
// export default ComContent;
export default connect(mapStateToProps, mapDispatchToProps)(ComContent);
