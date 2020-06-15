import React from 'react';

const CurContext = React.createContext({
  handleOk: () => {},		// 获取网站列表
  // collectClick: () => {},	// 点击收藏
});
export default CurContext;