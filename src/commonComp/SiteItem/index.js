import React, { Component, Fragment} from 'react';
import './SiteItem.scss'
import { EditOutlined/*, HeartFilled*/ } from '@ant-design/icons'
import { getStatus, getCeil5, replaceStrTob } from '@/common/common'
// import Dialog from '@/commonComp/Dialog'
import url from '@/common/api'
// import cookie from 'react-cookies'
import { setRate, addView } from '@/store/actions'
import { Rate, Spin, Tooltip } from 'antd';
import {editWebSite} from '@/components/AddWebSite/AddWebSite'
import CurContext from '@/components/ComContent/cur-context'
import { connect } from 'react-redux'

import DelIcon from './Icons/DelIcon'
import {
  Link
} from "react-router-dom";


class SiteItem extends Component {
	static contextType = CurContext;
	constructor (props) {
		super(props);

		this.state = {
			rate: props.data.rate,
			viewsCount: props.data.views,
			isRating: false,
			// hasRated: false,
		}
	}
	componentDidMount () {

	}
	// 评价
	rateChange = value => {
		const site_id = this.props.data._id;
		this.setState({
			isRating: true,
		})
		/*setTimeout(() => {
			this.setState({
				isRating: false,
			})
		}, 3000)
		return;*/
		setRate({
			site_id,
			// user_ip: cookie.load('userIp'),
			value
		}).then(res => {
			
			this.setState((prevState) => {
				const { value: tval, length } = prevState.rate;
				return {
					isRating: false,
					rate: {
						isRated: true,
						value: tval + value, 
						length: length+ 1
					}
				}
			})
		})
		
	}
	// 跳转页面并计算点击量
	linkTo = () => {
		const { _id, url } = this.props.data;
		addView({_id}).then(data => {
			this.setState({
				viewsCount: data.result
			})
		})
		window.open(url)
	}
	// 编辑弹窗
	editClick = () => {
		const ctx = this.context;
		const { data, catalogList } = this.props;
		editWebSite.open({
	    catalogList,
			...data,
			handleOk: ctx.handleOk
		})
	}
	render () {
		// const ctx = this.context;
		// console.log(ctx);
		const { data, isSystem, catalogList, search } = this.props;
		const { isRating, rate } = this.state;
		const catalogMap = {};
		catalogList.forEach(it => {
			catalogMap[it._id] = it.name;
		})
		// console.log(catalogMap)
		const rateval = rate.value / rate.length || 0;
		return (
			<div className="site-item">
				{/*<Skeleton avatar  active paragraph={{ rows: 3 }} loading={false} >*/}
					
					<h2 className="site-title">
						<Tooltip placement="right" title={`点击跳转`}>
							<span onClick={this.linkTo}>{data.name} {getStatus(data.status)}</span>
						</Tooltip>
						
						{
							//isSystem ? <span><EditOutlined onClick={this.editClick} /><DelIcon data={data} /></span> : <HeartFilled />
						}
						{isSystem && <span><EditOutlined onClick={this.editClick} /><DelIcon data={data} /></span> }
					</h2>
					<div className="rich-head">
						<Spin spinning={isRating} size="small" >
							<span>评分: </span><Rate disabled={rate.isRated} value={getCeil5(rateval)} allowHalf onChange={this.rateChange} />
		        </Spin>
					</div>
					<div className="rich-content">
						<div className="rich-content-text">{data.desc}</div>
						<div className="rich-content-cover">
							<div className="rich-content-cover-inner">
								<img src={url + data.img} alt=""/>
							</div>
						</div>
						<div className="rich-footer">
							<ul>
								<li>发布时间：{data.create_time}</li>
								<li>
									分类： 
									{
										(data.catalog || []).map((id, index) => 
											<Fragment key={id}>
												<Link to={(isSystem ? '/system/' : '/') + id}>{catalogMap[id]}</Link> 
												{index !== data.catalog.length - 1 && '、'}
											</Fragment>) 
									}
								</li>
								<li>
									标签： 
									{
										(data.tags || []).map((name, index) => 
											<Fragment key={index}>
												<Link to={'/tag/' + name}>{name}</Link>
												{index !== data.tags.length - 1 && '、'}
											</Fragment>) 
									}
								</li>
								<li>作者：{data.create_user_name}</li>
							</ul>
							
							
						</div>
					</div>
				{/*</Skeleton>*/}
			</div>
		)
	}
}
const mapStateToProps = state => {
	const { catalogList, search } = state.siteMng
  return {
  	search,
  	catalogList,
  };
};



export default connect(mapStateToProps, null)(SiteItem);