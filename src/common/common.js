import React from 'react';
import { statusMap, pswTipText, LOG_OVERDUE_CODE } from './constant';

/*export const replaceStrTob = (str='', key='') => {
	if (!str || !key) {
		return str;
	}
	return str.replace(new RegExp(key, 'igm'), `<b>${key}</b>`)
}*/

export const isLogOverdue = res => res.resultCode === LOG_OVERDUE_CODE;

export const getStatus = statusCode => {
	return statusCode !== 1 && <b style={{color: statusCode === 0 ? 'red' : 'orange'}}>({statusMap[statusCode]})</b>
}

// export const getRound5 = (num=0) => Math.round(num * 2) / 2
export const getCeil5 = (num=0) => Math.ceil(num * 2) / 2


export const isLegal = (str='') => {
	if (typeof str === 'number') {
		return !isNaN(str);
	}
	/*if (str === '' || str === null) {
		return false;
	}*/
	const reg = /[\s\@\#\$\%\^\&\*\{\}\:\.\"\'\<\>\?\|]/ig
	return !reg.test(str)
}
// 不包含空格
export const isLegalExps = (str='') => {
	if (typeof str === 'number') {
		return !isNaN(str);
	}
	/*if (str === '' || str === null) {
		return false;
	}*/
	const reg = /[\@\#\$\%\^\&\*\{\}\:\.\"\'\<\>\?\|]/ig
	return !reg.test(str)
}
export const checkMail = (mail='') => {
	if (mail === '' || mail === null) {
		return false;
	}
	const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
	return reg.test(mail)
}
export const checkUrl = (url='') => {
	if (url === '' || url === null) {
		return false;
	}
	const reg = /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/
	return reg.test(url)
}
export const trim = (str='') => str.replace(/^\s+|\s+$/gm,'')
export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (!file) {
		return resolve(null)
    }
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export const pathType = (path='') => {
	if (path.slice(0, 7) === '/system') {
		return 'system'
	} else if (path.slice(0, 11) === '/sitedetail') {
		return 'sitedetail'
	} else if (path == '/') {
		return 'home'
	}
}
// params: match
export const isSystemPage = ({path=''}) => path.slice(0, 7) === '/system'

export const getStrChartLen = (str='') => {  
  let len = 0;  
  for (var i=0; i<str.length; i++) {  
    if (str.charCodeAt(i)>127 || str.charCodeAt(i)===94) {  
       len += 2;  
     } else {  
       len ++;  
     }  
   }  
  return len;  
}

export const checkPassword = (psw='') => {
	return pswTipText.map(it => it.isok(psw)).reduce((a, pr) => a && pr, true)
}

// 距离现在多长时间
export const dateForNow = date => {
	date = new Date(date);
	// 相差的秒数
	const xs = (new Date().getTime() - date.getTime()) / 1000
	const xm = xs / 60 
	const xh = xm / 60
	const xd = xh / 24;
	if (xd >= 1) {
		return Math.floor(xd) + '天前'
	} else if (xh >= 1) {
		return Math.floor(xh) + '小时前'
	} else if (xm >= 1) {
		return Math.floor(xm) + '分钟前'
	} else if (xs >= 10) {
		return Math.ceil(xs) + '秒前'
	} else {
		return '刚刚';
	}
}


/*export const callback = () => {
	const loginCallback = () => {};
	const regCallback = () => {}
	return {
		setLoginCallback (cb) {
			loginCallback = cb;
		},
		getLoginCallback () {
			return loginCallback;
		},
		setRegCallback (cb) {
			regCallback = cb;
		},
		getRegCallback () {
			return regCallback;
		},

	}
}*/