import React, { Component, Fragment, createRef } from 'react';
import { message, Modal, Button, Input } from 'antd';
import { checkMail } from '@/common/common'
import { register, setUsername, getRegCode } from '@/store/actions'
import { connect } from 'react-redux'
// import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import Email from '@/commonComp/input/Email'
// import imgUrl from '@/common/api'
// import cookie from 'react-cookies'
import { saveLoginCookie } from './loginCookie'

const COUNT_DOWN = 60;

class Register extends Component {
	
	constructor (props) {
		super(props);
		this.fileInput = createRef();
		this.initData = {
			name: '',
			password: '',
			// repsw: '',
			code: '',
			email: '',
		}
		this.mailCountInterval = null;
		this.state = {
			visible: false,
			confirmLoading: false,
			mailClick: false,
			mailCount: COUNT_DOWN,
			...this.initData
		};
	}
	

	open = () => {
		
		this.setState({
		  visible: true,
		});
	
	};
	
	startCountDown = () => {
		this.setState({
			mailClick: true
		})
		clearInterval(this.mailCountInterval)
		this.mailCountInterval = setInterval(() => {
			const { mailCount } = this.state;
			if (mailCount === 1) {
				this.setState({
					mailClick: false,
					mailCount: COUNT_DOWN
				})
				clearInterval(this.mailCountInterval)
				return;
			}
			this.setState({
				mailCount: mailCount - 1
			})
		}, 1000)
	}
	sendcode = () => {
		const { email } = this.state;
		console.log(email)
		// return;
		getRegCode({email}).then(res => {
			console.log(res)
			if (res.resultCode === 200) {
				this.startCountDown();
				return message.success(res.resultMessage)
			}
			message.error(res.resultMessage)
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
		const { name, password, email, code } = this.state;
		this.setState({confirmLoading: true})
		register({name, password, email, code}).then(data => {
			this.setState({confirmLoading: false})
			// console.log(res)
			const { result, resultCode, resultMessage } = data;
			const { _id, token } = result;
			
			if (resultCode !== 200) {
				return ;
			}
			saveLoginCookie(_id, token, name)
			
			message.success(resultMessage)
			this.setState({
				visible: false,
			})

			this.props.setUsername(name)
		})
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

	nameChange = e => {
		// isLegal
		this.setState({
			name: e.target.value
		})
	}
	pswChange = e => {
		this.setState({
			password: e.target.value
		})
	}
	
	/*repswChange = e => {
		this.setState({
			repsw: e.target.value
		})
	}*/
	
	codeChange = e => {
		this.setState({
			code: e.target.value
		})
	}
	emailChange = (a, b, c) => {
		// console.log(a, b, c)
		this.setState({
			email: a
		})
	}
	

	
	render() {
    const { visible, confirmLoading, mailClick, mailCount, name, password, code } = this.state;

    return (
    	<Fragment>
    		<Button onClick={this.open} type="link">注册</Button>
	      <Modal
	      	width={700}
					title="注册"
					visible={visible}
					maskClosable={false}
					confirmLoading={confirmLoading}
					onCancel={this.handleCancel}
					onOk={this.handleOk}
					okText="确定"
					cancelText="取消"
	      >
	        <div className="self-wrapper">
	        
						<div className="self-line must">
							<label>用户名</label><Input placeholder="请设置用户名" onChange={this.nameChange} value={name} />
						</div>
						<div className="self-line must">
							<label>密码</label><Input.Password type="password" placeholder="请设置登录密码" onChange={this.pswChange} value={password} />
						</div>
						
						{/*<div className="self-line must">
							<label>重复密码</label><Input type="password" onBlur={this.checkRePsw} onChange={this.repswChange} value={repsw} />
						</div>*/}
						<div className="self-line must">
							<label>邮箱</label>
							{/*<Input placeholder="可用于登录和找回密码" onChange={this.emailChange} value={email} />*/}
							<Email style={{width: '100%'}} placeholder="可用于登录和找回密码" onSelect={this.emailChange} />
						</div>
						<div className="self-line must">
							<label>验证码</label>
							<div className="inline">
								<Input placeholder="请输入验证码" onChange={this.codeChange} value={code} style={{width: 150}} /><Button onClick={this.sendcode} disabled={mailClick} type="link">{mailClick ? `${mailCount}s后再次获取` : '获取验证码'}</Button>
							</div>
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
  };
};
Register = connect(null, mapDispatchToProps)(Register)
export default Register;
// Register = connect(mapStateToProps, mapDispatchToProps)(Register)
