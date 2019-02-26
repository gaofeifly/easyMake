import React from 'react'
import './two-column.scss'

export default class TwoColumn extends React.Component{
  // 传入左边元素left、右边元素right、宽度(默认80%)、左边比例、右边比例(默认1:1)
  constructor(props){
    super(props)
  }
  render(){
    return(
    <div className='two-column-con' style={{width: this.props.width || '80%'}}>
      <div className='left-column' style={{flex: this.props.leftFlex || 1}}>
        {this.props.left}
      </div>
      <div className='right-column' style={{flex: this.props.rightFlex || 1}}>
        {this.props.right}
      </div>
    </div>
    )
  }
}