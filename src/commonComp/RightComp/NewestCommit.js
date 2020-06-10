import React, { Component } from 'react';
import { getNewestCommit } from '@/store/actions'
import CommentItem from '@/commonComp/CommentItem'
// import './NewestCommit.scss'

class NewestCommit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      commitList: [],
    }
  }

  componentDidMount () {
    getNewestCommit().then(({result}) => this.setState({ commitList: result }))
  }
 

  

  render() {
    const { commitList } = this.state;
    return (
      <div className="newest-comment-wrapper comment-container nav-list">
        <h3 className="title">最新评论</h3>
        <div className="comment-list">
          {
            commitList.map(it => <CommentItem key={it._id} data={it} notOnlyShow={true} />)
          }
        </div>
      </div>
         
    );
  }
}



export default NewestCommit;
