import { getStrChartLen } from './common'

// 反馈评论-相对于网站的id
export const FEEDBACK_SITEID = 0;
export const LOG_OVERDUE_CODE = 233;
// 发送邮件倒计时
export const COUNT_DOWN = 60;
// 状态码
export const DELETE_CODE = 0;
export const NORMAL_CODE = 1;
export const DRAFT_CODE = 2;
export const REVIEW_CODE = 3;	// 待审核
const statusMap = []
statusMap[DELETE_CODE] = '下架'
statusMap[NORMAL_CODE] = '正常'
statusMap[DRAFT_CODE] = '草稿'
statusMap[REVIEW_CODE] = '待审核'

export const statusArr = statusMap.map((name, idx) => ({id: idx, name}))

export {statusMap};
export const EXPIRES_TIME = 120 * 60 * 1000

export const MAX_NAME_CHART = 14;	// 用户名最大字符数
// export const MIN_NAME_CHART = 4;	// 用户名最大字符数

export const nameTipText = '设置后不可更改，中英文均可，最长14个英文或7个汉字，不包含特殊字符'
export const nameErrorText = {
	0: '用户名最长14个英文或7个汉字',
	1: '用户名不可包含特殊字符',
	2: '用户名不能为空',
	3: '该用户名已被注册',
}
export const pswTipText = [
	{
		tip: '长度为8~14个字符',
		isok: (psw='') => {
			const pswChartLen = getStrChartLen(psw);
			return pswChartLen <= 14 && pswChartLen >= 8
		},
	},
	{
		tip: '字母/数字以及标点符号至少包含2种',
		isok: (psw='') => /(?=.*[a-zA-Z0-9])(?=.*[^a-zA-Z0-9]).{2,14}/.test(psw),
	},
	{
		tip: '不允许有空格、中文',
		isok: (psw='') => psw.length > 0 && !(/[\s\u4e00-\u9fa5]/.test(psw)),
	}
]

// 网站
export const MAX_SIT_NAME = 40;
export const siteNameTip = `最长${MAX_SIT_NAME}个英文或${MAX_SIT_NAME/2}个汉字，不包含特殊字符`
export const siteNameErrorText = {
	0: `名称最长${MAX_SIT_NAME}个英文或${MAX_SIT_NAME/2}个汉字`,
	1: '名称不可包含特殊字符',
	2: '名称不能为空',
}

export const MAX_SIT_DESC = 400;
export const siteDescTip = `最多${MAX_SIT_DESC}个文字`
export const siteErrorText = {
	0: `不可超过${MAX_SIT_DESC}个文字`,
	1: '描述不能为空'
}

// 尺寸不小于200 x 200，
const MAX_IMG_M = 1;
const M = 1024 * 1024
export const siteImgTip = `点击图片进行添加，大小不超过${MAX_IMG_M}M`
export const MAX_IMG_SIZE = M * MAX_IMG_M;
export const siteImgErrorText = {
	0: `图片格式不对`,
	1: `图片大小不符合要求`,
	// 2: `图片尺寸不符合要求`,
	3: '请选择图片',
}
/*const controls = [
  'undo', 'redo', 'separator',
  'font-size', 'line-height', 'letter-spacing', 'separator',
  // 'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
  // 'superscript', 'subscript', 'remove-styles', 'emoji', 'separator', 'text-indent', 'text-align', 'separator',
  // 'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
  // 'link', 'separator', 'hr', 'separator',
  // 'media', 'separator',
  // 'clear'
]*/

export const descControls = ['text-color', 'bold', 'italic', 'underline', 'emoji']

export const MAX_COMMIT_LEN = 400;
export const faceImgTip = `大小不超过${MAX_IMG_M}M`
