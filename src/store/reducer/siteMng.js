import { UPDATE_LIST, UPDATE_CATALOG_LIST, UPDATE_DATA } from '../actions';
const initState = {
  siteList: [],
  siteTotal: 0,
  catalogList: [],
  pageIndex: 1,
  pageSize: 5,
  // catalog: -1,
  // status: 1,  // 系统管理-如果后面有状态切换的话， 就会需要到
};

export default (state = initState, {type, data}) => {
  switch (type) {
    case UPDATE_DATA:
      return {
        ...state,
        ...data
      }
    case UPDATE_LIST:
      if (data.total !== undefined) {
        return {
          ...state,
          siteList: data.list,
          siteTotal: data.total
        }
      } else {
      	return {
      		...state,
      		siteList: data.list
      	}
      };
    case UPDATE_CATALOG_LIST: 
      return {
        ...state,
        catalogList: data.list
      }
    default:
      return state
  }
};
