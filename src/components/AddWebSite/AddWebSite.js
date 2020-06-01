import React, { Component, createRef } from 'react';
// import {connect} from 'react-redux'
import {message, Modal, Button, Input, Select, Popover } from 'antd';
// import './AddWebSite.scss';
import { addSite, editSite, /*getCatalogList*/ } from '@/store/actions'
import {
	isLegal,
	getBase64,
	getStrChartLen,
	checkUrl,
	trim
} from '@/common/common'

import {
	siteNameTip,
	siteNameErrorText,
	MAX_SIT_NAME,
	siteDescTip,
	MAX_SIT_DESC,
	
	siteImgTip,
	MAX_IMG_SIZE,
	siteImgErrorText,
	descControls
} from '@/common/constant'
import ReactDOM from 'react-dom';
import imgUrl from '@/common/api'
// import defaultImg from './default-cover.jpg';
import defaultImg from '@/assets/images/black-hole.png';
// import cookie from 'react-cookies'
import BraftEditor from 'braft-editor'

const { TextArea } = Input;
const { Option } = Select;


class AddWebSite extends Component {
	
	constructor (props) {
		super(props);
		this.fileInput = createRef();
		this.initData = {
			name: '',
			url: 'http://',
			desc: BraftEditor.createEditorState(''),
		  imgfiles: null,
			catalog: [],
			img: '',	// 图片地址
			previewImage: null,	// 图片地址
			tags: [],

			nameError: -1,
			isUrlError: false,
			// isDescError: false,
			imgError: -1,
			// isImgError: -1,

			
		}
		this.state = {
			visible: false,
			confirmLoading: false,
			isNameFirst: true,
			isUrlFirst: true,
			isDescFirst: true,
			isImgFirst: true,
			isCatalogFirst: true,
			isTagFirst: true,
			...this.initData,
			// data: {},
			catalogList: [],
			// isEdit: props.isEdit
		};
	}
	

	// showModal = config => {
	open = config => {
		console.log(this.state)
		/*const initData = {
			name: '',
			url: '',
			desc: '',
		  imgfiles: null,
			catalog: [],
			img: '',	// 图片地址
		}*/
		this.setState({
			// desc: '123',
		  visible: true,
			// ...initData,
		  ...config,
		  desc: BraftEditor.createEditorState(config.desc)
		});
		/*axios.get('/api/ip').then((res) => {
			console.log(res)
		})*/
	};
	
	handleSite = (status) => {
		this.setState({confirmLoading: true})
		const { isEdit } = this.props
		const { name, url, desc, imgfiles, catalog, handleOk, _id, img, tags } = this.state;
		console.log(tags)
		
		let formData = new FormData();
		formData.append('name', name);
		formData.append('url', url);
		formData.append('desc', desc.toHTML());
		formData.append('status', status);
		// formData.append('orgStatus', orgStatus);
		catalog.forEach((it, index) => {
			formData.append(`catalog`, parseInt(it));
		})
		tags.forEach((it, index) => {
			formData.append(`tags`, it);
		})

		if (isEdit) {
			formData.append('_id', _id);
			if (imgfiles) {
				formData.append('img', imgfiles[0])
			} else {
				formData.append('img', img)
			}
		} else {
			imgfiles && formData.append('img', imgfiles[0]);
		}
		// catalog.length > 0 && formData.append('catalog', catalog.join(','));
		// tags.length > 0 && formData.append('tags', tags.join(','));
		// window.abc = formData;
		;(isEdit ? editSite : addSite)(formData).then(data => {
			this.setState({confirmLoading: false})
			// return;
			if (data.resultCode === 200) {
				handleOk && handleOk();
				this.handleOver();
				message.success(data.resultMessage)
			}
		})
	}
	handleOver = () => {
		
		this.setState({
			...this.initData,
		  visible: false,
		});
	}
	// 上架
	handleOk = () => {
		this.handleSite(1)
	};
	// 草稿
	handleDraft = () => {
		this.handleSite(2)
	};

