import React, { Component, Fragment } from 'react';
import RightNav from './RightNav'
import StatusNav from './StatusNav'
import Top10Site from './Top10Site'
import NewestCommit from './NewestCommit'
import AccountNav from './AccountNav'
import CollectRightNav from './CollectRightNav'
import Notice from './Notice'
// import {connect} from 'react-redux'
// import { Input } from 'antd';
// import { withRouter } from "react-router";
// import { connect } from 'react-redux'
// import { updateSiteMngData } from '@/store/actions'


import './RightComp.scss';

class RightComp extends Component {
  /*componentDidMount () {
    // console.log(this.props)
    console.log('RightComp did mount')
  }*/
  // 搜索框
  /*onSearch = value => {
    const { location, history, isSystem, match: { params: { catalog=0 } } } = this.props;
  
    history.push((isSystem ? '/system' : '') + '/' + catalog +'/'+value)
  }*/

  render () {
		const { isSystem, isAccount, isCollect/*, match: { params: { search='' } }*/ } = this.props
  	// const { visible, confirmLoading } = this.state;
  	// console.log(current)
  	return (
			<div className="right-content">
        <Notice />
        {
          isAccount 
          ? <AccountNav />
          : (
            <Fragment>
              {/*<Input.Search className="search-btn" placeholder="请输入关键词" defaultValue={search} onSearch={this.onSearch} enterButton />*/}
              {
                isSystem ? <StatusNav /> : <Top10Site />
              }
              {
                isCollect ? <CollectRightNav /> : <RightNav isSystem={isSystem} />
              }
              
              <NewestCommit />
            </Fragment>
          )

        }
			</div>
	  )
  }
}
/*const mapStateToProps = state => {
  const { catalogListSite } = state.siteMng
  // const total = catalogListSite.reduce((a, p) => a + p.total, 0)
  return {
    catalogListSite: [{_id: 0, name: '全部'} ,...catalogListSite],
  };
};*/

/*const mapStateToProps = state => {
  const { search } = state.siteMng
  return {
    search
  };
};


const mapDispatchToProps = dispatch => {
  return {
    updateSiteMngData (data) {
      return dispatch(updateSiteMngData(data))
    },
  };
};*/
// export default withRouter(RightComp);
export default RightComp;
