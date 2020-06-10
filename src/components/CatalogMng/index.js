import React, { Component } from 'react';
import { List, Modal, Input, message } from 'antd';
import { ToolOutlined, CloseOutlined } from '@ant-design/icons';
import { editCatalog, delCatalog, getCatalogList } from '@/store/actions'
import AddCatalog from '@/components/AddCatalog'
import { connect } from 'react-redux'
import './CatalogMng.scss'

class EditModal extends Component {
  render () {
    const { visible, confirmLoading, name, onChange, handleOk, handleCancle } = this.props;
    return (
      <Modal
        width={400}
        title="编辑"
        visible={visible}
        maskClosable={false}
        confirmLoading={confirmLoading}
        onCancel={handleCancle}
        onOk={handleOk}
        okText="确定"
        cancelText="取消"
      >
        <Input placeholder="请设置类型名" onChange={onChange} value={name} />
      </Modal>
    )
  }
}
class DelModal extends Component {
  render () {
    const { visible, confirmLoading, name, onChange, handleOk, handleCancle } = this.props;
    return (
      <Modal
        width={400}
        title="删除"
        visible={visible}
        maskClosable={false}
        confirmLoading={confirmLoading}
        onCancel={handleCancle}
        onOk={handleOk}
        okText="确定"
        cancelText="取消"
      >
        是否删除“{name}”该类名
      </Modal>
    )
  }
}



class CatalogMng extends Component {
  state = {
    editvisible: false,
    editloading: false,
    currentData: {},
    delvisible: false,
    delloading: false,
  }
  handleEditShow = (currentData) => {
    this.setState({
      editvisible: true,
      currentData
    })
  }
  handleEditCancle = () => {
    this.setState({
      editvisible: false,
      currentData: {}
    })
  }
  editNameChange = e => {
    const { currentData } = this.state;
    this.setState({
      currentData: {
        ...currentData,
        name: e.target.value
      }
    })
  }
  handleEditOk = () => {
    // console.log(this.state.currentData.name)
    this.setState({
      editloading: true
    })
    editCatalog(this.state.currentData).then(res => {
      this.setState({
        editvisible: false,
        currentData: {}
      })
      this.props.getCatalogList();
      message.success('修改成功！')
    }).finally(() => this.setState({ editloading: false }))
  }



  handleDelShow = (currentData) => {
    this.setState({
      delvisible: true,
      currentData
    })
  }
  handleDelCancle = () => {
    this.setState({
      delvisible: false,
      currentData: {}
    })
  }
 
  handleDelOk = () => {
    // console.log(this.state.currentData.name)
    this.setState({
      editloading: true
    })
    delCatalog({_id: this.state.currentData._id})
      .then(res => {
        this.setState({
          delvisible: false,
          currentData: {}
        })
        this.props.getCatalogList();
        message.success('删除成功！')
      })
      .finally(() => this.setState({ delloading: false }))
  }
	render() {
    const { editvisible, editloading, currentData, delvisible, delloading } = this.state;
    const { catalogList } = this.props;
    return (
      <div className="catalog-wrapper max-container">
        <AddCatalog/>
        <List
          itemLayout="vertical"
          dataSource={catalogList}
          
          renderItem={item => (
            <List.Item
              key={item._id}
            >
              <span className="text" >{item.name}</span>
              <ToolOutlined className="icon" onClick={() => this.handleEditShow(item)} />
              <CloseOutlined className="icon" onClick={() => this.handleDelShow(item)} />
            </List.Item>
          )}
        />
        <EditModal 
          visible={editvisible} 
          name={currentData.name} 
          onChange={this.editNameChange} 
          confirmLoading={editloading} 
          handleOk={this.handleEditOk} 
          handleCancle={this.handleEditCancle}
        />

        <DelModal 
          visible={delvisible} 
          name={currentData.name} 
          onChange={this.delNameChange} 
          confirmLoading={delloading} 
          handleOk={this.handleDelOk} 
          handleCancle={this.handleDelCancle}
        />


      </div>
	  );
	}
}

const mapStateToProps = state => {
  const { catalogList } = state.siteMng
  return {
    catalogList
  };
};

const mapDispatchToProps = dispatch => {
  return {
   
    getCatalogList (params) {
      return dispatch(getCatalogList(params))
    },
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CatalogMng);
