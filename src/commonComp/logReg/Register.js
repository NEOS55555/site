import React, { Component, Fragment } from 'react';
import { message, Modal, Button, Input, Popover } from 'antd';
import { checkMail, getStrChartLen, isLegal, checkPassword } from '@/common/common'
import { MAX_NAME_CHART, nameErrorText, nameTipText } from '@/common/constant'
import { register, setUsername, getRegCode, checkNameExist, updateComData } from '@/store/actions'
import { connect } from 'react-redux'
// import { CloseOutlined, CheckOutlined } from '@ant-design/icons'
import Email from '@/commonComp/input/Email'
import CodeBtn from '@/commonComp/input/CodeBtn'
// import imgUrl from '@/common/api'
// import cookie from 'react-cookies'
import { saveLoginCookie } from './loginCookie'
import CheckPassword from './CheckPassword'

/*function getPswErr (psw='') {
	return pswTipText.map(it => it.isok(psw))
}*/

// 注册是不需要登录回调的，因为用户刚创建，所以不会有任何数据跟该用户相关
class Register extends Component {
	
	constructor (props) {
		super(props);
		this.initData = {
			name: '',
			password: '',
			// repsw: '',
			code: '',
			email: '',
			nameError: -1,			// 0: 过长 1: 包含特殊字符 2: 不能为空
			pswErrorTipShow: false,
			// pswok: getPswErr(''),				// 0: 长度不符合要求 1: 没包含 字母/数字以及标点符号至少包含2种 3: 不允许有空格、中文
			isEmailError: false,
			isCodeError: false,

			isNameFirst: true,
			isPswFirst: true,
			isEmailFirst: true,
			isCodeFirst: true,

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
	
	};
	
	
	sendcode = () => {
		const { email } = this.state;
		// console.log(email)
		return new Promise((resolve, reject) => {
			if (!checkMail(email) || email.length === 0) {
				this.setState({isEmailError: true})
				return reject();
			}
			getRegCode({email}).then(res => {
				message.success('验证码已成功发送，请在半小时内填写！')
				resolve();
			}).catch(res => reject())
		
		})
	}
	
	
	handleOver = () => {
		
		this.setState({
			...this.initData,
		  visible: false,
		});
	}
	// 上架
	handleOk = () => {
		const { name, password, email, code, nameError } = this.state;
		// console.log(password)
		if (nameError !== -1) {
			return;
		}
		if (name.length === 0) {
			this.setState({nameError: 2})
			return;
		}
		if (!checkPassword(password)) {
			this.setState({ pswErrorTipShow: true })
			return;
		}
		/*if (!this.getPswIsOk() || password.length === 0) {
			this.setState({ pswErrorTipShow: true })
			return;
		}*/
		if (!checkMail(email) || email.length === 0) {
			this.setState({isEmailError: true})
			return;
		}
		if (code.length === 0) {
			this.setState({isCodeError: true})
			return;
		}


		this.setState({confirmLoading: true})
		register({name, password, email, code}).then(data => {
			// console.log(res)
			const { result, resultMessage } = data;
			const { _id, token, is_async } = result;
	
			saveLoginCookie(_id, token, name)
			
			message.success(resultMessage)
			this.setState({
				visible: false,
				confirmLoading: false,
			})
			setTimeout(() => {
				this.props.setUsername(name)
				this.props.updateComData({is_async})
			}, 30)
		}).catch(res => this.setState({ confirmLoading: false }))
	};
	

	handleCancel = () => {
		
		this.setState({
			visible: false,
		});
		
	};
	
	/*checkRePsw = () => {
		const { password, repsw } = this.state;
		if (password !== repsw) {
			message.error('两次密码不一致')
		}
	}*/

	/*componentDidMount () {
		console.log(process.env)
		this.props.getCatalogList();
	}*/
	checkName = (name) => {
		let nameError = -1;
		const namChartlen = getStrChartLen(name);
		if (namChartlen > MAX_NAME_CHART) {
			nameError = 0
			// console.log(name, getStrChartLen(name))
		} else if (!isLegal(name)) {
			nameError = 1
		} else if (name === '') {
			nameError = 2
		}
		return nameError
	}
	
	nameChange = e => {
		const { value } = e.target
		// isLegal
		this.setState({
			name: value,
			isNameFirst: false,
			nameError: this.checkName(value)
		})

	}
	nameBlur = () => {
		const { name } = this.state
		const nameError = this.checkName(name)
		if (nameError === -1) {
			checkNameExist({name}).then(res => {
				if (res.result) {
					this.setState({
						nameError: 3
					})
				}
			})
		} else {
			this.setState({
				nameError
			})
		}

	}
	pswChange = e => {
		const password = e.target.value
		this.setState({
			password,
			pswErrorTipShow: false,
			isPswFirst: false,
		})
		
	}
	pswBlur = (e) => {
		this.setState({ pswErrorTipShow: !checkPassword(e.target.value) })
	}
	/*getPswIsOk () {
		return this.state.pswok.reduce((a, pr) => a && pr, true)
	}*/
	/*repswChange = e => {
		this.setState({
			repsw: e.target.value
		})
	}*/
	
	codeChange = e => {
		const code = e.target.value
		this.setState({
			code,
			isCodeError: code.length === 0,
			isCodeFirst: false
		})
	}
	emailChange = (email) => {
		// console.log(a, b, c)
		const isEmailError = !checkMail(email);
		this.setState({
			email,
			isEmailFirst: false
		})
		// 只有输入不对的时候才会
		if (!isEmailError) {
			this.setState({
				isEmailError,
			})
		}
	}
	emailBlur = () => {
		this.setState((prevState) => {
			return {
				isEmailError: !checkMail(prevState.email)
			}
		})
	}

	
	render() {
    const { 
    	visible, confirmLoading, name, password, code,
    	nameError, isEmailError, isCodeError, pswErrorTipShow,
    	isNameFirst, isPswFirst, isEmailFirst, isCodeFirst
    } = this.state;
   

    return (
    	<Fragment>
    		<Button onClick={this.open} type="link">注册</Button>
	      <Modal
	      	width={400}
					title="注册"
					visible={visible}
					maskClosable={false}
					footer={null}
					// confirmLoading={confirmLoading}
					onCancel={this.handleCancel}
					// onOk={this.handleOk}
					// okText="确定"
					// cancelText="取消"
	      >
	        <div className="self-wrapper">
	        
						<div className="self-line must">
							<Popover placement="topLeft" content={<div>{nameTipText}</div>} trigger="focus">
								<label>用户名</label>
								<Input className={nameError !== -1 && 'error'} placeholder="请设置用户名" onBlur={this.nameBlur} onChange={this.nameChange} value={name} />
							</Popover>
							{
								nameErrorText[nameError] && <p className="error-tip">{nameErrorText[nameError]}</p>
							}

						</div>
						<div className="self-line must">
							<CheckPassword 
								password={password}
								pswErrorTipShow={pswErrorTipShow} 
								onBlur={this.pswBlur}
								onChange={this.pswChange}
							/>
							
						</div>
						
						{/*<div className="self-line must">
							<label>重复密码</label><Input type="password" onBlur={this.checkRePsw} onChange={this.repswChange} value={repsw} />
						</div>*/}
						<div className="self-line must">
							<label>邮箱</label>
							{/*<Input placeholder="可用于登录和找回密码" onChange={this.emailChange} value={email} />*/}
							<Email className={isEmailError && 'error'} style={{width: '100%'}} placeholder="可用于登录和找回密码" onBlur={this.emailBlur} onSelect={this.emailChange} />
							{
								isEmailError && <p className="error-tip">邮箱不符合格式</p>
							}
						</div>
						<div className="self-line must">
							<label>验证码</label>
							<div className="inline">
								<div>
									<Input className={isCodeError && 'error'} placeholder="请输入验证码" onChange={ this.codeChange} value={code} style={{width: 150}} />
									<CodeBtn onClick={this.sendcode} />
								</div>
								{
									isCodeError && <p className="error-tip">验证码不能为空</p>
								}
								{/*<Button onClick={this.sendcode} disabled={mailClick} type="link">{mailClick ? `${mailCount}s后再次获取` : '获取验证码'}</Button>*/}
							</div>
						</div>
						<div className="self-line">
							<Button 
								disabled={(isNameFirst || isPswFirst || isCodeFirst || isEmailFirst) ? true : (nameError !== -1 || !checkPassword(password) || isEmailError || isCodeError)}
								style={{width: '100%'}} 
								type="primary" 
								loading={confirmLoading} 
								onClick={this.handleOk} 
							>注册</Button>
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
  	updateComData (data) {
  		return dispatch(updateComData(data))
  	}
  };
};
Register = connect(null, mapDispatchToProps)(Register)
export default Register;
// Register = connect(mapStateToProps, mapDispatchToProps)(Register)
