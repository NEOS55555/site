import React, { Component } from 'react';
// import {connect} from 'react-redux'
// import 'cropperjs/dist/cropper.css';
import { message, Button, Popover } from 'antd';
import './Portrait.scss'
import Cropper from './react-cropper';
import { saveportrait, getUserportrait } from '@/store/actions'
// import { withRouter } from "react-router";

import loading from '@/commonComp/Loading'
import defaultFace from '@/assets/images/face.png'

import eventBus from '@/common/eventBus'
import imgurl from '@/common/api'
/* global FileReader */
import {

  faceImgTip,
  MAX_IMG_SIZE,
  siteImgErrorText,
  // LOG_OVERDUE_CODE
} from '@/common/constant'


class Portrait extends Component {

  constructor(props) {
    super(props);
    this.state = {
      src: '',
      orgSrc: ''
      // cropResult: null,
      // imgError: -1,
    };
    this.cropImage = this.cropImage.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount () {
    // const { history } = this.props;
    loading.transShow()
    getUserportrait().then(res => {
      const { result } = res;
      this.setState({
        orgSrc: result ? imgurl + result : defaultFace
      })
    }).catch(res => {
      eventBus.emit('logout#toHome', res)
    })
  }
  checkImg (file) {
    let flag = -1;
    if (file.size > MAX_IMG_SIZE) {
      flag = 1
    } else if (file.type.indexOf('image') === -1) {
      flag = 0
    }
    return flag;
  }
  onChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    if (files.length === 0) {
      message.error('请选择图片！')
      return;
    }
    const [file] = files
    const imgError = this.checkImg(file);
    if (imgError !== -1) {
      /*this.setState({
        imgError
      })*/
      message.error(siteImgErrorText[imgError])
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
      this.cropper.replace(reader.result)
    };
    reader.readAsDataURL(file);
  }

  cropImage() {
    const cropped = this.cropper.getCroppedCanvas()
    // console.log(cropped)
    if (!cropped) {
      message.error(siteImgErrorText[3])
      return;
    }
    const imgData = cropped.toDataURL()
    saveportrait({imgData})
      .then(res => message.success(res.resultMessage))
      
    /*this.setState({
      cropResult: cropped.toDataURL(),
    });*/
  }
  

  render() {
    // console.log(this.state.src)
    const { src, orgSrc } = this.state;
    // console.log(!!cropResult)
    return (
      <div className="face-container main-content">
        <div className="face-wrapper">
          <div className="show-ctn">
            <div className="cropper-ctn">
              <Cropper
                style={{ height: 400, width: 400 }}
                aspectRatio={1}
                preview=".img-preview"
                guides={false}
                src={this.state.src}
                ref={cropper => { this.cropper = cropper; }}
              />
              <div className={"cropper-bg self-bg " + (!!src ? 'hidden' : '')}></div>
            </div>
            <div className="opera-bottom">
              <Popover placement="topLeft" content={<div>{faceImgTip}</div>} trigger="hover">
                <label className="ant-btn" htmlFor="fileimg">选择头像</label>
              </Popover>
              <Button type="primary" onClick={this.cropImage}>保存头像</Button>
            </div>

            <input id="fileimg" type="file" style={{display: 'none'}} accept="image/*" onChange={this.onChange} />
          </div>
          <div className="preview-ctn">
            <h3 className="title">头像预览</h3>
            {
              !!src 
              ? <div className="img-preview-ctn" >
                  <div className="img-preview" />
                  <p>大头像112*112</p>
                  <div className="img-preview small" />
                  <p>小头像40*40</p>
                </div>
              : <div className="img-preview-ctn show-org-img" >
                  <div className="img-preview">
                    <img src={orgSrc} alt=""/>
                  </div>
                  <p>大头像112*112</p>
                  <div className="img-preview small">
                    <img src={orgSrc} alt=""/>
                  </div>
                  <p>小头像40*40</p>
                </div>
            }
          </div>
        </div>
        

        {/*<div>
          <div className="box" style={{ width: '50%',  }}>
            <h1>
              <span>Crop</span>
            </h1>
            <img style={{ width: 112 }} src={cropResult} alt="cropped image" />
          </div>
        </div>*/}
      </div>
    );
  }
}

/*const mapDispatchToProps = dispatch => {
  return {
    setUsername (params) {
      return dispatch(setUsername(params))
    },
  };
};*/
export default Portrait;
// export default withRouter(connect(null, mapDispatchToProps)(Portrait));
