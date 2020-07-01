import React, { Component, Fragment } from 'react';
import './index.scss'
// import eventBus from '@/common/eventBus'
import ReactDOM from 'react-dom';
import { Modal } from 'antd';

class ShowImg extends React.Component {
  state = { visible: false, imgSrc: '' };

  show = imgSrc => {
    this.setState({
      visible: true,
      imgSrc
    });
  };

  hide = e => {
    this.setState({
      visible: false,
    });
  };



  render() {
    const { imgSrc, visible } = this.state;
    return (
      <Modal
        footer={null}
        // title="Basic Modal"
        width={1000}
        height={700}
        maskClosable={false}
        className="showImg-ctn"
        visible={visible}
        onCancel={this.hide}
      >
        <img src={imgSrc} alt=""/>
      </Modal>
    );
  }
}

let div = document.createElement('div');
document.body.appendChild(div);
 
let showImg = ReactDOM.render(React.createElement(
    ShowImg,
),div);

export default showImg;
