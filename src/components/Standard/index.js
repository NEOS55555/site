import React, { Component } from 'react';
import './index.scss'

class Standard extends Component {
	render () {
		return (
			<div className="standard-wrapper main-content">
				<div className="std-box std-desc">
					<h3 className="title">收录积分</h3>
					<p>1.是否有趣？ </p>
					<p>是：+3 否： 0</p>
					<p>2.有趣且是否小众？</p>
					<p>是：+2 否：1</p>
					<p>3.是否实用？</p>
					<p>是：+3 否： 0</p>
					<p>4.实用且使用范畴是否大众？</p>
					<p>是：+2 否：1</p>
					<p className="highlight">总分为5分即以上即达到收录标准。</p>
				</div>
				<div className="std-box">
					<h3 className="title">什么叫做有趣呢？</h3>
					<p>进入该网页后，有种<span className="highlight">眼前一亮或者天马行空</span>的感觉。可以是搞笑恶搞的、无聊但有想象力的、新奇另类的等等。</p>
				</div>
				<div className="std-box">
					<h3 className="title">什么又是实用呢？</h3>
					<p>可以<span className="highlight">简化我们的日常操作</span>，或者对于专业性的工具有着大众化的简化普及。</p>
					<p>亦或者要安装软件才能使用的功能，在一个网页就能实现，这也是非常实用的。</p>
					<p className="highlight">最重要的一点，能够白嫖也是非常实用的！<span role="img">😏</span></p>
				</div>
				{/*<p>就例如专业工具PhotoShop（又叫ps），简化后的工具美图秀秀，点两下就有美图效果，这就达到了实用标准。</p>*/}
			</div>
		)
	}
}

export default Standard