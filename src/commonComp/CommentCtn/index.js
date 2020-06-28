import React, { Component, Fragment } from 'react';
import { Button, Pagination } from 'antd';
import { reportCommit, getReportCommit, setUsername } from '@/store/actions'
import './CommentCtn.scss'
import CommentItem from '../CommentItem'
import CommentReplyCtn from '../CommentReplyCtn'
import { connect } from 'react-redux'
import { MAX_COMMIT_LEN } from '@/common/constant'
// 把UPDATE_DATA 修改一下 改成函数，不要到处写
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import BraftEditorMax from '@/commonComp/BraftEditorMax'
// import { Modifier } from 'draft-js'

class CommentCtn extends Component {
  constructor (props) {
    super(props)
    this.state = {
      confirmLoading: false,
      commitContent: BraftEditor.createEditorState(''),
      commitList: [],
      total: 0,
      pageIndex: 1,

    }
  }
  getReportCommit = (params={}) => {
    window.scrollTo(0, 0)
    const { siteId } = this.props
    const { pageIndex } = this.state;
    const { isTotal } = params;
    getReportCommit({site_id: siteId, pageIndex, ...params}).then(({result}) => {
      this.setState({
        commitList: result.list || [],
      })
      if (isTotal) {
        this.setState({
          total: result.total
        })
      }
    })
  }
  componentDidUpdate (prevProps) {
    const { siteId: prevsiteId } = prevProps
    const { siteId: cursiteId } = this.props
    // console.log(prevParams, curParams)
    if (prevsiteId !== cursiteId) {
      // this.handleOk();
      this.getReportCommit({isTotal: true});
      // this.getSite$Add()
    }
  }
  componentDidMount () {
    this.getReportCommit({isTotal: true});
  }
  handleDescChange = commitContent => {
    this.setState({commitContent})
  }
  report = () => {
    const { commitContent, commitList } = this.state;
    const { siteId } = this.props
    if (commitContent.isEmpty()) {
      return;
    }
    this.setState({confirmLoading: true})
    reportCommit({site_id: siteId, content: commitContent.toText()}).then(res => {
      this.setState({
        commitContent: ContentUtils.clear(this.state.commitContent),
        commitList: [...commitList, res.result],
        confirmLoading: false
      })
    }).catch(() => this.setState({ confirmLoading: false }))
    // console.log(siteId)
  }

  onChange = (pageIndex) => {
    this.setState({pageIndex}, () => {
      this.getReportCommit();
    })
  }

  render() {
    const { commitContent, confirmLoading, commitList, total, pageIndex } = this.state;
    const { user_name } = this.props;
    return (
      <Fragment>
        <div className="comment-container">
          {
            commitList.length > 0 
            ? <div className="comment-list">
              {
                commitList.map(it => 
                  <CommentItem key={it._id} data={it}>
                    <CommentReplyCtn commitData={it} />
                  </CommentItem>)
              }
              <Pagination 
                total={total} current={pageIndex} pageSize={10}
                showQuickJumper 
                size="small" 
                // showSizeChanger  
                onChange={this.onChange} 
                // pageSizeOptions={['5', '10', '15']}
                // onShowSizeChange={onShowSizeChange} 
                // showTotal={total => `共 ${total} 条数据`} 
              />
            </div>
            : <div className="no-commit">好惨，都没人评论。。。</div>
          }
        </div>
        <div className="reply-ctn">
          {
            !!user_name 
              ? <div className="reply-edit-container">
                  <BraftEditorMax 
                    controls={['emoji']}
                    className="normal-edit"
                    value={commitContent} 
                    maxLen={MAX_COMMIT_LEN} 
                    onChange={this.handleDescChange} 
                  />
                  <Button type="primary" className="reply-btn" loading={confirmLoading} onClick={this.report} >发表</Button>
                </div>
              : <span className="bofore-commit-tip">请登录后，再评论。</span>
          }
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

export default connect(mapStateToProps, mapDispatchToProps)(CommentCtn);
