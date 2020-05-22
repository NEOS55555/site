import React, {Component} from 'react';
import { Modal } from 'antd';
import ReactDOM from 'react-dom';

class Dialog extends Component {
	state = {
		confirmLoading: false,
		visible: false,
		title: '',
		content: '',
	}
	open = (config={}) => {
		this.setState({
			visible: true,
			...config,
		})
	}
	showLoading = () => {
		this.setState({
			confirmLoading: true,
		})
	}
	hideLoading = () => {
		this.setState({
			confirmLoading: false,
		})
	}
	close = () => {
		this.setState({
			confirmLoading: false,
			visible: false,
			footer: undefined,
		})
	}
	render () {
		const {content} = this.state;
		return (
			<Modal
				{...this.state}
			  // title={title}
			  // footer={footer}
			  maskClosable={false}
			  // visible={visible}
			  // onOk={onOk}
			  // confirmLoading={confirmLoading}
			  okText="确定"
				cancelText="取消"
			  onCancel={this.close}
			>
			  <p>{content}</p>
			</Modal>
		)
	}

}

let div = document.createElement('div');
let props = {
   
};
document.body.appendChild(div);
 
let Box = ReactDOM.render(React.createElement(
    Dialog,
    props
),div);
 
export default Box;