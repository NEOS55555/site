import React from 'react';
import {statusMap} from './constant';

/*export const replaceStrTob = (str='', key='') => {
	if (!str || !key) {
		return str;
	}
	return str.replace(new RegExp(key, 'igm'), `<b>${key}</b>`)
}*/

export const getStatus = statusCode => {
	return statusCode !== 1 && <b style={{color: statusCode === 0 ? 'red' : 'orange'}}>({statusMap[statusCode]})</b>
}

export const getRound5 = (num=0) => Math.round(num * 2) / 2
export const getCeil5 = (num=0) => Math.ceil(num * 2) / 2


export const isLegal = (str='') => {
	if (typeof str === 'number') {
		return !isNaN(str);
	}
	if (str === '' || str === null) {
		return false;
	}
	const reg = /[\@\#\$\%\^\&\*\{\}\:\：\.\"\L\<\>\?\|]/ig
	return !reg.test(str)
}

export const checkMail = (mail='') => {
	if (mail === '' || mail === null) {
		return false;
	}
	const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
	return reg.test(mail)
}

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

export const isSystemPage = ({path=''}) => path.slice(0, 7) === '/system'
