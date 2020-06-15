import { UPDATE_LIST, UPDATE_CATALOG_LIST, UPDATE_DATA, UPDATE_TOP10_LIST, SET_CATALOG, UPDATE_CATALOG_LIST_SITE } from '../actions';
const initState = {
  top10List: [],  // top10网站
  siteList: [],
  siteTotal: 0,
  catalogList: [],
  catalogListSite: [],
  pageIndex: 1,
  pageSize: 5,
  search: '',
  catalog: -1,
  status: -1,  // 系统管理-如果后面有状态切换的话， 就会需要到
  isSystem: false,
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
          siteList: data.list || [],
          siteTotal: data.total
        }
      } else {
      	return {
      		...state,
      		siteList: data.list || []
      	}
      };
    case UPDATE_CATALOG_LIST: 
      return {
        ...state,
        catalogList: data.list || []
      }
    case UPDATE_CATALOG_LIST_SITE: 
      return {
        ...state,
        catalogListSite: data.list || []
      }
    case UPDATE_TOP10_LIST: 
      return {
        ...state,
        top10List: data.list || []
      }
    case SET_CATALOG: 
      return {
        ...state,
        catalog: data
      }
    default:
      return state
  }
};
