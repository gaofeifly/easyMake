import React from 'react'
import './mine.scss'
import {Grid,Row,Col} from 'react-bootstrap'
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import echarts from 'echarts/lib/echarts';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import { store } from '../../store/store'
import $ from 'jquery'
import { Loading8 } from '../loading/loading'
import ScalableContainer from '../../components/scalable-container/scalable-container'
import MyButton from '../../components/mybutton/mybutton'

export default class Mine extends React.Component {
  constructor(props){
    super(props)
    this.navs = ['单个图表','工作台图表']
    this.state = {
      currentIndex: 0,
      chartData: [],
      loadingDis: true,
      panelData: [],
    }
  }
  changeNav = (e) => {
    this.setState({
      currentIndex: e.target.dataset.index
    })
  }
  getCharts = () => {
    var that = this
    $.ajax({
      url: "http://www.lgaofei.xyz:8081",
      // url: 'http://localhost:8081',
      data: {
        mes: 'getChart',
        username: store.getState().name.username,
      },
      dataType: "jsonp",
      async: true,
      timeout: 10000,
      success:function(data){
        if(data.mes == 'ok'){
          that.setState({
            chartData: data.results,
            loadingDis: false
          })
        }else{
          alert('获取失败')
        }
      },
      error:function(err){
        console.log(`have a error is ${JSON.stringify(err)}`)
        alert('获取失败')
      }
    })
  }
  getPanelCharts = () => {
    var that = this
    $.ajax({
      url: "http://www.lgaofei.xyz:8081",
      // url: 'http://localhost:8081',
      data: {
        mes: 'getPanelCharts',
        username: store.getState().name.username,
      },
      dataType: "jsonp",
      async: true,
      timeout: 10000,
      success:function(data){
        if(data.mes == 'ok'){
          that.setState({
            panelData: data.results
          })
        }else{
          alert('获取失败')
        }
      },
      error:function(err){
        console.log(`have a error is ${JSON.stringify(err)}`)
        alert('获取失败')
      }
    })
  }
  componentDidMount(){
    var that = this
    setTimeout(() => {
      that.getCharts()
      that.getPanelCharts()
    },1500)
  }
  logout = () => {
    global.deleteCookie()
    store.dispatch({type: 'DELETE_USERNAME'})
    console.log('logout success')
    this.props.history.push('/')
  }
  // 子组件删除图表后将剩下的图表信息传给父组件
  onDeleteChart = (data) => {
    this.setState({
      chartData: data.results,
    })
  }
  onDeletePanelChart = (data) => {
    this.setState({
      panelData: data.results,
    })
  }
  render(){
    return(
      <Grid id='mine-component'>
        <Row>
          <Col xs={12} sm={12} md={3} lg={3} id='sidebar'>
            <div id='nav-con'>
              {this.navs.map((item,index) => {
                return <div key={index} data-index={index} onClick={this.changeNav} 
                  style={{backgroundColor: index == this.state.currentIndex ? '#66f' : '#efefef'}}>
                  {item}
                </div>
              })}
              <div id='logout' onClick={this.logout}>[ 注销 ]</div>
            </div>
          </Col>

          {/* 加载动画 */}
          {this.state.loadingDis && <div id='init-loading'><Loading8 color='#66f' /></div>}

          <Col xs={12} sm={12} md={9} lg={9} id='content'>
            {this.state.currentIndex == 0 && <Charts chartData={this.state.chartData} onDeleteChart={this.onDeleteChart} />}
            {this.state.currentIndex == 1 && <PanelCharts panelData={this.state.panelData} onDeletePanelChart={this.onDeletePanelChart} />}
          </Col>
        </Row>
      </Grid>
    )
  }
}

class Charts extends React.Component {
  constructor(props){
    super(props)
    this.seeChart = this.seeChart.bind(this)
    this.deleteChart = this.deleteChart.bind(this)
    this.state = {
      echartsSeeFlag: false,
      seeOption: {},
      seeBackColorFlag: false,
      seeThemeIndex: 1
    }
  }
  seeChart(e){
    var index = e.target.dataset.index
    var opt = JSON.parse(this.props.chartData[index].chart_option)
    this.setState({
      echartsSeeFlag: true,
      seeOption: opt.option,
      seeBackColorFlag: opt.backColorFlag,
      seeThemeIndex: opt.themeIndex,
      backColorIndex: index
    })
  }
  deleteChart(e){
    var that = this
    $.ajax({
      url: "http://www.lgaofei.xyz:8081",
      // url: 'http://localhost:8081',
      data: {
        mes: 'deleteChart',
        username: store.getState().name.username,
        chartId: that.props.chartData[e.target.dataset.index].chart_id
      },
      dataType: "jsonp",
      async: true,
      timeout: 10000,
      success:function(data){
        console.log(data.mes)
        if(data.mes == 'ok'){
          that.props.onDeleteChart(data)
        }else{
          alert('删除失败')
        }
      },
      error:function(err){
        console.log(`have a error is ${JSON.stringify(err)}`)
        alert('删除失败')
      }
    })
  }
  render(){
    var data = this.props.chartData
    var options = []
    for(var i=0;i<data.length;i++){
      options.push(JSON.parse(data[i].chart_option))
    }
    var themes = ['default','light','dark']
    return(
      <div id='work-con'>
        {options.map((item,index) => {
          if(item.backColorFlag){
            echarts.registerTheme('backColor' + index,{
              backgroundColor: item.backColor
            })
          }
          return <div key={index} className='echarts-item'>
            <ReactEchartsCore echarts={echarts} option={item.option} style={{height: '100%', width: '100%'}}
              theme={item.backColorFlag ? 'backColor' + index : themes[item.themeIndex]} />
            <div className='chart-mask'>
              <div className='see' onClick={this.seeChart} data-index={index}>查看</div>
              <div className='delete' onClick={this.deleteChart} data-index={index}>删除</div>
            </div>
          </div>
        })}
        {this.state.echartsSeeFlag && <div id='echarts-see' 
          style={{width: window.innerWidth + 'px',height: window.innerHeight + 'px'}}>
          <div id='chart'>
          <ReactEchartsCore echarts={echarts} option={this.state.seeOption} style={{height: '100%', width: '100%'}}
            theme={this.state.seeBackColorFlag ? 'backColor' + this.state.backColorIndex : themes[this.state.seeThemeIndex]} />
          </div>
          <div id='close' onClick={() => {this.setState({echartsSeeFlag: false})}}>X</div>
        </div>}
      </div>
    )
  }
}

