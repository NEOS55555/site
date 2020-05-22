import React, {Component} from 'react';
// import { Modal, Button } from 'antd';

import ComContent from './ComContent'
// import Header from '@/commonComp/Header'
// import cookie from 'react-cookies'
// import { withRouter } from "react-router";

class SystemComp extends Component {

	componentDidMount () {
		// console.log(this.props)
		console.log('SystemComp componentDidMount')
	}


	render () {
		// console.log(this.props.location)
		// const {user_name} = this.state;
	  return (
	  	<ComContent isSystem={true} />
		  	
	  )
	}
}

export default SystemComp;
// export default withRouter(SystemComp);