	handleCancel = () => {
		const { isEdit } = this.props;
		// console.log(this.initData)
		if (isEdit) {
			this.setState({
				...this.initData,
				visible: false,
			});
		} else {
			this.setState({
				visible: false,
			});
		}
		
	};
	
	checkName = (name) => {
		const nameStrlen = getStrChartLen(name);
		let flag = -1
		if (nameStrlen > MAX_SIT_NAME) {
			flag = 0
		} else if (!isLegal(name)) {
			flag = 1
		} else if (name.length === 0) {
			flag = 2
		}
		return flag;
	}
	

	/*componentDidMount () {
		console.log(process.env)
		this.props.getCatalogList();
	}*/

	nameChange = e => {
		const name = e.target.value;
		this.setState({
			name,
			nameError: this.checkName(name),
			isNameFirst: false,
		})
	}
	nameBlur = () => {
		this.setState({
			nameError: this.checkName(this.state.name)
		})
	}
	
	urlChange = e => {
		const url = e.target.value
		this.setState({
			url,
			isUrlFirst: false,
			isUrlError: !checkUrl(url)
		})
	}
	urlBlur = () => {
		this.setState({
			isUrlError: !checkUrl(this.state.url)
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
	fileChange = e => {
		const files = e.target.files
		// console.log(files)
		if (files.length === 0) {
			return;
		}
		const [file] = files
		const imgError = this.checkImg(file);
		if (imgError !== -1) {
			this.setState({
				imgError
			})
			return;
		}

		this.setState({
			imgfiles: files,
			isImgFirst: false,
			imgError: -1,
		})
		getBase64(file).then(res => {
			// console.log(res)
			this.setState({
				previewImage: res
			})
			this.fileInput.current.setAttribute('type', 'text');
			this.fileInput.current.setAttribute('type', 'file');
		})
		// console.log(this.fileInput)
		
	}
	descChange = e => {
		const desc = e.target.value
		this.setState({
			desc,
			isDescFirst: false,
		})
	}
	handleDescChange = (desc) => {
    this.setState({
      desc,
      isDescFirst: false,
      // outputHTML: editorState.toHTML()
    })
  }
	/*descBlur = () => {
		this.setState({
			isDescError: getStrChartLen(desc) > MAX_SIT_DESC
		})
	}*/
	catalogChange = catalog => {
		// console.log(catalog)
		if (catalog.length > 3) {
			return;
		}
		this.setState({
			catalog,
			isCatalogFirst: false
		})
	}
	tagChange = tags => {
		if (tags.length > 5) {
			return;
		}
		this.setState({tags, isTagFirst: false})
	}

	
	render() {
    const { 
    	visible, confirmLoading, name, url, desc, catalog, catalogList, img, previewImage, tags,
    	nameError, isUrlError, imgError,
    	isNameFirst, isUrlFirst, isImgFirst, isDescFirst, isCatalogFirst, isTagFirst
    } = this.state;
		const { isEdit } = this.props;
		console.log(desc.isEmpty())
		// console.log(`previewImage: ${!!previewImage}, img ${img}`)
		// console.log(previewImage)
    // const { catalogList=[] } = this.props;
    // console.log(selectOptions)
    return (
      <Modal
      	width={700}
      	footer={(
      		<div>
      			<Button onClick={this.handleCancel}>取消</Button>
        		<Button 
							disabled={(isNameFirst || isUrlFirst) ? true : (nameError!==-1 || isUrlError)}
        			loading={confirmLoading} onClick={this.handleDraft} type="primary"
        		>保存为草稿</Button>
        		<Button 
							disabled={
								(isNameFirst || isUrlFirst || isImgFirst || isDescFirst || isCatalogFirst || isTagFirst) 
								? true 
								: (nameError!==-1 || isUrlError || isUrlError || desc.isEmpty() || imgError !== -1 || catalog.length === 0 || tags.length === 0)
							}
        			loading={confirmLoading} onClick={this.handleOk} type="primary"
        		>上架</Button>
      		</div>
      	)}
      	bodyStyle={{padding: 0}}
				className="self-modal-wrapper"
				title={(isEdit ? '编辑' : '新增')+'网站'}
				visible={visible}
				maskClosable={false}
				confirmLoading={confirmLoading}
				onCancel={this.handleCancel}
				// onOk={this.handleOk}
				// okText="提交"
				// cancelText="取消"
      >
        <div className="self-wrapper flex">
					<div className="self-line must">
						<label>名称</label>
						<div className="self-text-wrapper">
							<Popover placement="topLeft" content={<div>{siteNameTip}</div>} trigger="focus">
								<Input className={nameError !== -1 && 'error'} onBlur={this.nameBlur} onChange={this.nameChange} value={name} />
							</Popover>
							{
								nameError !== -1 && <p className="error-tip">{siteNameErrorText[nameError]}</p>
							}
						</div>
					</div>
					<div className="self-line must">
						<label>地址</label>
						<div className="self-text-wrapper">
							<Input className={isUrlError && 'error'} onBlur={this.urlBlur} onChange={this.urlChange} value={url} />
							{
								isUrlError && <p className="error-tip">网址不合法</p>
							}
						</div>
					</div>
					
					<div className="self-line must">
						<label>描述</label>
						
							<BraftEditor
								controls={descControls}
		            value={desc}
          			className="normal-edit"
		            placeholder="请输入网站描述"
		            onChange={this.handleDescChange}
		          />
							
						{/*<Popover placement="topLeft" content={<div>{siteDescTip}</div>} trigger="hover"><TextArea autoSize={{minRows: 2, maxRows: 6}} maxLength={MAX_SIT_DESC} onBlur={this.descBlur} onChange={this.descChange} value={desc} /></Popover>*/}
					</div>
					<div className="self-line must">
						<label>图片</label>
						<div className="self-text-wrapper">
							{visible && <input ref={this.fileInput} id="uploadImg" type="file" style={{display: 'none'}} onChange={this.fileChange} accept="image/*"/>}
							<Popover placement="topLeft" content={<div>{siteImgTip}</div>} trigger="hover">
								<label htmlFor="uploadImg" className="img-ctn">
									<img src={ previewImage ? previewImage : img ? (imgUrl + img) : defaultImg } alt=""/>
								</label>
							</Popover>
							{
								imgError !== -1 && <p className="error-tip">{siteImgErrorText[imgError]}</p>
							}
						</div>
					</div>
					<div className="self-line must">
						<label>分类</label>
						<Select
			  			mode="multiple"
		        	placeholder="请选择网站分类, 最多3个"
		        	defaultActiveFirstOption={false}
		        	// filterOption={(val, opt) => !!opt}
		        	value={catalog.map(n => n+'')}
		        	onChange={this.catalogChange}
		        	style={{ width: '100%' }}
			      >
			        {
			        	catalogList.map(it => <Option key={it._id}>{it.name}</Option>)
			        }
		        </Select>
					</div>
					<div className="self-line must">
						<label>标签</label>
						<Select
			  			mode="tags"
		        	placeholder="请输入网站标签, 最多5个"
		        	// defaultActiveFirstOption={false}
		        	// filterOption={(val, opt) => !!opt}
		        	value={tags}
		        	onChange={this.tagChange}
		        	style={{ width: '100%' }}
			      >
		        </Select>
					</div>
        </div>
      	
      </Modal>
	  );
	}
}

/*
const mapStateToProps = state => {
	const {catalogList} = state.systemComp

  return {
  	catalogList: catalogList.slice(1),
  };
};


const mapDispatchToProps = dispatch => {
  return {
  	getCatalogList (params) {
			return dispatch(getCatalogList(params))
  	},
  };
};
AddWebSite = connect(mapStateToProps, mapDispatchToProps)(AddWebSite)*/

let div = document.createElement('div');
// let props = {};
document.body.appendChild(div);
 
let addWebSite = ReactDOM.render(React.createElement(
    AddWebSite,
    {
    	isEdit: false
    }
),div);


let div2 = document.createElement('div');
document.body.appendChild(div2);

let editWebSite = ReactDOM.render(React.createElement(
    AddWebSite,
    {
    	isEdit: true
    }
),div2);


export {
	addWebSite,
	editWebSite
};