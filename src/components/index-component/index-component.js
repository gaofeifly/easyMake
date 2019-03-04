import React from 'react'
import './index-component.scss'
import $ from 'jquery'
import 'animate.css'
import {Grid,Row,Col,Tabs,Tab} from 'react-bootstrap'

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
          <h2 className='animated fadeInUp intro-title'>无需编程  操作简单  轻松制作各类图表</h2>

          {[1,2,3].map(item => {
            return <div className='animated rotateInUpLeft img-con' key={item}>
              <img src={require('../../images/index/' + item + '.JPG')} />
            </div>
          })}
        </div> }

        { this.state.pageDisIndex == 1 && <div className='intro-item'>
          <h2 className='animated fadeInUp intro-title'>页面适配三端(工作台仅PC)</h2>
          {[4,5,6].map(item => {
            return <div className='animated rotateInUpLeft img-con' key={item}>
              <img src={require('../../images/index/' + item + '.JPG')} />
            </div>
          })}
        </div> }

        { this.state.pageDisIndex == 2 && <div className='intro-item'>
          <h2 className='animated fadeInUp intro-title'>注册登录  保存下载  方便日后查看</h2>
          {[7,8,9].map(item => {
            return <div className='animated rotateInUpLeft img-con' key={item}>
              <img src={require('../../images/index/' + item + '.JPG')} />
            </div>
          })}
        </div> }

        {/* 右侧圆点 */}
        <div id='circles-con'>
          {[0,1,2].map((item) => {
            return <div key={item} className='circle' style={{backgroundColor: item == this.state.pageDisIndex ?  '#66f' : '#ccc'}}></div>
          })}
        </div>

        {/* 下方箭头 */}
        { this.state.pageDisIndex < 2 && <img id='bottom-arrow' src={require('../../images/double-arrow.png')} />}
      </div>
    )
  }
}