class PanelCharts extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      seeOption: {},
      fullDis: false
    }
  }
  seePanelChart = (index) => {
    this.setState({
      seeOption: JSON.parse(this.props.panelData[index].chart_data),
      fullDis: true
    })
  }
  deletePanelChart = (index) => {
    var that = this
    $.ajax({
      url: "http://www.lgaofei.xyz:8081",
      // url: 'http://localhost:8081',
      data: {
        mes: 'deletePanelChart',
        username: store.getState().name.username,
        chartId: that.props.panelData[index].chart_id
      },
      dataType: "jsonp",
      async: true,
      timeout: 10000,
      success:function(data){
        console.log(data.mes)
        if(data.mes == 'ok'){
          that.props.onDeletePanelChart(data)
        }else{
          alert('删除失败')
        }
      },
      error:function(err){
        console.log(`have a error is ${JSON.stringify(err)}`)
        alert('删除失败')
      }
    })
  }
  getItemByType = (type,options) => {
    var themes = ['default','light','dark']
    switch(type){
      case 'echarts':
        return <ReactEchartsCore echarts={echarts} option={options.option} style={{height: '100%', width: '100%'}}
          theme={options.backColorFlag ? 'backColor' + options.backColor : themes[options.themeIndex]} />
      case 'img':
        return <img src={options.src === null ? require('../../images/cat2.jpg') : options.src}
          style={options.style} onMouseDown={e => e.preventDefault()} />
      case 'text': 
        return <h1 style={options.style}>{options.textContent}</h1>
    }
  }
  render(){
    var data = this.props.panelData
    var options = []
    var seeOption = this.state.seeOption
    for(var i=0;i<data.length;i++){
      options.push(JSON.parse(data[i].chart_data))
    }
    return(
      <div id='panel-con'>
        {options.map((item,i) => {
          return <div key={i} className='panel-item' style={{backgroundColor: item.backColor}}>
            {item.conArray.map((item2,index) => {
              return <ScalableContainer key={index} isDisplay={item.deleteIndexs.find(e => e == index)} 
                isTarget={false} conid={'full' + item2.conid} initWidth={item.lastArray[index].lastWidth}
                initHeight={item.lastArray[index].lastHeight} initTop={item.lastArray[index].lastTop}
                initLeft={item.lastArray[index].lastLeft}>
                {this.getItemByType(item2.type,item.options[index])}
              </ScalableContainer>
            })}
            <div className='panel-bottom'>
              <div className='p-title'>{item.title}</div>
              <div className='p-date'>{item.date}</div>
              <div className='p-btn-see'>
                <div onClick={this.seePanelChart.bind(this,i)}><MyButton backColor='#66f' fontColor='#fff' content='查看' /></div>
              </div>
              <div className='p-btn-delete'>
                <div onClick={this.deletePanelChart.bind(this,i)}><MyButton backColor='#ff3366' fontColor='#fff' content='删除' /></div>
              </div>
            </div>
          </div>
        })}
        {this.state.fullDis && <div id='full-screen-con' style={{
          width: window.innerWidth + 'px',
          backgroundColor: seeOption.backColor || '#efefef'
        }}>
          <div id='close-full' onClick={() => this.setState({fullDis: false})}>x</div>
          {seeOption.conArray.map((item2,index) => {
            return <ScalableContainer key={index} isDisplay={seeOption.deleteIndexs.find(e => e == index)} 
              isTarget={false} conid={'full' + item2.conid} initWidth={seeOption.lastArray[index].lastWidth}
              initHeight={seeOption.lastArray[index].lastHeight} initTop={seeOption.lastArray[index].lastTop}
              initLeft={seeOption.lastArray[index].lastLeft}>
              {this.getItemByType(item2.type,seeOption.options[index])}
            </ScalableContainer>
          })}
        </div>}
      </div>
    )
  }
}