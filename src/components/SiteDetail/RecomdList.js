import React, { Component } from 'react';
import { getRecomdList } from '@/store/actions'
import imgurl from '@/common/api'
import { Link } from "react-router-dom";

class RecomdList extends Component {
  state = {
    list: []
  }
  componentDidUpdate (prevProps) {
    const { siteId: prevSiteId, catalog: prevCatalog } = prevProps;
    const { siteId, catalog } = this.props;
    if (prevCatalog !== catalog) {
      this.getRecomdList();
      // console.log(siteId, catalog)
    }
  }
  componentDidMount () {
    // this.getRecomdList();
  }
  getRecomdList = () => {
    const { catalog } = this.props;
    getRecomdList({catalog}).then(res => {
      // console.log(res)
      this.setState({
        list: res.result.list
      })
    })
  }

	render() {
    const { list } = this.state;
    return (
      <div className="recomd-wrapper">
        <p className="title">相关推荐∵</p>
        <ul>
          {
            list.map(it => 
              <li key={it._id}>
                <Link to={'/sitedetail/'+it._id}>
                  <p>{it.name}</p>
                  <div className="img-ctn">
                    <img src={imgurl+it.img} alt="图片"/>
                  </div>
                </Link>
              </li>
            )
          }
        </ul>

      </div>
	  );
	}
}


export default RecomdList;
