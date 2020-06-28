import axios from 'axios';
import url from '@/common/api'
import cookie from 'react-cookies';
import { message } from 'antd';
import loading from '@/commonComp/Loading'
import { LOG_OVERDUE_CODE } from '@/common/constant'
// import { removeLoginCookie } from '@/commonComp/logReg/loginCookie'
import eventBus from '@/common/eventBus'

export const UPDATE_DATA = 'UPDATE_DATA';    // 这个只是修改siteMng里的数据 ，别他妈搞忘了
export const UPDATE_COM_DATA = 'UPDATE_COM_DATA';    // 这个修改公共的数据
export const UPDATE_LIST = 'UPDATE_LIST';
export const UPDATE_CATALOG_LIST = 'UPDATE_CATALOG_LIST';
export const UPDATE_CATALOG_LIST_SITE = 'UPDATE_CATALOG_LIST_SITE';
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
    if (resultCode === LOG_OVERDUE_CODE) {
      // removeLoginCookie()
      eventBus.emit('logout#clear', data)
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
    Authorization: cookie.load('user_token') || ''
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
function updateCatalogListSite (data) {
  return {
    type: UPDATE_CATALOG_LIST_SITE, 
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
export const editNotice = params => axios.post(url + '/editNotice', params, {headers: getAuthorization()})
export const delCatalog = params => axios.get(url + '/delCatalog', {params, headers: getAuthorization()})
// 收藏网址
export const collectSite = params => axios.get(url + '/collectSite', {params, headers: getAuthorization()})
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
export const getIP = () => axios.get(url + '/getIP', {headers: getAuthorization()})  // 这个不需要写错误处理
export const setRate = params => axios.post(url + '/setRate', params)
export const addView = params => axios.post(url + '/addView', params)
export const reportCommit = params => axios.post(url + '/reportCommit', params, {headers: getAuthorization()})
export const replyCommit = params => axios.post(url + '/replyCommit', params, {headers: getAuthorization()})
export const getReportCommit = params => axios.get(url + '/getReportCommit', {params})
export const getReplyCommit = params => axios.get(url + '/getReplyCommit', {params})
// clearreplynum 和 getReplyMeList 在一体，所以只需要写 getReplyMeList 就行了
export const clearreplynum = params => axios.get(url + '/clearreplynum', {params, headers: getAuthorization()})
export const getReplyMeList = params => axios.get(url + '/getReplyMeList', {params, headers: getAuthorization()})
// 待回复的数量
// export const getToBeRepliedNums = params => axios.get(url + '/getToBeRepliedNums', {params, headers: getAuthorization()})
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
// 得到网页列表- 因为页面管理需要登录信息，所以还是要传入tooken
// catalog, status, pageIndex, pageSize, isTotal
export const getSiteList = params => dispatch => {
  loading.open();
  return axios.post(url + '/getSiteList', params, {headers: getAuthorization()}).then(res => {
    dispatch(updateSiteList(res.result))
    loading.close()
  })
}
// 得到网页分类-只有名称和id
// catalog, status, pageIndex, pageSize, isTotal
export const getAllCatalog = params => dispatch => axios.get(url + '/getAllCatalog', params).then(res => {
  // console.log(res.data.result || [])
  dispatch(updateCatalogList(res.result))
})

const getCatalogList = params => axios.get(url + '/getCatalogList', {params})

// 获取网站分类-包含该分类的网站总数
export const dispatchCatalogList = params => dispatch => getCatalogList(params).then(res => {
  // console.log(res.data.result || [])
  dispatch(updateCatalogListSite(res.result))
})

// 删除网页
// _id, status
export const delSite = params => axios.post(url + '/delSite', params, {headers: getAuthorization()})
// 新增分类
// _id, status
export const addCatalog = params => axios.post(url + '/addCatalog', params, {headers: getAuthorization()})
// 新增公告
export const addNotice = params => axios.post(url + '/addNotice', params, {headers: getAuthorization()})
// 保存头像
export const saveportrait = params => axios.post(url + '/saveportrait', params, {headers: getAuthorization()})


// 新增网页-这个在头部那里
export const addSite = (params) => {
  return axios.request({
    url: url + '/addSite', 
    method: 'post',
    data: params,
    headers: {'Content-Type':'multipart/form-data', ...getAuthorization()}
  })
}
// 编辑网页-这个在siteItem里
export const editSite = (params) => {
  return axios.request({
    url: url + '/editSite', 
    method: 'post',
    data: params,
    headers: {'Content-Type':'multipart/form-data', ...getAuthorization()}
  })
}

export const checkNameExist = params => axios.get(url + '/checkName', {params})
// 获取公告列表
export const getNoticeList = params => axios.get(url + '/getNoticeList', {params})
// 删除公告
export const delNotice = params => axios.get(url + '/delNotice', {params, headers: getAuthorization()})
// 用户信息
export const getUserportrait = params => axios.post(url + '/getUserportrait', params, {headers: getAuthorization()})
// 更新分类排序
export const updateCatalogSort = params => axios.post(url + '/updateCatalogSort', params, {headers: getAuthorization()})

// 收藏
export const getCollectList = params => axios.get(url + '/getCollectList', {params, headers: getAuthorization()})

export {
  getCatalogList,
  updateSiteList,
}
