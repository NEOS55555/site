import React, { Component, Fragment } from 'react';
import { getNoticeList, editNotice } from '@/store/actions'
import { EditOutlined } from '@ant-design/icons'
import DelIcon from './Icons/DelIcon'
// import { withRouter } from "react-router";
import { Pagination, Modal, message } from 'antd'
import AddNotice from './AddNotice'
// import { trim } from '@/common/common'
// import { Link } from "react-router-dom";
// import { connect } from 'react-redux'
import './index.scss'
import eventBus from '@/common/eventBus'

import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import BraftEditorMax from '@/commonComp/BraftEditorMax'
import { MAX_COMMIT_LEN } from '@/common/constant'


class NoticeMng extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      total: 0,
      pageIndex: 1,

      visible: false,
      confirmLoading: false,
      currentData: {},
      content: BraftEditor.createEditorState(''),
    }
  }
  
  componentDidMount () {
    this.getNoticeList({pageIndex: 1, isTotal: 1})
  }
  getNoticeList = (params) => {

    getNoticeList(params).then(res => {
      const { list, total } = res.result
      this.setState({
        list
      })
      if (params.isTotal) {
        this.setState({
          total
        })
      }
    }).catch(res => {
      eventBus.emit('logout#toHome', res)
    })
  }
  onChange = (pageIndex) => {
    this.getReplyMeList({pageIndex})
    this.setState({pageIndex})
  }

  showModal = (currentData) => {
    const { content } = this.state;
    this.setState({
      visible: true,
      currentData,
      content: ContentUtils.insertText(ContentUtils.clear(content), currentData.content)
    });
  };
  handleEditCancel = () => {
    this.setState({
      visible: false,
    });
  };
  handleEditOk = () => {
    const { currentData: {_id, commit_id}, content, pageIndex } = this.state;
    if (content.isEmpty()) {
      return message.error('内容不能为空')
    }
    this.setState({ confirmLoading: true })
    editNotice({ _id, commit_id, content: content.toText() }).then(res => {
      message.success('编辑成功')
      this.getNoticeList({pageIndex})
      this.setState({ visible: false, confirmLoading: false })
    }).catch(() => this.setState({ confirmLoading: false }))
  }

  contentChange = content => {
    this.setState({
      content
    })
  }



	render() {
    // const { siteId } = this.props.match.params
    const { list, total, pageIndex, visible, confirmLoading, content } = this.state;

    return (
      <Fragment>
        <div className="notice-wrapper max-container">
          <div className="notice-container">
            <AddNotice handleOk={() => this.getNoticeList({pageIndex, isTotal: 1})} />
            <div className="notice-list">
              <ul>
                {
                  list.map(it => 
                    <li key={it._id}>
                      <div className="time">
                        {it.create_time} 
                        <div className="icons">
                          <EditOutlined className="icon" onClick={() => this.showModal(it)} />
                          <DelIcon data={it} handleOk={() => this.getNoticeList({pageIndex})} />
                        </div>
                      </div>
                      <div>{it.content}</div>
                    </li>
                  )
                }
              </ul>
            </div>
            <Pagination 
              total={total} current={pageIndex} pageSize={10}
              showQuickJumper 
              size="small" 
              onChange={this.onChange} 
            />
          </div>
        </div>
        <Modal
          width={700}
          title="编辑公告"
          visible={visible}
          maskClosable={false}
          onOk={this.handleEditOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleEditCancel}
          okText="提交"
          cancelText="取消"
        >
          <div className="self-wrapper">
            <div className="self-line must">
              <BraftEditorMax 
                controls={['emoji']}
                className="normal-edit"
                value={content} 
                maxLen={MAX_COMMIT_LEN} 
                onChange={this.contentChange} 
              />
            </div>
          </div>
          
        </Modal>
      </Fragment>
	  );
	}
}




export default NoticeMng;

