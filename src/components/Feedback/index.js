import React, { Component } from 'react';
// import { getSiteDetail, addView } from '@/store/actions'
import './Feedback.scss'
import CommentCtn from '@/commonComp/CommentCtn'
import { FEEDBACK_SITEID } from '@/common/constant'
// import RecomdList from './RecomdList'

class Feedback extends Component {
 
	render() {
    return (
      <div className="feedback-wrapper main-content">
        <div className="title">大家都在聊什么？</div>
        <CommentCtn siteId={FEEDBACK_SITEID} />
      </div>
	  );
	}
}


export default Feedback;
