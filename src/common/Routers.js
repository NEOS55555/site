import React, { Fragment, Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import Portrait from '@/components/AccountSetting/Portrait'
// import cookie from 'react-cookies'
import backgrond from '@/commonComp/Background'
import Header from '@/commonComp/Header'
import Footer from '@/commonComp/Footer'
import RightComp from '@/commonComp/RightComp'
import ComContent from '@/components/ComContent'
import SiteDetail from '@/components/SiteDetail'
import MessageMng from '@/components/MessageMng'
import CatalogMng from '@/components/CatalogMng'
import Feedback from '@/components/Feedback'
import MyCollections from '@/components/MyCollections'

const AccountNavRoute = [
	{
		path: '/account/portrait',
		name: '头像修改',
		exact: true,
		content: <Fragment><Portrait /><RightComp isAccount={true} /></Fragment>
	}
]


class Routers extends Component {

	// 这么做的目的是，不使Header和Rightnav多次加载执行didmount
	/*getContainer (jsx) {
		return (
			<Fragment>
				<div className="container main-content-wrapper">
					{jsx}
				</div>
			</Fragment>
		)
	}*/

	render () {
	  return (
	  	<Router>
				<Header />
				<div className="container main-content-wrapper">
		    	<Switch>
		    		<Route exact path="/catalogmng">
							<CatalogMng/>
		        </Route>
		    		{/*<Route exact path="/collect/:catalog/:search">
		    			<MyCollections />
							<RightComp isCollect />
		        </Route>*/}
		    		<Route exact path="/collect/:catalog">
		    			<MyCollections />
							<RightComp isCollect />
		        </Route>
		    		<Route exact path="/collect">
		    			<MyCollections />
							<RightComp isCollect />
		        </Route>
		    		<Route exact path="/feedback">
							<Feedback/>
							<RightComp />
		        </Route>
		        {
		        	/*AccountNavRoute.map((it, index) => 
								<Route key={index} exact={it.exact} path={it.path}>
									{it.content}
				        </Route>
		        	)*/
		        }
		        <Route exact path="/account/portrait">
							<Portrait />
							<RightComp isAccount />
		        </Route>
		        <Route exact path="/tag/:tagName">
							<ComContent />
							<RightComp />
		        </Route>
		        <Route exact path="/sitedetail/:siteId">
							<SiteDetail />
							<RightComp />
		        </Route>
		    		<Route exact path="/replyme">
							<MessageMng />
							<RightComp />
		        </Route>
		        <Route exact path="/system/:catalog/:search">
							<ComContent isSystem />
							<RightComp isSystem />
		        </Route>
		        <Route exact path="/system/:catalog">
							<ComContent isSystem />
							<RightComp isSystem />
		        </Route>
		        <Route exact path="/system">
							<ComContent isSystem />
							<RightComp isSystem />
		        </Route>
		        <Route exact path="/:catalog/:search">
							<ComContent />
							<RightComp />
		        </Route>
		        <Route exact path="/:catalog">
							<ComContent />
							<RightComp />
		        </Route>
		        <Route exact path="/">
							<ComContent />
							<RightComp />
		        </Route>
		        
		        
		        
		        <Route path="*">
		          404
		        </Route>
		      </Switch>
				</div>
				<Footer />
	    </Router>
	  );
	}
}



export default Routers;
export { AccountNavRoute }