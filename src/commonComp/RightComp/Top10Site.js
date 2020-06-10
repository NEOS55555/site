import React, {Component} from 'react';
import {connect} from 'react-redux'
// import { Menu } from 'antd';
import { Link } from "react-router-dom";
// import { getTop10SiteList } from '@/store/actions'
import { addView } from '@/store/actions'

// const { SubMenu } = Menu;

class Top10Site extends Component {
	/*constructor (props) {
		super(props);
		this.state = {
			keys: props.defaultSelectedKeys
		}
	}
	*/
	/*rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
  state = {
    openKeys: ['sub1'],
  };*/

  /*onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };*/
  /*componentDidMount () {
    console.log('Top10Site mounted')
  }*/
	render () {
		const { top10List } = this.props;
		return (
      <div className="top10-list nav-list">
        <div className="title">本月最热</div>
  			<ul
          // mode="inline"
          // theme="dark"
          // defaultSelectedKeys={this.props.defaultSelectedKeys}
          // onOpenChange={this.onOpenChange}
          // onSelect={onSelect}
          style={{ width: 256 }}
        >
        	{
        		top10List.map(({_id, name, url}) => 
              <li key={_id}>
                <Link className="underline" to={'/sitedetail/'+_id} onClick={() => addView({_id})}>{name}</Link>
              </li>)
        	}
          
        </ul>
      </div>
		)
	}
}
const mapStateToProps = state => {
	const { top10List } = state.siteMng
  return {
  	top10List,
  };
};


/*const mapDispatchToProps = dispatch => {
  return {
  	getTop10SiteList (params) {
			return dispatch(getTop10SiteList(params))
  	},
  };
};*/
export default connect(mapStateToProps, null)(Top10Site);
