import React from 'react';
import {connect} from 'react-redux'
import '@/assets/css/default.scss'
import 'antd/dist/antd.css';
import 'braft-editor/dist/index.css'
import './App.scss';
// import ComContent from './components/SystemComp/ComContent'
import SystemComp from './components/SystemComp'
import NormalComp from './components/NormalComp'
import SiteDetail from './components/SiteDetail'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import { getIP, UPDATE_COM_DATA } from '@/store/actions'
// import cookie from 'react-cookies'
import backgrond from '@/commonComp/Background'
import Header from '@/commonComp/Header'



class App extends React.Component {
	state = {
		isShow: false
	}
	componentDidMount () {
		getIP().then(({result}) => {
			const { is_async } = result;
			// console.log(is_async)
			this.props.updateDate({is_async: !!is_async})
			this.setState({
				isShow: true
			})
		})
	}

	render () {
		const { isShow } = this.state;
	  return (
	  	isShow && (
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
		        <Route exact path="/sitedetail/:siteId">
							<Header />
		          <SiteDetail />
		        </Route>
		        <Route path="*">
							<Header />
		          404
		          {/*<UploadImage />*/}
		        </Route>
		      </Switch>
		    </Router>
  		)
	  );
	}
}


const mapDispatchToProps = dispatch => {
  return {
  	updateDate (data) {
      return dispatch({type: UPDATE_COM_DATA, data})
    },
  
  };
};
export default connect(null, mapDispatchToProps)(App);
