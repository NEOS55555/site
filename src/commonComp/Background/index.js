import React, { Component } from 'react';
import './bg.scss'
import ReactDOM from 'react-dom';

class Backgound extends Component {
  render () {
    return (
      <div className="solar-syst">
        <div className="star mercury"></div>
        <div className="star venus"></div>
        <div className="star earth"></div>
        <div className="star mars"></div>
        <div className="star jupiter"></div>
        <div className="star saturn"></div>
        <div className="star uranus"></div>
        <div className="star neptune"></div>
        <div className="star pluto"></div>
        <div className="star asteroids-belt"></div>
        <div className="star sun"></div>
        <div className="star solar-syst-bg"></div>
      </div>
    )
  }
}
let div = document.createElement('div');
document.body.appendChild(div);
 
let background = ReactDOM.render(React.createElement(
  Backgound,
), div);

export default background
