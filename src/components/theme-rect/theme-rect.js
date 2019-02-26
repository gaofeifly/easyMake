import React from 'react'
import './theme-rect.scss'

export default class ThemeRect extends React.Component {
  render(){
    return(
      // 正方形
      <div className='theme-rect-con' style={{opacity: this.props.opacity}}>
        <div className='top-left-triangle' style={{borderLeftColor: this.props.color1,borderTopColor: this.props.color1}}></div>
        <div className='bottom-right-triangle' style={{borderBottomColor: this.props.color2,borderRightColor: this.props.color2}}></div>
      </div>
    )
  }
}