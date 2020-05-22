import React, { Component, createRef } from 'react';
import './Loading.css'
import RENDERER from './move'
import ReactDOM from 'react-dom';

class Loading extends Component {
	canvas = createRef();
	state = {
		show: false,
		open: false,
	}
	timer = null;
	componentDidMount () {
		RENDERER.init(this.canvas.current, document.body.clientWidth, document.body.clientHeight);
	}
	transShow () {
		clearTimeout(this.timer)
		this.setState({
			show: true,
		})
		this.timeClose()
	}
	open () {
		clearTimeout(this.timer)
		this.setState({
			open: true,
			show: true,
		})
	}
	close () {
		this.setState({
			open: false,
		})
		this.timeClose()
	}
	timeClose () {
		this.timer = setTimeout(() => {
			this.setState({
				show: false,
			})
		}, getRandSeconds(3, 5))
	}

	show () {
		this.setState({
			show: true,
		})
	}

	hide () {
		this.setState({
			show: false,
		})
	}

	render () {

		const { open, show } = this.state;

		return (
			<div className={"canvas-back " + (show ? 'op1' : 'op0')} style={{
				opacity: (open || show) ? 1 : 0,
				zIndex: open ? 998 : 1,
			}} >
    		<canvas ref={this.canvas} ></canvas>
			</div>
		)
	}
}

let div = document.createElement('div');
document.body.appendChild(div);
 
let loading = ReactDOM.render(React.createElement(
  Loading,
), div);

/*function showOne () {
	loading.show()
	setTimeout(() => {
		loading.hide()
		start()
	}, getRandSeconds(10, 20))
}

// setInterval()
function start () {
	setTimeout(function () {
		showOne();
	}, getRandSeconds(30, 50))
}
showOne();*/

function getRandSeconds (a, b) {
	return Math.floor(Math.random() * 1000 * (b - a)) + a * 1000
}

export default loading