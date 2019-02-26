import React from 'react'
import './drag-scale-view.scss'

// 使用这个组件需要将body设置为margin:0
export default class DragScaleView extends React.Component {
  render(){
    return(
      <div className='drag-scale-view-con'>
        <div className='drag-scale-view-subcon'>{this.props.children}</div>
      </div>
    )
  }
}