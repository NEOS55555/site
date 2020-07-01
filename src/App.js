import React, { Component } from 'react';
import {connect} from 'react-redux'
import '@/assets/css/default.scss'
import 'antd/dist/antd.css';
import 'cropperjs/dist/cropper.css';
import 'braft-editor/dist/index.css'
import './App.scss';
import './media.scss';

import { getIP, updateComData } from '@/store/actions'
import Routers from '@/common/Routers'




class App extends Component {
	state = {
		isShow: false
	}

	componentDidMount () {
		getIP().then(({result}) => {
			const { is_async, check_reply_num } = result;
			// console.log(is_async)
			this.props.updateComDate({is_async: !!is_async, check_reply_num})
			this.setState({
				isShow: true
			})
		})
	}

	render () {
		const { isShow } = this.state;
	  return (
	  	isShow && <Routers />
	  );
	}
}


const mapDispatchToProps = dispatch => {
  return {
  	updateComDate (data) {
      return dispatch(updateComData(data))
    },
  
  };
};
export default connect(null, mapDispatchToProps)(App);
