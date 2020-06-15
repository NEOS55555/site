import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Menu } from 'antd';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
// import { isSystemPage } from '@/common/common'
import { getCatalogList } from '@/store/actions'

// const { SubMenu } = Menu;

class CollectRightNav extends Component {
	constructor (props) {
		super(props);
		this.state = {
			list: []
		}
	}
	componentDidMount () {
    console.log('abcdefg')
    getCatalogList({type: 'collect'}).then(res => {
      const { list } = res.result
      this.setState({ list: [{_id: 0, name: '全部'}, ...list] })
    })
		 
	}
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
		const { list } = this.state;
		// console.log(match.params.catalog)
    // const isSystem = isSystemPage(match)
		return (
      <div className="nav-list catalog-nav">
        <div className="title">收藏分类</div>
  			<Menu
          // mode="inline"
          // theme="dark"
          selectedKeys={['catalog']}
          // onOpenChange={this.onOpenChange}
          // onSelect={onSelect}
          style={{ width: 256 }}
        >
        	{
        		list.map(({_id, name, total}) => 
              <Menu.Item key={_id}>
                <Link to={'/collect/'+_id}>{name} { total ? `(${total})` : ''}</Link>
              </Menu.Item>
            )
        	}
          
        </Menu>
      </div>
		)
	}
}


/*const mapDispatchToProps = dispatch => {
  return {
  	updateSiteMngData (data) {
			return dispatch(updateSiteMngData(data))
  	},
  };
};*/
export default withRouter(CollectRightNav);
