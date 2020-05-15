import React, {Component} from 'react';
// import './RightNav.scss'
import {connect} from 'react-redux'
import { Menu } from 'antd';
import { getCatalogList } from '@/store/actions'

// const { SubMenu } = Menu;

class RightNav extends Component {
	constructor (props) {
		super(props);
		this.state = {
			keys: props.defaultSelectedKeys
		}
	}
	componentDidMount () {
		this.props.getCatalogList();
	}
	rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
  state = {
    openKeys: ['sub1'],
  };

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };
	render () {
		const { catalogList, onSelect } = this.props;
		// console.log(this.props.catalogList)
		return (
			<Menu
        mode="inline"
        theme="dark"
        defaultSelectedKeys={this.props.defaultSelectedKeys}
        onOpenChange={this.onOpenChange}
        onSelect={onSelect}
        style={{ width: 256 }}
      >
      	{
      		catalogList.map(it => <Menu.Item key={it._id}>{it.name}</Menu.Item>)
      	}
        
      </Menu>
		)
	}
}
const mapStateToProps = state => {
	const {catalogList} = state.siteMng
  return {
  	catalogList,
  };
};


const mapDispatchToProps = dispatch => {
  return {
  	getCatalogList (params) {
			return dispatch(getCatalogList(params))
  	},
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RightNav);
