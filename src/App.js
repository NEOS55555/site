import React, { Fragment } from 'react';
import ComContent from './components/SystemComp/ComContent'
import SystemComp from './components/SystemComp/SystemComp'
// import UploadImage from './commonComp/UploadImage'
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import store from '@/store/reducer'
import { getIP } from '@/store/actions'
// import cookie from 'react-cookies'
import Header from '@/commonComp/Header'
import Background from '@/commonComp/Background'

import './App.scss';
import 'antd/dist/antd.css';

class App extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			isShow: false
		}
	}
	componentDidMount () {
		getIP().then(ip => {
			// cookie.save('user_ip', ip)
			this.setState({
				isShow: true
			})
		})
	}

	render () {
	  return (
	  	<Provider store={store}>
		  	{
		  		this.state.isShow &&
				  	<Router>
  						<Background />
	  					<Header />
				    	<Switch>
				        <Route exact path="/system">
									<SystemComp />
				        </Route>
				        <Route path="*">
				          <ComContent />
				          {/*<UploadImage />*/}
				        </Route>
				      </Switch>
				    </Router>
		    }
	  	</Provider>
	  );
	}
}

export default App;
