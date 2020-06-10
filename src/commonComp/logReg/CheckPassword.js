import React, { Component, Fragment } from 'react';
import { Input, Popover } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons'
import { pswTipText } from '@/common/constant'

function getPswErr (psw='') {
	return pswTipText.map(it => it.isok(psw))
}

class CheckPassword extends Component {
	
	state = {
		// password: '',
		pswok: getPswErr()
	}

	pswChange = e => {
		const password = e.target.value
		const pswok = getPswErr(password)
		this.setState({
			// password,
			pswok,
			
		})
		this.props.onChange(e)
		// this.props.checkTipShow(false)
		// this.props.checkPswIsOk(this.getPswIsOk(pswok))
		
	}
	getPswIsOk (pswok) {
		return pswok.reduce((a, pr) => a && pr, true)
	}
	pswBlur = (e) => {
		this.props.onBlur(e)
		// console.log(e)
		// const { pswok } = this.state;
		
		// this.props.checkPswIsOk(this.getPswIsOk(pswok))
	}
	render() {
    // const { password } = this.state;
    const { pswok } = this.state;
    const { pswErrorTipShow, password, text } = this.props;
		const isIgnorPsw = password.length === 0;
		const pswTipContent = (
			<ul className="password-tip">
				{
					pswTipText.map((it, index) => {
						const isok = pswok[index]
						return <li key={index} className={isok || isIgnorPsw ? '' : 'error'}>{ !isIgnorPsw && (isok ? <CheckOutlined/> : <CloseOutlined/>)} {it.tip}</li>
					})
				}
			</ul>
    )
    return (
    	<Fragment>
    		<Popover placement="topLeft" content={pswTipContent} trigger="focus">
					<label>{text || '密码'}</label>
					<Input.Password 
						className={(this.getPswIsOk(pswok) || isIgnorPsw) && !pswErrorTipShow ? '' : 'error'} 
						// type="password" 
						onBlur={this.pswBlur}
						placeholder="请设置登录密码" 
						onChange={this.pswChange} 
						value={password} 
					/>
				</Popover>
				{
					pswErrorTipShow && <p className="error-tip">密码设置不符合要求</p>
				}
    	</Fragment>
	  );
	}
}


export default CheckPassword;
