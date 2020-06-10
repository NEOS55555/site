import React, { Component } from 'react';
// import { Input, Button } from 'antd';
import { withRouter } from "react-router";
import SiteItem from '@/commonComp/SiteItem'
import { getSiteDetail, addView } from '@/store/actions'
import './SiteDetail.scss'
import CommentCtn from '@/commonComp/CommentCtn'
import RecomdList from './RecomdList'

// import BraftEditor from 'braft-editor'

class SiteDetail extends Component {
  constructor (props) {
    super(props)
    // console.log(this.props)
    this.state = {
      siteData: {},
      // commitContent: BraftEditor.createEditorState(''),
    }
  }
  componentDidUpdate (prevProps) {
    const { params: prevParams } = prevProps.match
    const { params: curParams } = this.props.match
    // console.log(prevParams, curParams)
    if (prevParams.siteId !== curParams.siteId) {
      // this.handleOk();
      this.getSite$Add()
    }
  }
  componentDidMount () {
    this.getSite$Add()
  }
  getSite$Add = () => {
    const { siteId: t_id } = this.props.match.params
    const siteId = parseInt(t_id);
    addView({_id: siteId})
    // const { params } = match
    // console.log(siteId, this.props)
    getSiteDetail({site_id: siteId}).then(({result}) => this.setState({siteData: result}))
  }

	render() {
    const { siteId } = this.props.match.params
    const { siteData } = this.state;
    return (
      <div className="site-detail main-content site-wrapper">
        <div className="site-container">
          {
            !!siteData._id && 
            <SiteItem 
              isSystem={false} 
              onlyShow={true}
              data={siteData} 
            />
          }
          <RecomdList siteId={siteId} catalog={(siteData.catalog || []).join(',')} />
          <h3 className="title" style={{marginTop: 15}} >评论</h3>
          <CommentCtn siteId={siteId} />
        </div>
      </div>
	  );
	}
}


export default withRouter(SiteDetail);
