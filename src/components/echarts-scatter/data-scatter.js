import React from 'react'
import './data-scatter.scss'
import MyButton from '../mybutton/mybutton';

export default class DataInputTable extends React.Component {
  constructor(props){
    super(props)
    this.handleOk = this.handleOk.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.xData = []
    this.yData = []
    this.seriesData = []
  }
  handleOk(){
    this.xData = []
    this.yData = []
    this.seriesData = []
    var xTrs = document.getElementsByClassName('x-tr')
    var yTrs = document.getElementsByClassName('y-tr')
    var sTrs = document.getElementsByClassName('s-tr')
    for(var i=0;i<xTrs.length;i++){
      var arr = []
      xTrs[i].childNodes.forEach((item,index) => {
        if(index !== 0)
          arr.push(item.childNodes[0].value)
      })
      this.xData.push(arr)
    }
    for(var i=0;i<yTrs.length;i++){
      var arr = []
      yTrs[i].childNodes.forEach((item,index) => {
        if(index !== 0)
          arr.push(item.childNodes[0].value)
      })
      this.yData.push(arr)
    }
    for(var i=0;i<sTrs.length;i++){
      var arr = []
      sTrs[i].childNodes.forEach((item,index) => {
        if(index !== 0)
          arr.push(item.childNodes[0].value)
      })
      this.seriesData.push(arr)
    }
    // 向父组件传递数据
    this.props.onUpdateData({xData: this.xData,yData: this.yData,seriesData: this.seriesData})
  }
  handleClear(){
    var xTrs = document.getElementsByClassName('x-tr')
    var yTrs = document.getElementsByClassName('y-tr')
    var sTrs = document.getElementsByClassName('s-tr')
    for(var i=0;i<xTrs.length;i++){
      xTrs[i].childNodes.forEach((item,index) => {
        if(index !== 0)
          item.childNodes[0].value = ''
      })
      yTrs[i].childNodes.forEach((item,index) => {
        if(index !== 0)
          item.childNodes[0].value = ''
      })
      sTrs[i].childNodes.forEach((item,index) => {
        if(index !== 0)
          item.childNodes[0].value = ''
      })
    }
    this.xData = []
    this.yData = []
    this.seriesData = []
  }
  render(){
    var tds = []
    for(var i=0;i<this.props.tdNum;i++){
      tds.push(<div className='data-item' key={i}><input /></div>)
    }
    var ths = []
    ths.push(<div key={100} className='data-item'>散点图</div>)
    for(var i=0;i<this.props.tdNum;i++){
      ths.push(<div className='data-item' key={i}>{i+1}</div>)
    }
    var trs = []
    // console.log(this.props.seriesName.length)
    for(var i=0;i<this.props.seriesName.length;i++){
      trs.push(<div key={i+1} className='x-tr'><div className='data-item'>x</div>{tds}</div>)
      trs.push(<div key={i+6} className='y-tr'><div className='data-item'>y</div>{tds}</div>)
      trs.push(<div key={i+11} className='s-tr'><div className='data-item'>{this.props.seriesName[i]}</div>{tds}</div>)
    }

    return(
      <div id='data-scatter-con'>
        {/* 数据表 */}
        <div id='center-data'>
          <div id='data-table' style={{width: (60 * (Number(this.props.tdNum) + 1)) +'px'}}>
            <div style={{width: '100%'}}>{ths}</div>
            {trs}
          </div>
        </div>
        {/* 右侧按钮栏 */}
        <div id='right-button'>
          <div id='ok-btn' onClick={this.handleOk}>
            <MyButton content='确定' />
          </div>
          <div id='clear-btn' onClick={this.handleClear}>
            <MyButton content='清空' type={2} fontColor='#000' />
          </div>
        </div>
      </div>
    )
  }
}