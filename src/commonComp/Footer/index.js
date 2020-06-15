import React, { Component, Fragment } from 'react';
import './Footer.scss'

class Footer extends Component {

	render() {
    const year = new Date().getFullYear();
    return (
      <div className="footer">
        <div className="max-container">
          ©{year} ∵
        </div>
        
      </div>
	  );
	}
}


export default Footer;
