import React, {Component, Fragment, createRef} from 'react';
import {message, Modal, Button, Input } from 'antd';
// import { checkMail } from '@/common/common'
import { login, setUsername } from '@/store/actions'
import {connect} from 'react-redux'

import imgUrl from '@/common/api'
// import cookie from 'react-cookies'
import { saveLoginCookie } from './loginCookie'


class Login extends Component {
	
	constructor (props) {
		super(props);
		this.fileInput = createRef();
		this.initData = {
			name: '',
			password: '',
			code: '',
			codeurl: ''
		}
		this.mailCountInterval = null;
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
		this.setState({confirmLoading: true})
		login({name, password, email: name, code: code.toString().toLowerCase()}).then(data => {
			this.setState({confirmLoading: false})
			// console.log(res)
			const { result, resultCode, resultMessage } = data;
			const { _id, token, name: user_name } = result;
			
			if (resultCode !== 200) {
				this.refreshCode()
				/*if (resultCode === 133) {
					this.refreshCode()
					return;
				}*/
				return
			}

			saveLoginCookie(_id, token, user_name)
			
			message.success(resultMessage)
			this.setState({
				visible: false,
			})

			this.props.setUsername(user_name)
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
		this.setState({
			name: e.target.value
		})
	}
	pswChange = e => {
		this.setState({
			password: e.target.value
		})
	}
	codeChange = e => {
		this.setState({
			code: e.target.value
		})
	}
	
	refreshCode = () => {
		this.setState({
			codeurl: imgUrl + '/getCaptcha?r='+Math.random()
		})
	}

	
	render() {
    const { visible, confirmLoading, name, password, code, codeurl } = this.state;

    return (
    	<Fragment>
    		<Button onClick={this.open} type="link">登录</Button>
	      <Modal
	      	width={700}
					title="登录"
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
							<label>用户名</label><Input onChange={this.nameChange} value={name} />
						</div>
						<div className="self-line must">
							<label>密码</label><Input type="password" onChange={this.pswChange} value={password} />
						</div>
						<div className="self-line must">
							<label>验证码</label>
							<div className="inline">
								<Input onChange={this.codeChange} value={code} style={{width: 150}} />
    						<a onClick={this.refreshCode}><img className="code" src={codeurl} alt="验证码" /></a>

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
Login = connect(null, mapDispatchToProps)(Login)
export default Login;
