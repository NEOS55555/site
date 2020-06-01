import React from 'react';
import { statusMap, pswTipText } from './constant';

/*export const replaceStrTob = (str='', key='') => {
	if (!str || !key) {
		return str;
	}
	return str.replace(new RegExp(key, 'igm'), `<b>${key}</b>`)
}*/
// 发送邮件倒计时
export const COUNT_DOWN = 60;
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
	const reg = /[\s\@\#\$\%\^\&\*\{\}\:\：\.\"\L\<\>\?\|]/ig
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

// params: match
export const isSystemPage = ({path=''}) => path.slice(0, 7) === '/system'

export const getStrChartLen = (str='') => {  
  let len = 0;  
  for (var i=0; i<str.length; i++) {  
    if (str.charCodeAt(i)>127 || str.charCodeAt(i)==94) {  
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