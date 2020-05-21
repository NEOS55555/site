import axios from 'axios';
import url from '@/common/api'
import cookie from 'react-cookies';
import { message } from 'antd';
import loading from '@/commonComp/Loading'

export const UPDATE_DATA = 'UPDATE_DATA';
export const UPDATE_LIST = 'UPDATE_LIST';
export const UPDATE_CATALOG_LIST = 'UPDATE_CATALOG_LIST';
export const SET_USER_NAME = 'SET_USER_NAME';
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log(response)
  if (response.data.resultCode && (response.data.resultCode !== 200)) {
    message.error(response.data.resultMessage)
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

function getAuthorization () {
  return {
    Authorization: cookie.load('user_token')
  }
}

function updateSiteList (data) {
  return {
    type: UPDATE_LIST, 
    data
  }
}
function updateCatalogList (data) {
  return {
    type: UPDATE_CATALOG_LIST, 
    data
  }
}
export function setUsername (data) {
  return {
    type: SET_USER_NAME, 
    data
  }
}

// 获取注册用的验证码
export const getRegCode = params => axios.post(url + '/sendRegMailCode', params).then(res => res.data)

// 注册，成功后，自动登录
export const register = params => axios.post(url + '/register', params).then(res => res.data)
export const login = params => axios.post(url + '/login', params).then(res => res.data)

// 这接口貌似没卵用啊-放屁-检测该用户有没有点击的时候是有用的
export const getIP = () => axios.get(url + '/getIP').then(res => res.data)
export const setRate = params => axios.post(url + '/setRate', params).then(res => res.data)
export const addView = params => axios.post(url + '/addView', params).then(res => res.data)

// 得到网页列表
// catalog, status, pageIndex, pageSize, isTotal
export const getSiteList = params => dispatch => {
  loading.open();
  axios.post(url + '/getSiteList', params).then(res => {
    dispatch(updateSiteList(res.data.result))
    loading.close()
  })
}
// 得到网页列表
// catalog, status, pageIndex, pageSize, isTotal
export const getCatalogList = params => dispatch => axios.post(url + '/getCatalogList', params).then(res => {
  dispatch(updateCatalogList(res.data.result))
})

// 删除网页
// _id, status
export const delSite = params => axios.post(url + '/delSite', params, {headers: getAuthorization()}).then(res => res.data)
// 新增分类
// _id, status
export const addCatalog = params => axios.post(url + '/addCatalog', params).then(res => res.data)


// 新增网页
export const addSite = (params) => {
  return axios.request({
    url: url + '/addSite', 
    method: 'post',
    data: params,
    headers: {'Content-Type':'multipart/form-data', ...getAuthorization()}
  }).then(res => res.data)
}
// 编辑网页
export const editSite = (params) => {
  return axios.request({
    url: url + '/editSite', 
    method: 'post',
    data: params,
    headers: {'Content-Type':'multipart/form-data', ...getAuthorization()}
  }).then(res => res.data)
}