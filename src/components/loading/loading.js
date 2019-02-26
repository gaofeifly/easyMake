import React from 'react'
import './loading.scss'

// 动画一 6条边更改透明度旋转
class Loading1 extends React.Component {
  render(){
    return(
      <div className='loading-con1'>
        {[1,2,3,4,5,6,7,8,9,10].map(index => {
          return <div key={index} className='loading-item' style={{backgroundColor: this.props.color}}></div>
        })}
      </div>
    )
  }
}
// 动画二 类似音乐节奏
class Loading2 extends React.Component {
  render(){
    return(
      <div className='loading-con2'>
        {[1,2,3,4,5].map(index => {
          return <div key={index} className='loading-item' style={{backgroundColor: this.props.color}}></div>
        })}
      </div>
    )
  }
}
// 动画三 翻转方块
class Loading3 extends React.Component {
  render(){
    return <div className='loading-con3'>
      <div style={{backgroundColor: this.props.color}}></div>
    </div>
  }
}
// 动画四 两个圆形缩放
class Loading4 extends React.Component {
  render(){
    return <div className='loading-con4'>
      <div style={{backgroundColor: this.props.color}}></div>
      <div style={{backgroundColor: this.props.color}}></div>
    </div>
  }
}
// 动画五 两个方块旋转缩放交替位置
class Loading5 extends React.Component {
  render(){
    return <div className='loading-con5'>
      <div style={{backgroundColor: this.props.color}}></div>
      <div style={{backgroundColor: this.props.color}}></div>
    </div>
  }
}
// 动画六 两个圆圈旋转缩放交替位置
class Loading6 extends React.Component {
  render(){
    return <div className='loading-con6'>
      <div style={{backgroundColor: this.props.color}}></div>
      <div style={{backgroundColor: this.props.color}}></div>
    </div>
  }
}
// 动画七 三个圆圈排成一列
class Loading7 extends React.Component {
  render(){
    return <div className='loading-con7'>
      {[1,2,3].map(index => {
        return <div key={index} style={{backgroundColor: this.props.color}}></div>
      })}
    </div>
  }
}
// 动画八 一群圆圈转
class Loading8 extends React.Component {
  render(){
    return <div className='loading-con8'>
      {[1,2,3,4,5,6,7,8,9,10].map(index => {
        return <div key={index}><div style={{backgroundColor: this.props.color}}></div></div>
      })}
    </div>
  }
}
export {Loading1,Loading2,Loading3,Loading4,Loading5,Loading6,Loading7,Loading8}