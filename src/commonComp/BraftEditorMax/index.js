import React, { Component } from 'react';
import './BraftEditorMax.scss'
// 把UPDATE_DATA 修改一下 改成函数，不要到处写
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'

class BraftEditorMax extends Component {

	handleChange = val => {
		const { maxLen, value } = this.props
		if (value.toText().length > maxLen) {
			val = ContentUtils.insertText(ContentUtils.clear(value), val.toText().slice(0, maxLen))
		}
		this.props.onChange(val)
	}

	render () {
		const { value, maxLen } = this.props;
		return (
			<div className="diy-edit-max">
        <BraftEditor
          {...this.props}
        />
        <span className="diy-tip">{value.toText().length}/{maxLen}</span>
      </div>
		)
	}
}
export default BraftEditorMax;