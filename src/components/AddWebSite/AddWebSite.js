import React, { Component, createRef } from 'react';
// import {connect} from 'react-redux'
import {message, Modal, Button, Input, Select  } from 'antd';
// import './AddWebSite.scss';
import { addSite, editSite, /*getCatalogList*/ } from '@/store/actions'
import {
	// isLegal,
	getBase64
} from '@/common/common'
import ReactDOM from 'react-dom';
import imgUrl from '@/common/api'
import defaultImg from './default-cover.jpg';
// import cookie from 'react-cookies'

const { TextArea } = Input;
const { Option } = Select;


class AddWebSite extends Component {
	
	constructor (props) {
		super(props);
		this.fileInput = createRef();
		this.initData = {
			name: '',
			url: '',
			desc: '',
		  imgfiles: null,
			catalog: [],
			img: '',	// 图片地址
			previewImage: null,	// 图片地址
			tags: [],
		}
		this.state = {
			visible: false,
			confirmLoading: false,
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
		  ...config
		});
		/*axios.get('/api/ip').then((res) => {
			console.log(res)
		})*/
	};
	
	handleSite = (status) => {
		this.setState({confirmLoading: true})
		const { isEdit } = this.props
		const { name, url, desc, imgfiles, catalog, handleOk, _id, img, tags } = this.state;
		// const user_id = cookie.load('user_id');
		// console.log(catalog)
		
		let formData = new FormData();
		// user_id && formData.append('user_id', user_id);
		formData.append('name', name);
		formData.append('url', url);
		formData.append('desc', desc);
		formData.append('status', status);
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
	
	

	/*componentDidMount () {
		console.log(process.env)
		this.props.getCatalogList();
	}*/

	nameChange = e => {
		// isLegal
		this.setState({
			name: e.target.value
		})
	}
	urlChange = e => {
		this.setState({
			url: e.target.value
		})
	}
	fileChange = e => {
		const files = e.target.files
		if (files.length === 0) {
			return;
		}
		console.log(files)
		this.setState({
			imgfiles: files,
		})
		getBase64(files[0]).then(res => {
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
		this.setState({
			desc: e.target.value
		})
	}
	catalogChange = catalog => {
		// console.log(catalog)
		if (catalog.length > 3) {
			return;
		}
		this.setState({
			catalog
		})
	}
	tagChange = tags => {
		if (tags.length > 5) {
			return;
		}
		this.setState({tags})
	}

	
	render() {
    const { visible, confirmLoading, name, url, desc, catalog, catalogList, img, previewImage, tags } = this.state;
		const { isEdit } = this.props;
		// console.log(`previewImage: ${!!previewImage}, img ${img}`)
		// console.log(previewImage)
    // const { catalogList=[] } = this.props;
    // console.log(selectOptions)
    return (
      <Modal
      	width={700}
      	footer={(
      		<div className="self-footer">
        		<div>
        			<Button onClick={this.handleCancel}>取消</Button>
	        		<Button loading={confirmLoading} onClick={this.handleDraft} type="primary">保存为草稿</Button>
	        		<Button loading={confirmLoading} onClick={this.handleOk} type="primary">上架</Button>
        		</div>
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
        <div className="self-wrapper">
					<div className="self-line must">
						<label>名称</label><Input className="error" onChange={this.nameChange} value={name} />
					</div>
					<div className="self-line must">
						<label>地址</label><Input onChange={this.urlChange} value={url} />
					</div>
					<div className="self-line must">
						<label>图片</label>
						{visible && <input ref={this.fileInput} id="uploadImg" type="file" style={{display: 'none'}} onChange={this.fileChange} accept="image/*"/>}
						<label htmlFor="uploadImg" className="img-ctn">
							<img src={ previewImage ? previewImage : img ? (imgUrl + img) : defaultImg } alt=""/>
						</label>
					</div>
					<div className="self-line must">
						<label>描述</label><TextArea onChange={this.descChange} value={desc} />
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