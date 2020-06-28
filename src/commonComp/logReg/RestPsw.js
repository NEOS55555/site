import React, { Component, Fragment } from 'react';
import { message, Modal, Button, Input } from 'antd';
import { checkPassword } from '@/common/common'
import { getRestCode, resetPassword } from '@/store/actions'
// import {connect} from 'react-redux'

// import Email from '@/commonComp/input/Email'
import CodeBtn from '@/commonComp/input/CodeBtn'
// import imgUrl from '@/common/api'
import CheckPassword from './CheckPassword'
// import cookie from 'react-cookies'
// import { saveLoginCookie } from './loginCookie'


class RestPsw extends Component {
	
	constructor (props) {
		super(props);
		this.initData = {
			name: '',
			password: '',
			code: '',
			pswErrorTipShow: false,

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

	sendcode = () => {
		const { name } = this.state;
		// console.log(name)
		// return;
		return new Promise((resolve, reject) => {
			getRestCode({name}).then(res => {
				message.success(res.resultMessage)
			}).catch(res => reject())
		
		})
		
	}


	open = () => {
		const { handleOpen } = this.props;
		this.setState({
		  visible: true,
		});
		
		handleOpen && handleOpen();
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
		resetPassword({name, password, code: code.toString()}).then(data => {
			this.setState({confirmLoading: false})
			const { resultMessage } = data;
			message.success(resultMessage)
			this.handleOver()
		}).catch(res => this.setState({confirmLoading: false}))
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
		const name = e.target.value;
		// isLegal
		this.setState({
			name,
			isNameError: !name,
			isNameFirst: false,
		})
	}

	codeChange = e => {
		this.setState({
			code: e.target.value,
			isCodeFirst: false,
		})
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
	nameBlur = () => {
		this.setState(prevState => ({isNameError: !prevState.name}))
	}

	/*codeBlur = () => {
		this.setState(prevState => ({isCodeError: !prevState.code}))
	}*/
	
	render() {
    const { visible, confirmLoading, name, password, code, pswErrorTipShow,
    	isNameError, isCodeError, 
    	isNameFirst, isPswFirst, isCodeFirst 
     } = this.state;

    return (
    	<Fragment>
    		<span className="link-a" onClick={this.open}>忘记密码?</span>
	      <Modal
	      	width={400}
					title="重置密码"
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
							<label>用户名</label>
							<Input placeholder="用户名/邮箱" className={isNameError && 'error'} onBlur={this.nameBlur} onChange={this.nameChange} value={name} />
							{
								isNameError && <p className="error-tip">用户名不能为空</p>
							}
						</div>
						
						<div className="self-line must">
							<label>验证码</label>
							<div className="inline">
								<div>
									<Input className={isCodeError && 'error'} placeholder="请输入验证码" onChange={this.codeChange} value={code} style={{width: 150}} />
									<CodeBtn onClick={this.sendcode} />
								</div>
							</div>
							{
								isCodeError && <p className="error-tip">验证码不能为空</p>
							}
						</div>
						<div className="self-line must">
							<CheckPassword 
								text="新密码"
								password={password}
								pswErrorTipShow={pswErrorTipShow} 
								onBlur={this.pswBlur}
								onChange={this.pswChange}
							/>
						</div>
						<div className="self-line">
							<Button 
								style={{width: '100%'}} 
								disabled={(isNameFirst || isPswFirst || isCodeFirst) ? true : (isNameError || !checkPassword(password) || isCodeError)}
								type="primary" loading={confirmLoading} 
								onClick={this.handleOk} 
							>重置密码</Button>
						</div>
						
						
	        </div>
	      	
	      </Modal>
    	</Fragment>
	  );
	}
}


export default RestPsw;
