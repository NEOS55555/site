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
import RightComp from '@/commonComp/RightComp'
import ComContent from '@/components/ComContent'
import SiteDetail from '@/components/SiteDetail'
import MessageMng from '@/components/MessageMng'
import CatalogMng from '@/components/CatalogMng'

const AccountNavRoute = [
	{
		path: '/account/portrait',
		name: '头像修改',
		exact: true,
		// content: <Fragment><Portrait /><RightComp isAccount={true} /></Fragment>
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
		        {
		        	AccountNavRoute.map((it, index) => 
								<Route key={index} exact={it.exact} path={it.path}>
									<Portrait />
									<RightComp isAccount={true} />
				        </Route>
		        	)
		        }
		        {/*<Route exact path="/account/portrait">
							<Fragment><Portrait /><RightComp isAccount={true} /></Fragment>
		        </Route>*/}
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
							<ComContent isSystem={true} />
							<RightComp isSystem={true} />
		        </Route>
		        <Route exact path="/system/:catalog">
							<ComContent isSystem={true} />
							<RightComp isSystem={true} />
		        </Route>
		        <Route exact path="/system">
							<ComContent isSystem={true} />
							<RightComp isSystem={true} />
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
	    </Router>
	  );
	}
}



export default Routers;
export { AccountNavRoute }