import React, {Component} from 'react';
import './SiteItem.scss'
import { SettingFilled, HeartFilled } from '@ant-design/icons'
import { getStatus, getCeil5 } from '@/common/common'
// import Dialog from '@/commonComp/Dialog'
import url from '@/common/api'
import cookie from 'react-cookies'
import { setRate, addView } from '@/store/actions'
import { Rate, Spin, Tooltip, Badge } from 'antd';
import {editWebSite} from '@/components/AddWebSite/AddWebSite'
import CurContext from '@/components/SystemComp/cur-context'

import DelIcon from './Icons/DelIcon'



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
		// const {data} = this.props;
		/*this.setState({
			hasRated: !!data.rate.find(it => ((it.user_id !== undefined && it.user_id === cookie.load('user_id')) || it.user_ip === cookie.load('user_ip')))
		})*/
		// console.log(cookie.load('userIp'))
	}
	// 评价
	rateChange = value => {
		const site_id = this.props.data._id;
		this.setState({
			isRating: true,
		})
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
		const {data} = this.props;
		editWebSite.open({
	    catalogList: ctx.catalogList,
			...data,
			handleOk: ctx.handleOk
		})
	}
	render () {
		const ctx = this.context;
		// console.log(ctx);
		const {data, isSystem} = this.props;
		const { isRating, rateList, viewsCount, rate } = this.state;

		// const rateval = rateList.reduce((a, p) => a + p.value, 0) / rateList.length || 0;
		const rateval = rate.value / rate.length || 0;
		return (
			<div className="site-item">
				{/*<Skeleton avatar  active paragraph={{ rows: 3 }} loading={false} >*/}
					
					<h2 className="site-title">
						<Tooltip placement="right" title={`点击跳转`}>
							<span onClick={this.linkTo}>{data.name} {getStatus(data.status)} <Badge count={viewsCount} overflowCount={999} /></span>
						</Tooltip>
						
						{isSystem ? <span><SettingFilled onClick={this.editClick} /><DelIcon data={data} /></span> : <HeartFilled />}
					</h2>
					<div className="rich-head">
						<Tooltip placement="right" title={`当前评分:${rateval}`}>
							<Spin spinning={isRating} size="small" >
								<span>评分: </span><Rate disabled={rate.isRated} value={getCeil5(rateval)} allowHalf onChange={this.rateChange} />
			        </Spin>
		        </Tooltip>
					</div>
					<div className="rich-content">
						<div className="rich-content-text">{data.desc}</div>
						<div className="rich-content-cover">
							<div className="rich-content-cover-inner">
								<img src={url + data.img} alt=""/>
							</div>
						</div>
					</div>
				{/*</Skeleton>*/}
			</div>
		)
	}
}

export default SiteItem;