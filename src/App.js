import React from 'react';
import '@/assets/css/default.scss'
import 'antd/dist/antd.css';
import './App.scss';
// import ComContent from './components/SystemComp/ComContent'
import SystemComp from './components/SystemComp'
import NormalComp from './components/NormalComp'
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
import backgrond from '@/commonComp/Background'
import Header from '@/commonComp/Header'



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
			    	<Switch>
			        <Route exact path="/system/:catalog">
	  						<Header />
								<SystemComp />
			        </Route>
			        <Route exact path="/system">
	  						<Header />
								<SystemComp />
			        </Route>
			        <Route exact path="/:catalog">
	  						<Header />
			          <NormalComp />
			        </Route>
			        <Route exact path="/">
	  						<Header />
			          <NormalComp />
			          {/*<UploadImage />*/}
			        </Route>
			        <Route exact path="/tag/:tagName">
	  						<Header />
			          <NormalComp />
			        </Route>
			        <Route path="*">
	  						<Header />
			          404
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
