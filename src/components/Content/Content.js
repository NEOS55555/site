import React, {PureComponent, Fragment} from 'react';
import SiteItem from '@/commonComp/SiteItem'
// import DelModal from '@/commonComp/DelModal'
// import { delSite } from '@/store/actions'
import { Pagination } from 'antd'
import Empty from '@/commonComp/Empty'


import './Content.scss';

class Content extends PureComponent {




  render () {
  	// const { visible, confirmLoading } = this.state;
  	const {list=[], total, current, pageSize, onChange, onShowSizeChange, isSystem} = this.props;
  	// console.log(current)
  	return (
  		<Fragment>
  			{
  				list.length > 0 
  				?	(
	  				<div>
	  					<div className="site-container">
					  		{
					  			list.map(it => 
					  				<SiteItem 
					  					isSystem={isSystem} 
					  					key={it._id} 
					  					data={it} 
					  					// closeClick={() => {this.showModal({_id: it._id, status: it.status})}} 
					  					// closeClick={handleOk} 
					  				/>
					  			)
					  		}
					  	</div>
					  	<Pagination 
					  		total={total} current={current} pageSize={pageSize}
						  	// showQuickJumper 
                size="small" 
                // showSizeChanger  
						  	onChange={onChange} 
						  	pageSizeOptions={['5', '10', '15']}
						  	onShowSizeChange={onShowSizeChange} 
						  	// showTotal={total => `共 ${total} 条数据`} 
					  	/>
	  				</div>
  				)
					: <Empty />
		  	
  			}
		
  		</Fragment>
	  )
  }
}

export default Content;
