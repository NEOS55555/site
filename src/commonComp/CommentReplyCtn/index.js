import React, { Component, Fragment } from 'react';
import { Button, Pagination } from 'antd';
import './CommentReplyCtn.scss'
import CommentItem from '../CommentItem'
import { replyCommit, getReplyCommit, setUsername } from '@/store/actions'
import { MAX_COMMIT_LEN } from '@/common/constant'
import { connect } from 'react-redux'

// 把UPDATE_DATA 修改一下 改成函数，不要到处写
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import BraftEditorMax from '@/commonComp/BraftEditorMax'

class CommentReplyCtn extends Component {
  constructor (props) {
    super(props)
    const { reply_arr=[], reply_total=0 } = props.commitData;
    this.state = {
      confirmLoading: false,
      commitContent: BraftEditor.createEditorState(''),
      pageIndex: 1,  
      replyList: reply_arr,
      replyTotal: reply_total,
      to_user_id: null,
      to_user_name: null,
      isShowReply: false,
      isCheckReply: reply_total > 0
    }
  }
  
  handleDescChange = commitContent => {
    this.setState({commitContent})
  }
  

  onChange = (pageIndex) => {
    const { _id: commit_id, site_id } = this.props.commitData;
    getReplyCommit({pageIndex, commit_id, site_id}).then(res => {
      this.setState({
        replyList: res.result.list,
        pageIndex
      })
    })
  }

  replyToCommit = () => {
    const { user_id } = this.props.commitData;
    this.setState({
      isShowReply: true, 
      commitContent: ContentUtils.clear(this.state.commitContent),
      to_user_id: user_id,
      to_user_name: null
    })
  }
  replyToUser = (item) => {
    const { user_id, user_name } = item;
    this.setState({
      isShowReply: true, 
      commitContent: ContentUtils.insertText(ContentUtils.clear(this.state.commitContent), `回复 ${user_name}：`), 
      to_user_id: user_id,
      to_user_name: user_name
    })
  }
  report = () => {
    const { _id: commit_id, site_id } = this.props.commitData;
    const { commitContent, replyList, to_user_id, to_user_name, replyTotal } = this.state;
    this.setState({confirmLoading: true})
    // console.log(to_user_id)
    if (commitContent.isEmpty()) {
      return;
    }
    // console.log(commitContent)
    // return;
    replyCommit({
      commit_id,
      site_id,
      content: commitContent.toText().replace(`回复 ${to_user_name}：`, ''),
      is_to_commit: !to_user_name,
      to_user_id,
      // to_user_name
    }).then(res => {
      this.setState({
        commitContent: ContentUtils.clear(this.state.commitContent),
        replyList: [...replyList, res.result],
        replyTotal: replyTotal + 1,
        confirmLoading: false
      })
    }).catch(res => this.setState({ confirmLoading: false }))
  }
  collspaeClick = () => {
    const { isCheckReply, to_user_name } = this.state;
    const { user_id } = this.props.commitData;
    if (!isCheckReply) {
      this.setState({
        isShowReply: true
      })
      if (!to_user_name) {

        this.setState({
          to_user_id: user_id,
          to_user_name: null
        })
      }
    }
    this.setState({
      isCheckReply: !isCheckReply
    })
  }
  render() {
    const { commitContent, confirmLoading, pageIndex, replyList, replyTotal=0, isShowReply, isCheckReply } = this.state;
    const { user_name } = this.props;
    const totalStr = replyTotal === 0 ? '' : `(${replyTotal})`
    return (
      <Fragment>
        <div className="align-right" ><span className="collspae-btn" onClick={this.collspaeClick} >{!isCheckReply ? `回复`+totalStr : '收起回复'}</span></div>
        <div className="reply-comment-container" style={{display: isCheckReply ? 'block': 'none' }} >
          {
            replyList.length > 0 && 
            <div className="comment-container">
              <div className="comment-list">
                {
                  replyList.map(it => {
                    if (it.is_to_commit) {
                      it.to_user_name = '';
                    }

                    return <CommentItem key={it._id} data={it} >
                      <div>
                        <span className="link-btn" onClick={() => {this.replyToUser(it)}} >回复</span>
                      </div>
                    </CommentItem>
                  })
                }
                <Pagination 
                  hideOnSinglePage={true}
                  total={replyTotal} current={pageIndex} pageSize={10}
                  showQuickJumper 
                  size="small" 
                  onChange={this.onChange} 
                />
              </div>

            </div>
          }
          {
            replyList.length > 0 && <div className="reply-btn-line"><span className="link-btn" onClick={this.replyToCommit} >我也说一句</span></div>
          }
          <div className="reply-ctn">
            {
              !!user_name 
                ? <div className={'reply-edit-container ' + (isShowReply ? '' : 'hidden')}>
                    <BraftEditorMax 
                      controls={['emoji']}
                      className="normal-edit"
                      value={commitContent} 
                      maxLen={MAX_COMMIT_LEN} 
                      onChange={this.handleDescChange} 
                    />
                    
                    <Button type="primary" className="reply-btn" loading={confirmLoading} onClick={this.report} >发表</Button>
                  </div>
                : <span className="bofore-commit-tip">请登录后，再回复。</span>
            }
          </div>
        
          
        </div>
      </Fragment>
         
    );
  }
}


const mapStateToProps = state => {
  const { user_name } = state.com
  return {
    user_name
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setUsername (name) {
      return dispatch(setUsername(name))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentReplyCtn);