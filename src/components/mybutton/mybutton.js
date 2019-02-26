import React from 'react'
import './mybutton.scss'

export default class MyButton extends React.Component {
  // 参数: backColor 背景颜色  fontColor 文字颜色  content 文字内容
  // type(1-小圆角有背景色 2-小圆角无背景色 3-大圆角有背景色 4-大圆角无背景色)
  constructor(props){
    super(props)
    this.state = {
      butFlag: false,
      circleTop: 0,
      circleLeft: 0
    }
    this.butClick = this.butClick.bind(this)
    this.securityFlag = true  // 防止按钮组件被卸载后setTimeout仍执行setState
  }
  butClick(e){
    this.setState({
      butFlag: true,
      circleLeft: e.nativeEvent.offsetX - 10,
      circleTop: e.nativeEvent.offsetY - 10,
    })
    var that = this
    setTimeout(() => {
      if(!this.securityFlag)
        return
      that.setState({
        butFlag: false
      })
    },300)
  }
  componentWillUnmount(){
    this.securityFlag = false
  }
  render(){
    var p = this.props
    var type = p.type || 1
    return(
      <div className='my-button-con' style={{
        backgroundColor: (type == 1 || type == 3) ? (p.backColor ? p.backColor : '#66f') : '',
        borderRadius: (type == 3 || type == 4) ? '15px' : '5px',
        color: p.fontColor ? p.fontColor : '#fff',
        border: (type == 2 || type == 4) ? ('1px solid ' + (p.backColor ? p.backColor : '#66f')) : ''
      }} onClick={this.butClick}>
        <div className='my-button-circle' style={{
          top: this.state.circleTop + 'px',
          left: this.state.circleLeft + 'px',
          display: this.state.butFlag ? 'block' : 'none'
        }}></div>
        {p.content ? p.content : '按钮'}
      </div>
    )
  }
}