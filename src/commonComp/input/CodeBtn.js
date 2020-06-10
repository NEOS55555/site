import React, { Component } from 'react';
import { Button } from 'antd';
import { COUNT_DOWN } from '@/common/constant'

class CodeBtn extends Component {
  state = {
    mailClick: false,
    mailCount: COUNT_DOWN
  }

  mailCountInterval = null;

  startCountDown = () => {
    clearInterval(this.mailCountInterval)
    this.mailCountInterval = setInterval(() => {
      const { mailCount } = this.state;
      if (mailCount <= 1) {
        this.setState({
          mailClick: false,
          mailCount: COUNT_DOWN
        })
        clearInterval(this.mailCountInterval)
        return;
      }
      this.setState({
        mailCount: mailCount - 1
      })
    }, 1000)
  }

  codeClick = () => {
    this.setState({
      mailClick: true
    })

    this.props.onClick()
      .then(ok => this.startCountDown())
      .catch(err => this.setState({ mailClick: false }))
  }

  render () {
    
    const { mailClick, mailCount } = this.state;

    return (
      <Button onClick={this.codeClick} disabled={mailClick} type="link">{mailClick ? `${mailCount}s后再次获取` : '获取验证码'}</Button>
    );
  }
}


export default CodeBtn;