import React from 'react'
import './data-input-table.scss'
import MyButton from '../mybutton/mybutton'
// import {findDOMNode}  from 'react-dom'

export default class DataInputTable extends React.Component {
  constructor(props){
    super(props)
    this.handleOk = this.handleOk.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.xData = []
    this.yData = []
  }
  handleOk(){
    this.xData = []
    this.yData = []
    var dom = this.refs.con
    // console.log(dom)
    // xData只有一组
    dom.getElementsByClassName('x-tr')[0].childNodes.forEach((item) => {
      this.xData.push(item.childNodes[0].value)
    })
    // yData可以有多组
    var yTrs = dom.getElementsByClassName('y-tr')
    for(var i=0;i<yTrs.length;i++){
      var arr = []
      yTrs[i].childNodes.forEach(item => {
        arr.push(item.childNodes[0].value)
      })
      this.yData.push(arr)
    }
    // 向父组件传递数据
    this.props.onUpdateData({xData: this.xData,yData: this.yData})
  }
  handleClear(){
    var dom = this.refs.con
    dom.getElementsByClassName('x-tr')[0].childNodes.forEach((item) => {
        item.childNodes[0].value = ''
    })
    var yTrs = dom.getElementsByClassName('y-tr')
    for(var i=0;i<yTrs.length;i++){
      yTrs[i].childNodes.forEach(item => {
        item.childNodes[0].value = ''
      })
    }
    this.xData = []
    this.yData = []
  }
  render(){
    var tds = []
    for(var i=0;i<this.props.tdNum;i++){
      tds.push(<div className='data-item' key={i}><input /></div>)
    }
    var ths = []
    for(var i=0;i<this.props.tdNum;i++){
      ths.push(<div className='data-item' key={i}>{i+1}</div>)
    }
    var seriesName = []
    var yTrs = []
    for(var i=0;i<this.props.seriesName.length;i++){
      seriesName.push(<div key={i}>{this.props.seriesName[i]}</div>)
      yTrs.push(<div key={i} className='y-tr'>{tds}</div>)
    }
    return(
      <div ref='con' className='data-input-con'>
        <div className='label-data-con'>
          {/* 名称栏 */}
          <div className='left-label'>
            <div><br/></div>
            <div>x</div>
            {seriesName}
          </div>
          {/* 数据表 */}
          <div className='center-data'>
            <div className='data-table' style={{width: 60 * this.props.tdNum +'px'}}>
              <div>{ths}</div>
              <div className='x-tr'>{tds}</div>
              {yTrs}
            </div>
          </div>
        </div>
        {/* 按钮栏 */} 
        <div className='right-button'>
          <div onClick={this.handleOk}>
            <MyButton content='确定' />
          </div>
          <div onClick={this.handleClear}>
            <MyButton content='清空' backColor='#ff6666' />
          </div>
        </div>
      </div>
    )
  }
}