import React, { Component } from 'react';
import { getReplyMeList, clearreplynum, setReplyNum } from '@/store/actions'
import { Pagination } from 'antd'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
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
                list.map(it => 
                  <li key={it._id}>
                    <div className="rich-left">
                      <Link to={'/sitedetail/' + it.site_id} className="rich-ctn" >
                        <div className="message-user" >{it.user_name}：</div>
                        <div className="message-content" dangerouslySetInnerHTML={{__html: it.content}} ></div>
                      </Link>
                      <div className="resp-subject">
                        回复我的页面：<Link to={'/sitedetail/' + it.site_id} >{it.site_name}</Link>
                      </div>
                    </div>
                    <div className="rich-right">
                      <span className="time">{it.create_time}</span>
                    </div>
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
	  );
	}
}


const mapDispatchToProps = dispatch => {
  return {
    setReplyNum (num) {
      return dispatch(setReplyNum(num))
    },
  };
};
export default connect(null, mapDispatchToProps)(MessageMng);

