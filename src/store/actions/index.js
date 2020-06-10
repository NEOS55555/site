import axios from 'axios';
import url from '@/common/api'
import cookie from 'react-cookies';
import { message } from 'antd';
import loading from '@/commonComp/Loading'
import { removeLoginCookie } from '@/commonComp/logReg/loginCookie'

export const UPDATE_DATA = 'UPDATE_DATA';    // 这个只是修改siteMng里的数据 ，别他妈搞忘了
export const UPDATE_COM_DATA = 'UPDATE_COM_DATA';    // 这个修改公共的数据
export const UPDATE_LIST = 'UPDATE_LIST';
export const UPDATE_CATALOG_LIST = 'UPDATE_CATALOG_LIST';
export const SET_USER_NAME = 'SET_USER_NAME';
export const UPDATE_TOP10_LIST = 'UPDATE_TOP10_LIST';
export const SET_REPLY_NUM = 'SET_REPLY_NUM';
export const SET_CATALOG = 'SET_CATALOG';

axios.interceptors.request.use(
  config => {
    loading.transShow();
    return config
  },
  err => {
    loading.close();
    return Promise.reject(err)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log(response)
  const { data } = response
  const { resultCode } = data
  if (resultCode && (resultCode !== 200)) {
    message.error(data.resultMessage)
    if (resultCode === 233) {
      removeLoginCookie()
    }
    loading.close()
    return Promise.reject(data);
  }
  return data;
}, function (err) {
  // 对响应错误做点什么
  loading.close()
  message.error('系统错误！')
  return Promise.reject(err);
});

export function updateComData (data) {
  return {
    type: UPDATE_COM_DATA, 
    data
  }
}
export function updateSiteMngData (data) {
  return {
    type: UPDATE_DATA, 
    data
  }
}
export function setCatalog (data) {
  return {
    type: SET_CATALOG, 
    data
  }
}

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
function updateTop10SiteList (data) {
  return {
    type: UPDATE_TOP10_LIST, 
    data
  }
}
export function setUsername (data) {
  return {
    type: SET_USER_NAME, 
    data
  }
}
export function setReplyNum (data=0) {
  return {
    type: SET_REPLY_NUM, 
    data
  }
}
// 修改分类名
export const editCatalog = params => axios.post(url + '/editCatalog', params, {headers: getAuthorization()})
export const delCatalog = params => axios.get(url + '/delCatalog', {params, headers: getAuthorization()})
// 获取相关推荐
export const getRecomdList = params => axios.get(url + '/getRecomdList', {params})

// 获取注册用的验证码
export const getRegCode = params => axios.post(url + '/sendRegMailCode', params)
// 获取重置密码用的验证码
export const getRestCode = params => axios.post(url + '/sendRestPswCode', params)
export const resetPassword = params => axios.post(url + '/resetPassword', params)

// 注册，成功后，自动登录
export const register = params => axios.post(url + '/register', params)
export const login = params => axios.post(url + '/login', params)

// 这接口貌似没卵用啊-放屁-检测该用户有没有点击的时候是有用的
export const getIP = () => axios.get(url + '/getIP', {headers: getAuthorization()})
export const setRate = params => axios.post(url + '/setRate', params)
export const addView = params => axios.post(url + '/addView', params)
export const reportCommit = params => axios.post(url + '/reportCommit', params, {headers: getAuthorization()})
export const replyCommit = params => axios.post(url + '/replyCommit', params, {headers: getAuthorization()})
export const getReportCommit = params => axios.get(url + '/getReportCommit', {params})
export const getReplyCommit = params => axios.get(url + '/getReplyCommit', {params})
export const clearreplynum = params => axios.get(url + '/clearreplynum', {params, headers: getAuthorization()})
// 待回复的数量
export const getToBeRepliedNums = params => axios.get(url + '/getToBeRepliedNums', {params, headers: getAuthorization()})
export const getNewestCommit = params => axios.get(url + '/getNewestCommit', {params})

// 获取单个信息
export const getSiteDetail = params => {
  loading.open();
  return axios.get(url + '/getSiteDetail', {params}).then(res => {
    loading.close()
    return res
  })
}

// 获取top10最热网站
export const getTop10SiteList = () => dispatch => {
  axios.post(url + '/getSiteList', {pageIndex: 1, pageSize: 10, orderBy: 'monthViews', status: 1}).then(res => {
    dispatch(updateTop10SiteList(res.result))
  })
}
// 得到网页列表
// catalog, status, pageIndex, pageSize, isTotal
export const getSiteList = params => dispatch => {
  loading.open();
  axios.post(url + '/getSiteList', params, {headers: getAuthorization()}).then(res => {
    dispatch(updateSiteList(res.result))
    loading.close()
  })
}
// 得到网页列表
// catalog, status, pageIndex, pageSize, isTotal
export const getCatalogList = params => dispatch => axios.post(url + '/getCatalogList', params).then(res => {
  // console.log(res.data.result || [])
  dispatch(updateCatalogList(res.result))
})

// 删除网页
// _id, status
export const delSite = params => axios.post(url + '/delSite', params, {headers: getAuthorization()})
// 新增分类
// _id, status
export const addCatalog = params => axios.post(url + '/addCatalog', params)
// 保存头像
export const saveportrait = params => axios.post(url + '/saveportrait', params, {headers: getAuthorization()})


// 新增网页
export const addSite = (params) => {
  return axios.request({
    url: url + '/addSite', 
    method: 'post',
    data: params,
    headers: {'Content-Type':'multipart/form-data', ...getAuthorization()}
  })
}
// 编辑网页
export const editSite = (params) => {
  return axios.request({
    url: url + '/editSite', 
    method: 'post',
    data: params,
    headers: {'Content-Type':'multipart/form-data', ...getAuthorization()}
  })
}

export const checkNameExist = params => axios.get(url + '/checkName', {params})
// 消息管理
export const getReplyMeList = params => axios.get(url + '/getReplyMeList', {params, headers: getAuthorization()})
export const getUserportrait = params => axios.post(url + '/getUserportrait', params, {headers: getAuthorization()})
