import React, { Component, Fragment } from 'react';
import { message, Modal, Button, Checkbox } from 'antd';
// import { trim } from '@/common/common'
// import './AddWebSite.scss';
import { addNotice } from '@/store/actions'
// import { connect } from 'react-redux'

import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import BraftEditorMax from '@/commonComp/BraftEditorMax'
import { MAX_COMMIT_LEN } from '@/common/constant'

class AddNotice extends Component {
	
	constructor (props) {
		super(props);
		this.state = {
			visible: false,
			confirmLoading: false,
			name: '',
			checked: false,
			content: BraftEditor.createEditorState(''),
		};
	}
	

	showModal = () => {
		this.setState({
		  visible: true,
		});
	};
	
	
	handleOk = () => {
		// const that = this;
		const { content, checked } = this.state;
		const { handleOk } = this.props;
		 if (content.isEmpty()) {
      return message.error('内容不能为空')
    }
		this.setState({ confirmLoading: true })
		addNotice({content: content.toText(), isToCommit: checked}).then(res => {
			message.success('新增成功!')
			this.setState({
      	content: ContentUtils.clear(content),
      	checked: false,
      	visible: false, 
      	confirmLoading: false, 
			})

			handleOk && handleOk();
		}).catch(res => {
			this.setState({ confirmLoading: false });
		})
		
	};

	handleCancel = () => {
		this.setState({
			visible: false,
		});
	};
	

	contentChange = content => {
		this.setState({
			content
		})
	}

	checkChange = e => this.setState({ checked: e.target.checked })
	
	
	render() {
	   const { visible, confirmLoading, content, checked } = this.state;
	    // console.log(selectOptions)
	   return (
			<Fragment>
	    	<Button type="primary" onClick={() => { this.showModal() }}>新增公告</Button>
	       
        <Modal
        	width={700}
					title="新增公告"
					visible={visible}
					maskClosable={false}
					onOk={this.handleOk}
					confirmLoading={confirmLoading}
					onCancel={this.handleCancel}
					okText="提交"
					cancelText="取消"
        >
	        <div className="self-wrapper">
						<div className="self-line must">
							<label>公告</label>
							<BraftEditorMax 
                controls={['emoji']}
                className="normal-edit"
                value={content} 
                maxLen={MAX_COMMIT_LEN} 
                onChange={this.contentChange} 
              />
						</div>
						<div >
							<Checkbox checked={checked} onChange={this.checkChange}>是否同步到用户反馈？ </Checkbox>
						</div>
	        </div>
        	
        </Modal>
			</Fragment>
	  );
	}
}

/*const mapStateToProps = state => {
	const { catalogList } = state.siteMng
  return {
  	catalogList: catalogList.slice(1),
  };
};*/


export default AddNotice;
