import React, {Component} from 'react';
// import { Modal, Button } from 'antd';

import ComContent from './ComContent'
// import cookie from 'react-cookies'
import { withRouter } from "react-router";

class SystemComp extends Component {

	componentDidMount () {
		console.log(this.props)
		console.log('SystemComp componentDidMount')
	}


	render () {
		console.log(this.props.location)
		// const {user_name} = this.state;
	  return (
	  	<div>
		  	<ComContent isSystem={true} />
		  	
	  	</div>
	  )
	}
}

// export default SystemComp;
export default withRouter(SystemComp);
