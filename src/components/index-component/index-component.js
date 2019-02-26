import React from 'react'
import './index-component.scss'
import $ from 'jquery'

export default class IndexComponent extends React.Component{
  constructor(props){
    super(props)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
    this.startY = 0
    this.state = {
      pageDisIndex: 0
    }
    this.wheelFlag = false  // 避免一次滑动切换多页
  }
  handleTouchStart(e){
    this.startY = e.targetTouches[0].clientY
  }
  handleTouchMove(e){
    if(e.targetTouches[0].clientY - this.startY > 50){
      // 下滑
      if(this.state.pageDisIndex == 0)
        return
      this.setState({
        pageDisIndex: this.state.pageDisIndex - 1
      })
    }else if(this.startY - e.targetTouches[0].clientY > 50){
      // 上滑
      if(this.state.pageDisIndex == 2)
        return
      this.setState({
        pageDisIndex: this.state.pageDisIndex + 1
      })
    }
  }
  handleTouchEnd(){

  }
  componentDidMount(){
    $('#index-component-con').on('mousewheel',(e) => {
      if(!this.wheelFlag){
        this.wheelFlag = true
        var that = this
        setTimeout(function(){
          that.wheelFlag = false
        },1500)
      }else{
        return
      }
      e.preventDefault()
      if(e.originalEvent.wheelDeltaY < 0){
        // 滚轮下滑
        if(this.state.pageDisIndex == 2)
          return
        this.setState({
          pageDisIndex: this.state.pageDisIndex + 1
        })
      }else{
        // 滚轮上滑
        if(this.state.pageDisIndex == 0)
          return
        this.setState({
          pageDisIndex: this.state.pageDisIndex - 1
        })
      }
    })
  }
  render(){
    return(
      <div id='index-component-con' onTouchStart={this.handleTouchStart} 
        onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd}>

        { this.state.pageDisIndex == 0 && <div className='intro-item'>
          <h1>1</h1>
        </div> }

        { this.state.pageDisIndex == 1 && <div className='intro-item'>
          <h1>2</h1>
        </div> }

        { this.state.pageDisIndex == 2 && <div className='intro-item'>
          <h1>3</h1>
        </div> }

        {/* 右侧圆点 */}
        <div id='circles-con'>
          {[0,1,2].map((item) => {
            return <div key={item} className='circle' style={{backgroundColor: item == this.state.pageDisIndex ?  '#66f' : '#ccc'}}></div>
          })}
        </div>

        {/* 下方箭头 */}
      </div>
    )
  }
}