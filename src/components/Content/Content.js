import React, {PureComponent, Fragment} from 'react';
import SiteItem from '@/commonComp/SiteItem'
// import DelModal from '@/commonComp/DelModal'
// import { delSite } from '@/store/actions'
import { Pagination } from 'antd'
import Empty from '@/commonComp/Empty'
import RightNav from '@/commonComp/RightNav'
import StatusNav from '@/commonComp/StatusNav'
import Top10Site from '@/components/Top10Site'


import './Content.scss';

class Content extends PureComponent {

  render () {
  	// const { visible, confirmLoading } = this.state;
  	const {list=[], total, current, pageSize, onChange, onShowSizeChange, isSystem} = this.props;
  	// console.log(current)
  	return (
		  <div className="site-wrapper container">
		  	{/*<div className="max-container">*/}
					<div className="site-box">
						{
							list.length > 0 
							?	(
									<Fragment>
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
									  	showQuickJumper 
				              size="small" 
				              // showSizeChanger  
									  	onChange={onChange} 
									  	pageSizeOptions={['5', '10', '15']}
									  	onShowSizeChange={onShowSizeChange} 
									  	// showTotal={total => `共 ${total} 条数据`} 
								  	/>
							  	</Fragment>
							  )
							: <Empty />
						}
					</div>
			  	
	  			<div className="right-content">
		  			{
		  				isSystem ? <StatusNav /> : <Top10Site />
		  			}
	  				<RightNav/>
	  			</div>
		  	{/*</div>*/}
		
	  	</div>
	  )
  }
}

export default Content;
