import React, { Component, Fragment } from 'react';
import { message, Modal, Button, Input } from 'antd';
import { trim, isLegal, pathType } from '@/common/common'
import { pswTipText } from '@/common/constant'
import { login, setUsername, updateComData, setReplyNum } from '@/store/actions'
import { connect } from 'react-redux'

import imgUrl from '@/common/api'
// import cookie from 'react-cookies'
import { saveLoginCookie } from './loginCookie'
import RestPsw from './RestPsw'
import eventBus from '@/common/eventBus'

// 登陆的时候粗略的校验一下就行了，没必要和注册一个逻辑
class Login extends Component {
	
	constructor (props) {
		super(props);
		this.initData = {
			name: '',
			password: '',
			code: '',
			codeurl: '',
			isNameFirst: true,
			isPswFirst: true,
			isCodeFirst: true,
			isNameError: false,
			isPswError: false,
			isCodeError: false,
		}
		this.state = {
			visible: false,
			confirmLoading: false,
			...this.initData
		};
	}
	

	open = () => {
		
		this.setState({
		  visible: true,
		});
		this.refreshCode();
	
	};
	
	
	handleOver = () => {
		
		this.setState({
			...this.initData,
		  visible: false,
		});
	}
	// 登陆
	handleOk = () => {
		const { name, password, code } = this.state;
		const { setUsername, updateComData, setReplyNum, pathname } = this.props;
		if (!trim(name)) {
			this.setState({isNameError: true})
			return;
		}
		if (!trim(password)) {
			this.setState({isPswError: true})
			return;
		}
		if (!trim(code)) {
			this.setState({isCodeError: true})
			return;
		}
		this.setState({confirmLoading: true})
		login({name, password, code: code.toString().toLowerCase()}).then(data => {
			this.setState({confirmLoading: false})
			const { result, resultMessage } = data;
			const { _id, token, name: user_name, is_async, check_reply_num } = result;

			saveLoginCookie(_id, token, user_name)
			
			message.success(resultMessage)
			this.setState({
				visible: false,
			})
			// 因为在头部的时候，设置用户名之后，登陆和注册按钮都没了。同时，弹窗动画还没隐藏，所以会报错，节点被删除，但是事件还未完成
			setTimeout(() => {
				setUsername(user_name)
				updateComData({is_async})
				setReplyNum(check_reply_num)
				
				// 需要在不同的路由配置不同的回调
				const pht = pathType(pathname)
				if (pht === 'home') {
					eventBus.emit('login#content')	// 获取列表内容
				} else if (pht === 'sitedetail') {
					eventBus.emit('login#siteDetail')	// 获取网页详情
				}
				
			}, 30)
		}).catch(res => {
			this.setState({confirmLoading: false})
			this.refreshCode()
		})
	};
	

	handleCancel = () => {
		
		this.setState({
			visible: false,
		});
		
	};
	

	/*componentDidMount () {
		console.log(process.env)
		this.props.getCatalogList();
	}*/

	nameChange = e => {
		// isLegal
		const name = e.target.value;
		// console.log(name, !name)
		this.setState({
			name,
			isNameError: !name,
			isNameFirst: false
		})
	}
	nameBlur = () => {
		this.setState(prevState => ({isNameError: !isLegal(prevState.name)}))
	}
	pswChange = e => {
		const password = e.target.value;
		this.setState({
			password,
			isPswError: !password, isPswFirst: false
		})
	}
	pswBlur = () => {
		this.setState(prevState => ({isPswError: !pswTipText[2].isok(prevState.password)}))
	}
	codeChange = e => {
		const code = e.target.value
		this.setState({
			code,
			isCodeError: !trim(code), 
			isCodeFirst: false
		})
	}
	
	/*codeBlur = () => {
		this.setState(prevState => ({isCodeError: !prevState.code}))
	}*/
	refreshCode = () => {
		this.setState({
			codeurl: imgUrl + '/getCaptcha?r='+Math.random()
		})
	}

	
	render() {
    const { 
    	visible, confirmLoading, name, password, code, codeurl, 
    	isNameError, isPswError, isCodeError, 
    	isNameFirst, isPswFirst, isCodeFirst 
    } = this.state;
		// console.log(isNameError, isPswError, isCodeError)
    return (
    	<Fragment>
    		<Button onClick={this.open} type="link">登录</Button>
	      <Modal
	      	width={400}
					title="登录"
					visible={visible}
					maskClosable={false}
					// confirmLoading={confirmLoading}
					onCancel={this.handleCancel}
					onOk={this.handleOk}
					// okText="确定"
					// cancelText="取消"
					footer={null}
	      >
	        <div className="self-wrapper">
	        
						<div className="self-line must">
							<label>用户名</label><Input className={isNameError && 'error'} placeholder="用户名/邮箱" onBlur={this.nameBlur} onChange={this.nameChange} value={name} />
							{
								isNameError && <p className="error-tip">用户名不能包含空格及不能为空</p>
							}
						</div>
						<div className="self-line must">
							<label>密码</label><Input.Password className={isPswError && 'error'} placeholder="请输入密码" onBlur={this.pswBlur} onChange={this.pswChange} value={password} />
							{
								isPswError && <p className="error-tip">密码不能包含空格及不能为空</p>
							}
						</div>
						<div className="self-line must">
							<label>验证码</label>
							<div className="inline">
								<div>
									<Input placeholder="请输入右侧验证码" onChange={this.codeChange} value={code} style={{width: 150}} />
	    						<span className="link-a" onClick={this.refreshCode}><img className="code" src={codeurl} alt="验证码" /></span>
								</div>
								{
									isCodeError && <p className="error-tip">验证码不能为空</p>
								}
							</div>
						</div>
						<div className="self-line">
							<Button style={{width: '100%'}} disabled={(isNameFirst || isPswFirst || isCodeFirst) ? true : (isNameError || isPswError || isCodeError)} type="primary" loading={confirmLoading} onClick={this.handleOk} >登录</Button>
						</div>
						<div className="self-line">
							<RestPsw handleOpen={this.handleCancel} />
							
						</div>
						
	        </div>
	      	
	      </Modal>
    	</Fragment>
	  );
	}
}


const mapDispatchToProps = dispatch => {
  return {
  	setUsername (name) {
			return dispatch(setUsername(name))
  	},
  	setReplyNum (num) {
  		return dispatch(setReplyNum(num))
  	},
  	updateComData (data) {
  		return dispatch(updateComData(data))
  	}
  };
};
export default connect(null, mapDispatchToProps)(Login);
