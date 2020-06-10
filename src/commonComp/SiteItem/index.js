import React, { Component, Fragment} from 'react';
import './SiteItem.scss'
import { EditOutlined/*, HeartFilled*/ } from '@ant-design/icons'
import { getStatus, getCeil5 } from '@/common/common'
import { NORMAL_CODE } from '@/common/constant'
// import Dialog from '@/commonComp/Dialog'
import url from '@/common/api'
// import cookie from 'react-cookies'
import { setRate, addView } from '@/store/actions'
import { Rate, Spin, Tooltip } from 'antd';
import {editWebSite} from '@/components/AddWebSite/AddWebSite'
import CurContext from '@/components/ComContent/cur-context'
import { connect } from 'react-redux'

import DelIcon from './Icons/DelIcon'
import { Link } from "react-router-dom";


class SiteItem extends Component {
	static contextType = CurContext;
	constructor (props) {
		super(props);

		this.state = {
			rate: props.data.rate,
			// viewsCount: props.data.views,
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
		const { _id } = this.props.data;
		addView({_id})/*.then(data => {
			this.setState({
				viewsCount: data.result
			})
		})*/
		// window.open(url)
	}
	// 编辑弹窗
	editClick = () => {
		const ctx = this.context;
		const { data, catalogList } = this.props;
		editWebSite.open({
	    catalogList,
			...data,
			isNameFirst: false,
			isUrlFirst: false,
			isDescFirst: false,
			isImgFirst: !data.img,
			isCatalogFirst: false,
			isTagFirst: false,
			handleOk: ctx.handleOk
		})
	}
	render () {
		// const ctx = this.context;
		// console.log(ctx);
		const { data, isSystem, catalogList, is_async, onlyShow } = this.props;
		// console.log('is_async', is_async)
		const { isRating, rate } = this.state;
		const catalogMap = {};
		catalogList.forEach(it => {
			catalogMap[it._id] = it.name;
		})
		// console.log(catalogMap)
		const rateval = rate.value / rate.length || 0;
		const { _id, name, url: site_url, status, desc, img, create_time, catalog=[], tags: ttags, create_user_name, views, commit_total } = data;
		const tags = ttags || [];
		const isNormal = status === NORMAL_CODE
		// <div className="rich-content-text" dangerouslySetInnerHTML={{__html: desc}} ></div>
		
		return (
			<div className={"site-item " + (onlyShow ? 'only-show' : '')}>
				{/*<Skeleton avatar  active paragraph={{ rows: 3 }} loading={false} >*/}
					
					<h2 className="site-title">
						{
							isNormal ? <Link to={'/sitedetail/' + _id}>{name}</Link> : <span >{name} {getStatus(status)}</span>
						}
						
						{/*<Tooltip placement="right" title={`点击跳转`}>
							<a className="underline" href={site_url} rel="noopener noreferrer" target="_blank" onClick={this.linkTo}>{name} {getStatus(status)}</a>
						</Tooltip>*/}
						
						{
							isSystem && (isNormal ? is_async : true) 
							&& <span><EditOutlined title="编辑" onClick={this.editClick} style={{marginRight: 8}} /><DelIcon data={data} /></span> 
						}
					</h2>
					<p className="sit-sub-text">hot {views}°C</p>
					<div className="rich-head">
						<Spin spinning={isRating} size="small" >
							<span>评分: </span><Rate disabled={rate.isRated} value={getCeil5(rateval)} allowHalf onChange={this.rateChange} />
		        </Spin>
					</div>
					<div className="rich-content">
						<div className="rich-content-text" dangerouslySetInnerHTML={{__html: desc}} ></div>
						<div className="rich-content-cover">
							<div className="rich-content-cover-inner">
								{img && <img src={url + img} alt=""/>}
							</div>
						</div>
						<div className="rich-footer">
							<ul>
								<li>地址：<a className="underline color-blue" href={site_url} rel="noopener noreferrer" target="_blank" onClick={this.linkTo}>{site_url}</a></li>
								<li>
									分类： 
									{
										catalog.map((id, index) => 
											<Fragment key={id}>
												<Link to={(isSystem ? '/system/' : '/') + id}>{catalogMap[id]}</Link> 
												{index !== catalog.length - 1 && '、'}
											</Fragment>) 
									}
								</li>
								<li>
									标签： 
									{
										tags.map((name, index) => 
											<Fragment key={index}>
												<Link to={'/tag/' + name}>{name}</Link>
												{index !== tags.length - 1 && '、'}
											</Fragment>) 
									}
								</li>
								<li>作者：{create_user_name}</li>
								<li>发布时间：{create_time}</li>
							</ul>
							{
								isNormal && !onlyShow && 
								<div className="align-right">
									<Link className="link-to" to={'/sitedetail/'+_id} >查看评论({commit_total})</Link>
								</div>
						}
						</div>
					</div>
				{/*</Skeleton>*/}
			</div>
		)
	}
}
const mapStateToProps = state => {
	const { catalogList, search } = state.siteMng
	const { is_async } = state.com
  return {
  	search,
  	catalogList,
  	is_async,
  };
};



export default connect(mapStateToProps, null)(SiteItem);