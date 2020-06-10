import React, { Component } from 'react';
// import blackhole from '@/assets/images/black-hole.png'
import './Empty.scss'

class Empty extends Component {
  
	render() {
    return (
    	<div className="no-data">
    		{/*<img src={blackhole} alt="暂无数据"/>*/}
    		<span>暂无数据</span>
    	</div>
	  );
	}
}


export default Empty;
