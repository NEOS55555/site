import React, {Component} from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom";
import { AccountNavRoute } from '@/common/Routers'



class AccountNav extends Component {
	
	render () {
		// const { catalogList, match } = this.props;
		// console.log(match.params.catalog)
		return (
      <div className="nav-list">
  			<Menu
          // mode="inline"
          // theme="dark"
          // selectedKeys={[match.params.catalog]}
          // onOpenChange={this.onOpenChange}
          // onSelect={onSelect}
          // style={{ width: 256 }}
        >
        	{
        		AccountNavRoute.map(({path, name}, index) => <Menu.Item key={index}><Link to={path} >{name}</Link></Menu.Item>)
        	}
          
        </Menu>
      </div>
		)
	}
}

export default AccountNav;
