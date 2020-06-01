import React, {Component} from 'react';
import './RightNav.scss'
import {connect} from 'react-redux'
import { Menu } from 'antd';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { isSystemPage } from '@/common/common'
// import { getCatalogList } from '@/store/actions'

// const { SubMenu } = Menu;

class RightNav extends Component {
	/*constructor (props) {
		super(props);
		this.state = {
			keys: props.defaultSelectedKeys
		}
	}
	componentDidMount () {
		this.props.getCatalogList();
	}*/
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
	render () {
		const { catalogList, match } = this.props;
		// console.log(match.params.catalog)
		return (
      <div className="nav-list catalog-nav">
        <div className="title">分类</div>
  			<Menu
          // mode="inline"
          // theme="dark"
          selectedKeys={[match.params.catalog || '0']}
          // onOpenChange={this.onOpenChange}
          // onSelect={onSelect}
          style={{ width: 256 }}
        >
        	{
        		catalogList.map(({_id, name}) => <Menu.Item key={_id}><Link to={(isSystemPage(match) ? '/system' : '') + '/' + _id} >{name}</Link></Menu.Item>)
        	}
          
        </Menu>
      </div>
		)
	}
}
const mapStateToProps = state => {
	const {catalogList} = state.siteMng
  return {
  	catalogList: [{_id: 0, name: '全部'} ,...catalogList],
  };
};


/*const mapDispatchToProps = dispatch => {
  return {
  	getCatalogList (params) {
			return dispatch(getCatalogList(params))
  	},
  };
};*/
export default withRouter(connect(mapStateToProps, null)(RightNav));
