import React from 'react'
import './slider.scss'

export default class Slider extends React.Component {
  // 传入最小值、最大值、滑条的前后颜色、标签颜色、初始值、数值精确度 小数点位数1 2(不需要显示小数时不必设置)
  constructor(props){
    super(props)
    var initValue
    var p = this.props
    var min = p.min || 0
    var max = p.max || 10

    if(p.initValue && p.initValue >= min && p.initValue <= max)
      initValue = p.initValue
    else
      initValue = Math.round((Number(max) + Number(min)) / 2)
    this.state = {
      labelValue: initValue,
      blockLeft: ((initValue - min) / (max - min)) * 160,    // 滑块左边缘代表数值  滑条长度160  滑块宽度10
    }
    this.lastBlockLeft = ((initValue - min) / (max - min)) * 160
    this.moveFlag = false
    this.startClientX = 0

    this.moveBlock = this.moveBlock.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
  }
  handleMouseDown(e){
    e.preventDefault()
    this.moveFlag = true
    this.startClientX = e.clientX ? e.clientX : e.targetTouches[0].clientX
  }
  handleMouseUp(){
    this.moveFlag = false
    this.lastBlockLeft = this.state.blockLeft
    // 向上层组件传递数据
    this.props.sendData(this.state.labelValue)
  }
  // 移动滑块
  moveBlock(e){
    e.preventDefault()
    var min = this.props.min || 0
    var max = this.props.max || 10
    if(this.moveFlag){
      var left = this.lastBlockLeft + (e.clientX ? e.clientX : e.targetTouches[0].clientX) - this.startClientX
      if(left < 0)
        left = 0
      else if(left > 160)
        left = 160
      var value
      if(this.props.accuracy == 1)
        value = (min + (left / 160) * (max - min)).toFixed(1)
      else if(this.props.accuracy == 2)
        value = (min + (left / 160) * (max - min)).toFixed(2)
      else
        value = min + Math.round((left / 160) * (max - min))
      this.setState({
        blockLeft: left,
        labelValue: value
      })
    }
  }
  render(){
    var p = this.props
    return(
      <div className='slider-component-con' onMouseMove={this.moveBlock} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}
        onTouchMove={this.moveBlock} onTouchStart={this.handleMouseDown} onTouchEnd={this.handleMouseUp}>
        <div className='slider-strip' style={{backgroundColor: p.stripColor || '#ccc'}}></div>
        <div className='slider-strip-effective' style={{backgroundColor: p.blockColor || 'orange',width: this.state.blockLeft + 'px'}}></div>
        <div className='slider-block' style={{backgroundColor: p.blockColor || 'orange',left: this.state.blockLeft + 'px'}} ></div>
        <label className='slider-value' style={{color: p.labelColor || '#000'}}>
          {this.state.labelValue}
        </label>
      </div>
    )
  }
}