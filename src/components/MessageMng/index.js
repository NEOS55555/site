import React, { Component } from 'react';
import { getReplyMeList, clearreplynum, setReplyNum, setUsername } from '@/store/actions'
import { withRouter } from "react-router";
import { Pagination } from 'antd'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { FEEDBACK_SITEID, LOG_OVERDUE_CODE } from '@/common/constant'
import './MessageMng.scss'


class MessageMng extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      total: 0,
      pageIndex: 1,
    }
  }
  
  componentDidMount () {
    this.getReplyMeList({pageIndex: 1, isTotal: true})
    clearreplynum().then(res => this.props.setReplyNum(0))
  }
  getReplyMeList = (params) => {
    const { setUsername, history } = this.props;

    getReplyMeList(params).then(res => {
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
      if (res.resultCode === LOG_OVERDUE_CODE) {
        setUsername('')
        history.replace('/')
      }
    })
  }
  onChange = (pageIndex) => {
    this.getReplyMeList({pageIndex})
    this.setState({pageIndex})
  }
	render() {
    // const { siteId } = this.props.match.params
    const { list, total, pageIndex } = this.state;

    return (
      <div className="message-wrapper main-content">
        <div className="message-container">
          <div className="message-list">
            <ul>
              {
                list.map(it => {
                  const isFeedback = it.site_id === FEEDBACK_SITEID;

                  const linkurl = isFeedback ? '/feedback' : '/sitedetail/' + it.site_id

                  return <li key={it._id}>
                    <div className="rich-left">
                      <Link to={linkurl} className="rich-ctn" >
                        <div className="message-user" >{it.user_name}：</div>
                        <div className="message-content" dangerouslySetInnerHTML={{__html: it.content}} ></div>
                      </Link>
                      <div className="resp-subject">
                        回复我的页面：<Link to={linkurl} >{isFeedback ? '用户反馈' : it.site_name}</Link>
                      </div>
                    </div>
                    <div className="rich-right">
                      <span className="time">{it.create_time}</span>
                    </div>
                  </li>
                })
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
	  );
	}
}


const mapDispatchToProps = dispatch => {
  return {
    setReplyNum (num) {
      return dispatch(setReplyNum(num))
    },
    setUsername (name) {
      return dispatch(setUsername(name))
    },
  };
};

export default withRouter(connect(null, mapDispatchToProps)(MessageMng));

