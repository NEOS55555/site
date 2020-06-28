import React, { Component, Fragment } from 'react';
import { List, Modal, Input, message, Button } from 'antd';
import { ToolOutlined, CloseOutlined } from '@ant-design/icons';
import { editCatalog, delCatalog, getAllCatalog, dispatchCatalogList, updateCatalogSort } from '@/store/actions'
// import { LOG_OVERDUE_CODE } from '@/common/constant'
import AddCatalog from './AddCatalog'
import { connect } from 'react-redux'
import { sortable } from 'react-sortable';
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
    const { visible, confirmLoading, name, handleOk, handleCancle } = this.props;
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

class Item extends React.Component {
  render() {
    return (
      <li {...this.props}>
        {this.props.children}
      </li>
    )
  }
}
const SortableItem = sortable(Item);

class SortModal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
      items: props.list
    }
  }
  static getDerivedStateFromProps (props, state) {
    if (JSON.stringify(props.list) !== JSON.stringify(state.items)) {
      return {
        items: props.list
      }
    }
    return null;
  }
  onSortItems = (items) => {
    this.setState({
      items: items
    });
  }
  handleShow = () => this.setState({ visible: true })
  handleOk = () => {
    this.setState({ confirmLoading: true })
    updateCatalogSort({catalog: this.state.items})
      .then(res => {
        this.setState({ visible: false, confirmLoading: false })
        message.success('更新成功！')
        this.props.handleOk();
      })
      .catch(res => this.setState({ confirmLoading: false }))
  }
  handleCancle = () => {
    this.setState({
      visible: false,
      confirmLoading: false
    })
  }
   
  render () {
    const { visible, confirmLoading, items } = this.state;
    // const { visible, confirmLoading, handleOk, handleCancle } = this.props;
    return (
      <Fragment>
        <Button onClick={this.handleShow}>排序</Button>
        <Modal
          width={400}
          title="排序"
          visible={visible}
          maskClosable={false}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancle}
          onOk={this.handleOk}
          okText="确定"
          cancelText="取消"
        >
          <div className="sortable-list">
            <ul>
              {
                items.map((item, i) => 
                  <SortableItem
                    key={item._id}
                    onSortItems={this.onSortItems}
                    items={items}
                    sortId={i}
                  >
                    {item.name}
                  </SortableItem>
                )
              }
            </ul>
          </div>
        </Modal>
      </Fragment>
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
        currentData: {},
        editloading: false
      })
      this.props.getAllCatalog();
      this.props.dispatchCatalogList();
      message.success('修改成功！')
    })/*.catch(res => {
      if (res.resultCode === LOG_OVERDUE_CODE) {
        this.props.setUsername('')
      }
    })*/.catch(() => this.setState({ editloading: false }))
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
      delloading: true
    })
    delCatalog({_id: this.state.currentData._id})
      .then(res => {
        this.setState({
          delvisible: false,
          currentData: {},
          delloading: false
        })
        this.props.getAllCatalog();
        this.props.dispatchCatalogList();
        message.success('删除成功！')
      })
      /*.catch(res => {
        if (res.resultCode === LOG_OVERDUE_CODE) {
          this.props.setUsername('')
        }
      })*/
      .catch(() => this.setState({ delloading: false }))
  }
	render() {
    const { editvisible, editloading, currentData, delvisible, delloading } = this.state;
    const { catalogList, getAllCatalog, dispatchCatalogList } = this.props;
    return (
      <div className="catalog-wrapper max-container">
        <AddCatalog/>
        {catalogList.length > 0 && <SortModal handleOk={() => {getAllCatalog();dispatchCatalogList()}} list={catalogList} />}
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
    /*setUsername (name) {
      return dispatch(setUsername(name))
    },*/
    getAllCatalog (params) {
      return dispatch(getAllCatalog(params))
    },
    dispatchCatalogList (params) {
      return dispatch(dispatchCatalogList(params))
    },
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CatalogMng);
